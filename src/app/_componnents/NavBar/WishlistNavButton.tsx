"use client";

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { useQuery } from "@tanstack/react-query";
import { getWishlist } from "@/src/api/Actions/wishlist.actions";
import { useSession } from "next-auth/react";

export default function WishlistNavButton() {
  const { data: session } = useSession();

  const { data } = useQuery({
    queryKey: ["GetWishlist"],
    queryFn: getWishlist,
    enabled: !!session,
    staleTime: 0,
    gcTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    refetchInterval: 0,
    retry: false,
  });

  const count = data?.length ?? 0;

  return (
    <Link
      href="/wishlist"
      title="Wishlist"
      className="group relative rounded-full p-2.5 transition-colors hover:bg-gray-100"
    >
      <FontAwesomeIcon
        icon={faHeartRegular}
        className={`text-xl transition-colors ${
          count > 0
            ? "text-red-500 group-hover:text-red-600"
            : "text-gray-500 group-hover:text-red-500"
        }`}
      />

      {Number(count) > 0 && (
        <span className="absolute top-0.5 right-0.5 flex size-4.5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white ring-2 ring-white">
          {count}
        </span>
      )}
    </Link>
  );
}
