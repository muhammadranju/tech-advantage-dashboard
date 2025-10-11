import React from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

const BackButton = ({ backText = "Back" }: { backText?: string }) => {
  const router = useRouter();
  return (
    <Button
      className="m-5 px-4  rounded-full border-b-2 hover:border-black transition-all duration-300 ease-in-out "
      variant="ghost"
      size="sm"
      onClick={() => router.back()}
    >
      <ArrowLeft className="transition-transform duration-300 ease-in-out group-hover:-translate-x-1 " />
      {backText}
    </Button>
  );
};

export default BackButton;
