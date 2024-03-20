"use client";

import {
  SignedIn,
  UserButton,
  useClerk,
} from "@clerk/nextjs";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "@/components/loader/sideBar_loader";
import create_post from "../../../public/assets/create_post.png";
import SearchIcon from "../../../public/assets/search.png";
import Image from "next/image";
import "@/app/globals.css";
import { Logout } from "@/lib/actions/feetch-post";

function sidebar() {
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

  const pathTitles = [
    { path: '/', title: 'Dashboard' },
    { path: '/create-post', title: 'Create Post' },
    { path: '/profile', title: 'Profile' },
    { path: '/search', title: 'Search' },
    { path: '/whiteList', title: 'Wishlist' },
    { path: '/logout', title: 'Logout' },
  ];

  const currentTitle = pathTitles.find((ele)=>ele.path === firstPath)?.title || 'Dashboard';

  return (
    <>
      {loding || !isLoaded ? (
        <Loading />
      ) : (
        <div className="flex flex-col sticky left-0 top-0 z-20 h-screen p-3 w-60 md:w-[17vw] max-sm:hidden dark:bg-gray-900 dark:text-gray-100 custom-scrollbar overflow-auto ">
          <div className="space-y-3">
            <div className="my-3">
              <h2 className="text-xl font-medium">{currentTitle}</h2>
            </div>

            <div className="flex-1 ">
              <ul className="pt-2 pb-4 space-y-2 text-sm">
                <li
                  className={`${
                    firstPath === "/" ? "bg-gray-400" : ""
                  } rounded-lg p-1 `}
                >
                  <Link
                    rel="noopener noreferrer"
                    href="/"
                    className="flex items-center p-2 space-x-3 rounded-md"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      className="w-5 h-5 fill-current dark:text-gray-400 "
                    >
                      <path d="M469.666,216.45,271.078,33.749a34,34,0,0,0-47.062.98L41.373,217.373,32,226.745V496H208V328h96V496H480V225.958ZM248.038,56.771c.282,0,.108.061-.013.18C247.9,56.832,247.756,56.771,248.038,56.771ZM448,464H336V328a32,32,0,0,0-32-32H208a32,32,0,0,0-32,32V464H64V240L248.038,57.356c.013-.012.014-.023.024-.035L448,240Z"></path>
                    </svg>
                    <span>Home</span>
                  </Link>
                </li>
                <li
                  className={`${
                    firstPath === "/create-post" ? "bg-gray-400" : ""
                  } rounded-lg p-1 `}
                >
                  <Link
                    href={{
                      pathname: "/create-post",
                      query: { id: userData && userData._id }, 
                    }}
                    className="flex items-center p-2 space-x-3 rounded-md"
                  >
                    <Image
                      src={create_post}
                      height={19}
                      width={19}
                      alt="Post"
                    />
                    <span>Post</span>
                  </Link>
                </li>
               
                <li
                  className={`${
                    firstPath === "/search" ? "bg-gray-400" : ""
                  } rounded-lg p-1 `}
                >
                  <Link
                    href="/search"
                    className="flex items-center p-2 space-x-3 rounded-md"
                  >
                    <Image
                      src={SearchIcon}
                      height={19}
                      width={19}
                      alt="Search"
                    />
                    <span>Search</span>
                  </Link>
                </li>
                <li className="rounded-lg dark:bg-gray-800 dark:text-gray-50">
                  <Link
                    href={`/profile/${userData && userData._id}`}
                    className="flex items-center p-2 space-x-3 rounded-md"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24"
                      viewBox="0 -960 960 960"
                      width="24"
                    >
                      <path d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q53 0 100-15.5t86-44.5q-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160Zm0-360q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0-60Zm0 360Z" />
                    </svg>
                    <span>Profile</span>
                  </Link>
                </li>
                <li className="rounded-lg dark:bg-gray-800 dark:text-gray-50">
                  <Link
                    rel="noopener noreferrer"
                    href='/whiteList'
                    className="flex items-center p-2 space-x-3 rounded-md"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      className="w-5 h-5 fill-current dark:text-gray-400"
                    >
                      <path d="M453.122,79.012a128,128,0,0,0-181.087.068l-15.511,15.7L241.142,79.114l-.1-.1a128,128,0,0,0-181.02,0l-6.91,6.91a128,128,0,0,0,0,181.019L235.485,449.314l20.595,21.578.491-.492.533.533L276.4,450.574,460.032,266.94a128.147,128.147,0,0,0,0-181.019ZM437.4,244.313,256.571,425.146,75.738,244.313a96,96,0,0,1,0-135.764l6.911-6.91a96,96,0,0,1,135.713-.051l38.093,38.787,38.274-38.736a96,96,0,0,1,135.765,0l6.91,6.909A96.11,96.11,0,0,1,437.4,244.313Z"></path>
                    </svg>
                    <span>Wishlist</span>
                  </Link>
                </li>
                <li
                  className={`${
                    firstPath === "/setting" ? "bg-gray-400" : ""
                  } rounded-lg p-1 `}
                >
                  <Link
                    rel="noopener noreferrer"
                    href="#"
                    className="flex items-center p-2 space-x-3 rounded-md"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      className="w-5 h-5 fill-current dark:text-gray-400"
                    >
                      <path d="M245.151,168a88,88,0,1,0,88,88A88.1,88.1,0,0,0,245.151,168Zm0,144a56,56,0,1,1,56-56A56.063,56.063,0,0,1,245.151,312Z"></path>
                      <path d="M464.7,322.319l-31.77-26.153a193.081,193.081,0,0,0,0-80.332l31.77-26.153a19.941,19.941,0,0,0,4.606-25.439l-32.612-56.483a19.936,19.936,0,0,0-24.337-8.73l-38.561,14.447a192.038,192.038,0,0,0-69.54-40.192L297.49,32.713A19.936,19.936,0,0,0,277.762,16H212.54a19.937,19.937,0,0,0-19.728,16.712L186.05,73.284a192.03,192.03,0,0,0-69.54,40.192L77.945,99.027a19.937,19.937,0,0,0-24.334,8.731L21,164.245a19.94,19.94,0,0,0,4.61,25.438l31.767,26.151a193.081,193.081,0,0,0,0,80.332l-31.77,26.153A19.942,19.942,0,0,0,21,347.758l32.612,56.483a19.937,19.937,0,0,0,24.337,8.73l38.562-14.447a192.03,192.03,0,0,0,69.54,40.192l6.762,40.571A19.937,19.937,0,0,0,212.54,496h65.222a19.936,19.936,0,0,0,19.728-16.712l6.763-40.572a192.038,192.038,0,0,0,69.54-40.192l38.564,14.449a19.938,19.938,0,0,0,24.334-8.731L469.3,347.755A19.939,19.939,0,0,0,464.7,322.319Zm-50.636,57.12-48.109-18.024-7.285,7.334a159.955,159.955,0,0,1-72.625,41.973l-10,2.636L267.6,464h-44.89l-8.442-50.642-10-2.636a159.955,159.955,0,0,1-72.625-41.973l-7.285-7.334L76.241,379.439,53.8,340.562l39.629-32.624-2.7-9.973a160.9,160.9,0,0,1,0-83.93l2.7-9.972L53.8,171.439l22.446-38.878,48.109,18.024,7.285-7.334a159.955,159.955,0,0,1,72.625-41.973l10-2.636L222.706,48H267.6l8.442,50.642,10,2.636a159.955,159.955,0,0,1,72.625,41.973l7.285,7.334,48.109-18.024,22.447,38.877-39.629,32.625,2.7,9.972a160.9,160.9,0,0,1,0,83.93l-2.7,9.973,39.629,32.623Z"></path>
                    </svg>
                    <span>Settings</span>
                  </Link>
                </li>
                <li
                  className={`${
                    firstPath === "/logout" ? "bg-gray-400" : ""
                  } rounded-lg p-1  cursor-pointer`}
                >
                  <div
                    rel="noopener noreferrer"
                    className="flex items-center p-2 space-x-3 rounded-md"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      className="w-5 h-5 fill-current dark:text-gray-400"
                    >
                      <path d="M440,424V88H352V13.005L88,58.522V424H16v32h86.9L352,490.358V120h56V456h88V424ZM320,453.642,120,426.056V85.478L320,51Z"></path>
                      <rect width="32" height="64" x="256" y="232"></rect>
                    </svg>
                    <SignedIn>
                      <button
                        onClick={() => {Logout();signOut(() => router.push("/sign-in"))}}
                        className="text-black"
                      >
                        Logout
                      </button>
                    </SignedIn>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex items-center p-2 mt-5 space-x-4 justify-self-end">
            <SignedIn>
              <UserButton />
            </SignedIn>
            <div>
              <h2 className="text-lg font-semibold">
                {userData?.firstName} {userData?.lastName}
              </h2>
              <span className="flex items-center space-x-1">
                <a
                  rel="noopener noreferrer"
                  href="#"
                  className="text-xs hover:underline dark:text-gray-400"
                >
                  View profile
                </a>
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default sidebar;
