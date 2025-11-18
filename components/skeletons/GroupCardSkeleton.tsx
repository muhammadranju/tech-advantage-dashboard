import { Skeleton } from "../ui/skeleton";

const GroupCardSkeleton = ({ range = 5 }) => {
  return (
    <>
      {[...Array(range)].map((_, index) => (
        <div
          className="flex flex-col items-center min-w-[150px] mb-2 "
          key={index}
        >
          <Skeleton className="w-full h-40 rounded-lg bg-neutral-200" />
          <div className="mt-2 flex items-center">
            <Skeleton className="h-5 w-5 rounded mr-1 bg-neutral-200 " />
            <Skeleton className="h-4 w-20 bg-neutral-200" />
          </div>
        </div>
      ))}
    </>
  );
};

export default GroupCardSkeleton;
