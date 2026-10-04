"use client";

import VouchersCard from "./VouchersCard";
import { voucher } from "@/src/types/Vouchers";

const vouchers: voucher[] = [
  {
    label: "Deal of the Day",
    icon: "🔥",
    title: "Fresh Organic Fruits",
    description: "Get up to 40% off on selected organic fruits",
    discount: "40% OFF",
    code: "ORGANIC40",
    button: "Shop Now",
    href: "/products",
    className: "bg-gradient-to-r from-[#00b67a] to-[#008f63]",
    btnClassName: "text-emerald-600 hover:bg-gray-100 transition-colors ",
  },
  {
    label: "New Arrivals",
    icon: "✨",
    title: "Exotic Vegetables",
    description: "Discover our latest collection of premium vegetables",
    discount: "25% OFF",
    code: "FRESH25",
    button: "Explore Now",
    href: "/products",
    className: "bg-gradient-to-r from-[#ff7a18] to-[#ff1744]",
    btnClassName: "text-orange-500  hover:bg-gray-100 transition-colors",
  },
];

export default function Vouchers() {
  const observeSection = (section: HTMLElement | null) => {
    if (!section) return;

    if (!("IntersectionObserver" in window)) {
      section.classList.add("is-visible");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          section.classList.add("is-visible");
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(section);
  };

  return (
    <section ref={observeSection} className="bg-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {vouchers.map((voucher, index) => (
            <VouchersCard
              key={voucher.label}
              voucher={voucher}
              animationDirection={index % 2 === 0 ? "left" : "right"}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
