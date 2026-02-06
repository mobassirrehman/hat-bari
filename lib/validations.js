import { z } from "zod";

export const registerSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name too long"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(100, "Password too long"),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export const itemSchema = z.object({
  name: z.string().min(1).max(100),
  nameBn: z.string().optional(),
  price: z.number().positive(),
  originalPrice: z.number().positive().optional(),
  category: z.string().min(1),
  image: z.string().optional(),
  description: z.string().optional(),
  unit: z.string().optional(),
  rating: z.number().min(0).max(5).optional(),
  badge: z.string().optional(),
});

export const contactSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  email: z.string().email("Invalid email"),
  message: z.string().min(10, "Message too short").max(2000),
});

export const orderSchema = z.object({
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
    .min(1, "Cart is empty"),
  deliveryInfo: z.object({
    name: z.string().min(1),
    phone: z.string().min(10),
    address: z.string().min(5),
    city: z.string().min(1),
  }),
  paymentMethod: z.enum(["cod", "bkash", "nagad", "card"]),
});

// Helper to safely validate and return errors
export function validate(schema, data) {
  const result = schema.safeParse(data);
  if (!result.success) {
    const errors = result.error.flatten().fieldErrors;
    return { success: false, errors };
  }
  return { success: true, data: result.data };
}
