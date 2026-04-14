import { useEffect } from "react";
import { useLaunchContext } from "../context/LaunchContext";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";
import LaunchCard from "./LaunchCard";
import Spinner from "./Spinner/Spinner";

const LaunchList = () => {
  const {
    launches,
    loading,
    hasMore,
    fetchMoreLaunches,
    resetAndFetch,
    searchQuery,
  } = useLaunchContext();

  useEffect(() => {
    resetAndFetch();
  }, [searchQuery]);

  const sentinelRef = useInfiniteScroll(fetchMoreLaunches, hasMore && !loading);

  return (
    <div>
      {launches.map((launch) => (
        <LaunchCard key={launch.flight_number} launch={launch} />
      ))}
      {loading && <Spinner />}
      {!loading && !hasMore && launches.length > 0 && (
        <p className="text-center text-gray-400 text-sm py-4">End of list.</p>
      )}
      {!loading && launches.length === 0 && (
        <p className="text-center text-gray-400 text-sm py-4">
          No results found.
        </p>
      )}
      <div ref={sentinelRef} className="h-1" />
    </div>
  );
};

export default LaunchList;
