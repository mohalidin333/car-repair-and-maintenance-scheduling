"use client";

import { CartesianGrid, XAxis, BarChart, Bar } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartdata = [
  { month: "January", value: 12000 },
  { month: "February", value: 14500 },
  { month: "March", value: 13200 },
  { month: "April", value: 15800 },
  { month: "May", value: 14300 },
  { month: "June", value: 16700 },
  { month: "July", value: 15200 },
  { month: "August", value: 16000 },
  { month: "September", value: 14900 },
  { month: "October", value: 17000 },
  { month: "November", value: 17800 },
  { month: "December", value: 19200 },
];

const chartConfig = {
  value: {
    label: "Inventory Sales",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export function InventorySalesChart() {
  return (
    <Card className="flex flex-col max-h-[500px]">
      <CardHeader>
        <CardTitle>Inventory Sales Chart</CardTitle>
        <CardDescription>
          Showing total inventory sales per month
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[200] w-full"
        >
          <BarChart
            data={chartdata}
            margin={{ left: 12, right: 12 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={{ fill: "var(--muted)" }}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Bar
              dataKey="value"
              fill="var(--color-value)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
