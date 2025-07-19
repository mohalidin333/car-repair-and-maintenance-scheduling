"use client";

import React, { useEffect, useState } from "react";
import { months } from "./constant/month";
import { Dates } from "./types/dates";
import { weeks } from "./constant/weeks";
import { listDays } from "./utils/list-days";
import { scheduleStore } from "./store/schedule";
import { useRouter } from "next/navigation";
import CalendarComponent from "./components/calendar-component";
import IndicatorComponent from "./components/indicator-component";

export default function SchedulePage() {
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
  const [selectedTime, setSelectedTime] = useState<string>("")
  const router = useRouter();

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
    setSelectedTime(time)
    const day = new Date(currentYear, selectedMonth, selectedDate).getDay();
    const schedule = { month: selectedMonth, date: selectedDate, day, time };
    scheduleStore.setState((prev) => ({
      ...prev,
      date:
        weeks[schedule.day] +
        " " +
        months[schedule.month] +
        " " +
        schedule.date +
        " " +
        schedule.time,
    }));
    localStorage.setItem(
      "appointment_schedule",
      JSON.stringify({
        date:
          weeks[schedule.day] +
          " " +
          months[schedule.month] +
          " " +
          schedule.date +
          ", " +
          schedule.time,
      })
    );

    router.push("/schedule/appointment");
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
    <div className="space-y-8 px-4 py-8 max-w-screen-lg mx-auto">
      <h1 className="text-center text-3xl">Select date & time</h1>

      <IndicatorComponent />

      <CalendarComponent
        {...{
          handleMonthSelection,
          selectedMonth,
          indexOfCurrentMonth,
          selectedDate,
          dates,
          handleDateSelection,
          handleTimeSelection,
          selectedTime
        }}
      />
    </div>
  );
}
