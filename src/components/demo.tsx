import { LaunchProvider } from "../context/LaunchContext";
import LaunchList from "./LaunchList";
import SearchBar from "./SearchBar";

const Demo = () => {
  return (
    <LaunchProvider>
      <div className="min-h-screen bg-gray-100 py-6 px-4">
        <div className="max-w-lg mx-auto">
          <SearchBar />
          <LaunchList />
        </div>
      </div>
    </LaunchProvider>
  );
};

export default Demo;
