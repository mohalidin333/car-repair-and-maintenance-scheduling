"use client";
import React from "react";

export default function SchedulePage() {
  const date = new Date();
  const totalDays = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDate();

  return (
     <div className="grid-flow-row grid gap-4 w-full max-w-screen-md  grid-cols-[repeat(auto-fill,_minmax(50px,_1fr))]">
       

        {Array.from({ length: totalDays }, (_, i) => (
          <div
            key={i}
            className="flex justify-center items-center border rounded-xl p-4 text-center font-medium hover:bg-gray-100 transition"
          >
            {i + 1}
          </div>
        ))}
      </div>
  );
}
