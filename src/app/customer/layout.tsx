"use client";

import React, { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import ProfileComponent from "@/components/features/profile-component";
import { Bell, MessageSquareQuote } from "lucide-react";
import CarRepairFeedback from "./feedback-modal-component";
import NotificationComponent from "./notification-component";
import { Toaster } from "sonner";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isNotificationOpen, setIsNotificationOpen] = useState<boolean>(false);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState<boolean>(false);

  return (
    <SidebarProvider>
      <div className="bg-secondary w-full relative">
        <header className="w-full bg-white border-b py-3 px-4 sticky top-0 z-10">
          <div className="max-w-screen-xl mx-auto  flex items-center justify-between ">
            <span className="font-bold text-lg flex items-center gap-2">
              Rodtrak Autoserv, Inc.
            </span>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsFeedbackOpen(!isFeedbackOpen)}
                className="cursor-pointer"
              >
                <MessageSquareQuote />
              </button>
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
              </div>
              <ProfileComponent link="/customer/profile" />
            </div>
          </div>
        </header>
        {isNotificationOpen && (
          <NotificationComponent close={() => setIsNotificationOpen(false)} />
        )}
        {isFeedbackOpen && <CarRepairFeedback />}
        <main className="overflow-y-auto px-4">
          <Toaster />
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}
