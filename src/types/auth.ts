import { loginSchema } from "@/src/Schema/LoginSchema";
import { registerSchema } from "@/src/Schema/RegisterSchema";
import { z } from "zod";

export type LoginValues = z.infer<typeof loginSchema>;
export type RegisterValues = z.infer<typeof registerSchema>;
