import { Button } from "@/components/ui/button";
import { Calendar, Pen } from "lucide-react";
import React from "react";

export default function ProfilePage() {
  return (
    <div className="p-4 flex flex-col gap-4">
      <h1 className="text-lg">Profile</h1>

      <div className=" flex-col flex  gap-4 bg-white p-4 rounded-md border">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gray-200 rounded-full"></div>

            <div>
              <p className="font-semibold">John Doe</p>
              <p className="font-semibold text-sm text-muted-foreground">
                Admin
              </p>
            </div>
          </div>

          <Button variant={"outline"} size={"sm"}>
            <Pen size={15} />
            Edit
          </Button>
        </div>

        <div className="border-b pb-4 flex items-center gap-2 text-muted-foreground">
          <Calendar size={15} />
          <p>Joined on {new Date().toDateString()}</p>
        </div>

        <div className="flex items-start gap-4 justify-between">
          <h2>Personal Information</h2>
        </div>

        <div>
          <label className="text-muted-foreground font-semibold">
            First Name
          </label>
          <p className="font-semibold">John</p>
        </div>

        <div>
          <label className="text-muted-foreground font-semibold">
            Last Name
          </label>
          <p className="font-semibold">Doe</p>
        </div>

        <div>
          <label className="text-muted-foreground font-semibold">Email</label>
          <p className="font-semibold">john@gmail.com</p>
        </div>
      </div>

      {/* edit profile modal */}
      {/* <EditProfileComponent /> */}
    </div>
  );
}
