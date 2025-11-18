/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
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
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  useCreateModuleMutation,
  useDeleteModuleMutation,
  useGetModulesQuery,
  useUpdateModuleMutation,
} from "@/lib/redux/features/api/courses/modulesSliceApi";
import {
  ArrowRight,
  Check,
  FileText,
  Play,
  Plus,
  Save,
  Trash,
  Trash2,
  X,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { PiPencilFill } from "react-icons/pi";
import { toast } from "sonner";
import BackButtons from "../BootCamp/BackButtons";
import { Course } from "./course.interface";
import CourseCardSkeleton from "@/components/skeletons/CourseCardSkeleton";

export default function ModulesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");
  const [openAddModule, setOpenAddModule] = useState(false);
  const [title, setTitle] = useState("");
  const { modules } = useParams();
  const router = useRouter();

  const { data: courseData, isLoading } = useGetModulesQuery({
    id: modules,
  });

  const [createModule] = useCreateModuleMutation();
  const [updateModule] = useUpdateModuleMutation();
  const [deleteModule] = useDeleteModuleMutation();

  const requestDelete = (id: string) => {
    console.log(id);
    setDeleteTargetId(id);
    setDeleteOpen(true);
  };

  const confirmDelete = async (): Promise<void> => {
    if (!deleteTargetId) return;
    try {
      const result = await deleteModule({
        moduleId: modules as string,
        id: deleteTargetId as string,
      }).unwrap();
      if (result?.success) {
        toast.success("Module deleted successfully");
        setCourses((prev) => prev.filter((c) => c._id !== deleteTargetId));
      } else {
        throw new Error(result?.message || "Failed to delete module");
      }
    } catch (error: any) {
      toast.error(
        error?.message || error?.data?.message || "Failed to delete module"
      );
      throw error;
    }
  };

  const handleAddModule = async (title: string): Promise<void> => {
    try {
      const result = await createModule({
        body: {
          name: title,
        },
        id: modules as string,
      }).unwrap();
      if (result.success) {
        toast.success("Module created successfully");
        const newModule: Course = {
          _id: result.data._id,
          name: result.data.name,
          typeCounts: result.data.typeCounts || {
            video: 0,
            pdf: 0,
          },
        };
        setCourses((prev) => [newModule, ...prev]);
      } else {
        throw new Error(result?.message || "Failed to create module");
      }
    } catch (error: any) {
      toast.error(
        error?.data?.message || error?.message || "Failed to create module"
      );
      throw error;
    }
  };

  const handleEditCourse = async (
    id: string,
    newTitle: string
  ): Promise<void> => {
    try {
      console.log(id, newTitle);
      const result = await updateModule({
        moduleId: modules as string,
        id,
        body: {
          name: newTitle,
        },
      }).unwrap();
      if (result?.success) {
        toast.success("Module updated successfully");
        setCourses((prev) =>
          prev.map((course) =>
            course._id === id ? { ...course, name: newTitle } : course
          )
        );
      } else {
        throw new Error(result?.message || "Failed to update module");
      }
    } catch (error: any) {
      toast.error(
        error?.message || error?.data?.message || "Failed to update module"
      );
      throw error;
    }
  };

  const handleStartEdit = (id: string) => {
    console.log(id);
    const course = courses.find((c) => c._id === id);
    if (course) {
      setEditValue(course.name);
    }
    setEditingId(id);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
  };

  const handleSave = async () => {
    if (!editingId) return;
    const trimmed = editValue.trim();
    if (trimmed) {
      try {
        await handleEditCourse(editingId, trimmed);
      } catch (error) {
        console.log(error);
        return;
      }
    }
    handleCancelEdit();
  };

  const handleCancel = () => {
    handleCancelEdit();
  };

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedTitle = title.trim();
    if (trimmedTitle) {
      try {
        await handleAddModule(trimmedTitle);
        setTitle("");
        setOpenAddModule(false);
      } catch (error) {
        console.log(error);
        // keep open
      }
    }
  };

  useEffect(() => {
    if (courseData?.data) {
      setCourses(courseData.data);
    }
  }, [courseData]);

  return (
    <div className="min-h-screen">
      <div className=" mx-auto px-10">
        {/* Navigation Tabs */}
        {/* Header */}
        <BackButtons backTitle="Courses" title={"Modules"} />

        <div className="flex justify-end mb-8">
          <Button
            onClick={() => setOpenAddModule(true)}
            className="bg-black hover:bg-gray-800 text-white px-6 py-6   rounded-lg flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Module
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading && <CourseCardSkeleton rows={6} />}
          {!isLoading &&
            courses?.map((course) => {
              const isEditing = editingId === course._id;
              return (
                <Card
                  key={course._id}
                  className="bg-white shadow-sm border border-gray-200 rounded-lg overflow-hidden"
                >
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => requestDelete(course._id)}
                        className="p-2 h-auto  hover:text-red-600 rounded-full"
                        disabled={isEditing}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                      {!isEditing ? (
                        <Button
                          variant="ghost"
                          onClick={() => handleStartEdit(course._id)}
                          className="p-2  h-auto  hover:text-gray-600  rounded-full"
                        >
                          <PiPencilFill className="w-4 h-4" />
                        </Button>
                      ) : (
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            onClick={handleCancel}
                            className="p-2 h-auto hover:text-red-600 rounded-full"
                          >
                            <X className="w-5 h-5" />
                          </Button>
                          <Button
                            variant="ghost"
                            onClick={handleSave}
                            className="p-2 h-auto hover:text-green-600 rounded-full"
                          >
                            <Check className="w-5 h-5" />
                          </Button>
                        </div>
                      )}
                    </div>

                    {isEditing ? (
                      <div className="mb-4">
                        <Input
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          className="text-lg font-medium"
                          autoFocus
                          onKeyDown={(e) => {
                            if (e.key === "Enter") handleSave();
                            if (e.key === "Escape") handleCancel();
                          }}
                        />
                      </div>
                    ) : (
                      <h3 className="text-lg font-medium text-gray-900 mb-4 leading-tight">
                        {course.name}
                      </h3>
                    )}

                    <div className="flex items-center gap-4 mb-6 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Play className="w-4 h-4" />
                        <span>{course.typeCounts.video || 0} Videos</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FileText className="w-4 h-4" />
                        <span>{course.typeCounts.pdf || 0} PDFs</span>
                      </div>
                    </div>

                    <Button
                      onClick={() =>
                        router.push(
                          `/dashboard/courses/${modules}/${course._id}?module-title=${course.name}`
                        )
                      }
                      className="w-full bg-black hover:bg-gray-800 text-white py-2 rounded-lg flex items-center justify-center gap-2"
                      disabled={isEditing}
                    >
                      Enter Module
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
        </div>
      </div>

      {/* Add Module Dialog */}
      <Dialog open={openAddModule} onOpenChange={setOpenAddModule}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Add Module</DialogTitle>
          </DialogHeader>

          <form id="addModuleForm" onSubmit={handleAddSubmit}>
            <div className="grid gap-4">
              <div className="grid gap-3">
                <Label htmlFor="title">Module Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter your module title"
                />
              </div>
            </div>
          </form>

          <DialogFooter>
            <DialogClose asChild>
              <Button
                type="button"
                variant="outline"
                onClick={() => setTitle("")}
              >
                <X />
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" form="addModuleForm">
              <Save /> Add Module
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Confirm Delete Dialog */}
      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this module?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This module will be deleted permanently and cannot be recovered.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>
              <X /> Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                try {
                  await confirmDelete();
                  setDeleteOpen(false);
                } catch (error) {
                  console.log(error);
                  // keep open
                }
              }}
              className="bg-red-500 hover:bg-red-600"
            >
              <Trash /> Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
