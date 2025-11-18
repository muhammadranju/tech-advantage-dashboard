import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const BackButtons = ({
  backTitle,
  title,
}: {
  backTitle: string;
  title: string;
}) => {
  const router = useRouter();
  return (
    <div className="flex gap-8">
      {/* </Link> */}
      {/* <button
        onClick={() => router.back()}
        className={`pb-2 text-lg font-medium hover:border-b-2 border-black flex items-center`}
      >
        <ArrowLeft /> {backTitle}
      </button> */}
      <Button
        className="rounded-full border-b-2 hover:border-black transition-all duration-300 ease-in-out"
        variant="ghost"
        size="lg"
        onClick={() => router.back()}
      >
        <ArrowLeft className="transition-transform duration-300 ease-in-out group-hover:-translate-x-1 " />
        {backTitle}
      </Button>
      <button className={`text-lg font-medium  border-b-2 border-black`}>
        {title}
      </button>
    </div>
  );
};

export default BackButtons;
