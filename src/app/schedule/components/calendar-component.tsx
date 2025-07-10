import { ArrowLeft, ArrowRight } from "lucide-react";
import React from "react";
import { months } from "../constant/month";
import { weeks } from "../constant/weeks";
import { checkScheduledTimes } from "../utils/check-scheduled-times";
import { CalendarComponentPropsType } from "../types/calendar-component-props-type";

export default function CalendarComponent({
  handleMonthSelection,
  selectedMonth,
  indexOfCurrentMonth,
  selectedDate,
  dates,
  handleDateSelection,
  handleTimeSelection,
}: CalendarComponentPropsType) {
  return (
    <div className="flex flex-col gap-4">
      {/* months */}
      <div className="flex items-center gap-4 justify-between">
        <button
          onClick={() => handleMonthSelection("previous")}
          disabled={selectedMonth <= indexOfCurrentMonth}
          className={`${
            selectedMonth <= indexOfCurrentMonth
              ? "bg-muted cursor-not-allowed"
              : "cursor-pointer"
          } border py-1 px-2 rounded-md`}
        >
          <ArrowLeft />
        </button>

        <div className="border py-1 px-2 rounded-md">
          {months[selectedMonth]}
        </div>

        <button
          onClick={() => handleMonthSelection("next")}
          disabled={selectedMonth >= 11}
          className={`${
            selectedMonth >= 11
              ? "bg-muted cursor-not-allowed"
              : "cursor-pointer"
          } border py-1 px-2 rounded-md`}
        >
          <ArrowRight />
        </button>
      </div>

      {/* days */}
      <div className="grid grid-cols-7">
        {weeks.map((w, weekIndex) => {
          return (
            <div key={weekIndex} className="flex flex-col">
              <p className="border-b border-x py-1 px-2">{w}</p>
              {dates.map(
                (d, dateIndex) =>
                  d.day === weekIndex && (
                    <button
                      key={dateIndex}
                      onClick={() => handleDateSelection(d.date)}
                      disabled={d.isRestDay || d.isHoliday || d.isPastDate}
                      className={`${
                        d.isNoTimeAvailable ||
                        d.isRestDay ||
                        d.isHoliday ||
                        d.isPastDate
                          ? "bg-muted cursor-not-allowed"
                          : d.date === selectedDate
                          ? "bg-blue-100"
                          : "cursor-pointer"
                      } border h-10 px-2`}
                    >
                      {d.date}
                    </button>
                  )
              )}
            </div>
          );
        })}
      </div>

      {/* times */}
      <div className="flex flex-wrap gap-2">
        {dates.map(
          (d) =>
            d.date === selectedDate &&
            d.availableTimes.map((t, timesIndex) => (
              <div
                key={timesIndex}
                onClick={() => handleTimeSelection(t)}
                className={`${checkScheduledTimes(
                  selectedMonth,
                  selectedDate,
                  t
                )} border py-1 px-2 rounded-md cursor-pointer`}
              >
                {t}
              </div>
            ))
        )}
      </div>
    </div>
  );
}
