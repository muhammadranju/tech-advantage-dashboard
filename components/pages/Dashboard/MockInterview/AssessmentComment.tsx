// "use client";

// import { AssessmentCardSkeleton } from "@/components/skeletons/AssessmentCardSkeleton";
// import { Badge } from "@/components/ui/badge";
// import { Card, CardHeader } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import {
//   useGetQuizAssessmentQuery,
//   useUpdateQuizAssessmentsMutation,
// } from "@/lib/redux/features/api/mockInterview/quizAssessmentSliceApi";
// import { useEffect, useState } from "react";
// import { PiCheckBold, PiPencilFill, PiXBold } from "react-icons/pi";
// import { toast } from "sonner";

// interface Comment {
//   _id: number;
//   title: string;
//   range: string;
//   recomandedText: string;
// }

// export function AssessmentComment() {
//   const [editingId, setEditingId] = useState<number | null>(null);
//   const [editContent, setEditContent] = useState("");
//   const [editingScoreId, setEditingScoreId] = useState<number | null>(null);
//   const [editScore, setEditScore] = useState("");

//   const { data: quizAssessmentData, isLoading } =
//     useGetQuizAssessmentQuery(null);
//   const [comments, setComments] = useState<Comment[]>([]);
//   const [updateQuizAssessments] = useUpdateQuizAssessmentsMutation();

//   const handleEditClick = (comment: Comment) => {
//     setEditingId(comment._id);
//     setEditContent(comment.recomandedText);
//   };

//   const handleSaveClick = async (id: number) => {
//     try {
//       const result = await updateQuizAssessments({
//         id: id,
//         body: {
//           range: editScore,
//           recomandedText: editContent,
//         },
//       }).unwrap();

//       if (result.success) {
//         setComments(
//           comments.map((comment) =>
//             comment._id === id
//               ? { ...comment, range: editScore, recomandedText: editContent }
//               : comment
//           )
//         );
//         toast.success("Mock interview updated successfully");
//         setEditingScoreId(null);
//         setEditScore("");
//       }
//     } catch (error) {
//       console.error("Error updating mock interview:", error);
//       toast.error("Failed to update mock interview. Please try again.");
//     }
//   };

//   const handleCancelClick = () => {
//     setEditingId(null);
//     setEditContent("");
//   };

//   const handleScoreEditClick = (comment: Comment) => {
//     setEditingScoreId(comment._id);
//     setEditScore(comment.range);
//   };

//   const handleScoreSaveClick = async (id: number) => {
//     setComments(
//       comments.map((comment) =>
//         comment._id === id ? { ...comment, range: editScore } : comment
//       )
//     );
//     setEditingScoreId(null);
//     setEditScore("");
//   };

//   const handleScoreCancelClick = () => {
//     setEditingScoreId(null);
//     setEditScore("");
//   };

//   useEffect(() => {
//     if (quizAssessmentData?.data) {
//       setComments(quizAssessmentData.data);
//     }
//   }, [quizAssessmentData?.data]);

//   return (
//     <div className=" mx-auto bg-white">
//       {/* Comment Cards */}
//       <div className="space-y-6">
//         {isLoading && (
//           <>
//             <AssessmentCardSkeleton />
//             <AssessmentCardSkeleton />
//             <AssessmentCardSkeleton />
//           </>
//         )}
//         {!isLoading &&
//           comments?.map((comment, index) => (
//             <Card
//               key={comment._id}
//               className="border border-neutral-200 shadow-sm"
//             >
//               <CardHeader className="pb-3">
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center gap-4">
//                     <Badge
//                       variant="secondary"
//                       className="bg-white rounded-md shadow border text-sm text-foreground hover:bg-muted"
//                     >
//                       Comment - {index + 1}
//                     </Badge>

//                     {editingScoreId === comment._id ? (
//                       <div className="flex items-center gap-2">
//                         <Input
//                           type="text"
//                           value={editScore}
//                           onChange={(e) => setEditScore(e.target.value)}
//                           className="h-8 w-32 text-sm"
//                           placeholder="e.g., 0-20"
//                           autoFocus
//                         />
//                         <button
//                           onClick={() => handleScoreSaveClick(comment._id)}
//                           className="hover:bg-green-100 cursor-pointer p-2 rounded-full"
//                         >
//                           <PiCheckBold className="text-lg font-bold text-green-500" />
//                         </button>
//                         <button
//                           onClick={handleScoreCancelClick}
//                           className="hover:bg-red-100 cursor-pointer p-2 rounded-full"
//                         >
//                           <PiXBold className="text-lg font-bold text-red-500" />
//                         </button>
//                       </div>
//                     ) : (
//                       <div
//                         onClick={() => handleScoreEditClick(comment)}
//                         className="group flex items-center gap-2 cursor-pointer"
//                       >
//                         <Badge
//                           variant="secondary"
//                           className="bg-white shadow rounded-md border text-sm text-foreground hover:bg-muted"
//                         >
//                           {comment.range}
//                         </Badge>
//                         <PiPencilFill className="text-base opacity-0 group-hover:opacity-100 transition-opacity" />
//                       </div>
//                     )}
//                   </div>
//                   {editingId === comment._id ? (
//                     <div className="flex gap-1">
//                       <button
//                         onClick={() => handleSaveClick(comment._id)}
//                         className="hover:bg-green-100 cursor-pointer p-3 rounded-full"
//                       >
//                         <PiCheckBold className="text-xl font-bold text-green-500" />
//                       </button>
//                       <button
//                         onClick={handleCancelClick}
//                         className="hover:bg-red-100 cursor-pointer p-3 rounded-full"
//                       >
//                         <PiXBold className="text-xl font-bold text-red-500" />
//                       </button>
//                     </div>
//                   ) : (
//                     <button
//                       onClick={() => handleEditClick(comment)}
//                       className="hover:bg-neutral-100 cursor-pointer p-3 rounded-full"
//                     >
//                       <PiPencilFill className="text-2xl font-bold " />
//                     </button>
//                   )}
//                 </div>
//                 {editingId === comment._id ? (
//                   <textarea
//                     value={editContent}
//                     onChange={(e) => setEditContent(e.target.value)}
//                     className="w-full p-2 text-sm text-neutral-700 leading-relaxed border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     rows={6}
//                   />
//                 ) : (
//                   <p className="text-sm text-neutral-700 leading-relaxed ">
//                     {comment.recomandedText}
//                   </p>
//                 )}
//               </CardHeader>
//             </Card>
//           ))}
//       </div>
//     </div>
//   );
// }

