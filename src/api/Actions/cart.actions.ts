"use server";

import { getTokenData } from "@/src/utils/getTokenData";
import { CartResponse } from "@/src/types/Cart";

export async function addToCart(productId: string) {
  const token = await getTokenData();

  if (!token) {
    throw new Error("unauthorized");
  }

  try {
    const res = await fetch(`${process.env.API}/cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token,
      },
      body: JSON.stringify({ productId }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Error in Cart");
    }

    return data;
  } catch (error) {
    throw error;
  }
}

export async function GetCart(): Promise<CartResponse | null> {
  const token = await getTokenData();

  if (!token) {
    return null;
  }

  try {
    const res = await fetch(`${process.env.APIV2}/cart`, {
      headers: {
        "Content-Type": "application/json",
        token,
      },
    });

    const data = await res.json();
    if (!res.ok) {
      return null;
    }
    return data;
  } catch {
    return null;
  }
}

export async function deleteCartItem(productId: string) {
  const token = await getTokenData();

  if (!token) {
    throw new Error("unauthorized");
  }

  try {
    const res = await fetch(`${process.env.API}/cart/${productId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        token,
      },
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "Error in Cart");
    }

    return data;
  } catch (error) {
    throw error;
  }
}

export async function deleteCart() {
  const token = await getTokenData();

  if (!token) {
    throw new Error("unauthorized");
  }

  try {
    const res = await fetch(`${process.env.API}/cart`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        token,
      },
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "Error in Cart");
    }

    return data;
  } catch (error) {
    throw error;
  }
}

export async function updateCartQuantity(productId: string, count: number) {
  const token = await getTokenData();

  if (!token) {
    throw new Error("unauthorized");
  }

  try {
    const res = await fetch(`${process.env.APIV2}/cart/${productId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        token,
      },
      body: JSON.stringify({ count }),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "Error in Cart");
    }

    return data;
  } catch (error) {
    throw error;
  }
}
