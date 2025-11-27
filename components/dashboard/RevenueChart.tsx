"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDashboardApplicationRateQuery } from "@/lib/redux/features/api/coaching/coachingApiSlice";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export function RevenueChart() {
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const { data: dashboardApplicationRate } =
    useDashboardApplicationRateQuery(null);
  const date = new Date();
  const years = ["2021", "2022", "2023", "2024", `${date.getFullYear()}`];
  const applicantsData = [...(dashboardApplicationRate?.data || [])];

  return (
    <Card className="bg-white ">
      {/* Application Rate Chart Header */}
      <CardHeader className="flex justify-between items-center">
        <CardTitle className="text-2xl font-bold">
          Coaching Application Rate
        </CardTitle>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="gap-2 w-24 h-8 py-4 rounded-lg bg-black text-white hover:bg-neutral-700 hover:text-white"
            >
              {selectedYear || "Yearly"}
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {years.map((year) => (
              <DropdownMenuItem
                key={year}
                onClick={() => setSelectedYear(year)}
              >
                {year}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>

      {/*  Application Rate Chart */}
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={applicantsData}>
              <defs>
                <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#262626 " stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#a3a3a3  " stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                className="text-xs"
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                className="text-xs"
                tickFormatter={(value) => `${value}%`}
                // orientation="right"
              />

              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-black text-white px-3 py-2 rounded text-sm">
                        <p>{`${payload[0]?.value?.toLocaleString() || "0"}`}</p>
                        <p>{`${payload[0].payload.month}`}</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#171717"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorUsers)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
