"use client";

import type React from "react";

import { PhotoUpload } from "@/components/discoverStrength/VideoUpload/PhotoUploadComponent";
import { Card, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import { useState } from "react";

export default function ChangePhoto() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Login attempt:", { firstName, lastName });
  };

  return (
    <Card className="w-full mt-10 pb-14 max-w-xl mx-auto shadow-[5px_4px_4px_rgba(0,0,0,0.3)] border-0">
      <CardHeader className="text-center pb-8 pt-8">
        <div className="flex justify-center">
          <Image
            src="/logo.png"
            className="invert w-52 h-52"
            alt="logo"
            width={100}
            height={100}
          />
        </div>
        <div className="space-y-1">
          <h1 className="text-4xl font-bold tracking-tight">T3CH</h1>
          <p className="text-sm font-semibold  tracking-widest ">ADVANTAGE</p>
        </div>
        <h2 className="text-xl font-semibold  mt-8">Change Name</h2>
      </CardHeader>

      <PhotoUpload />
    </Card>
  );
}
