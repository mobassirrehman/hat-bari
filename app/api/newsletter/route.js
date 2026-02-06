import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { newsletterSchema, validate } from "@/lib/validations";

export async function POST(request) {
  try {
    const body = await request.json();
    const validation = validate(newsletterSchema, body);
    if (!validation.success) {
      return NextResponse.json({ error: validation.message }, { status: 400 });
    }

    const { email } = validation.data;
    const db = await getDb();

    // Check if already subscribed
    const existing = await db.collection("newsletter").findOne({ email });
    if (existing) {
      return NextResponse.json(
        { message: "You're already subscribed!" },
        { status: 200 }
      );
    }

    await db.collection("newsletter").insertOne({
      email,
      subscribedAt: new Date(),
    });

    return NextResponse.json(
      { message: "Successfully subscribed!" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Newsletter error:", error);
    return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
  }
}
