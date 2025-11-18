import { Skeleton } from "../ui/skeleton";

const VideoCardSkeleton = ({ range = 9 }) => {
  return (
    <>
      {[...Array(range)].map((_, index) => (
        <div key={index}>
          <div className="space-y-2 ">
            <div className="relative group">
              <Skeleton className="w-full h-48 rounded-xl" />
            </div>
            <Skeleton className="h-6 w-4/5 rounded-md" />
          </div>
        </div>
      ))}
    </>
  );
};

export default VideoCardSkeleton;
