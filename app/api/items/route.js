import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET(request) {
  try {
    const client = await clientPromise;
    const db = client.db("hatbari");

    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    const limit = parseInt(searchParams.get("limit") || "20");

    let query = {};

    if (category && category !== "all") {
      query.category = { $regex: new RegExp(`^${category}$`, "i") };
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { nameBn: { $regex: search, $options: "i" } },
      ];
    }

    const items = await db
      .collection("items")
      .find(query)
      .limit(limit)
      .toArray();

    return NextResponse.json({ items, total: items.length });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
