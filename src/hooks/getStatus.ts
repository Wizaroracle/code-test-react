import type { Launch, LaunchStatus } from "../types/launch";

export const getStatus = (launch: Launch): LaunchStatus => {
  if (launch.upcoming) return "upcoming";
  if (launch.launch_success === true) return "success";
  if (launch.launch_success === false) return "failed";
  return "failed";
};
