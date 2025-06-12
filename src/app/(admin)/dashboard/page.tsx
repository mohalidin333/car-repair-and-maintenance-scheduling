import { Box, LayoutGrid, ShoppingCart, Users2 } from "lucide-react";
import React from "react";
import { PieChartComponent } from "./PieChart";
import { AreaChartComponent } from "./AreaChart";
import { DateRangeComponent } from "./date-range-component";

const cards = [
  {
    title: "Total Data",
    icon: Users2,
    value: 0,
    color: "text-green-400",
  },
  {
    title: "Total Data",
    icon: ShoppingCart,
    value: 0,
    color: "text-blue-400",
  },
  {
    title: "Total Data",
    icon: Box,
    value: 0,
    color: "text-orange-400",
  },
  {
    title: "Total Data",
    icon: LayoutGrid,
    value: 0,
    color: "text-blue-400",
  },
];

export default function DashboardPage() {
  return (
    <div className="p-4 flex flex-col gap-4">
      {/* overview */}
      <section className="flex flex-col gap-4">
        <div className="flex-wrap flex items-center gap-4 justify-between">
          <h2 className="text-lg">Overview</h2>
          <DateRangeComponent />
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4 w-full">
          {cards.map((card, index) => (
            <div
              key={index}
              className="p-4 bg-white rounded-md flex items-center justify-between gap-4 border"
            >
              <div className="flex flex-col">
                <p className="font-bold text-lg">{card.value}</p>
                <h3 className="text-sm sub-title">{card.title}</h3>
              </div>

              <div className="text-muted-foreground bg-muted p-2 rounded-md">
                <card.icon size={20} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* charts / analytics */}
      <section className="flex flex-col gap-4">
        <h2 className=" text-lg">Analytics</h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4 w-full">
          <AreaChartComponent />
          <PieChartComponent />
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4 w-full">
          <AreaChartComponent />
          <PieChartComponent />
        </div>
      </section>
    </div>
  );
}
