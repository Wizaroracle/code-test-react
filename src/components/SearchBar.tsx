import { useEffect, useState } from "react";
import { useLaunchContext } from "../context/LaunchContext";

const SearchBar = () => {
  const { setSearchQuery } = useLaunchContext();
  const [input, setInput] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery(input);
    }, 400);

    return () => clearTimeout(timer);
  }, [input, setSearchQuery]);

  return (
    <div className="bg-white rounded-md shadow-sm border border-gray-200 px-4 py-3 mb-4">
      <input
        type="text"
        placeholder="Search..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full outline-none text-gray-700 text-sm placeholder-gray-400"
      />
    </div>
  );
};

export default SearchBar;
