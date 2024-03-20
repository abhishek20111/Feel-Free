"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import Loader from "@/components/loader/main_content_loader";
import ShowAllCard from "@/components/card/ShowAllCard";
import { fetchPost } from "@/lib/actions/feetch-post";
import { fetchPostsByPage } from "@/lib/actions/No_action";
import LoadMore  from "@/components/loader/LoadMore.jsx";

export default function Home() {
  const { user, isLoaded } = useUser();
  const [loading, setLoading] = useState(true);
  const [userData, setuserData] = useState();
  const getFeedPost = async () => {
    try {
      // const response =  await fetchPost(1); //server Action
      const response = await fetchPostsByPage(1); //Normal api call
      console.log(response);
      setuserData(response);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    } 
   
  };

  useEffect(() => {
    if (!userData) {
      getFeedPost();
    }
  }, [userData]);

  


  return (
    <div className="flex flex-col gap-10">
      {loading || !isLoaded ? (
        <>
        <Loader />
        </>
      ) : user && ( 
        <>
        <ShowAllCard userData={userData} getFeedPost={getFeedPost}  />
        <LoadMore/>
        </>
      )}
    </div>
  );
}
