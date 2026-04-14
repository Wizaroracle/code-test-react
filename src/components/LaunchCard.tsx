import { useState } from "react";
import type { Launch } from "../types/launch";
import StatusBadge from "./StatusBadge";
import { timeAgo } from "../hooks/timeConverter";
import { getStatus } from "../hooks/getStatus";

interface Props {
  launch: Launch;
}

const LaunchCard = ({ launch }: Props) => {
  const [expanded, setExpanded] = useState(false);
  const status = getStatus(launch);

  return (
    <div className="bg-white rounded-md shadow-sm border border-gray-200 p-4 mb-3">
      <div className="flex items-center mb-3">
        <span className="text-xl font-bold text-gray-900">
          {launch.mission_name}
        </span>
        <StatusBadge status={status} />
      </div>

      {expanded && (
        <div className="mb-3">
          <p className="text-sm text-gray-400 mb-3">
            {timeAgo(launch.launch_date_utc)}
            {launch.links.article_link && (
              <>
                {" | "}
                <a
                  href={launch.links.article_link}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  Article
                </a>
              </>
            )}
            {launch.links.video_link && (
              <>
                {" | "}
                <a
                  href={launch.links.video_link}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  Video
                </a>
              </>
            )}
          </p>

          <div className="flex gap-4 items-start">
            {launch.links.mission_patch_small ? (
              <img
                src={launch.links.mission_patch_small}
                alt={`${launch.mission_name}`}
                className="w-20 h-20 object-contain shrink-0"
              />
            ) : null}

            <div className="flex-1">
              {!launch.links.mission_patch_small && !launch.details && (
                <span className="text-sm text-gray-400 italic">
                  No image yet.
                </span>
              )}

              {launch.details ? (
                <p className="text-sm text-gray-700 leading-relaxed">
                  {launch.details}
                </p>
              ) : (
                <p className="text-sm text-gray-700 leading-relaxed font-bold text-center">
                  No Details
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => setExpanded((prev) => !prev)}
        className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold px-4 py-2 rounded transition-colors duration-150"
      >
        {expanded ? "HIDE" : "VIEW"}
      </button>
    </div>
  );
};

export default LaunchCard;
