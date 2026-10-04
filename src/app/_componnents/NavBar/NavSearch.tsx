"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

function NavSearchForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentQuery = searchParams.get("q") || "";
  const [searchTerm, setSearchTerm] = useState(currentQuery);
  const [prevQuery, setPrevQuery] = useState(currentQuery);

  if (prevQuery !== currentQuery) {
    setPrevQuery(currentQuery);
    setSearchTerm(currentQuery);
  }

  const handleSubmit = () => {
    if (searchTerm.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      router.push("/search");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative mx-4 min-w-0 flex-1 xl:mx-12"
    >
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search for products, brands and more..."
        className="h-9 w-full min-w-0 rounded-full border border-[#dfe3e8] bg-white pl-4 pr-11 text-[10px] text-black outline-none placeholder:text-[#979ea6] focus:border-[#0aad0a] transition-colors xl:h-12.75 xl:pl-5 xl:pr-15.5 xl:text-[15px]"
      />

      <button
        type="submit"
        aria-label="Search"
        className="cursor-pointer absolute right-1 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-[#0aad0a] hover:bg-[#099609] transition-colors xl:right-1.25 xl:h-10.75 xl:w-10.75"
      >
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          className="h-3.5 w-3.5 text-white xl:h-5 xl:w-5"
        />
      </button>
    </form>
  );
}

export default function NavSearch() {
  return (
    <Suspense
      fallback={
        <div className="relative mx-4 min-w-0 flex-1 xl:mx-12">
          <input
            type="text"
            placeholder="Search for products, brands and more..."
            className="h-9 w-full min-w-0 rounded-full border border-[#dfe3e8] bg-white pl-4 pr-11 text-[10px] text-black outline-none placeholder:text-[#979ea6] xl:h-12.75 xl:pl-5 xl:pr-15.5 xl:text-[15px]"
            readOnly
          />
          <button
            type="button"
            aria-label="Search"
            className="cursor-pointer absolute right-1 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-[#0aad0a] xl:right-1.25 xl:h-10.75 xl:w-10.75"
          >
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="h-3.5 w-3.5 text-white xl:h-5 xl:w-5"
            />
          </button>
        </div>
      }
    >
      <NavSearchForm />
    </Suspense>
  );
}
