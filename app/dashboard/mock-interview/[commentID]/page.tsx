"use client";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { useParams } from "next/navigation";

const CommentUpdatePage = () => {
  const { commentID } = useParams();
  const handelUpdateComment = () => {
    console.log(commentID);
  };
  return (
    <div className="space-y-2">
      <title>Mock Interview View Answers - TechAdvantage</title>
      <h1 className="text-xl font-semibold">Assessment Comment Box</h1>

      {/* Textarea with Tailwind width classes */}
      <textarea
        cols={50}
        className="w-full h-52 p-4 text-base rounded-md bg-neutral-100 border"
        placeholder="Enter Your Feedback Comment"
        // Full width, custom height, padding for better readability
      />

      <div className="flex justify-start max-w-xl">
        <Button onClick={handelUpdateComment} className="mt-4 w-full py-6">
          <Save />
          Save
        </Button>
      </div>
    </div>
  );
};

export default CommentUpdatePage;
