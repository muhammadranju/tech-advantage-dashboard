"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";
import { PiPencilFill } from "react-icons/pi";
import { Badge } from "../ui/badge";

const comments = [
  {
    id: 1,
    title: "Comment - 1",
    range: "Range - 1-5",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisl,",
  },
  {
    id: 2,
    title: "Comment - 2",
    range: "Range - 6-10",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisl,",
  },
  {
    id: 3,
    title: "Comment - 3",
    range: "Range - 11-15",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisl,",
  },
];
export function AssessmentComment() {
  return (
    <div className=" mx-auto bg-white">
      {/* Comment Cards */}
      <div className="space-y-6">
        {comments.map((comment) => (
          <Card key={comment.id} className="border border-gray-200 shadow-sm">
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
                <Link
                  href={`/dashboard/assessment/${comment.id}?q=mock-interview`}
                >
                  <button className="hover:bg-gray-100 cursor-pointer p-3 rounded-full">
                    <PiPencilFill className="text-2xl font-bold text-gray-500" />
                  </button>
                </Link>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-gray-700 leading-relaxed">
                {comment.content}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
