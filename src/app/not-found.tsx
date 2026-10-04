"use client";

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAppleWhole,
  faCarrot,
  faLemon,
  faSeedling,
  faHouse,
  faArrowLeft,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#fafbfc] px-4 py-16">
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute left-[5%] top-[10%] animate-[float_6s_ease-in-out_infinite] text-4xl text-[#bbf7d0]">
          <FontAwesomeIcon icon={faAppleWhole} className="h-9 w-9" />
        </div>
        <div className="absolute right-[10%] top-[20%] animate-[float_8s_ease-in-out_infinite_1s] text-3xl text-[#bbf7d0]">
          <FontAwesomeIcon icon={faCarrot} className="h-8 w-8" />
        </div>
        <div className="absolute bottom-[25%] left-[8%] animate-[float_7s_ease-in-out_infinite_0.5s] text-3xl text-[#bbf7d0]">
          <FontAwesomeIcon icon={faLemon} className="h-8 w-8" />
        </div>
        <div className="absolute bottom-[15%] right-[15%] animate-[float_9s_ease-in-out_infinite_2s] text-4xl text-[#bbf7d0]">
          <FontAwesomeIcon icon={faSeedling} className="h-9 w-9" />
        </div>
        <div className="absolute left-[15%] top-1/2 animate-[float_5s_ease-in-out_infinite_1.5s] text-2xl text-[#dcfce7]">
          <FontAwesomeIcon icon={faAppleWhole} className="h-6 w-6" />
        </div>
        <div className="absolute right-[5%] top-[40%] animate-[float_6s_ease-in-out_infinite_0.8s] text-2xl text-[#dcfce7]">
          <FontAwesomeIcon icon={faCarrot} className="h-6 w-6" />
        </div>
        <div className="absolute right-0 top-0 h-125 w-125 rounded-full bg-linear-to-bl from-[#dcfce7]/40 to-transparent blur-3xl" />
        <div className="absolute bottom-0 left-0 h-100 w-100 rounded-full bg-linear-to-tr from-[#dcfce7]/30 to-transparent blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-xl">
        <div className="mb-10 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 h-52 w-64 rounded-4xl bg-[#dcfce7]/50 blur-2xl sm:h-60 sm:w-72" />

            <div className="relative h-52 w-64 sm:h-60 sm:w-72">
              <div className="absolute inset-x-0 top-4 mx-auto flex h-40 w-52 items-center justify-center overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-xl shadow-gray-200/60 sm:h-44 sm:w-60">
                <div className="absolute inset-0 bg-linear-to-br from-[#f0fdf4]/80 via-transparent to-[#dcfce7]/40" />

                <FontAwesomeIcon
                  icon={faCartShopping}
                  className="relative text-6xl text-[#86efac]/80 sm:text-7xl"
                />
              </div>

              <div className="absolute -top-2 -right-2 sm:top-0 sm:right-0">
                <div className="relative">
                  <div className="absolute -inset-2 rounded-full bg-white shadow-lg" />

                  <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-linear-to-br from-[#22c55e] to-[#16a34a] shadow-lg shadow-[#22c55e]/40 sm:h-20 sm:w-20">
                    <span className="text-xl font-black tracking-tight text-white sm:text-2xl">
                      404
                    </span>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-1 left-1/2 flex -translate-x-1/2 items-center justify-center gap-4">
                <div className="h-2.5 w-2.5 rounded-full bg-[#4ade80]" />
                <div className="h-4 w-8 rounded-b-full border-b-[3px] border-[#4ade80]" />
                <div className="h-2.5 w-2.5 rounded-full bg-[#4ade80]" />
              </div>
            </div>
          </div>
        </div>

        <div className="mb-10 text-center">
          <h1 className="mb-4 text-4xl font-black tracking-tight text-gray-900 sm:text-5xl">
            Oops! Nothing Here
          </h1>
          <p className="mx-auto max-w-md text-lg leading-relaxed text-gray-500">
            Looks like this page went out of stock! Don&apos;t worry,
            there&apos;s plenty more fresh content to explore.
          </p>
        </div>

        <div className="mb-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/"
            className="group inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-[#16a34a] px-8 py-4 text-lg font-bold text-white shadow-lg shadow-[#16a34a]/25 transition-all hover:-translate-y-1 hover:bg-[#15803d] hover:shadow-xl sm:w-auto"
          >
            <FontAwesomeIcon
              icon={faHouse}
              className="h-5 w-5 transition-transform group-hover:scale-110"
            />
            Go to Homepage
          </Link>
          <button
            type="button"
            onClick={() => window.history.back()}
            className="cursor-pointer group inline-flex w-full items-center justify-center gap-3 rounded-2xl border border-gray-200 bg-white px-8 py-4 text-lg font-bold text-gray-700 shadow-md transition-all hover:-translate-y-1 hover:bg-gray-50 hover:shadow-lg sm:w-auto"
          >
            <FontAwesomeIcon
              icon={faArrowLeft}
              className="h-5 w-5 transition-transform group-hover:-translate-x-1"
            />
            Go Back
          </button>
        </div>

        <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
          <p className="mb-4 text-center text-sm font-medium uppercase tracking-wider text-gray-400">
            Popular Destinations
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/products"
              className="rounded-xl bg-[#f0fdf4] px-5 py-2.5 text-sm font-semibold text-[#15803d] transition-colors hover:bg-[#dcfce7]"
            >
              All Products
            </Link>
            <Link
              href="/categories"
              className="rounded-xl bg-gray-100 px-5 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-200"
            >
              Categories
            </Link>
            <Link
              href="/deals"
              className="rounded-xl bg-gray-100 px-5 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-200"
            >
              Today&apos;s Deals
            </Link>
            <Link
              href="/contact"
              className="rounded-xl bg-gray-100 px-5 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-200"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
