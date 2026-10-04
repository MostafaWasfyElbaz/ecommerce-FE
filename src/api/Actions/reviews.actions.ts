"use server";

import { Review, ReviewFormData } from "@/src/types/Review";
import { getTokenData } from "@/src/utils/getTokenData";

export async function getReview(productId: string) {
  try {
    const token = await getTokenData();
    if (!token) {
      throw new Error("Unauthorized");
    }

    const res = await fetch(`${process.env.API}/reviews/${productId}`, {
      headers: {
        "Content-Type": "application/json",
        token,
      },
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "Failed to get review");
    }
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getAllReviews(productId: string): Promise<Review[]> {
  try {
    const res = await fetch(
      `${process.env.API}/products/${productId}/reviews`,
      {
        cache: "no-store",
      },
    );

    if (!res.ok) {
      return [];
    }

    const data = await res.json();
    return data.data || [];
  } catch {
    return [];
  }
}

export async function addReview(data: ReviewFormData, productId: string) {
  try {
    const token = await getTokenData();
    if (!token) {
      throw new Error("You must be logged in to submit a review");
    }

    const res = await fetch(
      `${process.env.API}/products/${productId}/reviews`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token,
        },
        body: JSON.stringify(data),
      },
    );

    const result = await res.json();
    if (!res.ok) {
      throw new Error(result.message || "Failed to add review");
    }

    return result;
  } catch (error) {
    throw error;
  }
}

export async function updateReview(data: ReviewFormData, reviewId: string) {
  try {
    const token = await getTokenData();
    if (!token) {
      throw new Error("You must be logged in to update a review");
    }

    const res = await fetch(`${process.env.API}/reviews/${reviewId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        token,
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    if (!res.ok) {
      throw new Error(result.message || "Failed to update review");
    }

    return result;
  } catch (error) {
    throw error;
  }
}

export async function deleteReview(reviewId: string) {
  try {
    const token = await getTokenData();
    if (!token) {
      throw new Error("You must be logged in to delete a review");
    }

    const res = await fetch(`${process.env.API}/reviews/${reviewId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        token,
      },
    });

    if (!res.ok) {
      const result = res.status !== 204 ? await res.json() : null;
      throw new Error(result.message || "Failed to delete review");
    }

    return { message: "success" };
  } catch (error) {
    throw error;
  }
}
