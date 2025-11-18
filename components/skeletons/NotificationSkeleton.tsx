import { Skeleton } from "../ui/skeleton";

const NotificationSkeleton = ({ count = 6 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div
          className="p-6 flex items-start gap-4 border-b hover:bg-gray-50 transition-colors"
          key={index}
        >
          <div className="flex-shrink-0 mt-1">
            <Skeleton className="h-6 w-6 rounded" />
          </div>
          <div className="flex-1 min-w-0">
            <Skeleton className="h-4 w-3/4 mb-2" />
            <Skeleton className="h-3 w-1/3" />
          </div>
        </div>
      ))}
    </>
  );
};

export default NotificationSkeleton;
