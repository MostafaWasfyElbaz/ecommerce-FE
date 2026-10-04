"use client";

import { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleUser,
  faUser,
  faHeart,
} from "@fortawesome/free-regular-svg-icons";
import {
  faAddressBook,
  faBoxOpen,
  faGear,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { signOut, useSession } from "next-auth/react";

export default function ProfileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const session = useSession();
  return (
    <div className="relative hidden lg:block">
      <button
        type="button"
        aria-label="Profile"
        onClick={() => setIsOpen((prev) => !prev)}
        className="group relative cursor-pointer rounded-full p-2.5 transition-colors hover:bg-gray-100"
      >
        <FontAwesomeIcon
          icon={faCircleUser}
          className="text-xl text-gray-500 transition-colors group-hover:text-[#16a34a]"
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full z-50 mt-2 w-64 origin-top-right rounded-2xl border border-gray-100 bg-white shadow-xl">
          <div className="border-b border-gray-100 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#dcfce7]">
                <FontAwesomeIcon
                  icon={faCircleUser}
                  className="text-xl text-[#16a34a]"
                />
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-gray-800">
                  {session?.data?.user.name}
                </p>
              </div>
            </div>
          </div>

          <div className="py-2">
            <Link
              href="/profile"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 transition-colors hover:bg-[#f0fdf4] hover:text-[#16a34a]"
            >
              <FontAwesomeIcon icon={faUser} className="w-4 text-gray-400" />
              My Profile
            </Link>

            <Link
              href="/orders"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 transition-colors hover:bg-[#f0fdf4] hover:text-[#16a34a]"
            >
              <FontAwesomeIcon icon={faBoxOpen} className="w-4 text-gray-400" />
              My Orders
            </Link>

            <Link
              href="/wishlist"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 transition-colors hover:bg-[#f0fdf4] hover:text-[#16a34a]"
            >
              <FontAwesomeIcon icon={faHeart} className="w-4 text-gray-400" />
              My Wishlist
            </Link>

            <Link
              href="/profile/addresses"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 transition-colors hover:bg-[#f0fdf4] hover:text-[#16a34a]"
            >
              <FontAwesomeIcon
                icon={faAddressBook}
                className="w-4 text-gray-400"
              />
              Addresses
            </Link>

            <Link
              href="/profile/settings"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 transition-colors hover:bg-[#f0fdf4] hover:text-[#16a34a]"
            >
              <FontAwesomeIcon icon={faGear} className="w-4 text-gray-400" />
              Settings
            </Link>
          </div>

          <div className="border-t border-gray-100 py-2">
            <button
              type="button"
              className="flex w-full cursor-pointer items-center gap-3 px-4 py-2.5 text-left text-sm text-red-500 transition-colors hover:bg-red-50"
              onClick={() => signOut({ callbackUrl: "/login" })}
            >
              <FontAwesomeIcon icon={faRightFromBracket} className="w-4" />
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
