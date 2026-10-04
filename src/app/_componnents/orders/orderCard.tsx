"use client";

import { useState } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBox,
  faClock,
  faHashtag,
  faMoneyBill,
  faCreditCard,
  faCalendarDays,
  faLocationDot,
  faChevronDown,
  faReceipt,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { Order } from "@/src/types/Order";

export default function OrderCard({ order }: { order: Order }) {
  const [expandedOrders, setExpandedOrders] = useState<
    Record<string | number, boolean>
  >({});
  const toggleOrder = (orderId: string | number) => {
    setExpandedOrders((prev) => ({
      ...prev,
      [orderId]: !prev[orderId],
    }));
  };

  const isOrderExpanded = (orderId: string | number) => {
    if (expandedOrders[orderId] !== undefined) {
      return expandedOrders[orderId];
    }
  };

  const orderKey = order.id || order._id;
  const isExpanded = isOrderExpanded(orderKey);
  const firstItem = order.cartItems?.[0];
  const totalItems =
    order.cartItems?.reduce((sum, item) => sum + (item.count || 1), 0) || 0;
  const extraItems = (order.cartItems?.length || 0) - 1;

  return (
    <div
      key={orderKey}
      className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${
        isExpanded
          ? "border-green-200 shadow-lg shadow-green-100/50"
          : "border-gray-100 shadow-sm hover:shadow-md hover:border-gray-200"
      }`}
    >
      <div className="p-5 sm:p-6">
        <div className="flex gap-5">
          <div className="relative shrink-0">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-linear-to-br from-gray-50 to-white border border-gray-100 p-2.5 overflow-hidden flex items-center justify-center">
              {firstItem?.product?.imageCover ? (
                <Image
                  alt={firstItem.product.title || "Order cover"}
                  className="w-full h-full object-contain"
                  src={firstItem.product.imageCover}
                  width={112}
                  height={112}
                />
              ) : (
                <FontAwesomeIcon
                  icon={faBox}
                  className="text-gray-300 text-3xl"
                />
              )}
            </div>
            {extraItems > 0 && (
              <div className="absolute -top-2 -right-2 w-7 h-7 bg-gray-900 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-lg">
                +{extraItems}
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-3 mb-3">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-100 rounded-lg mb-2">
                  <FontAwesomeIcon
                    icon={faClock}
                    className="text-xs text-amber-600"
                  />
                  <span className="text-xs font-semibold text-amber-600">
                    {order.isDelivered
                      ? "Delivered"
                      : order.isPaid
                        ? "Paid"
                        : "Processing"}
                  </span>
                </div>
                <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
                  <FontAwesomeIcon
                    icon={faHashtag}
                    className="text-xs text-gray-400"
                  />
                  {order.id ||
                    (typeof order._id === "string"
                      ? order._id.slice(-4)
                      : order._id)}
                </h3>
              </div>
              <div className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center bg-gray-100">
                <FontAwesomeIcon
                  icon={
                    order.paymentMethodType === "card"
                      ? faCreditCard
                      : faMoneyBill
                  }
                  className="text-gray-600"
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mb-4">
              <span className="flex items-center gap-1.5">
                <FontAwesomeIcon
                  icon={faCalendarDays}
                  className="text-xs text-gray-400"
                />
                {new Date(order.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
              <span className="w-1 h-1 rounded-full bg-gray-300" />
              <span className="flex items-center gap-1.5">
                <FontAwesomeIcon
                  icon={faBox}
                  className="text-xs text-gray-400"
                />
                {totalItems} {totalItems === 1 ? "item" : "items"}
              </span>
              {order.shippingAddress?.city && (
                <>
                  <span className="w-1 h-1 rounded-full bg-gray-300" />
                  <span className="flex items-center gap-1.5">
                    <FontAwesomeIcon
                      icon={faLocationDot}
                      className="text-xs text-gray-400"
                    />
                    {order.shippingAddress.city}
                  </span>
                </>
              )}
            </div>

            <div className="flex items-center justify-between gap-4">
              <div>
                <span className="text-2xl font-bold text-gray-900">
                  {order.totalOrderPrice?.toLocaleString()}
                </span>
                <span className="text-sm font-medium text-gray-400 ml-1">
                  EGP
                </span>
              </div>
              <button
                type="button"
                onClick={() => toggleOrder(orderKey)}
                className={`cursor-pointer flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  isExpanded
                    ? "bg-green-600 text-white shadow-lg shadow-green-600/25"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {isExpanded ? "Hide" : "Details"}
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className={`text-xs transition-transform duration-300 ${
                    isExpanded ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      {isExpanded && (
        <div className="border-t border-gray-100 bg-gray-50/50">
          <div className="p-5 sm:p-6">
            <h4 className="font-semibold text-gray-900 text-sm flex items-center gap-2 mb-4">
              <div className="w-6 h-6 rounded-lg bg-green-100 flex items-center justify-center">
                <FontAwesomeIcon
                  icon={faReceipt}
                  className="text-xs text-green-600"
                />
              </div>
              Order Items
            </h4>
            <div className="space-y-3">
              {order.cartItems?.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-100"
                >
                  <div className="w-16 h-16 rounded-xl bg-gray-50 p-2 shrink-0 flex items-center justify-center">
                    {item.product?.imageCover ? (
                      <Image
                        alt={item.product.title || "Product"}
                        className="w-full h-full object-contain"
                        src={item.product.imageCover}
                        width={64}
                        height={64}
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faBox}
                        className="text-gray-300 text-xl"
                      />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate">
                      {item.product?.title}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      <span className="font-medium text-gray-700">
                        {item.count}
                      </span>{" "}
                      × {item.price?.toLocaleString()} EGP
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-lg font-bold text-gray-900">
                      {(item.price * item.count).toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-400">EGP</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="px-5 sm:px-6 pb-5 sm:pb-6 grid sm:grid-cols-2 gap-4">
            <div className="p-4 bg-white rounded-xl border border-gray-100">
              <h4 className="font-semibold text-gray-900 text-sm flex items-center gap-2 mb-3">
                <div className="w-6 h-6 rounded-lg bg-blue-100 flex items-center justify-center">
                  <FontAwesomeIcon
                    icon={faLocationDot}
                    className="text-xs text-blue-600"
                  />
                </div>
                Delivery Address
              </h4>
              <div className="space-y-2">
                <p className="font-medium text-gray-900">
                  {order.shippingAddress?.city || "Not specified"}
                </p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {order.shippingAddress?.details || "No details provided"}
                </p>
                {order.shippingAddress?.phone && (
                  <p className="text-sm text-gray-600 flex items-center gap-2 pt-1">
                    <FontAwesomeIcon
                      icon={faPhone}
                      className="text-xs text-gray-400"
                    />
                    {order.shippingAddress.phone}
                  </p>
                )}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-amber-100 border border-amber-200">
              <h4 className="font-semibold text-gray-900 text-sm flex items-center gap-2 mb-3">
                <div className="w-6 h-6 rounded-lg bg-amber-500 flex items-center justify-center">
                  <FontAwesomeIcon
                    icon={faClock}
                    className="text-xs text-white"
                  />
                </div>
                Order Summary
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-medium">
                    {order.totalOrderPrice?.toLocaleString()} EGP
                  </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="font-medium">
                    {order.shippingPrice
                      ? `${order.shippingPrice} EGP`
                      : "Free"}
                  </span>
                </div>
                <hr className="border-gray-200/50 my-2" />
                <div className="flex justify-between pt-1">
                  <span className="font-semibold text-gray-900">Total</span>
                  <span className="font-bold text-lg text-gray-900">
                    {order.totalOrderPrice?.toLocaleString()} EGP
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
