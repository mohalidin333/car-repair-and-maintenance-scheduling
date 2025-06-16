import Link from "next/link";
import React from "react";

export default function ScheduleSection() {
  return (
    <div className="bg-white px-8 py-[5rem] text-center">
      <div className="items-center flex flex-col gap-4 max-w-2xl mx-auto">
        <p className="bg-white px-2 py-1 rounded-full border text-gray-500 text-sm font-semibold">
          Schedule
        </p>
        <h1 className="title">Book Your Appointment</h1>
        <p className="sub-title">
          Schedule your car service or repair appointment online with ease.
        </p>

        <Link href="/schedule" className="cta mt-4">
          Start Scheduling
        </Link>
      </div>
    </div>
  );
}
