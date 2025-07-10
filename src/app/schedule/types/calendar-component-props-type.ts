import { Dates } from "./dates";

export type CalendarComponentPropsType = {
  handleMonthSelection: (selection: string) => void;
  selectedMonth: number;
  indexOfCurrentMonth: number;
  selectedDate: number;
  dates: Dates[];
  handleDateSelection: (date: number) => void;
  handleTimeSelection: (time: string) => void;
};
