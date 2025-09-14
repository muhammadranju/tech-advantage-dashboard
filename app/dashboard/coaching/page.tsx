import { CoachingComponent } from "@/components/coaching/CoachingComponent";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { FileText } from "lucide-react";

const stats = [
  {
    title: "Total Application",
    value: "8,642",
    changeType: "positive" as const,
    icon: FileText,
  },
  {
    title: "Total Approve Application",
    value: "8,642",
    changeType: "positive" as const,
    icon: FileText,
  },
  {
    title: "Total Deny Application",
    value: "15,842",
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
