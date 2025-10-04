/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import CardSkeleton from "@/components/skeletons/CardSkeleton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { SurveyCard } from "@/interface/assessments.interface";
import {
  useGetQuizAnswersQuery,
  useQuizDeleteSmallBusinessQuestionAnswerMutation,
  useQuizUpdateSmallBusinessQuestionAnswerMutation,
} from "@/lib/redux/features/api/assessments/assessmentsApiSlice";
import { Save, Trash, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { PiPencilFill } from "react-icons/pi";
import { toast } from "sonner";
import { ClipLoader } from "react-spinners";

const SMBViewAnswersPage = () => {
  const router = useRouter();
  const [editingCardId, setEditingCardId] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState<SurveyCard | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("business-overview");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState<string | null>(null);
  const [quizUpdateSmallBusinessQuestionAnswer, { isLoading: isUpdating }] =
    useQuizUpdateSmallBusinessQuestionAnswerMutation();
  const [quizDeleteSmallBusinessQuestionAnswer] =
    useQuizDeleteSmallBusinessQuestionAnswerMutation();

  const { data: quizAnswers, isLoading } = useGetQuizAnswersQuery({
    category: selectedCategory,
  });
  const [data, setData] = useState(quizAnswers?.data || []);

  useEffect(() => {
    setData(quizAnswers?.data || []);
  }, [quizAnswers?.data]);

  const handleEdit = (card: SurveyCard) => {
    setEditingCardId(card._id);
    setEditFormData({ ...card });
  };

  const handleSave = async () => {
    try {
      const response = await quizUpdateSmallBusinessQuestionAnswer({
        body: editFormData,
        category: selectedCategory,
        id: editingCardId,
      }).unwrap();

      if (response.success) {
        toast.success("Question & Answer saved successfully");
        if (editFormData) {
          setData((prevData: SurveyCard[]) =>
            prevData.map((card) =>
              card._id === editFormData._id ? editFormData : card
            )
          );
        }
      }
      setEditingCardId(null);
      setEditFormData(null);
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    setEditingCardId(null);
    setEditFormData(null);
  };

  const updateQuestion = (value: string) => {
    if (editFormData) {
      setEditFormData({ ...editFormData, questionText: value });
    }
  };

  const updateOption = (
    optionId: string,
    value: string,
    field: "text" | "score"
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

  console.log(data);
  const handelChange = (e: any) => {
    setSelectedCategory(e.target.value);
  };

  const openDeleteDialog = (id: string) => {
    setDeleteItemId(id);
    setDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!deleteItemId) return;

    try {
      await quizDeleteSmallBusinessQuestionAnswer({
        category: selectedCategory,
        id: deleteItemId,
      }).unwrap();
      toast.info("Question & Answer deleted successfully");

      // Filter out the deleted item from current state
      setData((prevData: SurveyCard[]) =>
        prevData.filter((card) => card._id !== deleteItemId)
      );
    } catch (error: any) {
      console.log(error);
      toast.error("Failed to delete question");
    } finally {
      setDeleteDialogOpen(false);
      setDeleteItemId(null);
    }
  };

  return (
    <div className="w-full mx-auto p-8  rounded-xl">
      <div className="flex gap-8 justify-between mb-8">
        <div className="flex gap-8 ">
          <button
            onClick={() => router.back()}
            className={`pb-2 text-lg font-medium hover:border-b-2 border-black`}
          >
            Question & Answer
          </button>
          {/* </Link> */}
          <button
            className={`pb-2 text-lg font-medium border-b-2 border-black`}
          >
            Answer Assessment
          </button>
        </div>
        <Select onValueChange={(value) => setSelectedCategory(value)}>
          <SelectTrigger className="w-[180px] rounded-md py-5 border-neutral-400 text-black">
            <SelectValue placeholder="Business Overview" />
          </SelectTrigger>
          <SelectContent className="py-2 ">
            <SelectItem value="business-overview">Business Overview</SelectItem>
            <SelectItem value="aspiring-business">Aspiring Business</SelectItem>
            <SelectItem value="current-processes-pain-points">
              Current Processes & Pain Points
            </SelectItem>
            <SelectItem value="operations-growth">
              Operations & Growth
            </SelectItem>
            <SelectItem value="future-goals-integration-needs">
              Future Goals & Integration Needs
            </SelectItem>
            <SelectItem
              value="readiness-budget"
              onChange={(e) => handelChange(e)}
            >
              Readiness Budget
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {isLoading ? (
          <>
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
          </>
        ) : (
          data?.map((card: SurveyCard) => (
            <Card
              key={card._id}
              className="border border-gray-200 group hover:shadow-md transition-shadow"
            >
              {editingCardId === card._id ? (
                <>
                  <CardHeader>
                    <div className="space-y-4">
                      <Input
                        value={editFormData?.questionText || ""}
                        onChange={(e) => updateQuestion(e.target.value)}
                        placeholder="Enter question"
                        className="text-base py-7 font-medium"
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-3 mb-4">
                      {editFormData?.answers.map((option) => (
                        <div className="flex gap-4" key={option._id}>
                          <Input
                            key={`text-${option._id}`}
                            value={option.text}
                            onChange={(e) =>
                              updateOption(option._id, e.target.value, "text")
                            }
                            placeholder="Enter option text"
                            className="py-7 px-4 flex-1 bg-gray-50 rounded-2xl border"
                          />
                          <Input
                            key={`score-${option._id}`}
                            value={option.score}
                            onChange={(e) =>
                              updateOption(option._id, e.target.value, "score")
                            }
                            type="number"
                            placeholder="Score"
                            className="py-7 px-4 w-24 bg-gray-50 rounded-2xl border"
                          />
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2 justify-end">
                      <Button
                        variant="outline"
                        className="py-5"
                        onClick={handleCancel}
                      >
                        <X /> Cancel
                      </Button>
                      <Button
                        className="py-5"
                        onClick={handleSave}
                        disabled={isUpdating}
                      >
                        {isUpdating ? (
                          <>
                            <ClipLoader color="#ffffff" size={16} />
                            Saving...
                          </>
                        ) : (
                          <>
                            <Save /> Save
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </>
              ) : (
                <>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <h3 className="text-base font-medium leading-relaxed">
                        {card.questionText}
                      </h3>
                      <div>
                        <button
                          onClick={() => handleEdit(card)}
                          className=" p-2 cursor-pointer rounded-full hover:bg-gray-200 "
                        >
                          <PiPencilFill className="text-2xl font-bold" />
                        </button>
                        <button
                          onClick={() => openDeleteDialog(card._id)}
                          className=" p-2 cursor-pointer rounded-full hover:bg-red-200 "
                        >
                          <Trash className="text-2xl text-red-500 font-bold" />
                        </button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0 flex  gap-4">
                    <div className="space-y-3 flex-1">
                      {card.answers.map((option) => (
                        <div
                          key={option._id}
                          className="py-4 px-4 bg-gray-50 rounded-2xl border"
                        >
                          {option.text}
                        </div>
                      ))}
                    </div>
                    <div className="space-y-3 w-24">
                      {card.answers.map((option) => (
                        <div
                          key={option._id}
                          className="py-4 px-4 bg-gray-50 rounded-2xl border"
                        >
                          {option.score}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </>
              )}
            </Card>
          ))
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              question and all its answers from the database.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-600"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default SMBViewAnswersPage;
