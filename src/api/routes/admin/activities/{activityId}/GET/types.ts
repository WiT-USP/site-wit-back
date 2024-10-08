export interface Activity {
  activityId: number;
  activityName: string;
  startTime: string;
  endTime?: string;
  description?: string;
  subject: string;
  responsible: string;
  eventId: number;
  registrationAt: string;
}
