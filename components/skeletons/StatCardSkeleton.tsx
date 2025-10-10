import { Skeleton } from "@/components/ui/skeleton";

export const StatCardSkeleton = () => {
  return (
    <div className="bg-white shadow border rounded-md">
      <div className="p-11 px-20 space-y-2">
        <div className="flex items-center justify-between">
          <div className="w-10 h-10 bg-neutral-200 rounded-full flex items-center justify-center">
            {/* Icon skeleton */}
            <Skeleton className="w-6 h-6 rounded bg-neutral-300" />
          </div>
          {/* Change percentage skeleton */}
          {/* <Skeleton className="h-6 w-16" /> */}
        </div>
        <div>
          {/* Title skeleton */}
          <Skeleton className="h-5 w-24 mb-2" />
          {/* Value skeleton */}
          <Skeleton className="h-8 w-20" />
        </div>
      </div>
    </div>
  );
};

export const ChartCardSkeleton = () => {
  return (
    <div className="bg-white border shadow rounded-xl">
      <div className="p-5 space-y-2">
        <div className="flex items-center justify-between mb-5">
          <Skeleton className="w-72 h-6" />
          {/* Change percentage skeleton */}
          <Skeleton className="h-6 w-36" />
        </div>
        <div className="space-y-1">
          {/* Title skeleton */}
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-6 w-full mb-2" />
          <Skeleton className="h-7 w-full mb-2" />
          <Skeleton className="h-6 w-full mb-2" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-4 w-full mb-2" />
          {/* Value skeleton */}
          <Skeleton className="h-6 w-full mb-2" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-7 w-full" />
          <Skeleton className="h-8 w-full mb-2" />
        </div>
      </div>
    </div>
  );
};
