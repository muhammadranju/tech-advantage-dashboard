// Skeleton loading component - matches your original structure exactly
export const StatCardSkeleton = () => {
  return (
    <div className="bg-white shadow border rounded-md">
      <div className="p-11 px-20 space-y-2">
        <div className="flex items-center justify-between">
          <div className="w-10 h-10 bg-neutral-200 rounded-full flex items-center justify-center">
            {/* Icon skeleton */}
            <div className="w-6 h-6 bg-neutral-300 rounded animate-pulse"></div>
          </div>
          {/* Change percentage skeleton */}
          <div className="h-6 w-16 bg-neutral-200 rounded animate-pulse"></div>
        </div>
        <div>
          {/* Title skeleton */}
          <div className="h-5 w-24 bg-neutral-200 rounded animate-pulse mb-2"></div>
          {/* Value skeleton */}
          <div className="h-8 w-20 bg-neutral-200 rounded animate-pulse"></div>
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
          <div className="w-72 h-6 bg-neutral-200 rounded flex items-center justify-center"></div>
          {/* Change percentage skeleton */}
          <div className="h-6 w-36 bg-neutral-200 rounded animate-pulse"></div>
        </div>
        <div className="space-y-1">
          {/* Title skeleton */}
          <div className="h-4 w-full bg-neutral-200 rounded animate-pulse mb-2"></div>
          <div className="h-6 w-full bg-neutral-200 rounded animate-pulse mb-2"></div>
          <div className="h-7 w-full bg-neutral-200 rounded animate-pulse mb-2"></div>
          <div className="h-6 w-full bg-neutral-200 rounded animate-pulse mb-2"></div>
          <div className="h-5 w-full bg-neutral-200 rounded animate-pulse"></div>
          <div className="h-4 w-full bg-neutral-200 rounded animate-pulse mb-2"></div>
          {/* Value skeleton */}
          <div className="h-6 w-full bg-neutral-200 rounded animate-pulse mb-2"></div>
          <div className="h-4 w-full bg-neutral-200 rounded animate-pulse"></div>
          <div className="h-7 w-full bg-neutral-200 rounded animate-pulse"></div>
          <div className="h-8 w-full bg-neutral-200 rounded animate-pulse mb-2"></div>
        </div>
      </div>
    </div>
  );
};
