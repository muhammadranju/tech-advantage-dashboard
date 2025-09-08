import { CoachingComponent } from "@/components/coaching/CoachingComponent";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { UserManagement } from "@/components/users/UserManagement";
import { FileText } from "lucide-react";

const stats = [
  {
    title: "Total Application",
    value: "8,642",
    change: "+6.3%",
    changeType: "positive" as const,
    icon: FileText,
  },
  {
    title: "Total Approve Application",
    value: "8,642",
    change: "+12.5%",
    changeType: "positive" as const,
    icon: FileText,
  },
  {
    title: "Total Premium User",
    value: "15,842",
    change: "+32.5%",
    changeType: "positive" as const,
    icon: FileText,
  },
];
const Coaching = () => {
  return (
    <div className="px-10 py-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <StatsCards stat={stat} key={stat.title} />
        ))}
      </div>
      <CoachingComponent />
    </div>
  );
};

export default Coaching;
