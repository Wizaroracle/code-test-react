export interface Launch {
  flight_number: number;
  mission_name: string;
  launch_date_utc: string;
  launch_success: boolean | null;
  upcoming: boolean;
  details: string | null;

  // Rocket information
  rocket: {
    rocket_name: string;
    rocket_type: string;
    first_stage: {
      cores: Array<{
        core_serial: string;
        reused: boolean;
        flight?: number;
        land_success?: boolean | null;
      }>;
    };
  };

  links: {
    mission_patch_small: string | null;
    mission_patch?: string | null;
    article_link: string | null;
    video_link: string | null;
  };
}

export type LaunchStatus = "upcoming" | "success" | "failed";
