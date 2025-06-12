"use client";

import React, { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/app-sidebar";
import ProfileComponent from "@/components/features/profile-component";
import { Bell } from "lucide-react";
import NotificationComponent from "@/components/features/notification-component";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isNotificationOpen, setIsNotificationOpen] = useState<boolean>(false);

  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="bg-secondary w-full relative">
        <header className="bg-white border-b py-3 px-4 sticky top-0 z-10">
          <div className="flex items-center gap-4 justify-between">
            <SidebarTrigger className="border" />

            <div className="flex items-center gap-4">
              <div
                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                className="relative cursor-pointer p-1 flex"
              >
                <button>
                  <Bell size={20} />
                </button>
                <p className="px-1 absolute top-0 right-0 bg-red-500 text-[10px] text-white rounded-full">
                  9+
                </p>

                {isNotificationOpen && <NotificationComponent />}
              </div>
              <ProfileComponent />
            </div>
          </div>
        </header>
        <main className="overflow-y-auto">{children}</main>
      </div>
    </SidebarProvider>
  );
}
