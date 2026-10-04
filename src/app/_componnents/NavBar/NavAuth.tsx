import { getServerSession } from "next-auth";
import { authOptions } from "@/src/next-auth/authOptions";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import ProfileMenu from "./ProfileMenu";

export default async function NavAuth() {
  const session = await getServerSession(authOptions);

  if (session) {
    return <ProfileMenu />;
  }

  return (
    <Link
      href="/login"
      className="ml-2 hidden items-center gap-2 rounded-full bg-[#16a34a] px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-[#16a34a]/20 transition-colors hover:bg-[#15803d] lg:flex"
    >
      <FontAwesomeIcon icon={faUser} className="text-xs" />
      Sign In
    </Link>
  );
}
