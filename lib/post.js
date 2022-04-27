import useSWRInfinite from "swr/infinite";
import axios from "axios";

const fetcher = (url) => axios.get(url).then((res) => res.data);

export function usePostPages({ creatorId, byUserLiked, limit = 10 } = {}) {
  const { data, error, size, ...props } = useSWRInfinite(
    (index, previousPageData) => {
      // reached the end
      if (previousPageData && !previousPageData.posts.length) return null;

      // build the url
      const searchParams = new URLSearchParams();
      searchParams.set("limit", limit);

      // for user related post
      if (creatorId) searchParams.set("by", creatorId);

      if (byUserLiked) searchParams.set("like", byUserLiked);

      if (index !== 0) {
        // using oldest posts createdAt date as cursor
        const before = new Date(
          new Date(
            previousPageData.posts[previousPageData.posts.length - 1].createdAt
          ).getTime() - 1
        );

        searchParams.set("before", before.toJSON());
      }

      return `/api/post?page=${index + 1}&${searchParams.toString()}`;
    },
    fetcher,
    {
      refreshInterval: 10000,
      revalidateAll: false,
    }
  );

  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === "undefined");
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.posts?.length < limit);

  return {
    data,
    error,
    size,
    isLoadingMore,
    isReachingEnd,
    ...props,
  };
}
