"use server";

import { Checkout } from "@/src/types/Checkout";
import { getTokenData } from "@/src/utils/getTokenData";
import { Order } from "@/src/types/Order";
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/next-auth/authOptions";

export async function createCashOrder(
  cartId: string,
  shippingAddress: Checkout,
) {
  const token = await getTokenData();

  if (!token) {
    throw new Error("Unauthorized. Please log in to complete your order.");
  }

  try {
    const res = await fetch(`${process.env.APIV2}/orders/${cartId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token,
      },
      body: JSON.stringify({
        shippingAddress: {
          details: shippingAddress.details,
          phone: shippingAddress.phone,
          city: shippingAddress.city,
          postalCode: shippingAddress.postalCode,
        },
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to place order.");
    }

    return data;
  } catch (error) {
    throw error;
  }
}

export async function createOnlineOrder(
  cartId: string,
  shippingAddress: Checkout,
) {
  const token = await getTokenData();

  if (!token) {
    throw new Error("Unauthorized. Please log in to complete your order.");
  }

  try {
    const res = await fetch(
      `${process.env.API}/orders/checkout-session/${cartId}?url=${process.env.NEXTAUTH_URL}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token,
        },
        body: JSON.stringify({
          shippingAddress: {
            details: shippingAddress.details,
            phone: shippingAddress.phone,
            city: shippingAddress.city,
          },
        }),
      },
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to place order.");
    }

    return data;
  } catch (error) {
    throw error;
  }
}

export async function getAllOrders(): Promise<Order[]> {
  const token = await getTokenData();

  if (!token) {
    throw new Error("Unauthorized. Please log in to view your orders.");
  }

  const session = await getServerSession(authOptions);

  try {
    const res = await fetch(
      `${process.env.API}/orders/user/${session?.user.id}`,
      {
        headers: {
          "Content-Type": "application/json",
          token,
        },
        cache: "no-store",
      },
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to get orders.");
    }

    return data;
  } catch (error) {
    throw error;
  }
}
