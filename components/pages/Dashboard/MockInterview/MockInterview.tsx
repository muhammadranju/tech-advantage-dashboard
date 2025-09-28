// "use client";
// import { StatsCards } from "@/components/dashboard/StatsCards";
// import { AssessmentComment } from "@/components/mockInterview/AssessmentComment";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   ChevronLeft,
//   ChevronRight,
//   FileText,
//   ListCollapseIcon,
//   Save,
// } from "lucide-react";
// import { useRouter } from "next/navigation";
// import { useState } from "react";

// interface Question {
//   question: string;
//   answers: {
//     answer1: string;
//     answer2: string;
//     answer3: string;
//   };
// }

// type TabType = "quiz" | "assessment";

// const stats = [
//   {
//     title: "Total Participant",
//     value: 124563,
//     change: "+12.5%",
//     changeType: "positive" as const,
//     icon: FileText,
//   },
// ];

// const MockInterview = () => {
//   const [activeTab, setActiveTab] = useState<TabType>("quiz");
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);

//   // FIX: Use Array.from to create independent objects for each question
//   const [questions, setQuestions] = useState<Question[]>(
//     Array.from({ length: 5 }, () => ({
//       question: "",
//       answers: { answer1: "", answer2: "", answer3: "" },
//     }))
//   );

//   const router = useRouter();

//   const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const updatedQuestions = [...questions];
//     updatedQuestions[currentQuestionIndex].question = e.target.value;
//     setQuestions(updatedQuestions);
//   };

//   const handleAnswerChange = (
//     e: React.ChangeEvent<HTMLInputElement>,
//     answerIndex: 1 | 2 | 3
//   ) => {
//     const updatedQuestions = [...questions];
//     updatedQuestions[currentQuestionIndex].answers[`answer${answerIndex}`] =
//       e.target.value;
//     setQuestions(updatedQuestions);
//   };

//   const handleNextQuestion = () => {
//     if (currentQuestionIndex < questions.length - 1) {
//       setCurrentQuestionIndex(currentQuestionIndex + 1);
//     }
//   };

//   const handlePreviousQuestion = () => {
//     if (currentQuestionIndex > 0) {
//       setCurrentQuestionIndex(currentQuestionIndex - 1);
//     }
//   };

//   const isCurrentQuestionValid = () => {
//     const currentQuestion = questions[currentQuestionIndex];
//     return (
//       currentQuestion.question !== "" &&
//       currentQuestion.answers.answer1 !== "" &&
//       currentQuestion.answers.answer2 !== "" &&
//       currentQuestion.answers.answer3 !== ""
//     );
//   };

//   const handleSave = () => {
//     console.log(questions);
//   };

