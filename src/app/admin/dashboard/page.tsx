"use client";

import { PhilippinePeso, ShoppingCart, Wrench } from "lucide-react";
import React, { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { AppointmentType } from "@/app/customer/appointment-type";
import { currencyFormatter } from "@/app/utils/currency-formatter";
import { CartesianGrid, XAxis, YAxis, BarChart, Bar, ResponsiveContainer } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Define types
type MonthlyData = {
  month: string;
  service: number;
  inventory: number;
};

type Sales = {
  id: number;
  service: number;
  inventory: number;
  total: number;
  created_at: string;
};

export default function DashboardPage() {
  const supabase = createClient();
  const [serviceStatus, setServiceStatus] = useState([
    { title: "Pending", value: 0, color: "bg-yellow-100 text-yellow-800" },
    { title: "Approved", value: 0, color: "bg-green-100 text-green-800" },
    { title: "Disapproved", value: 0, color: "bg-gray-100 text-gray-800" },
    { title: "Cancelled", value: 0, color: "bg-red-100 text-red-800" },
    { title: "In-Progress", value: 0, color: "bg-blue-100 text-blue-800" },
    { title: "Completed", value: 0, color: "bg-emerald-100 text-emerald-800" },
  ]);
  const [sales, setSales] = useState<Sales[]>([]);
  const [monthlyData, setMonthlyData] = useState<MonthlyData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch appointments
        const { data: appointments } = await supabase.from("appointments").select("*");
        const transformedAppointments = appointments as AppointmentType[];

        setServiceStatus(prev => 
          prev.map(status => ({
            ...status,
            value: transformedAppointments.filter(item => item.status === status.title).length
          }))
        );

        // Fetch sales data
        const { data: salesData } = await supabase.from("total_sales").select("*");
        setSales(salesData as Sales[] || []);

        // Process monthly data
        if (salesData) {
          const monthlySales = processMonthlySales(salesData as Sales[]);
          setMonthlyData(monthlySales);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const processMonthlySales = (sales: Sales[]): MonthlyData[] => {
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    return months.map(month => {
      const monthSales = sales.filter(sale => {
        const date = new Date(sale.created_at);
        return date.toLocaleString('default', { month: 'long' }) === month;
      });

      return {
        month,
        service: monthSales.reduce((sum, sale) => sum + sale.service, 0),
        inventory: monthSales.reduce((sum, sale) => sum + sale.inventory, 0)
      };
    });
  };

  return (
    <div className="p-4 flex flex-col gap-4">
      {/* Overview Section */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-lg">Overview</h2>
          <p className="text-muted-foreground text-sm">
            Monitor total sales, service progress, and key operational insights.
          </p>
        </div>
        
        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4 w-full">
          {/* Total Sales Card */}
          <div className="p-4 bg-white rounded-md flex items-center justify-between gap-4 border">
            <div className="flex flex-col gap-2">
              <p className="font-bold text-xl">
                {currencyFormatter(sales.reduce((acc, curr) => acc + curr.total, 0))}
              </p>
              <p className="text-xs uppercase text-muted-foreground font-semibold">
                Total Sales
              </p>
            </div>
            <div className="bg-green-100 text-green-800 p-2 rounded-md">
              <PhilippinePeso size={20} />
            </div>
          </div>

          {/* Service Sales Card */}
          <div className="p-4 bg-white rounded-md flex items-center justify-between gap-4 border">
            <div className="flex flex-col gap-2">
              <p className="font-bold text-xl">
                {currencyFormatter(sales.reduce((acc, curr) => acc + curr.service, 0))}
              </p>
              <p className="text-xs uppercase text-muted-foreground font-semibold">
                Service Sales
              </p>
            </div>
            <div className="bg-blue-100 text-blue-800 p-2 rounded-md">
              <Wrench size={20} />
            </div>
          </div>

          {/* Inventory Sales Card */}
          <div className="p-4 bg-white rounded-md flex items-center justify-between gap-4 border">
            <div className="flex flex-col gap-2">
              <p className="font-bold text-xl">
                {currencyFormatter(sales.reduce((acc, curr) => acc + curr.inventory, 0))}
              </p>
              <p className="text-xs uppercase text-muted-foreground font-semibold">
                Inventory Sales
              </p>
            </div>
            <div className="bg-purple-100 text-purple-800 p-2 rounded-md">
              <ShoppingCart size={20} />
            </div>
          </div>
        </div>

        {/* Status Cards */}
        <div className="rounded-md border divide-x bg-white grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] w-full">
          {serviceStatus.map((card, index) => (
            <div key={index} className="p-4 flex items-center justify-between gap-4 flex-col w-full">
              <p className="font-bold text-xl" aria-label={`${card.title}: ${card.value}`}>
                {card.value}
              </p>
              <span className={`text-sm rounded-md px-2 py-1 font-semibold ${card.color}`}>
                {card.title}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Charts Section */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-lg">Analytics</h2>
          <p className="text-muted-foreground text-sm">
            Visual insights on service and sales trends.
          </p>
        </div>
        
        <div className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(400px,1fr))]">
          {/* Service Sales Chart */}
          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle>Service Sales</CardTitle>
              <CardDescription>Monthly service revenue</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis 
                    dataKey="month" 
                    tickFormatter={(value) => value.slice(0, 3)}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis tickLine={false} axisLine={false} />
                  <Bar 
                    dataKey="service" 
                    name="Service Sales" 
                    fill="#3b82f6" // blue-500
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Inventory Sales Chart */}
          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle>Inventory Sales</CardTitle>
              <CardDescription>Monthly parts/products revenue</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis 
                    dataKey="month" 
                    tickFormatter={(value) => value.slice(0, 3)}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis tickLine={false} axisLine={false} />
                  <Bar 
                    dataKey="inventory" 
                    name="Inventory Sales" 
                    fill="#8b5cf6" // purple-500
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}