"use client";

import { AssessmentCardSkeleton } from "@/components/skeletons/AssessmentCardSkeleton";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  useGetQuizAssessmentQuery,
  useUpdateQuizAssessmentsMutation,
} from "@/lib/redux/features/api/mockInterview/quizAssessmentSliceApi";
import { useEffect, useState } from "react";
import { PiCheckBold, PiPencilFill, PiXBold } from "react-icons/pi";
import { toast } from "sonner";
import { Comment } from "./mock_interview.interface";

export function AssessmentComment() {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editContent, setEditContent] = useState("");
  const [editScore, setEditScore] = useState("");

  const { data: quizAssessmentData, isLoading } =
    useGetQuizAssessmentQuery(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [updateQuizAssessments] = useUpdateQuizAssessmentsMutation();

  const handleEditClick = (comment: Comment) => {
    setEditingId(comment._id);
    setEditContent(comment.recomandedText);
    setEditScore(comment.range);
  };

  const handleSaveClick = async (id: number) => {
    try {
      const result = await updateQuizAssessments({
        id: id,
        body: {
          range: editScore,
          recomandedText: editContent,
        },
      }).unwrap();

      if (result.success) {
        setComments(
          comments.map((comment) =>
            comment._id === id
              ? { ...comment, range: editScore, recomandedText: editContent }
              : comment
          )
        );
        toast.success("Mock interview updated successfully");
        setEditingId(null);
        setEditContent("");
        setEditScore("");
      }
    } catch (error) {
      console.error("Error updating mock interview:", error);
      toast.error("Failed to update mock interview. Please try again.");
    }
  };

  const handleCancelClick = () => {
    setEditingId(null);
    setEditContent("");
    setEditScore("");
  };

  useEffect(() => {
    if (quizAssessmentData?.data) {
      setComments(quizAssessmentData.data);
    }
  }, [quizAssessmentData?.data]);

  return (
    <div className=" mx-auto bg-white">
      {/* Comment Cards */}
      <div className="space-y-6">
        {isLoading && (
          <>
            <AssessmentCardSkeleton />
            <AssessmentCardSkeleton />
            <AssessmentCardSkeleton />
          </>
        )}
        {!isLoading &&
          comments?.map((comment, index) => (
            <Card
              key={comment._id}
              className="border border-neutral-200 shadow-sm"
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Badge
                      variant="secondary"
                      className="bg-white rounded-md shadow border text-sm text-foreground hover:bg-muted"
                    >
                      Comment - {index + 1}
                    </Badge>

                    {editingId === comment._id ? (
                      <div className="flex items-center gap-2">
                        <Input
                          type="text"
                          value={editScore}
                          onChange={(e) => setEditScore(e.target.value)}
                          className="h-8 w-32 text-sm"
                          placeholder="e.g., 0-20"
                        />
                      </div>
                    ) : (
                      <Badge
                        variant="secondary"
                        className="bg-white shadow rounded-md border text-sm text-foreground hover:bg-muted"
                      >
                        {comment.range}
                      </Badge>
                    )}
                  </div>
                  {editingId === comment._id ? (
                    <div className="flex gap-1">
                      <button
                        onClick={() => handleSaveClick(comment._id)}
                        className="hover:bg-green-100 cursor-pointer p-3 rounded-full"
                      >
                        <PiCheckBold className="text-xl font-bold text-green-500" />
                      </button>
                      <button
                        onClick={handleCancelClick}
                        className="hover:bg-red-100 cursor-pointer p-3 rounded-full"
                      >
                        <PiXBold className="text-xl font-bold text-red-500" />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleEditClick(comment)}
                      className="hover:bg-neutral-100 cursor-pointer p-3 rounded-full"
                    >
                      <PiPencilFill className="text-2xl font-bold " />
                    </button>
                  )}
                </div>
                {editingId === comment._id ? (
                  <textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    className="w-full p-2 text-sm text-neutral-700 leading-relaxed border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={6}
                  />
                ) : (
                  <p className="text-sm text-neutral-700 leading-relaxed ">
                    {comment.recomandedText}
                  </p>
                )}
              </CardHeader>
            </Card>
          ))}
      </div>
    </div>
  );
}
