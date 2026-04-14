import type { LaunchStatus } from "../types/launch";

interface Props {
  status: LaunchStatus;
}

const badgeStyles: Record<LaunchStatus, string> = {
  upcoming: "bg-cyan-400 text-white",
  success: "bg-green-500 text-white",
  failed: "bg-red-500 text-white",
};

const StatusBadge = ({ status }: Props) => {
  return (
    <span
      className={`ml-2 px-2 py-0.5 text-xs font-semibold rounded ${badgeStyles[status]}`}
    >
      {status}
    </span>
  );
};

export default StatusBadge;
