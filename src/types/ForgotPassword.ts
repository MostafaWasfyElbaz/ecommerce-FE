import z from "zod";
import {
  codeSchema,
  emailSchema,
  passwordSchema,
} from "@/src/Schema/ForgotPassword";

export type EmailFormValues = z.infer<typeof emailSchema>;
export type CodeFormValues = z.infer<typeof codeSchema>;
export type PasswordFormValues = z.infer<typeof passwordSchema>;
