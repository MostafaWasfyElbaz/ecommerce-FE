"use server";

import { ChangePassword, Profile } from "@/src/types/Settings";
import { getTokenData } from "@/src/utils/getTokenData";

export async function updateProfile(formData: Profile) {
  const token = await getTokenData();

  if (!token) {
    throw new Error("unauthorized");
  }

  try {
    const res = await fetch(`${process.env.API}/users/updateMe`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        token,
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "Failed to update profile");
    }
    return data.user;
  } catch (error) {
    throw error;
  }
}

export async function changePassword(formData: ChangePassword) {
  const token = await getTokenData();

  if (!token) {
    throw new Error("unauthorized");
  }

  try {
    const res = await fetch(`${process.env.API}/users/changeMyPassword`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        token,
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "Failed to change password");
    }
    return data;
  } catch (error) {
    throw error;
  }
}
