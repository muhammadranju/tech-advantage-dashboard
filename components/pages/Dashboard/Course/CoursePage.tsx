"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  Edit,
  FileText,
  Play,
  Plus,
  Save,
  Trash2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { PiPencilFill } from "react-icons/pi";

interface Course {
  id: string;
  title: string;
  videos: number;
  pdfs: number;
}

const initialCourses: Course[] = [
  {
    id: "1",
    title: "Complete Programming Bootcamp",
    videos: 3,
    pdfs: 2,
  },
  {
    id: "2",
    title: "Java Programming",
    videos: 3,
    pdfs: 2,
  },
  {
    id: "3",
    title: "Python Programming",
    videos: 3,
    pdfs: 2,
  },
  {
    id: "4",
    title: "C++ Programming",
    videos: 3,
    pdfs: 2,
  },
  {
    id: "5",
    title: "C# Programming",
    videos: 3,
    pdfs: 2,
  },
  {
    id: "6",
    title: "PHP Programming",
    videos: 3,
    pdfs: 2,
  },
];

export default function CoursePage() {
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [openAlert, setOpenAlert] = useState(false);
  const [openCourseModel, setOpenCourseModel] = useState(false);
  const [courseId, setCourseId] = useState("");
  const router = useRouter();

  const handelDelete = (courseId: string) => {
    setCourseId(courseId as string);
    setOpenAlert(true);
  };

  const handleDeleteCourse = () => {
    setCourses(courses.filter((course) => course.id !== courseId));
  };

  const handleEditCourse = (courseId: string) => {
    console.log("Edit course:", courseId);
  };

  const handleEnterCourse = () => {
    console.log("Enter course:", courseId);
  };

  const handleAddModule = () => {
    console.log("Add new module");
  };

  return (
    <div className="min-h-screen">
      <div className=" mx-auto px-10">
        <div className="flex gap-8 mb-5">
          {/* </Link> */}
          <button
            onClick={() => router.push("/dashboard/boot-camp")}
            className={`pb-2 text-lg font-medium hover:border-b-2 border-black`}
          >
            Back to Bootcamp
          </button>
          <button
            className={`pb-2 text-lg font-medium  border-b-2 border-black`}
          >
            Modules
          </button>
        </div>
        {/* Header */}
        <div className="flex justify-end mb-8">
          <Button
            onClick={() => setOpenCourseModel(true)}
            className="bg-black hover:bg-gray-800 text-white px-6 py-6   rounded-lg flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Course
          </Button>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Card
              key={course.id}
              className="bg-white shadow-sm border border-gray-200 rounded-lg overflow-hidden"
            >
              <CardContent className="p-6">
                {/* Card Header with Actions */}
                <div className="flex justify-between items-start mb-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handelDelete(course.id)}
                    className="p-2 h-auto  hover:text-red-600 rounded-full"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => handleEditCourse(course.id)}
                    className="p-2  h-auto  hover:text-gray-600  rounded-full"
                  >
                    <PiPencilFill className="w-10 h-10" />
                  </Button>
                </div>

                {/* Course Title */}
                <h3 className="text-lg font-medium text-gray-900 mb-4 leading-tight">
                  {course.title}
                </h3>

                {/* Course Content Info */}
                <div className="flex items-center gap-4 mb-6 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Play className="w-4 h-4" />
                    <span>{course.videos} Videos</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FileText className="w-4 h-4" />
                    <span>{course.pdfs} PDFs</span>
                  </div>
                </div>

                {/* Enter Button */}
                <Button
                  onClick={() => router.push(`/dashboard/course/${course.id}`)}
                  className="w-full bg-black hover:bg-gray-800 text-white py-2 rounded-lg flex items-center justify-center gap-2"
                >
                  Enter Course
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <Dialog open={openCourseModel} onOpenChange={setOpenCourseModel}>
        <form>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Add Course</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4">
              <div className="grid gap-3">
                <Label htmlFor="title">Course Title</Label>
                <Input id="title" name="title" placeholder="Enter your title" />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button onClick={handleEnterCourse} type="submit">
                <Save /> Add
              </Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>

      <AlertDialog open={openAlert} onOpenChange={setOpenAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are You Sure You Want to Delete!
            </AlertDialogTitle>
            <AlertDialogDescription>
              This module will be deleted permanently and cannot be recovered.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteCourse}
              className="bg-red-500 hover:bg-red-600"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
