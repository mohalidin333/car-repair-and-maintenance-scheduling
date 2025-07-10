const scheduledTimes = [
  {
    month: 5,
    date: 23,
    times: [
      {
        status: "success",
        time: "10:00",
      },
      {
        status: "pending",
        time: "11:00",
      },
    ],
  },
];

export const checkScheduledTimes = (
  selectedMonth: number,
  selectedDate: number,
  time: string
): string => {
  const status =
    scheduledTimes
      .find((t) => t.month === selectedMonth && t.date === selectedDate)
      ?.times.find((t) => t.time === time)?.status ?? "available";
  return status === "success"
    ? "bg-green-500"
    : status === "pending"
    ? "bg-yellow-500"
    : "";
};
