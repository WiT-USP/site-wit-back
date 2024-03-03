interface Activity {
  activityName: string;
  activityId: number;
}

export interface Event {
  eventId: number;
  eventName: string;
  startDate: string;
  endDate: string;
  coffeePaymentURL: string;
  coffeeValue: string;
  galleryURL: string;
  activities: Activity[];
}
