import { Calendar, Pen, User2 } from "lucide-react";
import React from "react";
import { Details } from "./details-type";

export default function SchedulePersonalComponent({
  handleEditSchedule,
  schedule,
  handleEditAppointment,
  details,
}: {
  handleEditSchedule: () => void;
  schedule: string | undefined;
  handleEditAppointment: () => void;
  details: Details | undefined;
}) {
  return (
    <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
      {/* schedule date */}
      <div className="border rounded-md p-4 space-y-8">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-blue-100 text-blue-500 p-4 rounded-full">
              <Calendar size={15} />
            </div>
            <p className="font-bold text-lg">Schedule Date</p>
          </div>
          <button
            onClick={handleEditSchedule}
            className="p-2 rounded-md hover:bg-gray-100 cursor-pointer"
          >
            <Pen size={15} />
          </button>
        </div>

        <div>
          <p className="text-sm font-semibold text-muted-foreground">
            SCHEDULE DATE
          </p>
          <p className="font-semibold text-lg">{schedule}</p>
        </div>
      </div>

      {/* personal information */}
      <div className="border rounded-md p-4 space-y-8">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-green-100 text-green-500 p-4 rounded-full">
              <User2 size={15} />
            </div>
            <p className="font-bold text-lg">Personal Information</p>
          </div>
          <button
            onClick={handleEditAppointment}
            className="p-2 rounded-md hover:bg-gray-100 cursor-pointer"
          >
            <Pen size={15} />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-semibold text-muted-foreground">
              FULL NAME
            </p>
            <p className="font-semibold text-lg">
              {details?.firstname} {details?.lastname}
            </p>
          </div>

          <div>
            <p className="font-semibold text-sm text-muted-foreground">
              CONTACT
            </p>
            <p className="font-semibold text-lg">{details?.contact}</p>
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold text-muted-foreground">ADDRESS</p>
          <p className="font-semibold text-lg">{details?.address}</p>
        </div>
      </div>
    </div>
  );
}
