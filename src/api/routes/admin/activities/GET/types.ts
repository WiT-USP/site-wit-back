export interface Activity {
  activityId: number;
  eventName: string;
  date: string;
  activityName: string;
  cerficated: boolean;
}

export interface Body {}

export interface Query {
  searchParam: string;
}
