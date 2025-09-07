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
  return (
    <Card className="bg-white">
      <CardHeader className="flex justify-between items-center">
        <CardTitle className="text-2xl font-bold">Revenue</CardTitle>

        <Select defaultValue="monthly">
          <SelectTrigger className="w-26 h-8 bg-black text-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="monthly">Yearly</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
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
                        <p>{`1,348 Revenue`}</p>
                        <p>{`$${payload[0].value?.toLocaleString()}`}</p>
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
                fill="url(#colorRevenue)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
