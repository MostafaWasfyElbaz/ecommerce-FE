"use client";

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useQuery } from "@tanstack/react-query";
import { GetCart } from "@/src/api/Actions/cart.actions";
import { useSession } from "next-auth/react";

export default function CartNavButton() {
  const { data: session } = useSession();

  const { data } = useQuery({
    queryKey: ["GetCart"],
    queryFn: GetCart,
    enabled: !!session,
    staleTime: 0,
    gcTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    refetchInterval: 0,
    retry: false,
  });

  return (
    <Link
      href="/cart"
      title="Cart"
      className="group relative rounded-full p-2.5 transition-colors hover:bg-gray-100"
    >
      <FontAwesomeIcon
        icon={faCartShopping}
        className="text-xl text-gray-500 transition-colors group-hover:text-[#16a34a]"
      />

      {Number(data?.numOfCartItems) > 0 && (
        <span className="absolute top-0.5 right-0.5 flex size-4.5 items-center justify-center rounded-full bg-[#16a34a] text-[10px] font-bold text-white ring-2 ring-white">
          {data?.numOfCartItems}
        </span>
      )}
    </Link>
  );
}
