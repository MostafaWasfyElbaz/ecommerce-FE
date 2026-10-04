import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruck, faGift } from "@fortawesome/free-solid-svg-icons";

export default function TopNavBarLeft() {
  return (
    <div className="flex items-center gap-3 text-[9px] text-[#5f6b7a] xl:gap-7 xl:text-[15px]">
      <div className="flex items-center gap-1.5 xl:gap-2">
        <FontAwesomeIcon
          icon={faTruck}
          className="h-2 w-2 text-[#0aad0a] xl:h-3.75 xl:w-3.75"
        />
        <span>Free Shipping on Orders 500 EGP</span>
      </div>

      <div className="flex items-center gap-1.5 xl:gap-2">
        <FontAwesomeIcon
          icon={faGift}
          className="h-2 w-2 text-[#0aad0a] xl:h-3.75 xl:w-3.75"
        />
        <span>New Arrivals Daily</span>
      </div>
    </div>
  );
}
