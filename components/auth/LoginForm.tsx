/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberPassword, setRememberPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Login attempt:", { email, password, rememberPassword });
  };

  return (
    <Card className="w-full max-w-xl mx-auto shadow-lg shadow-l-0 border-0">
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
              className="h-12 bg-gray-50 border-gray-200 focus:bg-white rounded-xl"
              required
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="password"
              className="text-sm font-medium text-gray-700"
            >
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

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                checked={rememberPassword}
                onCheckedChange={(checked: any) =>
                  setRememberPassword(checked as boolean)
                }
              />
              <Label
                htmlFor="remember"
                className="text-sm text-gray-600 cursor-pointer"
              >
                Remember Password
              </Label>
            </div>
            <button
              type="button"
              className="text-sm text-gray-900 hover:text-gray-700 underline"
            >
              Forget Password?
            </button>
          </div>

          <Button
            type="submit"
            className="w-full h-12 bg-black hover:bg-gray-800 text-white font-medium"
          >
            Login
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
