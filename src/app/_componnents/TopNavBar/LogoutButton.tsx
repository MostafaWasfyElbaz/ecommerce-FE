"use client";

import { signOut } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

export default function LogoutButton() {
  return (
    <button
      type="button"
      onClick={() => signOut({ callbackUrl: "/login" })}
      className="cursor-pointer flex items-center gap-1.5 transition-colors hover:text-[#16a34a] xl:gap-2"
    >
      <FontAwesomeIcon
        icon={faRightFromBracket}
        className="h-3 w-3 xl:h-3.5 xl:w-3.5"
      />
      <span>Sign Out</span>
    </button>
  );
}
