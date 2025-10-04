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
    <div className="flex gap-8 mb-5">
      {/* </Link> */}
      <button
        onClick={() => router.back()}
        className={`pb-2 text-lg font-medium hover:border-b-2 border-black flex items-center`}
      >
        <ArrowLeft /> {backTitle}
      </button>
      <button className={`pb-2 text-lg font-medium  border-b-2 border-black`}>
        {title}
      </button>
    </div>
  );
};

export default BackButtons;
