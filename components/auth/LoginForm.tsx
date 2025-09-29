/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLoginMutation } from "@/lib/redux/features/api/authApiSlice";
import { logout } from "@/lib/redux/features/auth/authSlice";
import { useAppDispatch } from "@/lib/redux/hooks";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners";
import LogoComponent from "../logo/Logo";
import RedirectIfAuthenticated from "./RedirectIfAuthenticated";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberPassword, setRememberPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const [login, { isLoading }] = useLoginMutation();

  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    try {
      const result = await login({
        email,
        password,
        rememberPassword,
      }).unwrap();

      // user successfully logged in
      if (result.role === process.env.NEXT_PUBLIC_ROLE) {
        router.push("/dashboard/overview");
        toast.success("Login successful", { position: "top-right" });
      }
    } catch (error: any) {
      if (error?.status === 400) {
        toast.error(error?.data?.message);
        dispatch(logout());
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Card className="w-full max-w-xl mx-auto shadow-[2px_4px_4px_rgba(0,0,0,0.1)] border-0">
      <RedirectIfAuthenticated />
      <LogoComponent
        title="Welcome to back"
        paragraph="Tech Advantage Admin Access"
      />

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
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 bg-neutral-50 border-neutral-200 focus:bg-white rounded-xl pr-12"
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
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
              className="text-sm text-neutral-900 hover:text-neutral-700 underline"
            >
              Forgot Password?
            </Link>
          </div>

          <Button
            type="submit"
            className={`w-full h-12 bg-black hover:bg-neutral-800 text-white font-medium`}
            disabled={isLoading}
          >
            {/* {isLoading && <ClipLoader className="ml-2" />} */}
            {isLoading ? <ClipLoader color="#ffffff" /> : "Login"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
