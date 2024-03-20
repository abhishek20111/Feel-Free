"use client";

import { SignedIn, UserButton, useClerk } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "@/components/loader/Bottom_Loader";
import create_post from "../../../public/assets/create_post.png";
import SearchIcon from "../../../public/assets/search.png";
import Image from "next/image";
import "@/app/globals.css";
import { Logout } from "@/lib/actions/feetch-post";

function BotttomBar() {
  const { isSignedIn, user, isLoaded } = useUser();
  const pathname = usePathname();
  const { signOut } = useClerk();
  const router = useRouter();
  const [loding, setLoding] = useState(true);
  const [userData, setUserData] = useState([]);
  const regex = /^\/([^\/]+)/;
  const firstPath = pathname.match(regex) ? pathname.match(regex)[0] : pathname;

  const getUser = async () => {
    setLoding(true);
    const response = await axios.get(`/api/user/${user.id}`);
    setUserData(response.data);
    setLoding(false);
  };

  useEffect(() => {
    user && getUser();
  }, [user]);

  return (
    <>
      {loding || !isLoaded ? (
        <Loading />
      ) : (
        <div className="sticky flex bottom-0 z-20 w-full bg-dark-1 px-6 py-3 items-center justify-between sm:hidden">
          <div className="fixed z-50 w-full h-16 max-w-lg -translate-x-1/2 bg-white border border-gray-200 rounded-full bottom-4 left-1/2 dark:bg-gray-700 dark:border-gray-600">
            <ul className="grid h-full max-w-lg grid-cols-5 mx-auto">
              <li
                className={`${
                  firstPath === "/" ? "bg-gray-200 " : ""
                } rounded-l-[2rem]  p-1 inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group`}
              >
                <Link
                  rel="noopener noreferrer"
                  href="/"
                  className="flex hover:bg-gray-300 items-center p-2 space-x-3 rounded-2xl"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    className="w-5 h-5 fill-current dark:text-gray-400 "
                  >
                    <path d="M469.666,216.45,271.078,33.749a34,34,0,0,0-47.062.98L41.373,217.373,32,226.745V496H208V328h96V496H480V225.958ZM248.038,56.771c.282,0,.108.061-.013.18C247.9,56.832,247.756,56.771,248.038,56.771ZM448,464H336V328a32,32,0,0,0-32-32H208a32,32,0,0,0-32,32V464H64V240L248.038,57.356c.013-.012.014-.023.024-.035L448,240Z"></path>
                  </svg>
                </Link>
              </li>

              <li
                className={`${
                  firstPath === "/profile" ? "bg-gray-200 " : ""
                }  p-1 inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group`}
              >
                <Link
                  rel="noopener noreferrer"
                  href={`/profile/${userData && userData._id}`}
                  className="flex hover:bg-gray-300 items-center p-2 space-x-3 rounded-2xl"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24"
                    viewBox="0 -960 960 960"
                    width="24"
                  >
                    <path d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q53 0 100-15.5t86-44.5q-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160Zm0-360q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0-60Zm0 360Z" />
                  </svg>
                </Link>
              </li>
              <li className={`flex items-center justify-center`}>
                <Link
                  rel="noopener noreferrer"
                  href="/create-post"
                  className="inline-flex items-center justify-center w-10 h-10 font-medium bg-blue-600 rounded-full hover:bg-blue-700 group focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800"
                >
                  <svg
                    className="w-4 h-4 text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 18 18"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 1v16M1 9h16"
                    />
                  </svg>
                  <span className="sr-only">New item</span>
                </Link>
              </li>
              <li
                className={`${
                  firstPath === "/whiteList" ? "bg-gray-200 " : ""
                } p-1 inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group`}
              >
                <Link
                  rel="noopener noreferrer"
                  href="/whiteList"
                  className="flex hover:bg-gray-300 items-center p-2 space-x-3 rounded-2xl"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    className="w-5 h-5 fill-current dark:text-gray-400"
                  >
                    <path d="M453.122,79.012a128,128,0,0,0-181.087.068l-15.511,15.7L241.142,79.114l-.1-.1a128,128,0,0,0-181.02,0l-6.91,6.91a128,128,0,0,0,0,181.019L235.485,449.314l20.595,21.578.491-.492.533.533L276.4,450.574,460.032,266.94a128.147,128.147,0,0,0,0-181.019ZM437.4,244.313,256.571,425.146,75.738,244.313a96,96,0,0,1,0-135.764l6.911-6.91a96,96,0,0,1,135.713-.051l38.093,38.787,38.274-38.736a96,96,0,0,1,135.765,0l6.91,6.909A96.11,96.11,0,0,1,437.4,244.313Z"></path>
                  </svg>
                </Link>
              </li>
              <li
                className={`${
                  firstPath === "/logout" ? "bg-gray-200 " : ""
                } rounded-r-[2rem]  p-1 inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group`}
              >
                <div
                  rel="noopener noreferrer"
                  className="flex items-center p-2 space-x-3 rounded-md"
                >
                  <SignedIn>
                    <button
                      onClick={() => {
                        Logout();
                        signOut(() => router.push("/sign-in"));
                      }}
                      className="text-black"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        className="w-5 h-5 fill-current dark:text-gray-400"
                      >
                        <path d="M440,424V88H352V13.005L88,58.522V424H16v32h86.9L352,490.358V120h56V456h88V424ZM320,453.642,120,426.056V85.478L320,51Z"></path>
                        <rect width="32" height="64" x="256" y="232"></rect>
                      </svg>
                    </button>
                  </SignedIn>
                </div>
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
}

export default BotttomBar;
