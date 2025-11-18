import { Skeleton } from "@/components/ui/skeleton";

const TermsConditionsSkeleton = () => {
  return (
    <div className="p-6 mx-auto bg-white">
      {/* Title Skeleton */}
      <Skeleton className="h-9 w-80" />

      {/* Description Skeleton */}
      <div className="mt-2 space-y-2">
        <Skeleton className="h-4 w-full max-w-5xl" />
        <Skeleton className="h-4 w-3/4 max-w-4xl" />
      </div>

      {/* Section Title Skeleton */}
      <Skeleton className="mt-6 h-7 w-64" />

      {/* Editor Skeleton */}
      <Skeleton className="mt-2 h-96 w-full border border-nbg-neutral-300" />

      {/* Last Updated Skeleton */}
      <Skeleton className="mt-4 h-4 w-48" />

      {/* Button Skeleton */}
      <Skeleton className="mt-4 h-12 w-64 rounded-md" />
    </div>
  );
};

export default TermsConditionsSkeleton;
