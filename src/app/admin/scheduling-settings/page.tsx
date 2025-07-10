"use client";
import { useState } from "react";
import { Times } from "./times-type";
import { Holidays } from "./holidays-type";
import SchedulingSettingsComponent from "./scheduling-settings-component";

function isItemExist(itemLength: number, index: number) {
  return itemLength === 1 || index === itemLength - 1;
}

export default function SchedulingSettingsPage() {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [times, setTimes] = useState<Times[]>([
    { hour: "0", minute: "00", meridiem: "AM" },
  ]);
  const [restdays, setRestdays] = useState<string[]>(["Sunday"]);
  const [holidays, setHolidays] = useState<Holidays[]>([{ month: 0, date: 0 }]);
  const currentYear = new Date().getFullYear();

  const handleToggle = () => setIsOpen(!isOpen);

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

  const handleSave = () => {
    console.log(holidays);
  };

  return (
    <SchedulingSettingsComponent
      handleToggle={handleToggle}
      isOpen={isOpen}
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
    />
  );
}
