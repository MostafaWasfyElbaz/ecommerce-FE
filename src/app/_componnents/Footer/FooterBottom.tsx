import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCcVisa,
  faCcMastercard,
  faCcPaypal,
} from "@fortawesome/free-brands-svg-icons";

export default function FooterBottom() {
  return (
    <div className="mt-8 border-t border-gray-800 pt-5">
      <div className="flex flex-col gap-4 text-sm text-gray-500 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} FreshCart. All rights reserved.</p>

        <div
          className="flex items-center gap-3"
          aria-label="Accepted payment methods"
        >
          <span className="flex h-7 min-w-12 items-center justify-center rounded bg-white px-2 text-[#1a1f71]">
            <FontAwesomeIcon icon={faCcVisa} className="h-5 w-7" />
          </span>

          <span
            className="flex h-7 min-w-12 items-center justify-center rounded bg-white px-1.5 text-[#eb001b]"
            aria-label="Mastercard"
          >
            <FontAwesomeIcon icon={faCcMastercard} className="h-5 w-7" />
          </span>

          <span className="flex h-7 min-w-12 items-center justify-center rounded bg-white px-2 text-[#003087]">
            <FontAwesomeIcon
              icon={faCcPaypal}
              className="h-5 w-7 text-[#009cde]"
            />
          </span>
        </div>
      </div>
    </div>
  );
}
