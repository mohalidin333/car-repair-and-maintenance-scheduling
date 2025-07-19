export type AvailabilityConfig = {
  isScheduleAvailable: boolean;
  availableTimes: string[];
  restDays: number[];
  holidays: { month: number; date: number }[];
};
