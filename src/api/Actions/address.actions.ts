"use server";

import { getTokenData } from "@/src/utils/getTokenData";
import { Address } from "@/src/types/Address";

export async function getAddresses(): Promise<Address[]> {
  const token = await getTokenData();

  if (!token) {
    throw new Error("unauthorized");
  }

  try {
    const res = await fetch(`${process.env.API}/addresses`, {
      headers: {
        "Content-Type": "application/json",
        token,
      },
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Error in Addresses");
    }

    return data.data;
  } catch (error) {
    throw error;
  }
}

export async function addAddress(address: Address): Promise<Address> {
  const token = await getTokenData();

  if (!token) {
    throw new Error("unauthorized");
  }

  try {
    const res = await fetch(`${process.env.API}/addresses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token,
      },
      body: JSON.stringify({
        name: address.name,
        phone: address.phone,
        city: address.city,
        details: address.details,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Error in Adding Address");
    }

    return data.data;
  } catch (error) {
    throw error;
  }
}

export async function deleteAddress(id: string) {
  const token = await getTokenData();

  if (!token) {
    throw new Error("unauthorized");
  }

  try {
    const res = await fetch(`${process.env.API}/addresses/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        token,
      },
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Error in Deleting Address");
    }

    return data.data;
  } catch (error) {
    throw error;
  }
}

export async function getSpecificAddress(id: string) {
  const token = await getTokenData();

  if (!token) {
    throw new Error("unauthorized");
  }

  try {
    const res = await fetch(`${process.env.API}/addresses/${id}`, {
      headers: {
        "Content-Type": "application/json",
        token,
      },
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Error in Getting Address");
    }

    return data.data;
  } catch (error) {
    throw error;
  }
}

export async function updateAddress(
  id: string,
  address: Address,
): Promise<Address> {
  const token = await getTokenData();

  if (!token) {
    throw new Error("unauthorized");
  }
  await deleteAddress(id);
  return await addAddress(address);
}
