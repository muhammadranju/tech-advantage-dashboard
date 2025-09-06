import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const notFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen max-w-2xl mx-auto">
      <Image src="/404.svg" alt="404" width={600} height={600} />
      <h1 className="uppercase text-4xl font-semibold tracking-[10px] text-center">
        Page Not Found
      </h1>
      <Link href="/dashboard/overview" className="mt-14 w-full">
        <Button className="w-full">Back to Home</Button>
      </Link>
    </div>
  );
};

export default notFound;
