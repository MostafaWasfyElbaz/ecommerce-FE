"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faRotateLeft,
  faShieldHalved,
  faTruck,
} from "@fortawesome/free-solid-svg-icons";

export default function ShippingReturns() {
  return (
    <div className="p-6">
      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-lg bg-linear-to-br from-[#f0fdf4] to-[#dcfce7] p-6">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#16a34a] text-white">
                <FontAwesomeIcon icon={faTruck} className="text-xl" />
              </div>

              <h4 className="font-semibold text-gray-900">
                Shipping Information
              </h4>
            </div>

            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-gray-700">
                <FontAwesomeIcon
                  icon={faCheck}
                  className="mt-0.5 text-[#16a34a]"
                />
                <span>Free shipping on orders over $50</span>
              </li>

              <li className="flex items-start gap-2 text-sm text-gray-700">
                <FontAwesomeIcon
                  icon={faCheck}
                  className="mt-0.5 text-[#16a34a]"
                />
                <span>Standard delivery: 3-5 business days</span>
              </li>

              <li className="flex items-start gap-2 text-sm text-gray-700">
                <FontAwesomeIcon
                  icon={faCheck}
                  className="mt-0.5 text-[#16a34a]"
                />
                <span>Express delivery available (1-2 business days)</span>
              </li>

              <li className="flex items-start gap-2 text-sm text-gray-700">
                <FontAwesomeIcon
                  icon={faCheck}
                  className="mt-0.5 text-[#16a34a]"
                />
                <span>Track your order in real-time</span>
              </li>
            </ul>
          </div>

          <div className="rounded-lg bg-linear-to-br from-green-50 to-green-100 p-6">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-600 text-white">
                <FontAwesomeIcon icon={faRotateLeft} className="text-xl" />
              </div>

              <h4 className="font-semibold text-gray-900">Returns & Refunds</h4>
            </div>

            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-gray-700">
                <FontAwesomeIcon
                  icon={faCheck}
                  className="mt-0.5 text-green-600"
                />
                <span>30-day hassle-free returns</span>
              </li>

              <li className="flex items-start gap-2 text-sm text-gray-700">
                <FontAwesomeIcon
                  icon={faCheck}
                  className="mt-0.5 text-green-600"
                />
                <span>Full refund or exchange available</span>
              </li>

              <li className="flex items-start gap-2 text-sm text-gray-700">
                <FontAwesomeIcon
                  icon={faCheck}
                  className="mt-0.5 text-green-600"
                />
                <span>Free return shipping on defective items</span>
              </li>

              <li className="flex items-start gap-2 text-sm text-gray-700">
                <FontAwesomeIcon
                  icon={faCheck}
                  className="mt-0.5 text-green-600"
                />
                <span>Easy online return process</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-lg bg-gray-50 p-6">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gray-200 text-gray-600">
            <FontAwesomeIcon icon={faShieldHalved} className="text-2xl" />
          </div>

          <div>
            <h4 className="mb-1 font-semibold text-gray-900">
              Buyer Protection Guarantee
            </h4>

            <p className="text-sm text-gray-600">
              Get a full refund if your order doesn&apos;t arrive or isn&apos;t
              as described. We ensure your shopping experience is safe and
              secure.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
