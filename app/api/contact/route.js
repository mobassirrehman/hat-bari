import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { contactSchema, validate } from "@/lib/validations";

export async function POST(request) {
  try {
    const body = await request.json();
    const validation = validate(contactSchema, body);
    if (!validation.success) {
      return NextResponse.json({ error: validation.message }, { status: 400 });
    }

    const { name, email, message } = validation.data;
    const db = await getDb();

    await db.collection("contacts").insertOne({
      name,
      email,
      message,
      read: false,
      createdAt: new Date(),
    });

    return NextResponse.json(
      { message: "Message sent successfully!" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}
