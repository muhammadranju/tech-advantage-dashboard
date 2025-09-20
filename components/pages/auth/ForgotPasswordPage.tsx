"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [rememberPassword, setRememberPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Login attempt:", { email });
  };

  return (
    <Card className="w-full max-w-xl mx-auto shadow-[2px_4px_4px_rgba(0,0,0,0.1)] border-0">
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
            <Label htmlFor="email" className="text-sm font-medium ">
              Enter email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 bg-neutral-50 border-neutral-200 focus:bg-white rounded-xl"
              required
            />
          </div>

          <div className="flex items-center justify-end">
            <Link
              href="/login"
              type="button"
              className="text-sm text-neutral-900 hover:text-neutral-700 underline"
            >
              Back to Login
            </Link>
          </div>

          <Button
            type="submit"
            className="w-full h-12 bg-black hover:bg-neutral-800 text-white font-medium"
          >
            Continue
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
