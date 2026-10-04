"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBox,
  faBagShopping,
  faBoxOpen,
} from "@fortawesome/free-solid-svg-icons";
import { getAllOrders } from "@/src/api/Actions/orders.actions";
import { Order } from "@/src/types/Order";
import OrdersSkeleton from "@/src/app/_componnents/orders/OrdersSkeleton";
import OrderCard from "@/src/app/_componnents/orders/orderCard";

export default function Orders() {
  const {
    data: orders = [],
    isLoading,
    isError,
  } = useQuery<Order[]>({
    queryKey: ["GetAllOrders"],
    queryFn: () => getAllOrders(),
  });

  if (isLoading) {
    return <OrdersSkeleton />;
  }

  if (isError) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="max-w-sm text-center">
          <div className="w-24 h-24 rounded-2xl bg-red-50 flex items-center justify-center mx-auto mb-6 text-red-500">
            <FontAwesomeIcon icon={faBoxOpen} className="text-4xl" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Unable to load orders
          </h2>
          <p className="text-gray-500 mb-8 text-sm leading-relaxed">
            Please make sure you are logged in to view your orders.
          </p>
          <Link
            className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-3.5 px-8 rounded-xl font-semibold transition-all shadow-lg shadow-green-600/20 w-full sm:w-auto"
            href="/login"
          >
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="max-w-sm text-center">
          <div className="w-24 h-24 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-6">
            <FontAwesomeIcon
              icon={faBoxOpen}
              className="text-4xl text-gray-400"
            />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            No orders yet
          </h2>
          <p className="text-gray-500 mb-8 text-sm leading-relaxed">
            When you place orders, they&apos;ll appear here
            <br />
            so you can track them.
          </p>
          <Link
            className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-3.5 px-8 rounded-xl font-semibold transition-all shadow-lg shadow-green-600/20 w-full sm:w-auto"
            href="/"
          >
            <FontAwesomeIcon icon={faBagShopping} />
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link className="hover:text-green-600 transition" href="/">
            Home
          </Link>
          <span className="text-gray-300">/</span>
          <span className="text-gray-900 font-medium">My Orders</span>
        </nav>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg shadow-green-500/25">
              <FontAwesomeIcon icon={faBox} className="text-2xl text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                My Orders
              </h1>
              <p className="text-gray-500 text-sm mt-0.5">
                Track and manage your {orders.length}{" "}
                {orders.length === 1 ? "order" : "orders"}
              </p>
            </div>
          </div>
          <Link
            className="self-start sm:self-auto text-green-600 hover:text-green-700 font-medium flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-green-50 transition-all text-sm"
            href="/"
          >
            <FontAwesomeIcon icon={faBagShopping} className="text-xs" />
            Continue Shopping
          </Link>
        </div>
      </div>

      <div className="space-y-4">
        {orders.map((order) => {
          return <OrderCard key={order.id} order={order} />;
        })}
      </div>
    </div>
  );
}
