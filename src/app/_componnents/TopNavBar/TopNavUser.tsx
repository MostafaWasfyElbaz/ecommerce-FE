import { getServerSession } from "next-auth";
import { authOptions } from "@/src/next-auth/authOptions";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";

export default async function TopNavUser() {
  const session = await getServerSession(authOptions);

  if (session) {
    return (
      <Link
        href="/profile"
        className="flex items-center gap-1.5 transition-colors hover:text-[#16a34a] xl:gap-2"
      >
        <FontAwesomeIcon icon={faUser} className="h-3 w-3 xl:h-3.5 xl:w-3.5" />
        <span>{session.user?.name || "Profile"}</span>
      </Link>
    );
  }

  return (
    <Link
      href="/login"
      className="flex items-center gap-1.5 transition-colors hover:text-[#16a34a] xl:gap-2"
    >
      <FontAwesomeIcon icon={faUser} className="h-3 w-3 xl:h-3.5 xl:w-3.5" />
      <span>Sign In</span>
    </Link>
  );
}
