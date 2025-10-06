"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardHeader } from "@/components/ui/card";
import { useState } from "react";
import { PiCheckBold, PiPencilFill, PiXBold } from "react-icons/pi";
// import { Badge } from "../ui/badge";

const initialComments = [
  {
    id: 1,
    title: "Comment - 1",
    range: "Range - 0-5",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisl,",
  },
  {
    id: 2,
    title: "Comment - 2",
    range: "Range - 6-11",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisl,",
  },
  {
    id: 3,
    title: "Comment - 3",
    range: "Range - 12-16",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisl,",
  },
];

interface Comment {
  id: number;
  title: string;
  range: string;
  content: string;
}

export function AssessmentComment() {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editContent, setEditContent] = useState("");

  const handleEditClick = (comment: Comment) => {
    setEditingId(comment.id);
    setEditContent(comment.content);
  };

  const handleSaveClick = (id: number) => {
    setComments(
      comments.map((comment) =>
        comment.id === id ? { ...comment, content: editContent } : comment
      )
    );
    setEditingId(null);
    setEditContent("");
  };

  const handleCancelClick = () => {
    setEditingId(null);
    setEditContent("");
  };

  return (
    <div className=" mx-auto bg-white">
      {/* Comment Cards */}
      <div className="space-y-6">
        {comments.map((comment) => (
          <Card
            key={comment.id}
            className="border border-neutral-200 shadow-sm"
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Badge
                    variant="secondary"
                    className="bg-white rounded-md shadow border text-sm text-foreground hover:bg-muted"
                  >
                    {comment.title}
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="bg-white shadow rounded-md border text-sm text-foreground hover:bg-muted"
                  >
                    {comment.range}
                  </Badge>
                </div>
                {editingId === comment.id ? (
                  <div className="flex gap-1">
                    <button
                      onClick={() => handleSaveClick(comment.id)}
                      className="hover:bg-green-100 cursor-pointer p-3 rounded-full"
                    >
                      <PiCheckBold className="text-xl font-bold text-green-500" />
                    </button>
                    <button
                      onClick={handleCancelClick}
                      className="hover:bg-red-100 cursor-pointer p-3 rounded-full"
                    >
                      <PiXBold className="text-xl font-bold text-red-500" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => handleEditClick(comment)}
                    className="hover:bg-neutral-100 cursor-pointer p-3 rounded-full"
                  >
                    <PiPencilFill className="text-2xl font-bold " />
                  </button>
                )}
              </div>
              {editingId === comment.id ? (
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="w-full p-2 text-sm text-neutral-700 leading-relaxed border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={6}
                />
              ) : (
                <p className="text-sm text-neutral-700 leading-relaxed ">
                  {comment.content}
                </p>
              )}
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}
