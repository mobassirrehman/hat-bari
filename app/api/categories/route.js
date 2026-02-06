import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("hatbari"); // Explicitly using your DB name

    // 1. Get all categories
    const categories = await db
      .collection("categories")
      .find({})
      .sort({ order: 1 })
      .toArray();

    // 2. Get product counts for each category
    const counts = await db
      .collection("items")
      .aggregate([{ $group: { _id: "$category", count: { $sum: 1 } } }])
      .toArray();

    // 3. Combine them
    const result = categories.map((cat) => {
      const found = counts.find((c) => c._id === cat.name);
      return { ...cat, count: found ? found.count : 0 };
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}
