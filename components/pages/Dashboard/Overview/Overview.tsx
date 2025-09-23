"use client";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { useGetAllUsersQuery } from "@/lib/redux/features/api/users/userApiSlice";
import { FileText } from "lucide-react";
import { useEffect, useState } from "react";
import { PiUsersThreeBold } from "react-icons/pi";

// stats data

export default function OverviewPage() {
  const [users, setUsers] = useState(null);
  const { data,  refetch } = useGetAllUsersQuery(0);

  const stats = [
    {
      title: "Total Users",
      value: users ?? 0,

      icon: PiUsersThreeBold,
    },
    {
      title: "Total Application",
      value: 15842,
      change: "+12.5%",
      changeType: "positive" as const,
      icon: FileText,
    },
  ];

  useEffect(() => {
    setUsers(data?.data?.data.length);
    refetch();
  }, [data?.data?.data.length, refetch]);
  return (
    <div className="lg:px-10 py-4 space-y-10">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {stats.map((stat) => (
          <StatsCards stat={stat} key={stat.title} />
        ))}
      </div>
      {/* Revenue Chart */}
      <RevenueChart />
    </div>
  );
}
