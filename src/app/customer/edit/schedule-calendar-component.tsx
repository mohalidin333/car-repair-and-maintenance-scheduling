"use client";

import React, { useEffect, useState } from "react";
import { Dates } from "../../schedule/types/dates";
import { listDays } from "../../schedule/utils/list-days";
import CalendarComponent from "../../schedule/components/calendar-component";
import { weeks } from "@/app/schedule/constant/weeks";
import { months } from "@/app/schedule/constant/month";

export default function ScheduleCalendarComponent({
  onSubmit,
}: {
  onSubmit: (schedule: string) => void;
}) {
  const date = new Date();
  const currentYear = date.getFullYear();
  const indexOfCurrentMonth = date.getMonth();
  const currentDate = date.getDate();
  const lastDayOfCurrentMonth = new Date(
    currentYear,
    indexOfCurrentMonth + 1,
    0
  );
  const [dates, setDates] = useState<Dates[]>([]);
  const [selectedMonth, setSelectedMonth] =
    useState<number>(indexOfCurrentMonth);
  const [selectedDate, setSelectedDate] = useState<number>(currentDate);
  const [selectedTime, setSelectedTime] = useState<string>("");

  const handleMonthSelection = (selection: string) => {
    if (selection === "next") {
      setSelectedMonth((prev) => prev + 1);
    } else {
      setSelectedMonth((prev) => prev - 1);
    }
  };

  const handleDateSelection = (date: number) => {
    setSelectedDate(date);
  };

  const handleTimeSelection = (time: string) => {
    setSelectedTime(time);
    const day = new Date(currentYear, selectedMonth, selectedDate).getDay();
    const schedule = `${weeks[day]} ${months[selectedMonth]} ${selectedDate}, ${time}`;

    onSubmit(schedule);
  };

  useEffect(() => {
    listDays(
      lastDayOfCurrentMonth,
      currentYear,
      selectedMonth,
      currentDate,
      setDates
    );
  }, [
    currentYear,
    indexOfCurrentMonth,
    currentDate,
    selectedMonth,
    selectedDate,
  ]);

  return (
    <CalendarComponent
      {...{
        handleMonthSelection,
        selectedMonth,
        indexOfCurrentMonth,
        selectedDate,
        dates,
        handleDateSelection,
        handleTimeSelection,
        selectedTime,
      }}
    />
  );
}
