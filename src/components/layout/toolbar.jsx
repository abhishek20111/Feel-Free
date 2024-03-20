"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CookieID } from "@/lib/actions/feetch-post";
import SearchIcon from "../../../public/assets/search.png";
import Image from "next/image";
import { SignedIn, UserButton } from "@clerk/nextjs";

function Toolbar() {
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();
  const [myId, setMyId] = useState();

  const handleSearchInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      router.push(`/search/${searchValue}`);
      setSearchValue("");
    }
  };
  useEffect(() => {
    const getId = async () => {
      const userIDDD = await CookieID();
      if (userIDDD) setMyId(userIDDD.value);
    };
    getId();
  }, []);

  return (
    <div className="flex justify-between w-full sticky top-3 z-20 overflow-auto">
      <div className="max-w-md mx-auto">
        <div className="relative flex items-center w-full h-12 rounded-lg shadow-lg bg-white overflow-hidden">
          <div className="grid place-items-center h-full w-12 text-gray-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            value={searchValue}
            onChange={handleSearchInputChange}
            onKeyDown={handleKeyPress}
            className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
            type="text"
            placeholder="Search something.."
          />
        </div>
      </div>

      <div className="sm:block hidden">
        {myId && (
          <Link
            href={{
              pathname: "/create-post",
              query: { id: myId },
            }}
            className="flex items-center p-2 space-x-3 rounded-md"
          >
            <Button variant="outline">Create </Button>
          </Link>
        )}
      </div>
      <div className="sm:hidden mr-5 items-center flex">
        {/* {
          <Link
            href="/search"
            className="flex items-center p-2 space-x-3 rounded-md"
          >
            <Image src={SearchIcon} height={19} width={19} alt="Search" />
          </Link>
        } */}
        {
          <SignedIn>
          <UserButton />
        </SignedIn>
        }
      </div>
    </div>
  );
}

export default Toolbar;
