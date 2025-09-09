"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const data = [
  { month: "JAN", value: 2000 },
  { month: "FEB", value: 2800 },
  { month: "MAR", value: 2200 },
  { month: "APR", value: 3200 },
  { month: "MAY", value: 2900 },
  { month: "JUN", value: 3800 },
  { month: "JUL", value: 3348 },
  { month: "AUG", value: 2800 },
  { month: "SEP", value: 3200 },
  { month: "OCT", value: 2900 },
  { month: "NOV", value: 3100 },
  { month: "DEC", value: 2700 },
];

export function RevenueChart() {
  const [selectedYear, setSelectedYear] = useState<string | null>(null);

  const years = ["2021", "2022", "2023", "2024", "2025"];
  return (
    <Card className="bg-white">
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
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#9CA3AF" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#9CA3AF" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                className="text-xs text-gray-500 px-10"
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                className="text-xs text-gray-500"
                tickFormatter={(value) => `${value / 1000}k`}
              />

              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-black text-white px-3 py-2 rounded text-sm">
                        <p>{`1,348 Application Rate`}</p>
                        {/* <p>{`$${payload[0].value?.toLocaleString()}`}</p> */}
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#9CA3AF"
                strokeWidth={2}
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
