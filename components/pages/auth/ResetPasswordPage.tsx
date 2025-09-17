"use client";
import type React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { useState } from "react";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Login attempt:", { password, confirmPassword });
  };

  return (
    <Card className="w-full max-w-xl mx-auto shadow-[5px_4px_4px_rgba(0,0,0,0.3)] border-0">
      <CardHeader className="text-center pb-8 pt-8">
        <div className="flex justify-center">
          <Image
            src="/T3-logo.svg"
            className=" w-52 h-52"
            alt="logo"
            width={500}
            height={600}
          />
        </div>

        <h2 className="text-xl font-semibold  mt-8">
          Tech Advantage Admin Access
        </h2>
      </CardHeader>

      <CardContent className="px-8 pb-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium ">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-12 bg-gray-50 border-gray-200 focus:bg-white rounded-xl"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-sm font-medium ">
              Confirm Password
            </Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Enter your confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="h-12 bg-gray-50 border-gray-200 focus:bg-white rounded-xl"
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full h-12 bg-black hover:bg-gray-800 text-white font-medium"
          >
            Continue
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
