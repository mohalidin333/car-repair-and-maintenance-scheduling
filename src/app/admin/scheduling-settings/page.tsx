"use client";
import { useEffect, useState } from "react";
import { Times } from "./times-type";
import { Holidays } from "./holidays-type";
import SchedulingSettingsComponent from "./scheduling-settings-component";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";

function isItemExist(itemLength: number, index: number) {
  return itemLength === 1 || index === itemLength - 1;
}

export default function SchedulingSettingsPage() {
  const [status, setStatus] = useState<"active" | "inactive">("inactive");
  const [times, setTimes] = useState<Times[]>([
    { hour: "0", minute: "00", meridiem: "AM" },
  ]);
  const [restdays, setRestdays] = useState<string[]>(["Sunday"]);
  const [holidays, setHolidays] = useState<Holidays[]>([{ month: 0, date: 0 }]);
  const currentYear = new Date().getFullYear();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleToggle = () => {
    setStatus((prev) => (prev === "active" ? "inactive" : "active"));
  };

  const handleChangeTime = (index: number, field: string, value: string) => {
    setTimes((prev) =>
      prev.map((time, i) => (i === index ? { ...time, [field]: value } : time))
    );
  };

  const handleAddTime = () => {
    setTimes((prev) => [...prev, { hour: "7", minute: "00", meridiem: "AM" }]);
  };

  const handleRemoveTime = (index: number) => {
    setTimes((prev) => prev.filter((_, i) => i !== index));
  };

  const handleChangeRestDay = (index: number, value: string) => {
    setRestdays((prev) => prev.map((day, i) => (i === index ? value : day)));
  };

  const handleAddRestDay = () => {
    setRestdays((prev) => [...prev, "Sunday"]);
  };

  const handleRemoveRestDay = (index: number) => {
    setRestdays((prev) => prev.filter((_, i) => i !== index));
  };

  const handleChangeHoliday = (index: number, value: string) => {
    const selectedDate = new Date(value);
    const month = selectedDate.getMonth();
    const date = selectedDate.getDate();

    setHolidays((prev) =>
      prev.map((holiday, i) => (i === index ? { month, date } : holiday))
    );
  };

  const handleAddHoliday = () => {
    setHolidays((prev) => [...prev, { month: 0, date: 0 }]);
  };

  const handleRemoveHoliday = (index: number) => {
    setHolidays((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    setIsLoading(true);
    const schedulesSettings = {
      status,
      times,
      restdays,
      holidays,
    };
    const { error } = await createClient()
      .from("scheduling_settings")
      .update(schedulesSettings)
      .eq("id", 2);

    try {
      if (error) {
        toast.error(error.message);
      }
      toast.success("Scheduling settings updated");
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchSchedulingSettings = async () => {
      const {
        data: { status, times, restdays, holidays },
        error,
      } = await createClient()
        .from("scheduling_settings")
        .select("*")
        .eq("id", 2)
        .single();
      if (error) {
        toast.error(error.message);
      }
      setStatus(status)
      setTimes(JSON.parse(times))
      setRestdays(JSON.parse(restdays))
      setHolidays(JSON.parse(holidays))
    };
    fetchSchedulingSettings();
  }, [])

  return (
    <SchedulingSettingsComponent
      handleToggle={handleToggle}
      status={status}
      times={times}
      handleChangeTime={handleChangeTime}
      handleAddTime={handleAddTime}
      handleRemoveTime={handleRemoveTime}
      restdays={restdays}
      handleChangeRestDay={handleChangeRestDay}
      handleAddRestDay={handleAddRestDay}
      handleRemoveRestDay={handleRemoveRestDay}
      holidays={holidays}
      handleChangeHoliday={handleChangeHoliday}
      handleAddHoliday={handleAddHoliday}
      handleRemoveHoliday={handleRemoveHoliday}
      handleSave={handleSave}
      isItemExist={isItemExist}
      currentYear={currentYear}
      isLoading={isLoading}
    />
  );
}
