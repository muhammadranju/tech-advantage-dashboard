/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import HeaderTitle from "@/components/bootcamp/HeaderTitle";
import CourseCardSkeleton from "@/components/skeletons/CourseCardSkeleton";
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
import { Spinner } from "@/components/ui/spinner";
import {
  useCreateCourseMutation,
  useDeleteCourseMutation,
  useGetCoursesQuery,
  useUpdateCourseMutation,
} from "@/lib/redux/features/api/courses/coursesSliceApi";
import {
  ArrowRight,
  Check,
  Play,
  Plus,
  Save,
  Trash,
  Trash2,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { PiPencilFill } from "react-icons/pi";
import { toast } from "sonner";
import { Courses } from "./course.interface";

export default function CoursePage() {
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");
  const [openAddCourse, setOpenAddCourse] = useState(false);
  const [newCourseTitle, setNewCourseTitle] = useState("");
  const router = useRouter();

  const { data: coursesData, isLoading } = useGetCoursesQuery(null);
  const [courses, setCourses] = useState<Courses[]>([]);
  const [createCourse, { isLoading: createLoading }] =
    useCreateCourseMutation();
  const [updateCourse] = useUpdateCourseMutation();
  const [deleteCourse] = useDeleteCourseMutation();
  useEffect(() => {
    if (coursesData?.data) {
      const mappedCourses = Array.isArray(coursesData.data)
        ? coursesData.data.map((course: any) => {
            const courseId = String(course._id || Date.now());
            return {
              _id: courseId,
              name: String(course.name || ""),
              slug: courseId,
              modules: Array.isArray(course.modules)
                ? course.modules.length
                : Number(course.modules) || 0,
            };
          })
        : [];
      setCourses(mappedCourses);
    }
  }, [coursesData]);

  const handleAddCourse = async () => {
    if (!newCourseTitle.trim()) return;
    const newId = String(Date.now());
    const newCourse: Courses = {
      _id: newId,
      name: newCourseTitle.trim(),
      slug: newId,
      modules: 0,
    };

    try {
      const result = await createCourse({
        body: {
          name: newCourseTitle.trim(),
        },
      }).unwrap();
      if (result.success) {
        toast.success("Course created successfully");
        setCourses((prev) => [newCourse, ...prev]);
        setNewCourseTitle("");
        setOpenAddCourse(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to create course");
    }
  };

  const handleStartEdit = (id: string, currentName: string) => {
    setEditingId(id);
    setEditValue(currentName);
  };

  const handleSaveEdit = async (id: string) => {
    if (!editValue.trim()) return;

    try {
      const result = await updateCourse({
        id: id,
        body: {
          name: editValue.trim(),
        },
      }).unwrap();
      if (result.success) {
        toast.success("Course updated successfully");
        setCourses((prev) =>
          prev.map((course) =>
            course._id === id ? { ...course, name: editValue.trim() } : course
          )
        );

        setEditingId(null);
        setEditValue("");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update course");
    }
  };

  const handleCancelEdit = (originalName: string) => {
    setEditValue(originalName);
    setEditingId(null);
  };

  const confirmDelete = async (id: string) => {
    if (!id) return;
    try {
      const result = await deleteCourse({
        id: id,
      }).unwrap();
      if (result.success) {
        toast.success("Course deleted successfully");
        setCourses((prev) => prev.filter((c) => c._id !== id));
        setDeleteTargetId(null);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete course");
    }
  };

  return (
    <div className="px-10 mt-5 min-h-screen">
      <div className="mx-auto ">
        <HeaderTitle isActive="courses" />

        <div className="flex justify-end mb-8">
          <Button
            onClick={() => setOpenAddCourse(true)}
            className="bg-black hover:bg-neutral-800 text-white px-6 py-6 rounded-lg flex items-center gap-2"
          >
            {createLoading ? (
              <>
                <Spinner className="size-6" /> Adding...
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" /> Add Course
              </>
            )}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading && <CourseCardSkeleton rows={9} />}
          {!isLoading &&
            courses?.map((course) => (
              <Card
                key={course._id}
                className="bg-white shadow-sm border border-neutral-200 rounded-lg overflow-hidden"
              >
                <CardContent>
                  <div className="flex justify-between items-start mb-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setDeleteTargetId(course._id)}
                      className="p-2 h-auto hover:text-red-600 rounded-full"
                      disabled={editingId === course._id}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                    {editingId !== course._id ? (
                      <Button
                        variant="ghost"
                        onClick={() => handleStartEdit(course._id, course.name)}
                        className="p-2 h-auto hover:text-neutral-600 rounded-full"
                      >
                        <PiPencilFill className="w-10 h-10" />
                      </Button>
                    ) : (
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          onClick={() => handleCancelEdit(course.name)}
                          className="p-2 h-auto hover:text-red-600 rounded-full"
                        >
                          <X className="w-5 h-5" />
                        </Button>
                        <Button
                          variant="ghost"
                          onClick={() => handleSaveEdit(course._id)}
                          className="p-2 h-auto hover:text-green-600 rounded-full"
                        >
                          <Check className="w-5 h-5" />
                        </Button>
                      </div>
                    )}
                  </div>

                  {editingId === course._id ? (
                    <div className="mb-4">
                      <Input
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        className="text-lg font-medium"
                        autoFocus
                        onKeyDown={(e) => {
                          if (e.key === "Enter") handleSaveEdit(course._id);
                          if (e.key === "Escape") handleCancelEdit(course.name);
                        }}
                      />
                    </div>
                  ) : (
                    <h3 className="text-lg font-medium text-neutral-900 mb-4 leading-tight w-full">
                      {course.name}
                    </h3>
                  )}

                  <div className="flex items-center gap-4 mb-6 text-sm text-neutral-600">
                    <div className="flex items-center gap-1">
                      <Play className="w-4 h-4" />
                      <span>{course.modules} Modules</span>
                    </div>
                  </div>

                  <Button
                    onClick={() =>
                      router.push(`/dashboard/courses/${course.slug}`)
                    }
                    className="w-full bg-black hover:bg-neutral-800 text-white py-2 rounded-lg flex items-center justify-center gap-2"
                    disabled={editingId === course._id}
                  >
                    Enter Course
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
        </div>
      </div>

      <Dialog open={openAddCourse} onOpenChange={setOpenAddCourse}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Add Course</DialogTitle>
          </DialogHeader>

          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="title">Course Title</Label>
              <Input
                id="title"
                value={newCourseTitle}
                onChange={(e) => setNewCourseTitle(e.target.value)}
                placeholder="Enter your course title"
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleAddCourse();
                }}
              />
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">
                <X />
                Cancel
              </Button>
            </DialogClose>
            <Button onClick={handleAddCourse}>
              {createLoading ? (
                <>
                  <Spinner className="size-6" /> Adding...
                </>
              ) : (
                <>
                  <Save /> Add Course
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={Boolean(deleteTargetId)}
        onOpenChange={(open) => !open && setDeleteTargetId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are You Sure You Want to Delete!
            </AlertDialogTitle>
            <AlertDialogDescription>
              This course will be deleted permanently and cannot be recovered.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>
              <X /> Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => confirmDelete(deleteTargetId as string)}
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
