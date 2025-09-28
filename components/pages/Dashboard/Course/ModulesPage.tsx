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
  ArrowRight,
  FileText,
  Play,
  Plus,
  Save,
  Trash,
  Trash2,
  X,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { PiPencilFill } from "react-icons/pi";

interface Course {
  id: string;
  title: string;
  videos: number;
  pdfs: number;
}

const initialCourses: Course[] = [
  { id: "1", title: "Complete Programming Bootcamp", videos: 3, pdfs: 2 },
  { id: "2", title: "Java Programming", videos: 3, pdfs: 2 },
  { id: "3", title: "Python Programming", videos: 3, pdfs: 2 },
  { id: "4", title: "C++ Programming", videos: 3, pdfs: 2 },
  { id: "5", title: "C# Programming", videos: 3, pdfs: 2 },
  { id: "6", title: "PHP Programming", videos: 3, pdfs: 2 },
];

function IconText({
  Icon,
  children,
}: {
  Icon: any;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-1">
      <Icon className="w-4 h-4" />
      <span>{children}</span>
    </div>
  );
}

function CourseCard({
  course,
  onDelete,
  onEdit,
  onEnter,
  modulesParam,
}: {
  course: Course;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
  onEnter: (path: string) => void;
  modulesParam: string | undefined;
}) {
  return (
    <Card className="bg-white shadow-sm border border-gray-200 rounded-lg overflow-hidden">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(course.id)}
            className="p-2 h-auto  hover:text-red-600 rounded-full"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            onClick={() => onEdit(course.id)}
            className="p-2  h-auto  hover:text-gray-600  rounded-full"
          >
            <PiPencilFill className="w-10 h-10" />
          </Button>
        </div>

        <h3 className="text-lg font-medium text-gray-900 mb-4 leading-tight">
          {course.title}
        </h3>

        <div className="flex items-center gap-4 mb-6 text-sm text-gray-600">
          <IconText Icon={Play}>{course.videos} Videos</IconText>
          <IconText Icon={FileText}>{course.pdfs} PDFs</IconText>
        </div>

        <Button
          onClick={() =>
            onEnter(`/dashboard/courses/${modulesParam}/${course.id}`)
          }
          className="w-full bg-black hover:bg-gray-800 text-white py-2 rounded-lg flex items-center justify-center gap-2"
        >
          Enter Module
          <ArrowRight className="w-4 h-4" />
        </Button>
      </CardContent>
    </Card>
  );
}

function AddModuleDialog({
  open,
  setOpen,
  onAdd,
}: {
  open: boolean;
  setOpen: (v: boolean) => void;
  onAdd: (title: string) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const title = (e.target as any).title?.value?.trim();
          if (title) onAdd(title);
          setOpen(false);
        }}
      >
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Add Module</DialogTitle>
          </DialogHeader>

          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="title">Module Title</Label>
              <Input
                id="title"
                name="title"
                placeholder="Enter your module title"
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
            <Button type="submit">
              <Save /> Add Module
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}

function ConfirmDeleteDialog({
  open,
  setOpen,
  onConfirm,
}: {
  open: boolean;
  setOpen: (v: boolean) => void;
  onConfirm: () => void;
}) {
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are You Sure You Want to Delete!</AlertDialogTitle>
          <AlertDialogDescription>
            This module will be deleted permanently and cannot be recovered.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>
            <X /> Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              onConfirm();
              setOpen(false);
            }}
            className="bg-red-500 hover:bg-red-600"
          >
            <Trash /> Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default function ModulesPage() {
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [openAddModule, setOpenAddModule] = useState(false);
  const { modules } = useParams();
  const router = useRouter();

  const requestDelete = (id: string) => setDeleteTargetId(id);
  const cancelDelete = () => setDeleteTargetId(null);
  const confirmDelete = () => {
    if (!deleteTargetId) return;
    setCourses((prev) => prev.filter((c) => c.id !== deleteTargetId));
    cancelDelete();
  };

  const handleAddModule = (title: string) => {
    const newCourse: Course = {
      id: String(Date.now()),
      title,
      videos: 0,
      pdfs: 0,
    };
    setCourses((prev) => [newCourse, ...prev]);
  };

  const handleEditCourse = (id: string) => console.log("Edit course:", id);

  return (
    <div className="min-h-screen">
      <div className=" mx-auto px-10">
        <div className="flex gap-8 mb-5">
          <button
            onClick={() => router.push("/dashboard/courses")}
            className={`pb-2 text-lg font-medium hover:border-b-2 border-black`}
          >
            Courses
          </button>
          <button
            className={`pb-2 text-lg font-medium  border-b-2 border-black`}
          >
            Modules
          </button>
        </div>

        <div className="flex justify-end mb-8">
          <Button
            onClick={() => setOpenAddModule(true)}
            className="bg-black hover:bg-gray-800 text-white px-6 py-6   rounded-lg flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Course
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onDelete={requestDelete}
              onEdit={handleEditCourse}
              onEnter={(path) => router.push(path)}
              modulesParam={modules as string}
            />
          ))}
        </div>
      </div>

      <AddModuleDialog
        open={openAddModule}
        setOpen={setOpenAddModule}
        onAdd={handleAddModule}
      />

      <ConfirmDeleteDialog
        open={Boolean(deleteTargetId)}
        setOpen={(v) => (v ? setDeleteTargetId("pending") : cancelDelete())}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
