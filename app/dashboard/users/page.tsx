import { StatsCards } from "@/components/dashboard/StatsCards";
import { UserManagement } from "@/components/users/UserManagement";
import { BadgeCheckIcon, CircleDollarSign, FileText } from "lucide-react";
import { PiUsersThree } from "react-icons/pi";
const stats = [
  {
    title: "Total Users",
    value: "8,642",
    change: "+6.3%",
    changeType: "positive" as const,
    icon: PiUsersThree,
  },
  {
    title: "Total Free Users",
    value: "8,642",
    change: "+12.5%",
    changeType: "positive" as const,
    icon: PiUsersThree,
  },
  {
    title: "Total Premium User",
    value: "15,842",
    change: "+32.5%",
    changeType: "positive" as const,
    icon: BadgeCheckIcon,
  },
];
const page = () => {
  return (
    <div className="px-10 py-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <StatsCards stat={stat} key={stat.title} />
        ))}
      </div>
      <UserManagement />
    </div>
  );
};

export default page;
