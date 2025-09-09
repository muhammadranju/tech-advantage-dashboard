"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
interface DropdownAndLinksProps {
  setActiveTab: string;
}

const DropdownAndLinks = ({ setActiveTab }: DropdownAndLinksProps) => {
  console.log(setActiveTab);
  const [selectedOption, setSelectedOption] = useState(setActiveTab);
  const router = useRouter();
  const handleSelect = (value: string) => {
    if (value === "Admin’s Video") {
      router.push("/dashboard/discover-strength/upload-admin-videos");
    } else if (value === "Youtube’s Video") {
      router.push("/dashboard/discover-strength/upload-youtube-videos");
    } else if (value === "Udemy’s Video") {
      router.push("/dashboard/discover-strength/upload-udemy-videos");
    }
    setSelectedOption(value);
  };

  return (
    <div className="flex justify-between gap-8 ">
      <div className="flex gap-8 ">
        <Link href={"/dashboard/discover-strength"}>
          <button
            className={`pb-2 text-lg font-medium hover:border-b-2 border-black`}
          >
            Quiz
          </button>
        </Link>
        <button className={`pb-2 text-lg font-medium border-b-2 border-black`}>
          Upload Your Video
        </button>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="gap-2 bg-transparent  p-5">
            {selectedOption}
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => handleSelect("Admin’s Video")}>
            Admin’s Video
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleSelect("Udemy’s Video")}>
            Udemy’s Video
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleSelect("Youtube’s Video")}>
            Youtube’s Video
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default DropdownAndLinks;
