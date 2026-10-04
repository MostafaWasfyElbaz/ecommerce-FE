import { checkoutSchema } from "@/src/Schema/CheckoutSchema";
import z from "zod";

export type Checkout = z.infer<typeof checkoutSchema>;
