import { z } from "zod";
import {
  profileSchema,
  changePasswordSchema,
} from "@/src/Schema/SettingsSchema";

export type Profile = z.infer<typeof profileSchema>;
export type ChangePassword = z.infer<typeof changePasswordSchema>;
