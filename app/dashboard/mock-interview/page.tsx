import { StatsCards } from "@/components/dashboard/StatsCards";
import { QuizCreator } from "@/components/discoverStrength/QuizCreator";
import { MockInterviewQuiz } from "@/components/mockInterview/MockInterviewQuiz";
import { FileText } from "lucide-react";
const stats = [
  {
    title: "Total Participant",
    value: "$124,563",
    change: "+12.5%",
    changeType: "positive" as const,
    icon: FileText,
  },
  {
    title: "Top Achiever",
    value: "8,642",
    change: "+6.3%",
    changeType: "positive" as const,
    icon: FileText,
  },
];

const MockInterview = () => {
  return (
    <div className="px-10 py-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {stats.map((stat) => (
          <StatsCards stat={stat} key={stat.title} />
        ))}
      </div>
      <MockInterviewQuiz />
    </div>
  );
};

export default MockInterview;
