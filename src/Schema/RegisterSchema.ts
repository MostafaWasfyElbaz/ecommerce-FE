import { z } from "zod";

export const registerSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(3, "Name must be at least 3 characters")
      .max(15, "Name must be less than 15 characters"),
    email: z
      .string()
      .trim()
      .email("Enter a valid email address")
      .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Enter a valid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      ),
    rePassword: z
      .string()
      .min(8, "Confirm Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Confirm Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      ),
    phone: z
      .string()
      .trim()
      .min(1, "Phone number is required")
      .regex(
        /^(?:01[0125][0-9]{8}|\+201[0125][0-9]{8})$/,
        "Enter a valid Egyptian phone number",
      ),
    terms: z.boolean().refine((value) => value === true, {
      message: "You must accept the terms",
    }),
  })
  .refine((values) => values.password === values.rePassword, {
    path: ["rePassword"],
    message: "Passwords do not match",
  });
