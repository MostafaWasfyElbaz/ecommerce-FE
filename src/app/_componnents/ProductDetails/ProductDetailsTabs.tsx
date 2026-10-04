"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBox, faStar, faTruck } from "@fortawesome/free-solid-svg-icons";
import { ProductDetails } from "@/src/types/ProductDetails";
import ShippingReturns from "./ShippingReturn";
import Details from "./Details";
import ProductReviews from "./ProductReviews";

export default function ProductDetailsTabs({
  product,
}: {
  product: ProductDetails;
}) {
  const [activeTab, setActiveTab] = useState("details");
  const tabs = [
    {
      id: "details",
      label: "Product Details",
      icon: faBox,
    },
    {
      id: "reviews",
      label: `Reviews (${product.reviews.length})`,
      icon: faStar,
    },
    {
      id: "shipping",
      label: "Shipping & Returns",
      icon: faTruck,
    },
  ];

  return (
    <section id="product-details-tabs" className="py-8">
      <div className="container mx-auto px-4">
        <div className="overflow-hidden rounded-lg bg-white shadow-sm">
          <div className="border-b border-gray-200">
            <div className="flex overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`cursor-pointer flex items-center gap-2 whitespace-nowrap px-6 py-4 font-medium transition-all duration-200 ${
                    activeTab === tab.id
                      ? "border-b-2 border-[#16a34a] bg-[#f0fdf4]/50 text-[#16a34a]"
                      : "text-gray-600 hover:bg-gray-50 hover:text-[#16a34a]"
                  }`}
                >
                  <FontAwesomeIcon icon={tab.icon} className="text-sm" />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6">
            {activeTab === "details" && <Details product={product} />}

            {activeTab === "reviews" && <ProductReviews product={product} />}

            {activeTab === "shipping" && <ShippingReturns />}
          </div>
        </div>
      </div>
    </section>
  );
}
