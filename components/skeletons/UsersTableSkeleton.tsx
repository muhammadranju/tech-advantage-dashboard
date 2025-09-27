// Users Table Skeleton - matches your original structure exactly
export const UsersTableSkeleton = ({ rows = 5 }) => {
  return (
    <div className="divide-y divide-border px-3">
      {Array.from({ length: rows }).map((_, index) => (
        <div key={index} className="grid grid-cols-5 gap-4 p-4 items-center">
          {/* Name skeleton */}
          <div className="h-4 w-24 bg-neutral-200 rounded animate-pulse"></div>

          {/* Email skeleton */}
          <div className="h-4 w-32 bg-neutral-200 rounded animate-pulse"></div>

          {/* Badge skeleton */}
          <div>
            <div className="h-6 w-16 bg-neutral-200 rounded-full animate-pulse"></div>
          </div>

          {/* Date skeleton */}
          <div className="h-4 w-20 bg-neutral-200 rounded animate-pulse"></div>

          {/* Action button skeleton */}
          <div>
            <div className="h-8 w-8 bg-neutral-200 rounded animate-pulse"></div>
          </div>
        </div>
      ))}
    </div>
  );
};
