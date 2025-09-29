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
import { ArrowRight, Play, Plus, Save, Trash, Trash2, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PiPencilFill } from "react-icons/pi";

interface Course {
  id: string;
  title: string;
  modules: number;
  slug: string;
}

const initialCourses: Course[] = [
  {
    id: "1",
    title: "Complete Programming Bootcamp",
    slug: "complete-programming-bootcamp",
    modules: 4,
  },
  {
    id: "2",
    title: "Advanced Java Programming Bootcamp",
    slug: "advanced-java-programming-bootcamp",
    modules: 8,
  },
  {
    id: "3",
    title: "Beginner friendly Python Programming Bootcamp",
    slug: "beginner-friendly-python-programming-bootcamp",
    modules: 11,
  },
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
}: {
  course: Course;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
  onEnter: (slug: string) => void;
}) {
  return (
    <Card
      key={course.id}
      className="bg-white shadow-sm border border-neutral-200 rounded-lg overflow-hidden"
    >
      <CardContent>
        <div className="flex justify-between items-start mb-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(course.id)}
            className="p-2 h-auto hover:text-red-600 rounded-full"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            onClick={() => onEdit(course.id)}
            className="p-2 h-auto hover:text-neutral-600 rounded-full"
          >
            <PiPencilFill className="w-10 h-10" />
          </Button>
        </div>

        <h3 className="text-lg font-medium text-neutral-900 mb-4 leading-tight w-full">
          {course.title}
        </h3>

        <div className="flex items-center gap-4 mb-6 text-sm text-neutral-600">
          <IconText Icon={Play}>{course.modules} Modules</IconText>
        </div>

        <Button
          onClick={() => onEnter(course.slug)}
          className="w-full bg-black hover:bg-neutral-800 text-white py-2 rounded-lg flex items-center justify-center gap-2"
        >
          Enter Course
          <ArrowRight className="w-4 h-4" />
        </Button>
      </CardContent>
    </Card>
  );
}

function AddCourseDialog({
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
            <DialogTitle>Add Course</DialogTitle>
          </DialogHeader>

          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="title">Course Title</Label>
              <Input
                id="title"
                name="title"
                placeholder="Enter your course title"
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
              <Save /> Add Course
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
            This course will be deleted permanently and cannot be recovered.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>
            <X /> Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="bg-red-500 hover:bg-red-600"
          >
            <Trash /> Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default function CoursePage() {
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  // null means no pending delete, otherwise holds id to delete
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [openAddCourse, setOpenAddCourse] = useState(false);
  const router = useRouter();

  const requestDelete = (id: string) => setDeleteTargetId(id);
  const cancelDelete = () => setDeleteTargetId(null);
  const confirmDelete = () => {
    if (!deleteTargetId) return;
    setCourses((prev) => prev.filter((c) => c.id !== deleteTargetId));
    cancelDelete();
  };

  const handleAddCourse = (title: string) => {
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    const newCourse: Course = {
      id: String(Date.now()),
      title,
      slug,
      modules: 0,
    };
    setCourses((prev) => [newCourse, ...prev]);
  };

  const handleEditCourse = (id: string) => console.log("Edit course:", id);
  const handleEnterCourse = (slug: string) =>
    router.push(`/dashboard/courses/${slug}`);

  return (
    <div className="min-h-screen">
      <div className="mx-auto px-10">
        <div className="flex gap-8 mb-5">
          <button
            onClick={() => router.push("/dashboard/boot-camp")}
            className={`pb-2 text-lg font-medium hover:border-b-2 border-black`}
          >
            Bootcamp
          </button>
          <button
            onClick={() => router.push("/dashboard/boot-camp/playlist")}
            className={`pb-2 text-lg font-medium hover:border-b-2 border-black`}
          >
            Playlists
          </button>
          <button
            className={`pb-2 text-lg font-medium  border-b-2 border-black`}
          >
            Courses
          </button>
        </div>

        <div className="flex justify-end mb-8">
          <Button
            onClick={() => setOpenAddCourse(true)}
            className="bg-black hover:bg-neutral-800 text-white px-6 py-6 rounded-lg flex items-center gap-2"
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
              onEnter={(slug) => handleEnterCourse(slug)}
            />
          ))}
        </div>
      </div>

      <AddCourseDialog
        open={openAddCourse}
        setOpen={setOpenAddCourse}
        onAdd={handleAddCourse}
      />

      <ConfirmDeleteDialog
        open={Boolean(deleteTargetId)}
        setOpen={(v) => (v ? setDeleteTargetId("pending") : cancelDelete())}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
