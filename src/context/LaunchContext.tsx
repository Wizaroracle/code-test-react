import {
  createContext,
  useContext,
  useState,
  useRef,
  type ReactNode,
} from "react";
import type { Launch } from "../types/launch";

const LIMIT = 10;
const API_URL = "https://api.spacexdata.com/v3/launches";

interface LaunchContextType {
  launches: Launch[];
  loading: boolean;
  hasMore: boolean;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  fetchMoreLaunches: () => void;
  resetAndFetch: () => void;
}

const LaunchContext = createContext<LaunchContextType | undefined>(undefined);

export const LaunchProvider = ({ children }: { children: ReactNode }) => {
  const [launches, setLaunches] = useState<Launch[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const offsetRef = useRef(0);

  const fetchLaunches = async (offset: number, query: string) => {
    setLoading(true);

    try {
      const response = await fetch(
        `${API_URL}?limit=${LIMIT}&offset=${offset}`,
      );

      const data: Launch[] = await response.json();
      console.log(data);
      const filteredData = query.trim()
        ? data.filter((launch) =>
            launch.mission_name.toLowerCase().includes(query.toLowerCase()),
          )
        : data;

      setHasMore(data.length === LIMIT);

      setLaunches((prev) =>
        offset === 0 ? filteredData : [...prev, ...filteredData],
      );
    } catch (error) {
      console.error("Error fetching launches:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMoreLaunches = () => {
    if (loading || !hasMore) return;

    const nextOffset = offsetRef.current + LIMIT;
    offsetRef.current = nextOffset;

    fetchLaunches(nextOffset, searchQuery);
  };

  const resetAndFetch = () => {
    offsetRef.current = 0;
    setLaunches([]);
    setHasMore(true);

    fetchLaunches(0, searchQuery);
  };

  return (
    <LaunchContext.Provider
      value={{
        launches,
        loading,
        hasMore,
        searchQuery,
        setSearchQuery,
        fetchMoreLaunches,
        resetAndFetch,
      }}
    >
      {children}
    </LaunchContext.Provider>
  );
};

export const useLaunchContext = () => {
  const context = useContext(LaunchContext);

  if (!context) {
    throw new Error("useLaunchContext must be used within LaunchProvider");
  }

  return context;
};
