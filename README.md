# 🛒 HatBari — হাটবাড়ি

A full-stack Bengali grocery e-commerce platform with real-time search, cart management, order processing, and secure authentication.

**🔗 Live:** [https://hat-bari.vercel.app](https://hat-bari.vercel.app)

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router, Turbopack) |
| Frontend | React 19, Tailwind CSS, Framer Motion |
| State Management | Zustand (cart persistence) |
| Data Fetching | TanStack React Query |
| Authentication | NextAuth.js v5 (Google OAuth + Credentials) |
| Database | MongoDB Atlas |
| Validation | Zod (server-side schema validation) |
| Notifications | Sonner (toast system) |
| Icons | Lucide React |
| Deployment | Vercel |

---

## Features

### 🛍️ Shopping Experience
- Browse products with category filtering and real-time search
- Instant search dropdown with debounced API calls
- Product detail pages with add-to-cart
- Dynamic "Deals of the Day" with countdown timer
- Featured products section pulled from API
- Persistent cart with Zustand (survives page refresh)
- Free delivery on orders over ৳500

### 🔐 Authentication & Security
- Google OAuth and email/password login via NextAuth v5
- Server-side route protection with middleware
- Zod validation on all API endpoints
- Regex injection (ReDoS) prevention
- Role-based access (customer/admin)
- Bcrypt password hashing

### 📦 Order System
- Real checkout flow with delivery info and payment method selection
- Orders saved to MongoDB with server-side total calculation
- Cryptographically random order IDs
- Order history on profile page
- Order confirmation page with status timeline
- Payment options: Cash on Delivery, bKash, Nagad, Card

### 📱 UI/UX
- Fully responsive (mobile-first design)
- Bilingual support (English + Bengali)
- Smooth page transitions with Framer Motion
- Skeleton loading states
- Toast notifications for all user actions
- Mobile cart drawer + hamburger menu
- Sticky navbar with cart badge counter

### 📧 Engagement
- Newsletter subscription with duplicate checking
- Contact form with server-side validation
- SEO metadata on all pages

---

## Pages & Routes

| Route | Description | Auth |
|-------|-------------|------|
| `/` | Landing page (Hero, Categories, Featured, Deals, Newsletter, Footer) | Public |
| `/shop` | Product listing with filters and search | Public |
| `/shop/[id]` | Product detail page | Public |
| `/cart` | Shopping cart with quantity controls | Public |
| `/checkout` | Delivery info + payment selection | Public* |
| `/order-confirmation` | Order success with timeline | Public |
| `/about` | About HatBari | Public |
| `/contact` | Contact form | Public |
| `/login` | Email/password + Google login | Guest |
| `/register` | New account registration | Guest |
| `/profile` | Order history + account settings | Protected |
| `/add-item` | Add new products (admin) | Protected |

*Checkout requires login to place an order.

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/items` | List products (supports `?search=`, `?category=`, `?limit=`) |
| `GET` | `/api/items/[id]` | Single product detail |
| `GET` | `/api/categories` | List all categories |
| `POST` | `/api/auth/register` | Register new user |
| `POST` | `/api/orders` | Create order (auth required) |
| `GET` | `/api/orders` | Get user's orders (auth required) |
| `POST` | `/api/newsletter` | Subscribe to newsletter |
| `POST` | `/api/contact` | Submit contact form |

---

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB Atlas account
- Google OAuth credentials (optional, for Google login)

### Installation

```bash
git clone https://github.com/yourusername/hat-bari.git
cd hat-bari
npm install
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Setup Database Indexes (one-time)

```bash
node scripts/setup-indexes.mjs
```
---

## License

This project is built for learning and portfolio purposes.