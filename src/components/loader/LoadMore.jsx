import { useCallback, useEffect, useMemo, useState } from "react";
import { useInView } from "react-intersection-observer";
import { fetchPostsByPage } from "@/lib/actions/No_action";
import { Loading } from "@/components/loader/Circle_Loader";
import ShowAllCard from "@/components/card/ShowAllCard";

export default function LoadMore() {
  const [userData, setUserData] = useState([]);
  const [page, setPage] = useState(1);
  const { ref, inView } = useInView();
  const [hasMorePosts, setHasMorePosts] = useState(true);
  const [loading, setLoading] = useState(false);

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const loadMorePosts = useCallback(async () => {
    if (!hasMorePosts || loading) return;
    setLoading(true);
    try {
      await delay(1000);
      const nextPage = page + 1;
      const response = await fetchPostsByPage(nextPage);
      const newPosts = response || [];
      setUserData((prevPosts) => [...prevPosts, ...newPosts]);
      setPage(nextPage);
      if (newPosts.length === 0) {
        setHasMorePosts(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }, [hasMorePosts, loading, page]);

  const getFeedPost = useCallback(async () => {
    try {
      const response = await fetchPostsByPage(2, 3 * page, 3);
      setUserData(response);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    if (inView && hasMorePosts) {
      loadMorePosts();
    }
  }, [inView, hasMorePosts, loadMorePosts]);

  const memoizedGetFeedPost = useMemo(() => getFeedPost, [getFeedPost]);

  return (
    <>
      <ShowAllCard userData={userData} getFeedPost={memoizedGetFeedPost} />
      {!hasMorePosts ? (
        <div className="text-center text-gray-500 my-4">
          No more posts available
        </div>
      ) : (
        <div
          className="flex justify-center items-center p-4 col-span-1 sm:col-span-2 md:col-span-3"
          ref={ref}
        >
          <Loading />
        </div>
      )}
    </>
  );
}
