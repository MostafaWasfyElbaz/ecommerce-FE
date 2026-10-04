"use server";

import { RegisterValues } from "@/src/types/auth";

export async function register(data: RegisterValues) {
  try {
    const res = await fetch(`${process.env.API}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const json = await res.json();

    if (!res.ok) {
      throw new Error("Failed to create account");
    }

    return json;
  } catch (error) {
    throw error;
  }
}

export async function forgotPasswordAction(email: string) {
  try {
    const res = await fetch(`${process.env.API}/auth/forgotPasswords`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "Failed to send reset code");
    }
    return data;
  } catch (error) {
    throw error;
  }
}

export async function verifyResetCodeAction(resetCode: string) {
  try {
    const res = await fetch(`${process.env.API}/auth/verifyResetCode`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ resetCode }),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "Invalid or expired reset code");
    }
    return data;
  } catch (error) {
    throw error;
  }
}

export async function resetPasswordAction(email: string, newPassword: string) {
  try {
    const res = await fetch(`${process.env.API}/auth/resetPassword`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, newPassword }),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "Failed to reset password");
    }
    return data;
  } catch (error) {
    throw error;
  }
}
