// "use client";
// import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { ChevronDown } from "lucide-react";
// import { useRouter } from "next/navigation";
// import { useState } from "react";
// interface DropdownAndLinksProps {
//   setActiveTab: string;
// }

// const DropdownAndLinks = ({ setActiveTab }: DropdownAndLinksProps) => {
//   console.log(setActiveTab);
//   const [selectedOption, setSelectedOption] = useState(setActiveTab);
//   const router = useRouter();
//   const handleSelect = (value: string) => {
//     if (value === "Admin’s Video") {
//       router.push("/dashboard/boot-camp");
//     } else if (value === "Youtube’s Video") {
//       router.push("/dashboard/boot-camp/upload-youtube-videos");
//     } else if (value === "Udemy’s Video") {
//       router.push("/dashboard/boot-camp/upload-udemy-videos");
//     }
//     setSelectedOption(value);
//   };

//   return (
//     <div className="flex justify-between gap-8 ">
//       <div className="flex gap-8 ">
//         <button className={`pb-2 text-lg font-medium border-b-2 border-black`}>
//           Upload Your Video
//         </button>
//       </div>
//       <DropdownMenu>
//         <DropdownMenuTrigger asChild>
//           <Button variant="outline" className="gap-2 bg-transparent  p-5">
//             {selectedOption}
//             <ChevronDown className="h-4 w-4" />
//           </Button>
//         </DropdownMenuTrigger>
//         <DropdownMenuContent align="end">
//           <DropdownMenuItem onClick={() => handleSelect("Admin’s Video")}>
//             Admin’s Video
//           </DropdownMenuItem>
//           <DropdownMenuItem onClick={() => handleSelect("Udemy’s Video")}>
//             Udemy’s Video
//           </DropdownMenuItem>
//           <DropdownMenuItem onClick={() => handleSelect("Youtube’s Video")}>
//             Youtube’s Video
//           </DropdownMenuItem>
//         </DropdownMenuContent>
//       </DropdownMenu>
//     </div>
//   );
// };

// export default DropdownAndLinks;

"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Option {
  label: string;
  route: string;
}

interface DropdownAndLinksProps {
  initialOption: string;
  options: Option[];
  staticLabel?: string; // Optional static label for the left tab/button
  staticLabel2?: string; // Optional static label for the left tab/button
}

const DropdownAndLinks = ({
  initialOption,
  options,
}: //
DropdownAndLinksProps) => {
  const [selectedOption, setSelectedOption] = useState(initialOption);
  const router = useRouter();

  const handleSelect = (label: string) => {
    const selected = options.find((option) => option.label === label);
    if (selected) {
      router.push(selected.route);
    }
    setSelectedOption(label);
  };
  return (
    <div className="flex justify-between gap-8 ">
      {/* <div className="flex gap-8 ">
        {staticLabel && (
          <>
            <button
              className={`pb-2 text-lg font-medium hover:border-b-2 border-black`}
            >
              {staticLabel}
            </button>
            <button
              onClick={() => router.push("/dashboard/success-path")}
              className={`pb-2 text-lg font-medium   border-b-2 border-black`}
            >
              {staticLabel2 || ""}
            </button>
          </>
        )}
      </div> */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="gap-2 bg-transparent p-5">
            {selectedOption}
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {options.map((option) => (
            <DropdownMenuItem
              key={option.label}
              onClick={() => handleSelect(option.label)}
            >
              {option.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default DropdownAndLinks;
