import type { Metadata } from "next";
import WishlistComp from "@/src/app/_componnents/Wishlist/WishlistComp";

export const metadata: Metadata = {
  title: "My Wishlist",
  description: "View and manage your saved wishlist items on FreshCart.",
};

export default function WishlistPage() {
  return <WishlistComp />;
}
