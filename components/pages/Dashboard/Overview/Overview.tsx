import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { FileText } from "lucide-react";
import { PiUsersThreeBold } from "react-icons/pi";

// stats data
const stats = [
  {
    title: "Total Users",
    value: "8,642",
    change: "+6.3%",
    changeType: "positive" as const,
    icon: PiUsersThreeBold,
  },
  {
    title: "Total Application",
    value: "15,842",
    change: "+12.5%",
    changeType: "positive" as const,
    icon: FileText,
  },
];
export default function OverviewPage() {
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
