import type { Metadata } from "next";
import CartComp from "@/src/app/_componnents/Cart/CartComp";

export const metadata: Metadata = {
  title: "Shopping Cart",
  description:
    "Review items in your cart, adjust quantities, and proceed to secure checkout on FreshCart.",
};

export default function Cart() {
  return (
    <div>
      <CartComp />
    </div>
  );
}
