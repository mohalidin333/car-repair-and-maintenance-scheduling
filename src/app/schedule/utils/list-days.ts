import { Dispatch, SetStateAction } from "react";
import { AvailabilityConfig } from "../types/availability-config";
import { Dates } from "../types/dates";

const availabilityConfig: AvailabilityConfig = {
  isScheduleAvailable: true,
  availableTimes: ["7:50 PM", "8:50 PM", "9:50 PM"],
  restDays: [5],
  holidays: [
    {
      month: 0,
      date: 1,
    },
  ],
};

export const listDays = (
  lastDayOfCurrentMonth: Date,
  currentYear: number,
  selectedMonth: number,
  currentDate: number,
  setDates: Dispatch<SetStateAction<Dates[]>>
) => {
  setDates([]);
  const arrayOfDates: Dates[] = Array.from(
    { length: lastDayOfCurrentMonth.getDate() },
    (_, index) => {
      const dateItem = index + 1;
      const currentMonth = new Date().getMonth();
      const dayItem = new Date(currentYear, selectedMonth, dateItem).getDay();
      const isPastDate =
        selectedMonth === currentMonth && dateItem < currentDate;
      const isRestDay = availabilityConfig.restDays.includes(dayItem);
      const isHoliday = availabilityConfig.holidays.some(
        (holiday) =>
          holiday.month === selectedMonth && holiday.date === dateItem
      );
      // check if time is available / current not past
      const currentTime = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
      const availableTimes = availabilityConfig.availableTimes.filter((t) => {
        const tMeridiem = t.split(" ")[1];
        const currentTimeMeridiem = currentTime.split(" ")[1];

        const [tHour, tMinute] = t.split(" ")[0].split(":");
        const [currentTimeHour, currentTimeMinute] = currentTime
          .split(" ")[0]
          .split(":");

        const tTime =
          tMeridiem === "PM" && tHour !== "12"
            ? (Number(tHour) + 12) * 60 + Number(tMinute)
            : Number(tHour) * 60 + Number(tMinute);

        const currentTimeTime =
          currentTimeMeridiem === "PM" && currentTimeHour !== "12"
            ? (Number(currentTimeHour) + 12) * 60 + Number(currentTimeMinute)
            : Number(currentTimeHour) * 60 + Number(currentTimeMinute);

        return tTime >= currentTimeTime;
      });
      const isNoTimeAvailable = availableTimes.length === 0;

      return {
        date: dateItem,
        day: dayItem,
        availableTimes,
        isRestDay,
        isHoliday,
        isPastDate,
        isNoTimeAvailable,
      };
    }
  );
  setDates(arrayOfDates);
};
