import { z } from "zod";

export const profileSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Name must be at least 3 characters")
    .max(15, "Name must be less than 15 characters")
    .optional(),
  email: z
    .string()
    .trim()
    .email("Enter a valid email address")
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Enter a valid email address")
    .optional(),
  phone: z
    .string()
    .trim()
    .optional()
    .refine(
      (val) => !val || /^(?:01[0125][0-9]{8}|\+201[0125][0-9]{8})$/.test(val),
      "Enter a valid Egyptian phone number",
    ),
});

export const changePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(8, "Password must be at least 8 characters long"),
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
  })
  .refine((values) => values.password === values.rePassword, {
    path: ["rePassword"],
    message: "Passwords do not match",
  });
