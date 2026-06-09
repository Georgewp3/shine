export type ScheduleDay = {
  day: string;
  hours: string;
  closed?: boolean;
};

export const schedule: ScheduleDay[] = [
  { day: 'Monday', hours: 'Closed', closed: true },
  { day: 'Tuesday', hours: '2:15 PM - 8:00 PM' },
  { day: 'Wednesday', hours: '2:15 PM - 8:00 PM' },
  { day: 'Thursday', hours: '2:15 PM - 8:00 PM' },
  { day: 'Friday', hours: '2:15 PM - 8:00 PM' },
  { day: 'Saturday', hours: '9:00 AM - 4:00 PM' },
  { day: 'Sunday', hours: 'Closed', closed: true },
];
