"use client";
import { GetPopularStar } from "@/lib/actions/No_action";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Trending_Loader from "../loader/Trending_Loader";

function RightSidebar() {
  const { user, isLoaded } = useUser();
  const [loding, setLoding] = useState(true);
  const [userData, setUserData] = useState([]);
  
  const getPopularUser = async () => {
    setLoding(true);
    const response = await GetPopularStar();
    console.log(response);
    setUserData(response);
    setLoding(false)
  };

  useEffect(() => {
    if(userData.length<4) user && getPopularUser();
  }, [userData, user]);

  return (<>
  {loding || !isLoaded ? (
        <Trending_Loader />
      ) : (
    <div className="sticky right-0 top-0 z-20 h-screen w-[25rem] xl:w-[28rem] flex flex-col overflow-auto pl-6 pr-4 py-6 max-md:hidden">
      <div className="flex flex-col items-center justify-between">
        <h2 className="text-2xl font-bold mb-[1.5rem] w-full ">Trending Stars</h2>

        <div className=" divide-y-2 mx-auto w-full max-w-xl rounded-lg flex flex-col gap-4 bg-dark-1 p-2 max-sm:gap-2">
          {console.log(userData.length >0 && userData )}
          {(userData.length>0) &&
            userData.map((user, idx) => (
              <div key={idx} className="flex gap-x-9 p-2 gap-y-5 ">
                <Link href={`/profile/${user._id}`} className="flex gap-x-4">
                  <Image
                    src={user.profilePhoto}
                    alt="profile photo"
                    width={50}
                    height={50}
                    className="rounded-full"
                  />
                </Link>
                <div className="flex flex-col gap-1">
                  <p className="text-small-semibold text-light-1">
                    {user.firstName} {user.lastName}
                  </p>
                  <p className="text-subtle-medium text-light-3">
                    @{user.username}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>)}
    </>
  );
}
export default RightSidebar;
