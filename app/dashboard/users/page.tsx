import { StatsCards } from "@/components/dashboard/StatsCards";
import { UserManagement } from "@/components/users/UserManagement";
import { PiUsersThreeBold } from "react-icons/pi";
const stats = [
  {
    title: "Total Users",
    value: "8,642",
    change: "+6.3%",
    changeType: "positive" as const,
    icon: PiUsersThreeBold,
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
