"use client";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { MdCancel } from "react-icons/md";

const AssessmentUpdatePage = () => {
  const { commentID } = useParams();
  const searchParams = useSearchParams();
  const search = searchParams.get("q");
  const [queryName, setQueryName] = useState(search);
  const router = useRouter();

  useEffect(() => {
    if (search === "mock-interview") {
      setQueryName("Mock Interview");
    } else if (search === "small-business") {
      setQueryName("Small Business");
    }
  }, [search]);

  console.log(search);
  console.log(queryName);

  const handelUpdateComment = () => {
    console.log(commentID);
  };
  return (
    <div className="space-y-2">
      <div className="flex justify-end">
        <Button
          variant={"destructive"}
          onClick={() => router.back()}
          className="mt-4    "
        >
          <MdCancel />
          Cancel
        </Button>
      </div>
      <h1 className="text-xl font-semibold">
        Assessment{" "}
        {queryName === "Mock Interview" ? "Mock Interview" : "Small Business"}{" "}
        Box
      </h1>

      {/* Textarea with Tailwind width classes */}
      <textarea
        cols={50}
        className="w-full h-52 p-4 text-base rounded-md bg-neutral-100 border"
        placeholder={`Enter Your Feedback ${
          queryName === "Mock Interview" ? "Mock Interview" : "Small Business"
        }`}
        // Full width, custom height, padding for better readability
      />

      <div className="flex  gap-x-5   ">
        <Button
          onClick={handelUpdateComment}
          className="mt-4 flex-1 max-w-xl py-6"
        >
          <Save />
          Save
        </Button>
      </div>
    </div>
  );
};

export default AssessmentUpdatePage;
