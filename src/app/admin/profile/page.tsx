"use client";

import { Button } from "@/components/ui/button";
import { Calendar, Pen } from "lucide-react";
import React, { useEffect, useState } from "react";
import EditProfileComponent from "./edit-profile-component";
import { createClient } from "@/lib/supabase/client";
import Image from "next/image";

export default function ProfilePage() {
  const [isOpen, setIsOpen] = useState(false);
  const [profileDetails, setProfileDetails] = useState({
    avatar: "/img/avatar.png",
    firstname: "",
    lastname: "",
    email: "",
    role: "",
    created_at: "",
  });

  useEffect(() => {
    const getProfileDetails = async () => {
      const { data: user } = await createClient().auth.getSession();

      if (!user.session?.user.id) return;

      const userData = {
        id: user.session.user.id,
        email: user.session.user.email,
        role: user.session.user.user_metadata?.role || null,
        firstname: user.session.user.user_metadata?.firstname || null,
        lastname: user.session.user.user_metadata?.lastname || null,
        created_at: user.session.user.created_at,
      };

      const { data: avatarURL } = await createClient()
        .from("avatars")
        .select("avatar")
        .eq("user_id", userData.id)
        .single();

      setProfileDetails((prev) => ({
        ...prev,
        avatar: avatarURL?.avatar || "/img/avatar.png",
        firstname: userData.firstname || "",
        lastname: userData.lastname || "",
        email: userData.email || "",
        role: userData.role || "",
        created_at: userData.created_at || "",
      }));
    };
    getProfileDetails();
  }, []);

  return (
    <div className="py-8 flex flex-col gap-4 max-w-screen-xl mx-auto">
      <div className=" flex-col flex  gap-4 bg-white p-4 rounded-md border">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <Image
                src={profileDetails.avatar}
                alt="avatar"
                width={50}
                height={50}
                className="rounded-full w-12 h-12 object-cover"
              />

            <div>
              <p className="font-semibold">
                {profileDetails.firstname} {profileDetails.lastname}
              </p>
              <p className="font-semibold text-sm text-muted-foreground">
                {profileDetails.role}
              </p>
            </div>
          </div>

          <Button
            onClick={() => setIsOpen(true)}
            variant={"outline"}
            size={"sm"}
          >
            <Pen size={15} />
            Edit
          </Button>
        </div>

        <div className="border-b pb-4 flex items-center gap-2 text-muted-foreground">
          <Calendar size={15} />
          <p>Joined on {new Date(profileDetails.created_at).toDateString()}</p>
        </div>

        <div className="flex items-start gap-4 justify-between">
          <h2>Personal Information</h2>
        </div>

        <div>
          <label className="text-muted-foreground font-semibold">
            First Name
          </label>
          <p className="font-semibold">{profileDetails.firstname}</p>
        </div>

        <div>
          <label className="text-muted-foreground font-semibold">
            Last Name
          </label>
          <p className="font-semibold">{profileDetails.lastname}</p>
        </div>

        <div>
          <label className="text-muted-foreground font-semibold">Email</label>
          <p className="font-semibold">{profileDetails.email}</p>
        </div>
      </div>

      {/* edit profile modal */}
      {isOpen && <EditProfileComponent close={() => setIsOpen(false)} />}
    </div>
  );
}
