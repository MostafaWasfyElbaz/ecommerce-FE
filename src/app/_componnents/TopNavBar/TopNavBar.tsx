import TopNavBarLeft from "./TopNavBarLeft";
import TopNavBarRight from "./TopNavBarRight";

export default function TopNavBar() {
  return (
    <div className="hidden h-7 border-b border-[#e5e7eb] lg:block xl:h-10.75 ">
      <div className="mx-auto container flex h-full  items-center justify-between px-3 xl:px-6 ">
        <TopNavBarLeft />
        <TopNavBarRight />
      </div>
    </div>
  );
}
