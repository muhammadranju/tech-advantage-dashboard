"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { X } from "lucide-react";
import Image from "next/image";
export const DialogTriggerComponent = ({
  isOpen,
  setIsOpen,
  title,
  description,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  title: string;
  description: string;
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[380px] flex flex-col items-center justify-center shadow-lg rounded-xl">
        <DialogHeader className="flex flex-col items-center justify-center">
          <Image
            src="/success.gif"
            alt="Success"
            width={200}
            height={100}
            className="-mb-14 -mt-10"
          />

          <DialogTitle className="text-2xl text-center">{title}</DialogTitle>
          <DialogDescription className="text-center text-base">
            {description}
          </DialogDescription>
          <DialogClose asChild>
            <Button className="px-6 mt-4">
              <X /> Close
            </Button>
          </DialogClose>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
