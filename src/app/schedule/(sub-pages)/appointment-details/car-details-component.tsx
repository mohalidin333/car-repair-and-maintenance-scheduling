import { Pen, User } from "lucide-react";
import React from "react";
import { Details } from "./details-type";
import Image from "next/image";

export default function CarDetailsComponent({
  handleEditAppointment,
  details,
  images,
}: {
  handleEditAppointment: () => void;
  details: Details | undefined;
  images: string[];
}) {
  return (
    <div className="border rounded-md p-4 space-y-8">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="bg-yellow-100 text-yellow-500 p-4 rounded-full">
            <User size={15} />
          </div>
          <p className="font-bold text-lg">Car Details</p>
        </div>
        <button
          onClick={handleEditAppointment}
          className="p-2 rounded-md hover:bg-gray-100 cursor-pointer"
        >
          <Pen size={15} />
        </button>
      </div>

      {/* car name and plate number */}
      <div className="grid grid-cols-2 gap-4">
        {/* car name */}
        <div>
          <p className="text-sm font-semibold text-muted-foreground">
            CAR NAME
          </p>
          <p className="font-semibold text-lg">{details?.car_name}</p>
        </div>
        {/* plate number */}
        <div>
          <p className="font-semibold text-sm text-muted-foreground">
            PLATE NUMBER
          </p>
          <p className="font-semibold text-lg">{details?.plate_number}</p>
        </div>
      </div>
      {/* issue description */}
      <div>
        <p className="text-sm font-semibold text-muted-foreground">
          CAR DESCRIPTION / ISSUE
        </p>
        <p className="font-semibold text-lg">{details?.issue_description}</p>
      </div>

      {/* car image */}
      <div className="space-y-4">
        <p className="text-sm font-semibold text-muted-foreground">
          CAR IMAGES
        </p>
        <div className="flex space-x-4">
          {images.map((image, imageIndex) => (
            <Image width={200} height={200} alt="image" key={imageIndex} src={image} className="w-[200px]" />
          ))}
        </div>
      </div>
    </div>
  );
}
