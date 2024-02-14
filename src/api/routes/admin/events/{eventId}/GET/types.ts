export interface Event {
  eventId: number;
  eventName: string;
  description?: string;
  hasCover: boolean;
  driveGalleryLink?: string;
  coffeeValue?: string;
  startDate: string;
  endDate: string;
}
