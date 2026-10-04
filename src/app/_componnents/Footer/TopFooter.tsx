import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTruck,
  faShieldHalved,
  faRotateLeft,
  faHeadset,
} from "@fortawesome/free-solid-svg-icons";

export default function TopFooter() {
  return (
    <div className="border-b border-[#dcfce7] bg-[#f0fdf4]">
      <div className="container mx-auto grid grid-cols-1 divide-y divide-[#dcfce7] px-4 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4 lg:px-6">
        <div className="flex items-center gap-4 px-0 py-5 sm:px-5 lg:px-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#dcfce7] text-[#0AAD0A]">
            <FontAwesomeIcon icon={faTruck} className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-[#21313c]">
              Free Shipping
            </h2>
            <p className="mt-1 text-xs text-[#5f6b7a]">
              On orders over 500 EGP
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 px-0 py-5 sm:px-5 lg:px-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#dcfce7] text-[#0AAD0A]">
            <FontAwesomeIcon icon={faShieldHalved} className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-[#21313c]">
              Secure Payment
            </h2>
            <p className="mt-1 text-xs text-[#5f6b7a]">
              100% secure transactions
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 px-0 py-5 sm:px-5 lg:px-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#dcfce7] text-[#0AAD0A]">
            <FontAwesomeIcon icon={faRotateLeft} className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-[#21313c]">
              Easy Returns
            </h2>
            <p className="mt-1 text-xs text-[#5f6b7a]">14-day return policy</p>
          </div>
        </div>

        <div className="flex items-center gap-4 px-0 py-5 sm:px-5 lg:px-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#dcfce7] text-[#0AAD0A]">
            <FontAwesomeIcon icon={faHeadset} className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-[#21313c]">
              24/7 Support
            </h2>
            <p className="mt-1 text-xs text-[#5f6b7a]">
              Dedicated support team
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
