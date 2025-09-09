import { StatsCards } from "@/components/dashboard/StatsCards";
import { QuizCreator } from "@/components/discoverStrength/QuizCreator";
import { FileText } from "lucide-react";
import { SiQuizlet } from "react-icons/si";

const stats = [
  {
    title: "Total Participant",
    value: "8,642",

    changeType: "positive" as const,
    icon: FileText,
  },
  {
    title: "Total Quizzes",
    value: "12",

    changeType: "positive" as const,
    icon: SiQuizlet,
  },
];

const DiscoverStrength = () => {
  return (
    <div className="px-10 py-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <StatsCards stat={stat} key={stat.title} />
        ))}
      </div>
      <QuizCreator />
    </div>
  );
};

export default DiscoverStrength;
