// app/api/auth/register/route.js
import { getDb } from "@/lib/db";
import bcrypt from "bcryptjs";
import { registerSchema, validate } from "@/lib/validations";

export async function POST(req) {
  try {
    const body = await req.json();

    // Validate input with Zod
    const { success, data, errors } = validate(registerSchema, body);
    if (!success) {
      return Response.json(
        { error: "Validation failed", errors },
        { status: 400 }
      );
    }

    const db = await getDb();

    // Check if email already exists
    const existingUser = await db
      .collection("users")
      .findOne({ email: data.email });

    if (existingUser) {
      return Response.json(
        { error: "Email already registered" },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(data.password, 12);

    const newUser = {
      name: data.name,
      email: data.email,
      password: hashedPassword,
      role: "customer",
      provider: "credentials",
      createdAt: new Date(),
    };

    await db.collection("users").insertOne(newUser);

    return Response.json(
      { message: "Registration successful" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