//   return (
//     <div className="px-10 py-4">
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {stats.map((stat) => (
//           <StatsCards stat={stat} key={stat.title} />
//         ))}
//       </div>
//       <div className="mx-auto bg-white rounded-lg p-6 mt-16">
//         {/* Tab Navigation */}
//         <div className="flex gap-8 mb-8">
//           <button
//             onClick={() => setActiveTab("quiz")}
//             className={`pb-2 text-lg font-medium ${
//               activeTab === "quiz"
//                 ? "text-black border-b-2 border-black"
//                 : "text-neutral-500"
//             }`}
//           >
//             Quiz
//           </button>
//           <button
//             onClick={() => setActiveTab("assessment")}
//             className={`pb-2 text-lg font-medium ${
//               activeTab === "assessment"
//                 ? "text-black border-b-2 border-black"
//                 : "text-neutral-500"
//             }`}
//           >
//             Assessment Comment
//           </button>
//         </div>

//         {/* Tab Content */}
//         {activeTab === "quiz" && (
//           <div className="space-y-6">
//             <div>
//               <label className="block text-lg font-medium mb-3">
//                 {currentQuestionIndex + 1}. Question
//               </label>
//               <Input
//                 placeholder="Enter quiz question"
//                 value={questions[currentQuestionIndex].question}
//                 onChange={handleQuestionChange}
//                 className="py-6"
//               />
//             </div>

//             {([1, 2, 3] as const).map((i) => (
//               <div key={i}>
//                 <label className="block text-lg font-medium mb-3">
//                   {i}. Answer (
//                   {i === 1 ? "1 marks" : i === 2 ? "0.5 marks" : "0 marks"})
//                 </label>
//                 <Input
//                   placeholder="Enter quiz answer"
//                   value={questions[currentQuestionIndex].answers[`answer${i}`]}
//                   onChange={(e) => handleAnswerChange(e, i)}
//                   className="py-6"
//                 />
//               </div>
//             ))}

//             <div className="flex justify-end items-center gap-8 py-6">
//               <Button
//                 variant="ghost"
//                 className="flex items-center gap-2 text-neutral-600"
//                 onClick={handlePreviousQuestion}
//                 disabled={currentQuestionIndex === 0}
//               >
//                 <ChevronLeft className="h-4 w-4" />
//                 Previous Question
//               </Button>
//               <Button
//                 variant="ghost"
//                 className="flex items-center gap-2 text-neutral-600"
//                 onClick={handleNextQuestion}
//                 disabled={currentQuestionIndex === questions.length - 1}
//               >
//                 Next Question
//                 <ChevronRight className="h-4 w-4" />
//               </Button>
//             </div>

//             <div className="flex gap-4 pt-4">
//               <Button
//                 onClick={() =>
//                   router.push("/dashboard/mock-interview/view-answers")
//                 }
//                 variant="outline"
//                 className="flex-1 py-6 bg-transparent"
//               >
//                 <ListCollapseIcon /> View Details
//               </Button>

//               <Button
//                 className="flex-1 py-6 hover:bg-neutral-800"
//                 onClick={handleSave}
//                 disabled={!isCurrentQuestionValid()}
//               >
//                 <Save /> Save
//               </Button>
//             </div>
//           </div>
//         )}

//         {activeTab === "assessment" && <AssessmentComment />}
//       </div>
//     </div>
//   );
// };

// export default MockInterview;

"use client";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { AssessmentComment } from "@/components/mockInterview/AssessmentComment";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ChevronLeft,
  ChevronRight,
  FileText,
  ListCollapseIcon,
  Save,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Answer {
  text: string;
  marks: number | "";
}

interface Question {
  question: string;
  answers: Answer[];
}

type TabType = "quiz" | "assessment";

const stats = [
  {
    title: "Total Participant",
    value: 124563,
    change: "+12.5%",
    changeType: "positive" as const,
    icon: FileText,
  },
];

const MockInterview = () => {
  const [activeTab, setActiveTab] = useState<TabType>("quiz");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);

  // Each question has its own array of answers with marks
  const [questions, setQuestions] = useState<Question[]>(
    Array.from({ length: 5 }, () => ({
      question: "",
      answers: [
        { text: "", marks: "" },
        { text: "", marks: "" },
        { text: "", marks: "" },
      ],
    }))
  );

  const router = useRouter();

  const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedQuestions = [...questions];
    updatedQuestions[currentQuestionIndex].question = e.target.value;
    setQuestions(updatedQuestions);
  };

  const handleAnswerTextChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    answerIndex: number
  ) => {
    const updatedQuestions = [...questions];
    updatedQuestions[currentQuestionIndex].answers[answerIndex].text =
      e.target.value;
    setQuestions(updatedQuestions);
  };

  const handleAnswerMarksChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    answerIndex: number
  ) => {
    const updatedQuestions = [...questions];
    const value = e.target.value;
    updatedQuestions[currentQuestionIndex].answers[answerIndex].marks =
      value === "" ? "" : parseFloat(value);
    setQuestions(updatedQuestions);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const isCurrentQuestionValid = () => {
    const currentQuestion = questions[currentQuestionIndex];
    return (
      currentQuestion.question !== "" &&
      currentQuestion.answers.every((a) => a.text !== "")
    );
  };

  const handleSave = () => {
    console.log(questions);
  };

  return (
    <div className="px-10 py-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <StatsCards stat={stat} key={stat.title} />
        ))}
      </div>
      <div className="mx-auto bg-white rounded-lg p-6 mt-16">
        {/* Tab Navigation */}
        <div className="flex gap-8 mb-8">
          <button
            onClick={() => setActiveTab("quiz")}
            className={`pb-2 text-lg font-medium ${
              activeTab === "quiz"
                ? "text-black border-b-2 border-black"
                : "text-neutral-500"
            }`}
          >
            Quiz
          </button>
          <button
            onClick={() => setActiveTab("assessment")}
            className={`pb-2 text-lg font-medium ${
              activeTab === "assessment"
                ? "text-black border-b-2 border-black"
                : "text-neutral-500"
            }`}
          >
            Assessment Comment
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "quiz" && (
          <div className="space-y-6">
            {/* Question */}
            <div>
              <label className="block text-lg font-medium mb-3">
                {currentQuestionIndex + 1}. Question
              </label>
              <Input
                placeholder="Enter quiz question"
                value={questions[currentQuestionIndex].question}
                onChange={handleQuestionChange}
                className="py-6"
              />
            </div>

            {/* Answers */}
            {questions[currentQuestionIndex].answers.map((answer, index) => (
              <div key={index} className="flex gap-4 items-center">
                <div className="flex-1">
                  <label className="block text-lg font-medium mb-2">
                    {index + 1}. Answer
                  </label>
                  <Input
                    placeholder="Enter answer text"
                    value={answer.text}
                    onChange={(e) => handleAnswerTextChange(e, index)}
                    className="py-6"
                  />
                </div>
                <div className="w-24">
                  <label className="block text-lg font-medium mb-2">
                    Marks
                  </label>
                  <Input
                    type="number"
                    placeholder="Marks"
                    value={answer.marks}
                    onChange={(e) => handleAnswerMarksChange(e, index)}
                    className="py-6"
                  />
                </div>
              </div>
            ))}

            {/* Navigation */}
            <div className="flex justify-end items-center gap-8 py-6">
              <Button
                variant="ghost"
                className="flex items-center gap-2 text-neutral-600"
                onClick={handlePreviousQuestion}
                disabled={currentQuestionIndex === 0}
              >
                <ChevronLeft className="h-4 w-4" />
                Previous Question
              </Button>
              <Button
                variant="ghost"
                className="flex items-center gap-2 text-neutral-600"
                onClick={handleNextQuestion}
                disabled={currentQuestionIndex === questions.length - 1}
              >
                Next Question
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <Button
                onClick={() =>
                  router.push("/dashboard/mock-interview/view-answers")
                }
                variant="outline"
                className="flex-1 py-6 bg-transparent"
              >
                <ListCollapseIcon /> View Details
              </Button>

              <Button
                className="flex-1 py-6 hover:bg-neutral-800"
                onClick={handleSave}
                disabled={!isCurrentQuestionValid()}
              >
                <Save /> Save
              </Button>
            </div>
          </div>
        )}

        {activeTab === "assessment" && <AssessmentComment />}
      </div>
    </div>
  );
};

export default MockInterview;
