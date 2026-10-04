"use server";

import { getTokenData } from "@/src/utils/getTokenData";
import { Product } from "@/src/types/Product";

export async function getWishlist(): Promise<Product[]> {
  const token = await getTokenData();

  if (!token) {
    return [];
  }

  try {
    const res = await fetch(`${process.env.API}/wishlist`, {
      headers: {
        "Content-Type": "application/json",
        token,
      },
    });

    const data = await res.json();
    if (!res.ok) {
      return [];
    }

    return data.data || [];
  } catch {
    return [];
  }
}

export async function addToWishlist(productId: string) {
  const token = await getTokenData();

  if (!token) {
    throw new Error("unauthorized");
  }

  try {
    const res = await fetch(`${process.env.API}/wishlist`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token,
      },
      body: JSON.stringify({ productId }),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "Failed to add to wishlist");
    }

    return data;
  } catch (error) {
    throw error;
  }
}

export async function removeFromWishlist(productId: string) {
  const token = await getTokenData();

  if (!token) {
    throw new Error("unauthorized");
  }

  try {
    const res = await fetch(`${process.env.API}/wishlist/${productId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        token,
      },
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "Failed to remove from wishlist");
    }

    return data;
  } catch (error) {
    throw error;
  }
}
