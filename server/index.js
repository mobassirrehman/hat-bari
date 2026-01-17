const express = require('express');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config({ path: '.env.local' });

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/hatbari';
let db;

async function connectDB() {
  try {
    const client = await MongoClient.connect(MONGODB_URI);
    db = client.db();
    console.log('✅ Connected to MongoDB');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
}

// Routes

// GET all items
app.get('/api/items', async (req, res) => {
  try {
    const { category, search, sort, limit = 20, page = 1 } = req.query;
    
    let query = {};
    
    if (category && category !== 'all') {
      query.category = category;
    }
    
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { nameBn: { $regex: search, $options: 'i' } },
      ];
    }

    let sortOption = {};
    switch (sort) {
      case 'price-low': sortOption = { price: 1 }; break;
      case 'price-high': sortOption = { price: -1 }; break;
      case 'rating': sortOption = { rating: -1 }; break;
      case 'newest': sortOption = { createdAt: -1 }; break;
      default: sortOption = { reviews: -1 };
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const items = await db.collection('items')
      .find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(parseInt(limit))
      .toArray();

    const total = await db.collection('items').countDocuments(query);

    res.json({
      items,
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / parseInt(limit)),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET single item
app.get('/api/items/:id', async (req, res) => {
  try {
    const item = await db.collection('items').findOne({ 
      _id: new ObjectId(req.params.id) 
    });
    
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }
    
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST new item
app.post('/api/items', async (req, res) => {
  try {
    const newItem = {
      ...req.body,
      rating: 4.5,
      reviews: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db.collection('items').insertOne(newItem);
    
    res.status(201).json({ 
      message: 'Item created', 
      id: result.insertedId,
      item: { ...newItem, _id: result.insertedId }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT update item
app.put('/api/items/:id', async (req, res) => {
  try {
    const result = await db.collection('items').updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: { ...req.body, updatedAt: new Date() } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Item not found' });
    }

    res.json({ message: 'Item updated' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE item
app.delete('/api/items/:id', async (req, res) => {
  try {
    const result = await db.collection('items').deleteOne({ 
      _id: new ObjectId(req.params.id) 
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Item not found' });
    }

    res.json({ message: 'Item deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET categories with count
app.get('/api/categories', async (req, res) => {
  try {
    const categories = await db.collection('items').aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]).toArray();

    res.json(categories.map(c => ({ name: c._id, count: c.count })));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Seed data endpoint
app.post('/api/seed', async (req, res) => {
  try {
    const sampleItems = [
      { name: 'Fresh Tomatoes', nameBn: 'টমেটো', price: 60, originalPrice: 80, image: '🍅', rating: 4.5, reviews: 24, badge: 'Sale', category: 'Vegetables', description: 'Fresh, ripe tomatoes from local farms.', unit: 'kg', stock: 50 },
      { name: 'Green Spinach', nameBn: 'পালং শাক', price: 30, image: '🥬', rating: 4.8, reviews: 42, badge: 'Fresh', category: 'Vegetables', description: 'Organic green spinach, rich in iron.', unit: 'bundle', stock: 30 },
      { name: 'Organic Bananas', nameBn: 'কলা', price: 80, image: '🍌', rating: 4.6, reviews: 35, category: 'Fruits', description: 'Sweet organic bananas.', unit: 'dozen', stock: 45 },
      { name: 'Farm Eggs (12pc)', nameBn: 'ডিম', price: 140, originalPrice: 160, image: '🥚', rating: 4.9, reviews: 67, badge: 'Best Seller', category: 'Dairy', description: 'Farm-fresh eggs.', unit: 'pack', stock: 100 },
      { name: 'Fresh Milk (1L)', nameBn: 'দুধ', price: 75, image: '🥛', rating: 4.7, reviews: 53, category: 'Dairy', description: 'Pure pasteurized milk.', unit: 'liter', stock: 60 },
      { name: 'Red Onions', nameBn: 'পেঁয়াজ', price: 45, image: '🧅', rating: 4.4, reviews: 28, category: 'Vegetables', description: 'Premium quality red onions.', unit: 'kg', stock: 80 },
      { name: 'Chicken Breast', nameBn: 'মুরগির মাংস', price: 280, originalPrice: 320, image: '🍗', rating: 4.6, reviews: 45, badge: 'Sale', category: 'Meat', description: 'Fresh boneless chicken.', unit: 'kg', stock: 25 },
      { name: 'Whole Wheat Bread', nameBn: 'পাউরুটি', price: 55, image: '🍞', rating: 4.5, reviews: 31, category: 'Bakery', description: 'Freshly baked bread.', unit: 'pack', stock: 40 },
      { name: 'Premium Mangoes', nameBn: 'আম', price: 150, originalPrice: 200, image: '🥭', rating: 4.8, reviews: 89, badge: 'Sale', category: 'Fruits', description: 'Sweet Himsagar mangoes.', unit: 'kg', stock: 35 },
      { name: 'Fresh Potatoes', nameBn: 'আলু', price: 35, image: '🥔', rating: 4.3, reviews: 56, category: 'Vegetables', description: 'Fresh potatoes for cooking.', unit: 'kg', stock: 100 },
      { name: 'Hilsha Fish', nameBn: 'ইলিশ মাছ', price: 1200, originalPrice: 1500, image: '🐟', rating: 4.9, reviews: 34, badge: 'Premium', category: 'Fish', description: 'Premium Hilsha from Padma.', unit: 'kg', stock: 15 },
      { name: 'Orange Juice', nameBn: 'কমলার জুস', price: 120, image: '🧃', rating: 4.4, reviews: 22, badge: 'New', category: 'Beverages', description: '100% pure orange juice.', unit: 'liter', stock: 50 },
    ];

    await db.collection('items').deleteMany({});
    await db.collection('items').insertMany(sampleItems.map(item => ({
      ...item,
      createdAt: new Date(),
      updatedAt: new Date(),
    })));

    res.json({ message: 'Database seeded with sample data' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
});