"use client";

import { Toaster } from "sonner";

export default function ScheduleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Toaster />
      {children}
    </>
  );
}
