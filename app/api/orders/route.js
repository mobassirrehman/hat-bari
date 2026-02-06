import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getDb } from "@/lib/db";
import { orderSchema, validate } from "@/lib/validations";
import { ObjectId } from "mongodb";

// POST - Create a new order
export async function POST(request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const validation = validate(orderSchema, body);
    if (!validation.success) {
      return NextResponse.json({ error: validation.message }, { status: 400 });
    }

    const { name, phone, address, city, note, paymentMethod, items } =
      validation.data;

    // Calculate totals server-side (never trust client)
    const subtotal = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const deliveryFee = subtotal >= 500 ? 0 : 50;
    const total = subtotal + deliveryFee;

    // Generate order ID: HB + 8 random hex chars
    const orderId =
      "HB" +
      Array.from(crypto.getRandomValues(new Uint8Array(4)))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("")
        .toUpperCase();

    const order = {
      orderId,
      userId: new ObjectId(session.user.id),
      userEmail: session.user.email,
      customer: { name, phone, address, city, note },
      items: items.map((item) => ({
        _id: item._id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image || "",
      })),
      paymentMethod,
      subtotal,
      deliveryFee,
      total,
      status: "confirmed",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const db = await getDb();
    await db.collection("orders").insertOne(order);

    return NextResponse.json(
      { orderId: order.orderId, message: "Order placed successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Order creation error:", error);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}

// GET - Get current user's orders
export async function GET() {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const db = await getDb();
    const orders = await db
      .collection("orders")
      .find({ userId: new ObjectId(session.user.id) })
      .sort({ createdAt: -1 })
      .limit(20)
      .toArray();

    return NextResponse.json({ orders });
  } catch (error) {
    console.error("Orders fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}