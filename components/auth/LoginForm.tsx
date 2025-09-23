/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLoginMutation } from "@/lib/redux/features/api/authApiSlice";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
// import { toast } from "sonner";
import RedirectIfAuthenticated from "./RedirectIfAuthenticated";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberPassword, setRememberPassword] = useState(false);
  const router = useRouter();
  const [login, { isLoading }] = useLoginMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    // console.log("Login attempt:", { email, password, rememberPassword });
    try {
      await login({ email, password, rememberPassword }).unwrap();
      router.push("/dashboard/overview");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card className="w-full max-w-xl mx-auto shadow-[2px_4px_4px_rgba(0,0,0,0.1)] border-0">
      <RedirectIfAuthenticated />
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

        <h2 className="text-xl font-semibold  mt-8">Welcome to back</h2>
        <p>Tech Advantage Admin Access</p>
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

          <div className="space-y-2">
            <Label
              htmlFor="password"
              className="text-sm font-medium text-neutral-700"
            >
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-12 bg-neutral-50 border-neutral-200 focus:bg-white rounded-xl"
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
                className="text-sm text-neutral-600 cursor-pointer"
              >
                Remember Password
              </Label>
            </div>

            <Link
              href="/forgot-password"
              type="button"
              className="text-sm text-neutral-900 hover:text-neutral-700 underline"
            >
              Forget Password?
            </Link>
          </div>

          <Button
            type="submit"
            className={`w-full h-12 bg-black hover:bg-neutral-800 text-white font-medium`}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Login"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
