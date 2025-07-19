"use client";

import React from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/app-sidebar";
import ProfileComponent from "@/components/features/profile-component";
import { Toaster } from "sonner";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const [isNotificationOpen, setIsNotificationOpen] = useState<boolean>(false);

  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="bg-secondary w-full relative overflow-hidden">
        <header className="bg-white border-b py-3 px-4 sticky top-0 z-10 flex items-center justify-between">
          <SidebarTrigger className="border" />
          <ProfileComponent link="/admin/profile" />
        </header>
        <Toaster />
        {children}
      </div>
    </SidebarProvider>
  );
}
