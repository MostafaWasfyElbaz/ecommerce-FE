import Image from "next/image";
import Link from "next/link";
import TopNavBar from "@/src/app/_componnents/TopNavBar/TopNavBar";
import NavLinks from "./NavLinks";
import NavSearch from "./NavSearch";
import NavBarMobile from "./NavBarMobile";
import logo from "@/src/assets/images/freshcart-logo.svg";

export default function Navbar() {
  return (
    <>
      <TopNavBar />
      <header className="sticky top-0 z-40 w-full bg-white shadow-xs border-b border-[#e5e7eb]">
        <div className="container mx-auto">
          <div className="hidden lg:flex mx-auto h-16 max-w-[1600px] items-center px-3 xl:h-19.75 xl:px-6">
            <Link href="/" className="shrink-0">
              <Image
                src={logo}
                alt="FreshCart"
                width={160}
                height={31}
                className="block h-6 w-auto xl:h-7.75 xl:w-40"
              />
            </Link>
            <NavSearch />
            <NavLinks />
          </div>
          <NavBarMobile />
        </div>
      </header>
    </>
  );
}
