import { CircleCheckBig } from "lucide-react";
import React from "react";

const indicator = [
  {
    label: "Select date & time",
    className: "text-green-500",
  },
  {
    label: "Fill up details",
    className: "",
  },
  {
    label: "Select service",
    className: "",
  },
  {
    label: "Finish",
    className: "",
  },
] as const;

export default function IndicatorComponent() {
  return (
    <div className="flex justify-center">
      <div className="p-4 items-center gap-8 border rounded-md flex">
        {indicator.map((ind, indicatorIndex) => (
          <div
            key={indicatorIndex}
            className={`${ind.className} flex items-center gap-2`}
          >
            <CircleCheckBig size={15} /> {ind.label}
          </div>
        ))}
      </div>
    </div>
  );
}
