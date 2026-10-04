import type { Metadata } from "next";
import AddressesClient from "@/src/app/_componnents/Addresses/AddressesClient";

export const metadata: Metadata = {
  title: "Addresses - My Account",
  description: "Manage your delivery and billing addresses on FreshCart.",
};

export default function AddressesPage() {
  return <AddressesClient />;
}
