"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faCheck,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { addToCart } from "@/src/api/Actions/cart.actions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { PulseLoader } from "react-spinners";

export default function AddToCartButton({
  productId,
  variant = "large",
}: {
  productId: string;
  variant?: "large" | "small";
}) {
  const [isAdded, setIsAdded] = useState(false);
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();

  async function handleAddToCart() {
    if (loading) return;

    setLoading(true);
    mutate(productId);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }

  const { mutate } = useMutation({
    mutationFn: addToCart,
    onSuccess: () => {
      toast.success("Added to cart");
      setIsAdded(true);
      setTimeout(() => {
        setIsAdded(false);
      }, 2000);
      queryClient.invalidateQueries({ queryKey: ["GetCart"] });
    },
    onError: () => {
      toast.error("Failed to add to cart");
    },
  });

  if (variant === "small") {
    return (
      <button
        type="button"
        onClick={handleAddToCart}
        className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-white transition ${
          isAdded ? "bg-green-500" : "bg-[#16a34a] hover:bg-[#15803d]"
        }`}
      >
        {loading ? (
          <PulseLoader color="#ffffff" size={6} loading={true} />
        ) : (
          <FontAwesomeIcon icon={isAdded ? faCheck : faPlus} />
        )}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleAddToCart}
      className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#16a34a] px-6 py-3.5 font-medium text-white shadow-lg shadow-[#16a34a]/25 transition-all hover:bg-[#15803d] active:scale-[0.98]"
    >
      <FontAwesomeIcon icon={isAdded ? faCheck : faCartShopping} />

      {isAdded ? "Added to Cart" : "Add to Cart"}
    </button>
  );
}
