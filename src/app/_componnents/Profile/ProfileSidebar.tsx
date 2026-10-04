"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faGear,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import ProfileSidebarSkeleton from "./ProfileSidebarSkeleton";

export default function ProfileSidebar({
  isLoading = false,
}: {
  isLoading?: boolean;
}) {
  const pathname = usePathname();

  if (isLoading) {
    return <ProfileSidebarSkeleton />;
  }

  const isAddressesActive = pathname === "/profile/addresses";
  const isSettingsActive = pathname === "/profile/settings";

  return (
    <aside className="w-full lg:w-72 shrink-0">
      <nav className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <h2 className="font-bold text-gray-900">My Account</h2>
        </div>
        <ul className="p-2 space-y-1">
          <li>
            <Link
              href="/profile/addresses"
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                isAddressesActive
                  ? "bg-[#f0fdf4] text-[#15803d]"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <div
                className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
                  isAddressesActive
                    ? "bg-[#16a34a] text-white"
                    : "bg-gray-100 text-gray-500 group-hover:bg-gray-200"
                }`}
              >
                <FontAwesomeIcon icon={faLocationDot} className="text-sm" />
              </div>
              <span className="font-medium flex-1">My Addresses</span>
              <FontAwesomeIcon
                icon={faChevronRight}
                className={`text-xs transition-transform ${
                  isAddressesActive ? "text-[#16a34a]" : "text-gray-400"
                }`}
              />
            </Link>
          </li>
          <li>
            <Link
              href="/profile/settings"
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                isSettingsActive
                  ? "bg-[#f0fdf4] text-[#15803d]"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <div
                className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
                  isSettingsActive
                    ? "bg-[#16a34a] text-white"
                    : "bg-gray-100 text-gray-500 group-hover:bg-gray-200"
                }`}
              >
                <FontAwesomeIcon icon={faGear} className="text-sm" />
              </div>
              <span className="font-medium flex-1">Settings</span>
              <FontAwesomeIcon
                icon={faChevronRight}
                className={`text-xs transition-transform ${
                  isSettingsActive ? "text-[#16a34a]" : "text-gray-400"
                }`}
              />
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
