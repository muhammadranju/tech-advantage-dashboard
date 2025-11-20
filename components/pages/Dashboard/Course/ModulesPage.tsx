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
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
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

const ITEMS_PER_PAGE = 6;

export default function ModulesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");
  const [openAddModule, setOpenAddModule] = useState(false);
  const [title, setTitle] = useState("");
  const { modules } = useParams();
  const router = useRouter();

  const { data: courseData, isLoading } = useGetModulesQuery({ id: modules });
  const [createModule] = useCreateModuleMutation();
  const [updateModule] = useUpdateModuleMutation();
  const [deleteModule] = useDeleteModuleMutation();

  // Pagination logic
  const totalPages = Math.ceil(courses.length / ITEMS_PER_PAGE);
  const paginatedCourses = courses.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    if (courseData?.data) {
      setCourses(courseData.data);
    }
  }, [courseData]);

  // Reset to page 1 when data changes (e.g., after add/delete)
  useEffect(() => {
    setCurrentPage(1);
  }, [courses.length]);

  const requestDelete = (id: string) => {
    setDeleteTargetId(id);
    setDeleteOpen(true);
  };

  const confirmDelete = async (): Promise<void> => {
    if (!deleteTargetId) return;
    try {
      const result = await deleteModule({
        moduleId: modules as string,
        id: deleteTargetId,
      }).unwrap();
      if (result?.success) {
        toast.success("Module deleted successfully");
        setCourses((prev) => prev.filter((c) => c._id !== deleteTargetId));
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to delete module");
    }
  };

  const handleAddModule = async (title: string): Promise<void> => {
    try {
      const result = await createModule({
        body: { name: title },
        id: modules as string,
      }).unwrap();
      if (result.success) {
        toast.success("Module created successfully");
        const newModule: Course = {
          _id: result.data._id,
          name: result.data.name,
          typeCounts: result.data.typeCounts || { video: 0, pdf: 0 },
        };
        setCourses((prev) => [newModule, ...prev]);
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to create module");
    }
  };

  const handleEditCourse = async (
    id: string,
    newTitle: string
  ): Promise<void> => {
    try {
      const result = await updateModule({
        moduleId: modules as string,
        id,
        body: { name: newTitle },
      }).unwrap();
      if (result?.success) {
        toast.success("Module updated successfully");
        setCourses((prev) =>
          prev.map((c) => (c._id === id ? { ...c, name: newTitle } : c))
        );
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update module");
    }
  };

  const handleStartEdit = (id: string) => {
    const course = courses.find((c) => c._id === id);
    if (course) setEditValue(course.name);
    setEditingId(id);
  };

  const handleSave = async () => {
    if (!editingId || !editValue.trim()) return;
    await handleEditCourse(editingId, editValue.trim());
    setEditingId(null);
  };

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = title.trim();
    if (trimmed) {
      await handleAddModule(trimmed);
      setTitle("");
      setOpenAddModule(false);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="mx-auto px-10">
        <BackButtons backTitle="Courses" title="Modules" />

        <div className="flex justify-end mb-8">
          <Button
            onClick={() => setOpenAddModule(true)}
            className="bg-black hover:bg-gray-800 text-white px-6 py-6 rounded-lg flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Module
          </Button>
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {isLoading ? (
            <CourseCardSkeleton rows={6} />
          ) : paginatedCourses.length === 0 ? (
            <div className="col-span-full text-center py-20 text-gray-500">
              <p className="text-xl">No modules yet. Create your first one!</p>
            </div>
          ) : (
            paginatedCourses.map((course) => {
              const isEditing = editingId === course._id;
              return (
                <Card
                  key={course._id}
                  className="bg-white shadow-sm border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                >
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => requestDelete(course._id)}
                        className="p-2 h-auto hover:text-red-600 rounded-full"
                        disabled={isEditing}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                      {!isEditing ? (
                        <Button
                          variant="ghost"
                          onClick={() => handleStartEdit(course._id)}
                          className="p-2 h-auto hover:text-gray-600 rounded-full"
                        >
                          <PiPencilFill className="w-4 h-4" />
                        </Button>
                      ) : (
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            onClick={() => setEditingId(null)}
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
                      <Input
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        className="text-lg font-medium mb-4"
                        autoFocus
                        onKeyDown={(e) => {
                          if (e.key === "Enter") handleSave();
                          if (e.key === "Escape") setEditingId(null);
                        }}
                      />
                    ) : (
                      <h3 className="text-lg font-medium text-gray-900 mb-4 leading-tight">
                        {course.name}
                      </h3>
                    )}

                    <div className="flex items-center gap-4 mb-6 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Play className="w-4 h-4" />
                        <span>{course.typeCounts?.video || 0} Videos</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FileText className="w-4 h-4" />
                        <span>{course.typeCounts?.pdf || 0} PDFs</span>
                      </div>
                    </div>

                    <Button
                      onClick={() =>
                        router.push(
                          `/dashboard/courses/${modules}/${
                            course._id
                          }?module-title=${encodeURIComponent(course.name)}`
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
            })
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-end-safe mt-10">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() =>
                      handlePageChange(Math.max(1, currentPage - 1))
                    }
                    className={
                      currentPage === 1
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer"
                    }
                  />
                </PaginationItem>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        onClick={() => handlePageChange(page)}
                        isActive={currentPage === page}
                        className="cursor-pointer"
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  )
                )}

                {totalPages > 5 && <PaginationEllipsis />}

                <PaginationItem>
                  <PaginationNext
                    onClick={() =>
                      handlePageChange(Math.min(totalPages, currentPage + 1))
                    }
                    className={
                      currentPage === totalPages
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer"
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>

      {/* Add Module Dialog */}
      <Dialog open={openAddModule} onOpenChange={setOpenAddModule}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Add Module</DialogTitle>
          </DialogHeader>
          <form id="addModuleForm" onSubmit={handleAddSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-3">
                <Label htmlFor="title">Module Title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter module title"
                  required
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
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" form="addModuleForm">
              <Save className="mr-2" /> Add Module
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirm */}
      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Module?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. All content inside this module will
              be lost.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              <Trash className="mr-2" /> Delete Permanently
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
