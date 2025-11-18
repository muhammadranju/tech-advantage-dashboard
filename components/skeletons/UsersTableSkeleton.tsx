import { Skeleton } from "@/components/ui/skeleton";

export const UsersTableSkeleton = ({ rows = 8 }) => {
  return (
    <div className="divide-y divide-border px-3">
      {Array.from({ length: rows }).map((_, index) => (
        <div key={index} className="grid grid-cols-5 gap-4 p-4 items-center">
          {/* Name skeleton */}
          <Skeleton className="h-4 w-24" />

          {/* Email skeleton */}
          <Skeleton className="h-4 w-32" />

          {/* Badge skeleton */}
          <div>
            <Skeleton className="h-6 w-16 rounded-full" />
          </div>

          {/* Date skeleton */}
          <Skeleton className="h-4 w-20" />

          {/* Action button skeleton */}
          <div>
            <Skeleton className="h-8 w-8" />
          </div>
        </div>
      ))}
    </div>
  );
};
