import { getServerSession } from "next-auth";
import { authOptions } from "@/src/next-auth/authOptions";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import LogoutButton from "./LogoutButton";

export default async function TopNavAuthAction() {
  const session = await getServerSession(authOptions);

  if (session) {
    return <LogoutButton />;
  }

  return (
    <Link
      href="/register"
      className="flex items-center gap-1.5 transition-colors hover:text-[#16a34a] xl:gap-2"
    >
      <FontAwesomeIcon
        icon={faUserPlus}
        className="h-3 w-3 xl:h-3.5 xl:w-3.5"
      />
      <span>Register</span>
    </Link>
  );
}
