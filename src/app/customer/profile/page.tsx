"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Pen } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import EditProfileComponent from "./edit-profile-component";

export default function ProfilePage() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const handleGoToDashboard = () => {
    router.push("/customer");
  };
  return (
    <div className="py-8 flex flex-col gap-4 max-w-screen-xl mx-auto">
      <div className="flex justify-end">
        <Button onClick={handleGoToDashboard} variant={"outline"}>
          <ArrowLeft size={15} />
          Dashboard
        </Button>
      </div>

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

          <Button onClick={() => setIsOpen(true)} variant={"outline"} size={"sm"}>
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
      {isOpen && <EditProfileComponent close={() => setIsOpen(false)} />}
    </div>
  );
}
