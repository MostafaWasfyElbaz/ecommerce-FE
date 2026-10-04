import Image from "next/image";
import Link from "next/link";
import FooterBottom from "./FooterBottom";
import TopFooter from "./TopFooter";
import logo from "@/src/assets/images/freshcart-logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import {
  faFacebookF,
  faXTwitter,
  faInstagram,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  return (
    <footer className="freshcart-footer bg-[#0f172a] text-white">
      <TopFooter />

      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-1 md:grid-cols-[1.35fr_repeat(4,0.8fr)] md:gap-5 lg:grid-cols-[1.7fr_1fr_1fr_1fr_0.9fr] lg:gap-8">
          <div className="lg:col-span-1">
            <Link
              href="/"
              aria-label="FreshCart home"
              className="mb-4 inline-flex rounded-md bg-white px-3 py-2"
            >
              <Image
                src={logo}
                alt="FreshCart"
                width={160}
                height={31}
                className="h-7.75 w-40"
              />
            </Link>

            <p className="mb-5 max-w-xs text-sm leading-6 text-gray-400">
              FreshCart is your one-stop destination for quality products. From
              fashion to electronics, we bring you the best brands at
              competitive prices with a seamless shopping experience.
            </p>

            <div className="space-y-2 text-sm text-gray-400">
              <Link
                href="tel:+18001234567"
                className="flex items-center gap-2 transition-colors hover:text-[#16a34a]"
              >
                <FontAwesomeIcon
                  icon={faPhone}
                  className="h-3.5 w-3.5 shrink-0 text-[#0AAD0A]"
                />
                <span>+1 (800) 123-4567</span>
              </Link>

              <Link
                href="mailto:support@freshcart.com"
                className="flex items-center gap-2 transition-colors hover:text-[#16a34a]"
              >
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="h-3.5 w-3.5 shrink-0 text-[#0AAD0A]"
                />
                <span>support@freshcart.com</span>
              </Link>

              <div className="flex items-start gap-2">
                <FontAwesomeIcon
                  icon={faLocationDot}
                  className="mt-1 h-3.5 w-3.5 shrink-0 text-[#0AAD0A]"
                />
                <span>123 Commerce Street, New York, NY 10001</span>
              </div>
            </div>

            <div className="mt-5 flex items-center gap-3">
              <Link
                href="https://facebook.com"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1e293b] text-gray-400 transition-colors hover:bg-[#0AAD0A] hover:text-white"
              >
                <FontAwesomeIcon icon={faFacebookF} className="h-4 w-4" />
              </Link>
              <Link
                href="https://twitter.com"
                aria-label="Twitter"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1e293b] text-base font-semibold text-gray-400 transition-colors hover:bg-[#0AAD0A] hover:text-white"
              >
                <FontAwesomeIcon icon={faXTwitter} className="h-4 w-4" />
              </Link>
              <Link
                href="https://instagram.com"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1e293b] text-gray-400 transition-colors hover:bg-[#0AAD0A] hover:text-white"
              >
                <FontAwesomeIcon icon={faInstagram} className="h-4 w-4" />
              </Link>
              <Link
                href="https://youtube.com"
                aria-label="YouTube"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1e293b] text-gray-400 transition-colors hover:bg-[#0AAD0A] hover:text-white"
              >
                <FontAwesomeIcon icon={faYoutube} className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-white">Shop</h3>

            <div className="space-y-2.5">
              <Link
                href="/products"
                className="block text-sm text-gray-400 transition-colors hover:text-white"
              >
                All Products
              </Link>

              <Link
                href="/categories"
                className="block text-sm text-gray-400 transition-colors hover:text-white"
              >
                Categories
              </Link>

              <Link
                href="/brands"
                className="block text-sm text-gray-400 transition-colors hover:text-white"
              >
                Brands
              </Link>

              <Link
                href="/products?category=6439d58a0049ad0b52b9003f"
                className="block text-sm text-gray-400 transition-colors hover:text-white"
              >
                Electronics
              </Link>

              <Link
                href="/products?category=6439d5b90049ad0b52b90048"
                className="block text-sm text-gray-400 transition-colors hover:text-white"
              >
                Mens Fashion
              </Link>

              <Link
                href="/products?category=6439d58a0049ad0b52b9003f"
                className="block text-sm text-gray-400 transition-colors hover:text-white"
              >
                Womens Fashion
              </Link>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-white">Account</h3>

            <div className="space-y-2.5">
              <Link
                href="/account"
                className="block text-sm text-gray-400 transition-colors hover:text-white"
              >
                My Account
              </Link>

              <Link
                href="/orders"
                className="block text-sm text-gray-400 transition-colors hover:text-white"
              >
                Order History
              </Link>

              <Link
                href="/wishlist"
                className="block text-sm text-gray-400 transition-colors hover:text-white"
              >
                Wishlist
              </Link>

              <Link
                href="/cart"
                className="block text-sm text-gray-400 transition-colors hover:text-white"
              >
                Shopping Cart
              </Link>

              <Link
                href="/signin"
                className="block text-sm text-gray-400 transition-colors hover:text-white"
              >
                Sign In
              </Link>

              <Link
                href="/register"
                className="block text-sm text-gray-400 transition-colors hover:text-white"
              >
                Create Account
              </Link>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-white">Support</h3>

            <div className="space-y-2.5">
              <Link
                href="/contact"
                className="block text-sm text-gray-400 transition-colors hover:text-white"
              >
                Contact Us
              </Link>

              <Link
                href="/help"
                className="block text-sm text-gray-400 transition-colors hover:text-white"
              >
                Help Center
              </Link>

              <Link
                href="/shipping"
                className="block text-sm text-gray-400 transition-colors hover:text-white"
              >
                Shipping Info
              </Link>

              <Link
                href="/returns"
                className="block text-sm text-gray-400 transition-colors hover:text-white"
              >
                Returns & Refunds
              </Link>

              <Link
                href="/track-order"
                className="block text-sm text-gray-400 transition-colors hover:text-white"
              >
                Track Order
              </Link>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-white">Legal</h3>

            <div className="space-y-2.5">
              <Link
                href="/privacy"
                className="block text-sm text-gray-400 transition-colors hover:text-white"
              >
                Privacy Policy
              </Link>

              <Link
                href="/terms"
                className="block text-sm text-gray-400 transition-colors hover:text-white"
              >
                Terms of Service
              </Link>

              <Link
                href="/cookies"
                className="block text-sm text-gray-400 transition-colors hover:text-white"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>

        <FooterBottom />
      </div>
    </footer>
  );
}
