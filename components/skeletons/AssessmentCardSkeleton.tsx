// Assessment Card Skeleton - matches your original structure exactly
export const AssessmentCardSkeleton = () => {
  return (
    <div> 
      <div className=" border p-5 rounded-xl mb-5 shadow">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Badge skeleton */}
            <div className="bg-white shadow rounded-md border px-3 py-1">
              <div className="h-4 w-16 bg-neutral-200 rounded animate-pulse"></div>
            </div>
          </div>

          {/* Action buttons skeleton */}
          <div className="flex gap-2">
            <div className="h-12 w-12 bg-neutral-200 rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Title skeleton */}
        <div className="h-8 w-48 bg-neutral-200 rounded animate-pulse mb-2"></div>

        {/* Description skeleton */}
        <div className="space-y-2 mb-2">
          <div className="h-4 w-full bg-neutral-200 rounded animate-pulse"></div>
          <div className="h-4 w-3/4 bg-neutral-200 rounded animate-pulse"></div>
          <div className="h-4 w-1/2 bg-neutral-200 rounded animate-pulse"></div>
        </div>

        {/* Recommended Service Section */}
        <div className="">
          {/* "We recommend" heading skeleton */}
          <div className="h-6 w-32 bg-neutral-200 rounded animate-pulse mb-2"></div>

          <div className="flex flex-col space-y-2">
            {/* Service list skeletons */}
            <div className="flex items-start gap-2">
              <div className="h-2 w-2 bg-neutral-200 rounded-full animate-pulse mt-2"></div>
              <div className="h-4 w-40 bg-neutral-200 rounded animate-pulse"></div>
            </div>
            <div className="flex items-start gap-2">
              <div className="h-2 w-2 bg-neutral-200 rounded-full animate-pulse mt-2"></div>
              <div className="h-4 w-36 bg-neutral-200 rounded animate-pulse"></div>
            </div>
            <div className="flex items-start gap-2">
              <div className="h-2 w-2 bg-neutral-200 rounded-full animate-pulse mt-2"></div>
              <div className="h-4 w-32 bg-neutral-200 rounded animate-pulse"></div>
            </div>
             <div className="flex items-start gap-2">
              <div className="h-2 w-2 bg-neutral-200 rounded-full animate-pulse mt-2"></div>
              <div className="h-4 w-36 bg-neutral-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
