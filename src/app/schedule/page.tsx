"use client";
import React, { useEffect, useState } from "react";

type Month = { title: string; number: number };
type AvailabaleTimeSlot = {
  month: number;
  days: { day: number; time: string[] }[];
};
// months
const months: Month[] = [
  { title: "January", number: 1 },
  { title: "February", number: 2 },
  { title: "March", number: 3 },
  { title: "April", number: 4 },
  { title: "May", number: 5 },
  { title: "June", number: 6 },
  { title: "July", number: 7 },
  { title: "August", number: 8 },
  { title: "September", number: 9 },
  { title: "October", number: 10 },
  { title: "November", number: 11 },
  { title: "December", number: 12 },
];
// avatable time of each month
const availableTimeSlots: AvailabaleTimeSlot[] = [
  {
    month: 2,
    days: [
      {
        day: 4,
        time: ["10:00 AM", "11:00 AM", "12:00 PM"],
      },
      {
        day: 2,
        time: ["9:00 AM", "10:00 AM", "11:00 AM"],
      },
      {
        day: 3,
        time: ["1:00 PM", "2:00 PM", "3:00 PM"],
      },
    ],
  },
];

export default function SchedulePage() {
  const date = new Date();
  const currentMonth = date.getMonth() + 1;
  const currentYear = date.getFullYear();
  const [totalDays, setTotalDays] = useState<{ day: number; time: string[] }[]>(
    []
  );
  const [selectedDate, setSelectedDate] = useState<number>(1);
  const selectedDay = totalDays.find((day) => day.day === selectedDate);

  // get all days in selected month with available time slots
  function getDaysInMonth(month: number, year: number) {
    setTotalDays([]);
    const days = new Date(year, month, 0).getDate();
    for (let i = 0; i < days; i++) {
      const day = i + 1;
      // check if current month has available time slots
      const availableSlot = availableTimeSlots.find(
        (slot) => slot.month === month
      );
      // find the time slots for the current day
      const timeSlots = availableSlot
        ? availableSlot.days.find((d) => d.day === day)?.time || []
        : [];

      setTotalDays((prev) => [...prev, { day, time: timeSlots }]);
    }
  }

  useEffect(() => {
    getDaysInMonth(currentMonth, currentYear);
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4 flex-wrap">
        {/* month selector */}
        {months.map((month, index) => (
          <div
            onClick={() => {
              getDaysInMonth(month.number, currentYear);
            }}
            key={index}
            className="text-sm font-semibold border border-gray-300 rounded-lg px-2 py-1 cursor-pointer hover:bg-gray-200 transition-colors"
          >
            {month.title}
          </div>
        ))}
      </div>

      <div className="grid-flow-row grid gap-4  grid-cols-[repeat(auto-fill,_minmax(50px,_1fr))]">
        {/* day selector */}
        {totalDays.map((day, index) => (
          <div
            onClick={() => setSelectedDate(day.day)}
            key={index}
            className="cursor-pointer flex items-center justify-center h-12 border rounded-md bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            {day.day}
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        {/* time slots of current date */}
        {selectedDay &&
          selectedDay.time.length > 0 &&
          selectedDay.time.map((time, index) => (
            <div
              key={index}
              className="cursor-pointer text-xs text-gray-600 border border-gray-300 rounded px-2 py-1 cursor-pointer hover:bg-gray-200 transition-colors"
            >
              {time}
            </div>
          ))}
      </div>
    </div>
  );
}
