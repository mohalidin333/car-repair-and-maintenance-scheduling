"use client";

import React from "react";
import { useStore } from "@tanstack/react-store";
import { scheduleStore } from "@/store/schedule";

export default function AppointmentPage() {
  const schedule = useStore(scheduleStore, (state) => state.schedule);
  return <div>{schedule}</div>;
}
