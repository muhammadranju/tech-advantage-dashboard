import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function CardSkeleton({ rows = 6 }: { rows?: number }) {
  return (
    <>
      {Array.from({ length: rows }).map((_, index) => (
        <Card className="border border-gray-200" key={index}>
          <CardHeader>
            <div className="space-y-4">
              <Skeleton className="h-14 w-full rounded-md" />
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-3 mb-4">
              {[1, 2, 3, 4].map((item) => (
                <div className="flex gap-4" key={item}>
                  <Skeleton className="h-14 flex-1 rounded-2xl" />
                  <Skeleton className="h-14 w-24 rounded-2xl" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
}
