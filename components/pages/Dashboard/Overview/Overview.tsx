"use client";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { StatsCards } from "@/components/dashboard/StatsCards";
import {
  ChartCardSkeleton,
  StatCardSkeleton,
} from "@/components/skeletons/StatCardSkeleton";
import { useTotalCochairingUsersQuery } from "@/lib/redux/features/api/coaching/coachingApiSlice";
import { useGetAllUsersQuery } from "@/lib/redux/features/api/users/userApiSlice";
import { FileText } from "lucide-react";
import { useEffect } from "react";
import { PiUsersThreeBold } from "react-icons/pi";

// stats data

export default function OverviewPage() {
  const { data, refetch, isLoading } = useGetAllUsersQuery(0);
  const { data: cochairingUsersData } = useTotalCochairingUsersQuery(null);
  const cochairingUsers = cochairingUsersData?.data;
  const users = data?.data?.data.length;

  const stats = [
    {
      title: "Total Users",
      value: users ?? 0,
      icon: PiUsersThreeBold,
    },
    {
      title: "Total Applications",
      value: cochairingUsers ?? 0,
      icon: FileText,
    },
  ];

  useEffect(() => {
    refetch();
  }, [data?.data?.data.length, cochairingUsersData?.data, refetch]);
  return (
    <div className="lg:px-10 py-4 space-y-10">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading
          ? stats.map((stat) => <StatCardSkeleton key={stat.title} />)
          : stats.map((stat) => <StatsCards stat={stat} key={stat.title} />)}
      </div>
      {/* Revenue Chart */}
      {isLoading ? <ChartCardSkeleton /> : <RevenueChart />}
    </div>
  );
}
