"use client";
import React, { useState, useEffect } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import ProfileComponent from "@/components/features/profile-component";
import { Bell, MessageSquareQuote } from "lucide-react";
import CarRepairFeedback from "./feedback-modal-component";
import NotificationComponent from "./notification-component";
import { Toaster } from "sonner";
import { createClient } from "@/lib/supabase/client";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isNotificationOpen, setIsNotificationOpen] = useState<boolean>(false);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState<boolean>(false);
  const [notificationCount, setNotificationCount] = useState<number>(0);
  const supabase = createClient();

  useEffect(() => {
    const fetchNotificationCount = async () => {
      try {
        // Get current user
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (!user) return;

        // Count only appointments with follow_up_date for this user
        // Use head: true to only get count without fetching actual data
        const { count, error } = await supabase
          .from("appointments")
          .select("id", { count: "exact", head: true })
          .not("follow_up_date", "is", null) // Exclude NULL values
          .neq("follow_up_date", "") // Exclude empty strings
          .eq("user_id", user.id); // Only for current user

        if (error) throw error;
        setNotificationCount(count || 0);
      } catch (error) {
        console.error("Error fetching notification count:", error);
      }
    };

    fetchNotificationCount();

    // Set up real-time subscription
    const channel = supabase
      .channel("appointments_changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "appointments" },
        () => fetchNotificationCount()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <SidebarProvider>
      <div className="bg-secondary w-full relative">
        <header className="w-full bg-white border-b py-3 px-4 sticky top-0 z-10">
          <div className="max-w-screen-xl mx-auto flex items-center justify-between">
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
                {notificationCount > 0 && (
                  <p className="px-1 absolute top-0 right-0 bg-red-500 text-[10px] text-white rounded-full">
                    {notificationCount > 9 ? "9+" : notificationCount}
                  </p>
                )}
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
