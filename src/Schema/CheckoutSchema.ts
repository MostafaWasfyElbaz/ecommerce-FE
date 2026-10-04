import { z } from "zod";

export const checkoutSchema = z.object({
  name: z.string().trim().min(3, "Name must be at least 3 characters"),
  city: z.string().trim().min(3, "city must be at least 3 characters"),
  postalCode: z
    .string()
    .trim()
    .min(1, "Postal code is required")
    .regex(/^\d{5}$/, "Postal code must be 5 digits"),
  details: z.string().trim().min(10, "details must be at least 10 characters"),
  phone: z
    .string()
    .trim()
    .min(1, "Phone number is required")
    .regex(
      /^(?:01[0125][0-9]{8}|\+201[0125][0-9]{8})$/,
      "Enter a valid Egyptian phone number",
    ),
});
