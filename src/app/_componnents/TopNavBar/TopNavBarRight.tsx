import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import TopNavUser from "./TopNavUser";
import TopNavAuthAction from "./TopNavAuthAction";

export default function TopNavBarRight() {
  return (
    <div className="flex items-center gap-2 text-[9px] text-[#5f6b7a] xl:gap-5 xl:text-[15px]">
      <Link
        href="tel:+18001234567"
        className="flex items-center gap-1.5 transition-colors hover:text-[#16a34a] xl:gap-2"
      >
        <FontAwesomeIcon icon={faPhone} className="h-3 w-3 xl:h-3.5 xl:w-3.5" />
        <span>+1 (800) 123-4567</span>
      </Link>

      <Link
        href="mailto:support@freshcart.com"
        className="flex items-center gap-1.5 transition-colors hover:text-[#16a34a] xl:gap-2"
      >
        <FontAwesomeIcon
          icon={faEnvelope}
          className="h-3 w-3 xl:h-3.5 xl:w-3.5"
        />
        <span>support@freshcart.com</span>
      </Link>

      <span className="h-4 w-px bg-[#e5e7eb] xl:h-5" />

      <TopNavUser />
      <TopNavAuthAction />
    </div>
  );
}
