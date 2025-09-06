"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  PieChart,
  Pie,
  Cell,
  ComposedChart,
  Line,
} from "recharts";

const barData = [
  { month: "JAN", value: 85, line: 85, bar1: 40, bar2: 25, bar3: 20 },
  { month: "FEB", value: 75, line: 75, bar1: 35, bar2: 20, bar3: 20 },
  { month: "MAR", value: 100, line: 100, bar1: 45, bar2: 30, bar3: 25 },
  { month: "APR", value: 65, line: 65, bar1: 30, bar2: 20, bar3: 15 },
  { month: "MAY", value: 75, line: 75, bar1: 35, bar2: 25, bar3: 15 },
  { month: "JUN", value: 70, line: 70, bar1: 32, bar2: 23, bar3: 15 },
];

const pieData = [
  { name: "Free", value: 68, color: "#1f2937" },
  { name: "Premium", value: 32, color: "#d1d5db" },
];

export function BottomCharts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Coaching Application Rate */}
      <Card className="bg-white">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-semibold">
            Coaching Application Rate
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Select defaultValue="yearly">
              <SelectTrigger className="w-26 h-8 bg-black text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="yearly">Yearly</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="monthly">
              <SelectTrigger className="w-26 h-8 bg-black text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="monthly">Monthly</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart
                data={barData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  className="text-xs text-gray-500"
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  className="text-xs text-gray-500"
                  tickFormatter={(value) => `${value}%`}
                  domain={[0, 100]}
                  ticks={[10, 40, 80, 100]}
                />
                <Bar
                  dataKey="bar1"
                  stackId="a"
                  fill="#e5e7eb"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="bar2"
                  stackId="a"
                  fill="#9ca3af"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="bar3"
                  stackId="a"
                  fill="#6b7280"
                  radius={[4, 4, 0, 0]}
                />
                <Line
                  type="monotone"
                  dataKey="line"
                  stroke="#000000"
                  strokeWidth={2}
                  dot={{
                    fill: "#ffffff",
                    stroke: "#000000",
                    strokeWidth: 2,
                    r: 4,
                  }}
                  activeDot={{
                    r: 6,
                    fill: "#ffffff",
                    stroke: "#000000",
                    strokeWidth: 2,
                  }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* User Distributions */}
      <Card className="bg-white">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-semibold">
            User Distributions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80 flex items-center justify-center">
            <div className="relative">
              <ResponsiveContainer width={500} height={500}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx={250}
                    cy={250}
                    innerRadius={80}
                    outerRadius={120}
                    paddingAngle={0}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="flex justify-center space-x-6 mt-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-gray-800 rounded-full"></div>
              <span className="text-sm text-gray-600">Free: 68%</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
              <span className="text-sm text-gray-600">Premium: 32%</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
