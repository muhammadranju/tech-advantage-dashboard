import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar } from "lucide-react";

export function FeedbackSkeleton() {
  return (
    <Card className="p-6 border-l-4 border-l-transparent animate-pulse">
      <div className="flex gap-6 items-start">
        {/* Avatar Skeleton */}
        <Avatar className="w-16 h-16">
          <AvatarFallback className="bg-muted" />
        </Avatar>

        <div className="flex-1 space-y-4">
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <Skeleton className="h-6 w-48" /> {/* Name */}
              <Skeleton className="h-4 w-64" /> {/* Email */}
            </div>
            <Skeleton className="h-8 w-28 rounded-full" />{" "}
            {/* Category Badge */}
          </div>

          {/* Comment Lines */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-[90%]" />
            <Skeleton className="h-4 w-[70%]" />
          </div>

          {/* Date */}
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <Skeleton className="h-4 w-40" />
          </div>
        </div>
      </div>
    </Card>
  );
}

export function FeedbackListSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <FeedbackSkeleton key={i} />
      ))}
    </div>
  );
}
