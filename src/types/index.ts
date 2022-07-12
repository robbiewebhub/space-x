interface LaunchSite {
  site_id: string;
  site_name_long: string;
  site_name: string;
}

interface LaunchLinks {
  article_link: string;
}

interface LaunchRocket {
  rocket_name: string;
  rocket_type: string;
}

interface Ship {
  model: string;
  name: string;
  status: string;
  successful_landings: number;
  type: string;
}

interface LaunchFind {
  rocket_name?: string;
  mission_name?: string;
}

export interface Launch {
  details: string;
  id: string;
  is_tentative: boolean;
  launch_date_local: string;
  launch_site: LaunchSite;
  launch_success: Boolean;
  launch_year: string;
  links: LaunchLinks;
  mission_name: string;
  rocket: LaunchRocket;
  upcoming: Boolean;
  ships: [Ship];
}

export interface LaunchInput {
  limit?: number;
  offset?: number;
  filter?: LaunchFind;
}

export interface LaunchResponse {
  launchesPast: Launch[];
}
