"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { dateFormatter } from "@/app/utils/date-formatter";
import InventorySalesReportModal from "./inventory-sales-report-modal";
import ServiceSalesReportModal from "./service-sales-report-modal";
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
      <header className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <span className="font-bold text-lg">Sales Reports</span>
          <p className="text-muted-foreground text-sm">
            Manage your sales reports here.
          </p>
        </div>

        {/* <div className="flex items-center gap-2 flex-wrap">
          <DateRangeComponent
            onChange={(range) => {
              setDate({ from: range?.from, to: range?.to }),
                handleFilter("created_at", {
                  from: range?.from,
                  to: range?.to,
                });
            }}
          />
        </div> */}
      </header>

      {/* tables */}
      <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4">
        {/* total sales */}
        <div className="space-y-4 bg-white rounded-md p-4 border self-start">
          <header className="flex items-center justify-between gap-4">
            <div className="flex flex-col gap-4 w-full">
              <div className="flex items-center justify-between gap-4 w-full">
                <div className="grid space-y-2">
                  <div>
                    <span className="font-bold text-xl">Total Sales</span>
                    <p className="text-muted-foreground text-sm">
                      Total sales report.
                    </p>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    {displayDateRange(date)}
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsOpen({ ...isOpen, totalSales: true })}
                >
                  <Eye size={15} className="mr-1" />
                  View Report
                </Button>
              </div>

              {/* <div className="border px-8 py-4 rounded-md">
                <p className="font-bold text-lg">
                  {currencyFormatter(
                    filteredTotalSales.reduce(
                      (acc, item) => acc + item.total,
                      0
                    )
                  )}
                </p>

                <p className="text-muted-foreground text-xs uppercase font-semibold">
                  Total Sales
                </p>
              </div> */}
            </div>
          </header>

          {/* <TableComponent
            data={TotalSalesData}
            columns={TotalSalesColumns}
            columnFilters={columnFilters}
            setColumnFilters={setColumnFilters}
          /> */}
        </div>

        {/* service sales */}
        <div className="space-y-4 bg-white rounded-md p-4 border self-start">
          <header className="flex items-center justify-between gap-4">
            <div className="flex flex-col gap-4 w-full">
              <div className="flex items-center justify-between gap-4 w-full">
                <div className="grid space-y-2">
                  <div>
                    <span className="font-bold text-xl">Service Sales</span>
                    <p className="text-muted-foreground text-sm">
                      Sales report for services.
                    </p>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    {displayDateRange(date)}
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsOpen({ ...isOpen, service: true })}
                >
                  <Eye size={15} className="mr-1" />
                  View Report
                </Button>
              </div>
              {/* <div className="border px-8 py-4 rounded-md">
                <p className="font-bold text-lg">
                  {currencyFormatter(
                    filteredServiceSales.reduce(
                      (acc, item) => acc + item.service_fee,
                      0
                    )
                  )}
                </p>

                <p className="text-muted-foreground text-xs uppercase font-semibold">
                  Service Sales
                </p>
              </div> */}
            </div>
          </header>

          {/* <TableComponent
            data={ServiceSalesData}
            columns={ServiceSalesColumns}
            columnFilters={columnFilters}
            setColumnFilters={setColumnFilters}
          /> */}
        </div>
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4">
        {/* inventory sales */}
        <div className="space-y-4 bg-white rounded-md p-4 border self-start">
          <header className="flex items-center justify-between gap-4">
            <div className="flex flex-col gap-4 w-full">
              <div className="flex items-center justify-between gap-4 w-full">
                <div className="grid space-y-2">
                  <div>
                    <span className="font-bold text-xl">Inventory Sales</span>
                    <p className="text-muted-foreground text-sm">
                      Sales report for inventory.
                    </p>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    {displayDateRange(date)}
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setIsOpen((prev) => ({ ...prev, inventory: true }))
                  }
                >
                  <Eye size={15} className="mr-1" />
                  View Report
                </Button>
              </div>
              {/* <div className="border px-8 py-4 rounded-md">
                <p className="font-bold text-lg">
                  {currencyFormatter(
                    filteredInventorySales.reduce(
                      (acc, item) => acc + item.total_price,
                      0
                    )
                  )}
                </p>

                <p className="text-muted-foreground text-xs uppercase font-semibold">
                  Inventory Sales
                </p>
              </div> */}
            </div>
          </header>

          {/* <TableComponent
            data={InventorySalesData}
            columns={InventorySalesColumns}
            columnFilters={columnFilters}
            setColumnFilters={setColumnFilters}
          /> */}
        </div>
        <div></div>
      </div>

      <InventorySalesReportModal
        onClose={() => setIsOpen((prev) => ({ ...prev, inventory: false }))}
        isOpen={isOpen.inventory}
      />
      <ServiceSalesReportModal
        onClose={() => setIsOpen((prev) => ({ ...prev, service: false }))}
        isOpen={isOpen.service}
      />
      <TotalSalesReportModal
        onClose={() => setIsOpen((prev) => ({ ...prev, totalSales: false }))}
        isOpen={isOpen.totalSales}
      />
    </div>
  );
}
