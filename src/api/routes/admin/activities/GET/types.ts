export interface Activity {
  activityId: number;
  eventName: string;
  startDate: string;
  endDate: string;
  activityName: string;
  cerficated: boolean;
}

export interface Body {}

export interface Query {
  searchParam: string;
}
