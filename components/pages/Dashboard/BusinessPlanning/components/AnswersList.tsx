import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IoMdAdd, IoMdRemove } from "react-icons/io";
import { Answer } from "./types";
// import { Answer } from "../types";

interface AnswersListProps {
  answers: Answer[];
  onChange: (index: number, value: string) => void;
  onAdd: () => void;
  onRemove: (index: number) => void;
}

export function AnswersList({
  answers,
  onChange,
  onAdd,
  onRemove,
}: AnswersListProps) {
  return (
    <>
      {answers.map((answerObj, index) => (
        <div key={index} className="flex items-center space-x-4">
          <div className="w-full flex gap-x-2">
            <div className="w-full">
              <label className="block text-lg font-medium mb-2">
                {index + 1}. Answer
              </label>
              <Input
                placeholder="Enter question answer"
                value={answerObj.answer}
                onChange={(e) => onChange(index, e.target.value)}
                className="py-6 flex-1"
              />
            </div>
          </div>
          {answers.length > 1 && (
            <Button
              variant="ghost"
              onClick={() => onRemove(index)}
              className="text-neutral-900 mt-9 hover:text-red-700"
            >
              <IoMdRemove className="text-xl" />
            </Button>
          )}
        </div>
      ))}

      <div className="flex justify-end items-center gap-8">
        <Button
          variant="default"
          className="flex items-center gap-2 py-5"
          onClick={onAdd}
        >
          Add More
          <IoMdAdd className="text-2xl" />
        </Button>
      </div>
    </>
  );
}