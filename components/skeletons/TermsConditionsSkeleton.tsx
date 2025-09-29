const TermsConditionsSkeleton = () => {
  return (
    <div className="p-6 mx-auto bg-white">
      {/* Title Skeleton */}
      <div className="h-9 w-80 bg-neutral-200 rounded animate-pulse"></div>

      {/* Description Skeleton */}
      <div className="mt-2 space-y-2">
        <div className="h-4 w-full max-w-5xl bg-neutral-200 rounded animate-pulse"></div>
        <div className="h-4 w-3/4 max-w-4xl bg-neutral-200 rounded animate-pulse"></div>
      </div>

      {/* Section Title Skeleton */}
      <div className="mt-6 h-7 w-64 bg-neutral-200 rounded animate-pulse"></div>

      {/* Editor Skeleton */}
      <div className="mt-2 h-64 w-full bg-neutral-200 rounded border border-nbg-neutral-300 animate-pulse"></div>

      {/* Last Updated Skeleton */}
      <div className="mt-4 h-4 w-48 bg-neutral-200 rounded animate-pulse"></div>

      {/* Button Skeleton */}
      <div className="mt-4 h-12 w-64 bg-neutral-200 rounded-md animate-pulse"></div>
    </div>
  );
};

export default TermsConditionsSkeleton;
