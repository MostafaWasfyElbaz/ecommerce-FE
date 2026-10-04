import { voucher } from "@/src/types/Vouchers";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

export default function VouchersCard({
  voucher,
  animationDirection,
}: {
  voucher: voucher;
  animationDirection: "left" | "right";
}) {
  return (
    <div
      className={`voucher-card-${animationDirection} group relative min-h-62.5 overflow-hidden rounded-2xl p-7 text-white sm:min-h-70 sm:p-8 ${voucher.className}`}
    >
      <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-white/10 transition-transform duration-300 group-hover:scale-110" />

      <div className="absolute -bottom-12 -left-12 h-32 w-32 rounded-full bg-white/10 transition-transform duration-300 group-hover:scale-110" />

      <div className="relative z-10">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-4 py-1.5 text-xs font-medium">
          <span>{voucher.icon}</span>
          {voucher.label}
        </span>

        <h3 className="mt-5 text-2xl font-bold leading-tight sm:text-3xl">
          {voucher.title}
        </h3>

        <p className="mt-2 text-sm text-white/90 sm:text-base">
          {voucher.description}
        </p>

        <div className="mt-5 flex items-center gap-4">
          <span className="text-2xl font-bold sm:text-3xl">
            {voucher.discount}
          </span>

          <span className="text-xs text-white/90 sm:text-sm">
            Use code: <span className="font-bold">{voucher.code}</span>
          </span>
        </div>

        <Link
          href={voucher.href}
          className={`mt-6 inline-flex items-center gap-2 rounded-full  px-6 py-3 text-sm font-semibold bg-white ${voucher.btnClassName}`}
        >
          {voucher.button}
          <FontAwesomeIcon icon={faArrowRight} className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
