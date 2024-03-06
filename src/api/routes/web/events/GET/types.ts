export interface Event {
  eventId: number;
  eventName: string;
  startDate: string;
  endDate: string;
  activities: number;
}

export interface Body {}

export interface Query {
  searchParam: string;
}
