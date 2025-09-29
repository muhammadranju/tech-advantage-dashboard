import React from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

const BackButton = ({ backText = "Back" }: { backText?: string }) => {
  const router = useRouter();
  return (
    <Button className="m-5 py-5 px-4 hover:pl-5" onClick={() => router.back()}>
      <ArrowLeft />
      {backText}
    </Button>
  );
};

export default BackButton;
