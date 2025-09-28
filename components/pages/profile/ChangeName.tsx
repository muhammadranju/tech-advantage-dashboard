"use client";

import type React from "react";
import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FormFieldProps {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormField: React.FC<FormFieldProps> = ({
  id,
  label,
  type = "text",
  placeholder,
  value,
  onChange,
}) => (
  <div className="space-y-2">
    <Label htmlFor={id} className="text-sm font-medium">
      {label}
    </Label>
    <Input
      id={id}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="h-12 bg-gray-50 border-gray-200 focus:bg-white rounded-xl"
      required
    />
  </div>
);

export default function ChangeName() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Name update attempt:", { firstName, lastName });
  };

  return (
    <Card className="w-full mt-20 max-w-xl mx-auto shadow-[2px_4px_4px_rgba(0,0,0,0.1)] border-0">
      <CardHeader className="text-center pb-8 pt-8">
        <div className="flex justify-center">
          <Image
            src="/T3-logo.svg"
            className="w-52 h-52"
            blurDataURL="/T3-logo.svg"
            alt="logo"
            width={208}
            height={208}
          />
        </div>
        <h2 className="text-xl font-semibold mt-8">
          Tech Advantage Admin Access
        </h2>
      </CardHeader>

      <CardContent className="px-8 pb-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <FormField
            id="firstName"
            label="First Name"
            placeholder="Enter your First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <FormField
            id="lastName"
            label="Last Name"
            placeholder="Enter your Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />

          <Button
            type="submit"
            className="w-full h-12 bg-black hover:bg-gray-800 text-white font-medium"
          >
            Save & Continue
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
