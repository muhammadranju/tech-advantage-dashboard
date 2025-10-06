import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const CourseCardSkeleton = ({ rows = 6 }: { rows?: number }) => {
  return (
    <>
      {Array.from({ length: rows }).map((_, index) => (
        <Card
          key={index}
          className="bg-white shadow-sm border border-neutral-200 rounded-lg overflow-hidden"
        >
          <CardContent>
            <div className="flex justify-between items-start mb-4">
              <div className="w-6 h-6" /> {/* Placeholder for left space */}
              <div className="flex gap-1">
                <Skeleton className="h-6 w-6 rounded-full" />
                <Skeleton className="h-6 w-6 rounded-full" />
              </div>
            </div>
            <Skeleton className="h-6 w-3/4 mb-4 rounded-md" />
            <div className="flex items-center gap-4 mb-6">
              <Skeleton className="h-4 w-4 rounded" />
              <Skeleton className="h-4 w-20" />
            </div>
            <Skeleton className="h-10 w-full rounded-lg" />
          </CardContent>
        </Card>
      ))}
    </>
  );
};

export default CourseCardSkeleton;
