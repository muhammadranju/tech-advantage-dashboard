"use client";
import Pagination from "@/components/pagination/Pagination";
import CardSkeleton from "@/components/skeletons/CardSkeleton";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  useDeleteMockInterviewMutation,
  useGetMockInterviewQuery,
  useUpdateMockInterviewMutation,
} from "@/lib/redux/features/api/mockInterview/mockInterviewSliceApi";
import { Save, Trash, X } from "lucide-react";
import { useEffect, useState } from "react";
import { PiPencilFill } from "react-icons/pi";
import { toast } from "sonner";
import BackButtons from "../BootCamp/BackButtons";
import { SurveyCard } from "./mock_interview.interface";

const MockInterviewViewAnswersPage = () => {
  const [editingCardId, setEditingCardId] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState<SurveyCard | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const { data: quizAnswers, isLoading } = useGetMockInterviewQuery(null);
  const [data, setData] = useState<SurveyCard[]>(quizAnswers?.data || []);

  const [updateMockInterview] = useUpdateMockInterviewMutation();
  const [deleteMockInterview] = useDeleteMockInterviewMutation();

  const itemsPerPage = 4;
  const totalPages = Math.ceil((data?.length || 0) / itemsPerPage);
  const paginatedData =
    data?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage) ||
    [];

  const handleEdit = (card: SurveyCard) => {
    setEditingCardId(card._id);
    setEditFormData({ ...card });
  };

  const handleSave = async () => {
    try {
      const result = await updateMockInterview({
        id: editFormData?._id,
        body: editFormData,
      }).unwrap();

      if (result.success) {
        setData((prevData: SurveyCard[]) =>
          prevData.map((card) =>
            card._id === editFormData?._id ? editFormData : card
          )
        );
        toast.success("Mock interview updated successfully");
        setEditingCardId(null);
        setEditFormData(null);
      }
    } catch (error) {
      console.error("Error updating mock interview:", error);
      toast.error("Failed to update mock interview. Please try again.");
    }
  };

  const handleCancel = () => {
    setEditingCardId(null);
    setEditFormData(null);
  };

  const handleDeleteConfirmed = async (cardId: string) => {
    try {
      await deleteMockInterview({ id: cardId }).unwrap();
      toast.success("Mock interview deleted successfully");
      setData((prevData: SurveyCard[]) =>
        prevData.filter((card) => card._id !== cardId)
      );
    } catch (error) {
      console.error("Error deleting mock interview:", error);
      toast.error("Failed to delete mock interview. Please try again.");
    }
  };

  const updateQuestion = (value: string) => {
    if (editFormData) {
      setEditFormData({ ...editFormData, question: value });
    }
  };

  const updateOption = (
    optionId: string,
    field: "text" | "score",
    value: string | number
  ) => {
    if (editFormData) {
      setEditFormData({
        ...editFormData,
        answers: editFormData.answers.map((option) =>
          option._id === optionId
            ? { ...option, [field]: field === "score" ? Number(value) : value }
            : option
        ),
      });
    }
  };

  useEffect(() => {
    setData(quizAnswers?.data || []);
    setCurrentPage(1);
  }, [quizAnswers]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="w-full mx-auto min-h-screen p-8 rounded-xl">
      <BackButtons backTitle="Quiz" title={"Answers"} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-5">
        {isLoading ? (
          <>
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
          </>
        ) : (
          paginatedData.map((card: SurveyCard) => (
            <Card
              key={card._id}
              className="border border-gray-200 group hover:shadow-md transition-shadow"
            >
              {editingCardId === card._id ? (
                <>
                  <CardHeader>
                    <Input
                      value={editFormData?.question || ""}
                      onChange={(e) => updateQuestion(e.target.value)}
                      placeholder="Enter question"
                      className="text-base py-7 font-medium"
                    />
                  </CardHeader>
                  <CardContent className="pt-0 space-y-3">
                    {editFormData?.answers.map((option) => (
                      <div key={option._id} className="flex gap-2">
                        <Input
                          value={option.text}
                          onChange={(e) =>
                            updateOption(option._id, "text", e.target.value)
                          }
                          placeholder="Enter option text"
                          className="py-7  bg-gray-50 rounded-2xl border w-full "
                        />
                        <Input
                          type="number"
                          value={option.score}
                          onChange={(e) =>
                            updateOption(option._id, "score", e.target.value)
                          }
                          placeholder="Score"
                          className="py-7 w-20 bg-gray-50 rounded-2xl border "
                        />
                      </div>
                    ))}
                    <div className="flex gap-2 justify-end">
                      <Button
                        variant="outline"
                        className="py-5"
                        onClick={handleCancel}
                      >
                        <X /> Cancel
                      </Button>
                      <Button className="py-5" onClick={handleSave}>
                        <Save /> Save
                      </Button>
                    </div>
                  </CardContent>
                </>
              ) : (
                <>
                  <CardHeader>
                    <div className="flex items-start justify-between w-full">
                      <h3 className="text-base font-medium leading-relaxed">
                        {card.question}
                      </h3>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(card)}
                          className="p-2 cursor-pointer rounded-full hover:bg-gray-200"
                        >
                          <PiPencilFill className="text-2xl font-bold" />
                        </button>

                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <button className="p-2 cursor-pointer rounded-full hover:bg-red-100">
                              <Trash className="text-2xl font-bold text-red-500" />
                            </button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Delete Question
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete this entire
                                question and all its answers? This action cannot
                                be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <div className="flex justify-end gap-2 mt-4">
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                className="bg-red-500 text-white hover:bg-red-600 hover:text-white"
                                onClick={() => handleDeleteConfirmed(card._id)}
                              >
                                Delete
                              </AlertDialogAction>
                            </div>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0 space-y-3">
                    {card.answers?.map((option) => (
                      <div
                        key={option._id}
                        className="py-4 px-4 bg-gray-50 rounded-2xl border flex justify-between"
                      >
                        <span>{option.text}</span>
                        <span className="font-medium">{option.score}</span>
                      </div>
                    ))}
                  </CardContent>
                </>
              )}
            </Card>
          ))
        )}
      </div>

      {!isLoading && totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default MockInterviewViewAnswersPage;
