import { Skeleton } from "@/components/ui/skeleton";

export const AssessmentCardSkeleton = () => {
  return (
    <div className="border p-5 rounded-xl mb-5 shadow">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Badge skeleton */}
          <div className="bg-white shadow rounded-md border px-3 py-1">
            <Skeleton className="h-4 w-16" />
          </div>
        </div>

        {/* Action buttons skeleton */}
        <div className="flex gap-2">
          <Skeleton className="h-12 w-12 rounded-full" />
        </div>
      </div>

      {/* Title skeleton */}
      <Skeleton className="h-8 w-48 mb-2" />

      {/* Description skeleton */}
      <div className="space-y-2 mb-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>

      {/* Recommended Service Section */}
      <div>
        {/* "We recommend" heading skeleton */}
        <Skeleton className="h-6 w-32 mb-2" />

        <div className="flex flex-col space-y-2">
          {/* Service list skeletons */}
          {[1, 2, 3, 4].map((item) => (
            <div className="flex items-start gap-2" key={item}>
              <Skeleton className="h-2 w-2 rounded-full mt-2" />
              <Skeleton className="h-4 w-40" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
