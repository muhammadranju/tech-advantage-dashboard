"use client";

import { AssessmentCardSkeleton } from "@/components/skeletons/AssessmentCardSkeleton";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader } from "@/components/ui/card";
import {
  useGetAssessmentsQuery,
  useUpdateAssessmentsMutation,
} from "@/lib/redux/features/api/assessments/assessmentsApiSlice";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { PiCheckBold, PiPencilFill, PiXBold } from "react-icons/pi";
import { toast } from "sonner";
import BackButtons from "../BootCamp/BackButtons";

// Type interfaces based on API data structure
interface Assessment {
  _id: string;
  range: string;
  description: string;
  recommendedService: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

// Interface for editing data
interface EditData {
  _id: string;
  range: string;
  description: string;
  recommendedService: string;
}

const AssessmentPage: React.FC = () => {
  const router = useRouter();
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<EditData>({} as EditData);

  // Fetch assessments data from API
  const { data, error, refetch } = useGetAssessmentsQuery(null);
  const [updateAssessments, { isLoading: isUpdating }] =
    useUpdateAssessmentsMutation();

  // Update local state when API data changes
  useEffect(() => {
    if (data?.data) {
      setAssessments(data.data);
    }
  }, [data]);

  const handleEdit = (assessmentId: string): void => {
    const assessment = assessments.find((a) => a._id === assessmentId);
    if (assessment) {
      setEditData({
        _id: assessment._id,
        range: assessment.range,
        description: assessment.description,
        recommendedService: assessment.recommendedService,
      });
      setEditingId(assessmentId);
    }
  };

  const handleSave = async (assessmentId: string): Promise<void> => {
    try {
      // Make API call to update the assessment
      const result = await updateAssessments({
        userId: assessmentId,
        range: editData.range,
        description: editData.description,
        recommendedService: editData.recommendedService,
      }).unwrap();

      console.log("Update result:", result);

      // Update local state with the new data
      setAssessments(
        assessments.map((assessment) =>
          assessment._id === assessmentId
            ? { ...assessment, ...editData }
            : assessment
        )
      );

      // Reset editing state
      setEditingId(null);
      setEditData({} as EditData);

      // Refresh data from server to ensure consistency
      refetch();

      toast.success("Assessment updated successfully!");
    } catch (error) {
      console.error("Error updating assessment:", error);
      toast.error("Failed to update assessment. Please try again.");
    }
  };

  // const handleDelete = async (assessmentId: string): Promise<void> => {
  //   try {
  //     // Here you would make an API call to delete the assessment
  //     // Since you don't have delete mutation yet, I'll just update local state
  //     setAssessments(
  //       assessments.filter((assessment) => assessment._id !== assessmentId)
  //     );

  //     toast.success("Assessment deleted successfully!");

  //     // You'll need to implement delete API call when ready:
  //     // await deleteAssessmentMutation(assessmentId).unwrap();
  //   } catch (error) {
  //     console.error("Error deleting assessment:", error);
  //     toast.error("Failed to delete assessment. Please try again.");
  //   }
  // };

  const handleCancel = (): void => {
    setEditingId(null);
    setEditData({} as EditData);
    toast.info("Assessment editing canceled!");
  };

  const handleInputChange = (field: keyof EditData, value: string): void => {
    setEditData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleTextareaChange = (
    e: ChangeEvent<HTMLTextAreaElement>,
    field: keyof EditData
  ): void => {
    handleInputChange(field, e.target.value);
  };

  const handleInputFieldChange = (
    e: ChangeEvent<HTMLInputElement>,
    field: keyof EditData
  ): void => {
    handleInputChange(field, e.target.value);
  };

  // Generate title based on range
  const generateTitle = (range: string): string => {
    const rangeNumbers = range.split("-").map((num) => parseInt(num.trim()));
    const minRange = rangeNumbers[0] || 0;

    if (minRange >= 0 && minRange <= 5) {
      return "Minor Tweaks";
    } else if (minRange >= 6 && minRange <= 10) {
      return "Growth Solution";
    } else {
      return "End-to-End Solution";
    }
  };

  // Loading state
  // if (isLoading) {
  //   return (
  //     <div className="space-y-5">
  //       <div className="flex justify-center items-center h-64">
  //         <div className="text-lg">Loading assessments...</div>
  //       </div>
  //     </div>
  //   );
  // }

  // Error state
  if (error) {
    return (
      <div className="space-y-5">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-red-500">
            Error loading assessments. Please try again.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-10 mt-5">
      <div className="mx-auto bg-white">
        {/* Navigation Tabs */}

        <BackButtons backTitle="Question" title={"Answer"} />

        {/* Assessment Cards */}
        <div className="space-y-6">
          {assessments.length === 0 ? (
            <>
              <AssessmentCardSkeleton />
              <AssessmentCardSkeleton />
              <AssessmentCardSkeleton />
            </>
          ) : (
            assessments.map((assessment) => {
              const isEditing: boolean = editingId === assessment._id;
              const currentData = isEditing ? editData : assessment;
              const title = generateTitle(assessment.range);

              return (
                <Card key={assessment._id}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Badge
                          variant="secondary"
                          className="bg-white shadow rounded-md border text-sm text-foreground hover:bg-muted"
                        >
                          {isEditing ? (
                            <input
                              type="text"
                              value={currentData.range}
                              onChange={(e) =>
                                handleInputFieldChange(e, "range")
                              }
                              className="bg-transparent border-none outline-none text-sm w-24"
                              placeholder="0-5"
                            />
                          ) : (
                            `Range - ${currentData.range}`
                          )}
                        </Badge>
                      </div>

                      {isEditing ? (
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleSave(assessment._id)}
                            className="hover:bg-green-100 cursor-pointer p-3 rounded-full disabled:opacity-50"
                            type="button"
                            disabled={isUpdating}
                          >
                            <PiCheckBold className="text-2xl font-bold text-green-600" />
                          </button>
                          <button
                            onClick={handleCancel}
                            className="hover:bg-red-100 cursor-pointer p-3 rounded-full"
                            type="button"
                            disabled={isUpdating}
                          >
                            <PiXBold className="text-2xl font-bold text-red-600" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(assessment._id)}
                            className="hover:bg-gray-100 cursor-pointer p-3 rounded-full"
                            type="button"
                          >
                            <PiPencilFill className="text-2xl font-bold" />
                          </button>
                        </div>
                      )}
                    </div>

                    <h1 className="text-2xl font-bold">{title}</h1>

                    {isEditing ? (
                      <textarea
                        value={currentData.description}
                        onChange={(e) => handleTextareaChange(e, "description")}
                        className="leading-relaxed border rounded-lg border-gray-300 px-2 py-1 w-full min-h-[80px] resize-y"
                        placeholder="Enter assessment description..."
                      />
                    ) : (
                      <p className="leading-relaxed">
                        {currentData.description}
                      </p>
                    )}

                    {/* Recommended Service Section */}
                    <div className="">
                      <h4 className="text-lg font-semibold">We recommend</h4>

                      <div className="flex flex-col">
                        {isEditing ? (
                          <textarea
                            value={currentData.recommendedService}
                            onChange={(e) =>
                              handleTextareaChange(e, "recommendedService")
                            }
                            placeholder="Enter recommended services separated by periods (e.g., service 1. service 2. service 3)"
                            className="border border-gray-300 capitalize rounded-lg px-2 py-2 w-full min-h-[80px] resize-y"
                          />
                        ) : (
                          currentData.recommendedService
                            .split(".")
                            .filter((service: string) => service.trim() !== "")
                            .map((service: string, index: number) => (
                              <ol
                                key={index}
                                className="list-disc list-inside capitalize"
                              >
                                <li>{service.trim()}</li>
                              </ol>
                            ))
                        )}
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default AssessmentPage;
