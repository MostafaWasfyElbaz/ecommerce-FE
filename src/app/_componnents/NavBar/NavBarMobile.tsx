"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faBars,
  faXmark,
  faMagnifyingGlass,
  faHeadset,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart, faUser } from "@fortawesome/free-regular-svg-icons";
import { GetCart } from "@/src/api/Actions/cart.actions";
import { getWishlist } from "@/src/api/Actions/wishlist.actions";
import logo from "@/src/assets/images/freshcart-logo.svg";

export default function NavBarMobile() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const session = useSession();

  const { data: cartData } = useQuery({
    queryKey: ["GetCart"],
    queryFn: GetCart,
    enabled: !!session.data,
    staleTime: 0,
    gcTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    refetchInterval: 0,
    retry: false,
  });

  const { data: wishlistData } = useQuery({
    queryKey: ["GetWishlist"],
    queryFn: getWishlist,
    enabled: !!session.data,
    staleTime: 0,
    gcTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    refetchInterval: 0,
    retry: false,
  });

  const cartCount = Number(cartData?.numOfCartItems) || 0;
  const wishlistCount = Number(wishlistData?.length) || 0;
  const user = session.data?.user;

  const [mobileSearchTerm, setMobileSearchTerm] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (mobileSearchTerm.trim()) {
      router.push(`/search?q=${encodeURIComponent(mobileSearchTerm.trim())}`);
    } else {
      router.push("/search");
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <div className="flex h-14 items-center justify-between px-4 sm:px-6 lg:hidden">
        <Link href="/" className="shrink-0">
          <Image
            src={logo}
            alt="FreshCart"
            width={160}
            height={31}
            className="block h-6 w-auto sm:h-7 sm:w-auto"
          />
        </Link>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <Link
            href="/wishlist"
            aria-label="Wishlist"
            className="relative flex h-9 w-9 items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-gray-100 hover:text-red-500"
          >
            <FontAwesomeIcon icon={faHeart} className="h-5 w-5" />
            {wishlistCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex size-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white ring-1.5 ring-white">
                {wishlistCount}
              </span>
            )}
          </Link>

          <Link
            href="/cart"
            aria-label="Cart"
            className="relative flex h-9 w-9 items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-gray-100 hover:text-green-600"
          >
            <FontAwesomeIcon icon={faCartShopping} className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex size-4 items-center justify-center rounded-full bg-green-600 text-[9px] font-bold text-white ring-1.5 ring-white">
                {cartCount}
              </span>
            )}
          </Link>

          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setIsMobileMenuOpen(true)}
            className="cursor-pointer ml-1 flex h-9 w-9 items-center justify-center rounded-full bg-green-600 text-white transition-colors hover:bg-green-700"
          >
            <FontAwesomeIcon icon={faBars} className="h-4 w-4" />
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div
          onClick={() => setIsMobileMenuOpen(false)}
          className="fixed inset-0 bg-black/50 z-50 lg:hidden transition-opacity duration-300 opacity-100"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl transition-transform duration-300 overflow-y-auto translate-x-0"
          >
            <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-gray-50/50">
              <Image
                src={logo}
                alt="FreshCart"
                width={160}
                height={31}
                className="h-8 w-auto"
              />
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setIsMobileMenuOpen(false)}
                className="cursor-pointer w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
              >
                <FontAwesomeIcon icon={faXmark} className="text-gray-600" />
              </button>
            </div>

            <form
              onSubmit={handleSearch}
              className="p-4 border-b border-gray-100"
            >
              <div className="relative">
                <input
                  type="text"
                  value={mobileSearchTerm}
                  onChange={(e) => setMobileSearchTerm(e.target.value)}
                  placeholder="Search products..."
                  className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 text-sm text-black placeholder:text-[#979ea6]"
                />
                <button
                  type="submit"
                  aria-label="Search"
                  className="cursor-pointer absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-green-600 hover:bg-green-700 text-white flex items-center justify-center transition-colors"
                >
                  <FontAwesomeIcon
                    icon={faMagnifyingGlass}
                    className="text-sm"
                  />
                </button>
              </div>
            </form>

            <nav className="p-4">
              <div className="space-y-1">
                <Link
                  className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-gray-700 hover:text-green-600 hover:bg-green-50 transition-colors"
                  href="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-gray-700 hover:text-green-600 hover:bg-green-50 transition-colors"
                  href="/products"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Shop
                </Link>
                <Link
                  className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-gray-700 hover:text-green-600 hover:bg-green-50 transition-colors"
                  href="/categories"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Categories
                </Link>
                <Link
                  className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-gray-700 hover:text-green-600 hover:bg-green-50 transition-colors"
                  href="/brands"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Brands
                </Link>
              </div>
            </nav>

            <div className="mx-4 border-t border-gray-100"></div>

            <div className="p-4 space-y-1">
              <Link
                className="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-green-50 transition-colors"
                href="/wishlist"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-red-50 flex items-center justify-center">
                    <FontAwesomeIcon icon={faHeart} className="text-red-500" />
                  </div>
                  <span className="font-medium text-gray-700">Wishlist</span>
                </div>
                {wishlistCount > 0 && (
                  <span className="px-2 py-0.5 text-xs font-semibold bg-red-100 text-red-600 rounded-full">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              <Link
                className="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-green-50 transition-colors"
                href="/cart"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-green-50 flex items-center justify-center">
                    <FontAwesomeIcon
                      icon={faCartShopping}
                      className="text-green-600"
                    />
                  </div>
                  <span className="font-medium text-gray-700">Cart</span>
                </div>
                {cartCount > 0 && (
                  <span className="px-2 py-0.5 text-xs font-semibold bg-green-100 text-green-700 rounded-full">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>

            <div className="mx-4 border-t border-gray-100"></div>

            <div className="p-4 space-y-1">
              {session.status === "authenticated" && user ? (
                <>
                  <Link
                    className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-green-50 transition-colors"
                    href="/profile"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center">
                      <FontAwesomeIcon
                        icon={faUser}
                        className="text-gray-500"
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-700">
                        {user.name || "My Profile"}
                      </span>
                      {user.role === "admin" && (
                        <span className="text-[10px] font-semibold text-green-600 uppercase tracking-wide">
                          Admin
                        </span>
                      )}
                    </div>
                  </Link>

                  <button
                    type="button"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      signOut({ callbackUrl: "/" });
                    }}
                    className="cursor-pointer flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 transition-colors w-full text-left"
                  >
                    <div className="w-9 h-9 rounded-full bg-red-50 flex items-center justify-center">
                      <FontAwesomeIcon
                        icon={faRightFromBracket}
                        className="text-red-500"
                      />
                    </div>
                    <span className="font-medium text-red-600">Sign Out</span>
                  </button>
                </>
              ) : (
                <Link
                  className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-green-50 transition-colors"
                  href="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center">
                    <FontAwesomeIcon icon={faUser} className="text-gray-500" />
                  </div>
                  <span className="font-medium text-gray-700">Sign In</span>
                </Link>
              )}
            </div>

            <Link
              className="mx-4 mt-2 mb-6 p-4 rounded-xl bg-gray-50 border border-gray-100 flex items-center gap-3 hover:bg-green-50 transition-colors"
              href="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <FontAwesomeIcon icon={faHeadset} className="text-green-600" />
              </div>
              <div>
                <div className="text-sm font-semibold text-gray-700">
                  Need Help?
                </div>
                <div className="text-sm text-green-600 font-medium">
                  Contact Support
                </div>
              </div>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
