"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { dateFormatter } from "@/app/utils/date-formatter";
import TotalSalesReportModal from "./total-sales-report-modal";
function displayDateRange(date: {
  from: Date | undefined;
  to: Date | undefined;
}) {
  return date?.from && date?.to
    ? ` ${dateFormatter(date?.from!)} - ${dateFormatter(date?.to!)}`
    : date?.from
    ? ` ${dateFormatter(date?.from!)}`
    : "";
}
export default function ReportsPage() {
  const [date, setDate] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({ from: undefined, to: undefined });
  const [isOpen, setIsOpen] = useState({
    inventory: false,
    service: false,
    totalSales: false,
  });
  return (
    <div className="p-4 flex flex-col gap-4">
      {" "}
      <header className="flex items-center justify-between gap-4 flex-wrap">
        {" "}
        <div>
          {" "}
          <span className="font-bold text-lg">Reports</span>{" "}
          <p className="text-muted-foreground text-sm">
            {" "}
            Manage your sales reports here.{" "}
          </p>{" "}
        </div>{" "}
      </header>{" "}
      {/* total sales */}{" "}
      <div className="space-y-4 bg-white rounded-md p-4 border ">
        {" "}
        <header className="flex items-center justify-between gap-4">
          {" "}
          <div className="flex flex-col gap-4 w-full">
            {" "}
            <div className="flex items-center justify-between gap-4 w-full">
              {" "}
              <div className="grid space-y-2">
                {" "}
                <div>
                  {" "}
                  <span className="font-bold text-xl">Sales Report</span>{" "}
                  <p className="text-muted-foreground text-sm">
                    {" "}
                    Sales report for inventory, services and total sales.{" "}
                  </p>{" "}
                </div>{" "}
                <p className="text-muted-foreground text-sm">
                  {" "}
                  {displayDateRange(date)}{" "}
                </p>{" "}
              </div>{" "}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsOpen({ ...isOpen, totalSales: true })}
              >
                {" "}
                <Eye size={15} className="mr-1" /> View Report{" "}
              </Button>{" "}
            </div>{" "}
          </div>{" "}
        </header>{" "}
      </div>{" "}
      <TotalSalesReportModal
        onClose={() => setIsOpen((prev) => ({ ...prev, totalSales: false }))}
        isOpen={isOpen.totalSales}
      />{" "}
    </div>
  );
}
