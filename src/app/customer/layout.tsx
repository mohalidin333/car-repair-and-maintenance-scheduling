"use client";

import React from "react";
import ProfileComponent from "@/components/features/profile-component";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-secondary w-full relative h-screen">
      <header className="bg-white border-b py-3 px-4 sticky top-0 z-10">
        <div className="flex justify-between  max-w-screen-lg mx-auto">
          <span className="font-bold text-lg flex items-center gap-2">
            Rodtrak Autoserv, Inc.
          </span>
          <ProfileComponent />
        </div>
      </header>
      <main className="overflow-y-auto px-4">{children}</main>
    </div>
  );
}
