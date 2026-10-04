import type { Metadata } from "next";
import CheckoutComp from "@/src/app/_componnents/Checkout/CheckoutComp";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Complete your order securely on FreshCart.",
};

export default async function Checkout() {
  return <CheckoutComp />;
}
