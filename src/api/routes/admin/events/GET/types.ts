export interface Event {
  eventId: number;
  eventName: string;
  startDate: string;
  endDate: string;
  hasCover: boolean;
  hasCoffee: boolean;
}

export interface Body {}

export interface Query {
  searchParam: string;
}
