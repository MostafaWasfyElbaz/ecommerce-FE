import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faHeadset } from "@fortawesome/free-solid-svg-icons";
import NavAuth from "./NavAuth";
import CartNavButton from "./CartNavButton";
import WishlistNavButton from "./WishlistNavButton";

export default function NavLinks() {
  return (
    <nav className="flex shrink-0 items-center gap-3 text-[11px] text-[#21313c] xl:gap-7 xl:text-[16px]">
      <Link
        href="/"
        className="hidden whitespace-nowrap font-medium text-gray-700 transition-colors hover:text-[#16a34a] xl:block"
      >
        Home
      </Link>

      <Link
        href="/products"
        className="hidden whitespace-nowrap font-medium text-gray-700 transition-colors hover:text-[#16a34a] xl:block"
      >
        Shop
      </Link>

      <div className="relative group hidden xl:block">
        <div className="group flex cursor-pointer items-center gap-1 whitespace-nowrap py-1 font-medium text-gray-700 transition-colors hover:text-[#16a34a] xl:gap-1.5 xl:py-2">
          <span>Categories</span>

          <FontAwesomeIcon
            icon={faChevronDown}
            className="h-3 w-3 shrink-0 transition-transform duration-200 group-hover:rotate-180 xl:h-4 xl:w-4"
          />
        </div>

        <div className="invisible absolute left-0 top-full z-50 pt-1 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
          <div className="min-w-50 rounded-xl border border-gray-100 bg-white py-2 shadow-xl">
            <Link
              href="/categories"
              className="block px-4 py-2.5 text-gray-600 transition-colors hover:bg-[#f0fdf4] hover:text-[#16a34a]"
            >
              All Categories
            </Link>

            <Link
              href="/products?category=6439d58a0049ad0b52b9003f"
              className="block px-4 py-2.5 text-gray-600 transition-colors hover:bg-[#f0fdf4] hover:text-[#16a34a]"
            >
              Women&apos;s Fashion
            </Link>

            <Link
              href="/products?category=6439d5b90049ad0b52b90048"
              className="block px-4 py-2.5 text-gray-600 transition-colors hover:bg-[#f0fdf4] hover:text-[#16a34a]"
            >
              Men&apos;s Fashion
            </Link>

            <Link
              href="/products?category=6439d2d167d9aa4ca970649f"
              className="block px-4 py-2.5 text-gray-600 transition-colors hover:bg-[#f0fdf4] hover:text-[#16a34a]"
            >
              Electronics
            </Link>
          </div>
        </div>
      </div>

      <Link
        href="/brands"
        className="hidden whitespace-nowrap font-medium text-gray-700 transition-colors hover:text-[#16a34a] xl:block"
      >
        Brands
      </Link>
      <Link
        href="/contact"
        className="flex shrink-0 items-center gap-1.5 border-r border-gray-200 pr-2 transition-opacity hover:opacity-80 xl:mr-2 xl:gap-2 xl:pr-3"
      >
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#f0fdf4] xl:h-10.5 xl:w-10.5">
          <FontAwesomeIcon
            icon={faHeadset}
            className="h-3.5 w-3.5 text-[#16a34a] xl:h-5 xl:w-5"
          />
        </div>

        <div className="text-[9px] leading-tight xl:text-xs">
          <div className="text-gray-400">Support</div>
          <div className="whitespace-nowrap font-semibold text-gray-700">
            24/7 Help
          </div>
        </div>
      </Link>
      <WishlistNavButton />
      <CartNavButton />
      <NavAuth />
    </nav>
  );
}
