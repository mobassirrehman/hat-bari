// lib/validations.js
import { z } from "zod";

// ── Register ──
export const registerSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(50),
  email: z.string().trim().toLowerCase().email("Invalid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(100),
});

// ── Contact ──
export const contactSchema = z.object({
  name: z.string().trim().min(2, "Name is required").max(100),
  email: z.string().trim().toLowerCase().email("Invalid email address"),
  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters")
    .max(2000),
});

// ── Newsletter ──
export const newsletterSchema = z.object({
  email: z.string().trim().toLowerCase().email("Invalid email address"),
});

// ── Order ──
export const orderSchema = z.object({
  name: z.string().trim().min(2, "Name is required").max(100),
  phone: z
    .string()
    .trim()
    .min(10, "Phone must be at least 10 digits")
    .max(15)
    .regex(/^[0-9+\-\s]+$/, "Invalid phone number"),
  address: z.string().trim().min(5, "Address is required").max(300),
  city: z.string().trim().min(2).max(50),
  note: z.string().trim().max(500).optional().default(""),
  paymentMethod: z.enum(["cod", "bkash", "nagad", "card"]),
  items: z
    .array(
      z.object({
        _id: z.string(),
        name: z.string(),
        price: z.number().positive(),
        quantity: z.number().int().positive(),
        image: z.string().optional(),
      })
    )
    .min(1, "Cart cannot be empty"),
});

// ── Validation helper ──
export function validate(schema, data) {
  const result = schema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data };
  }
  const errors = result.error.flatten().fieldErrors;
  const firstError = Object.values(errors).flat()[0] || "Validation failed";
  return { success: false, errors, message: firstError };
}
