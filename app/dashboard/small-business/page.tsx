import { StatsCards } from "@/components/dashboard/StatsCards";
import { SmallBusinessQsn } from "@/components/smallBusiness/SmallBusinessQsn";
import { MdOutlineQuiz } from "react-icons/md";

const stats = [
  {
    title: "Total Questions",
    value: "8,642",
    changeType: "positive" as const,
    icon: MdOutlineQuiz,
  },
  //   {
  //     title: "Total Quizzes",
  //     value: "12",
  //     change: "+12.5%",
  //     changeType: "positive" as const,
  //     icon: SiQuizlet,
  //   },
];

const SmallBusiness = () => {
  return (
    <div className="px-10 py-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <StatsCards stat={stat} key={stat.title} />
        ))}
      </div>
      <SmallBusinessQsn />
    </div>
  );
};

export default SmallBusiness;
