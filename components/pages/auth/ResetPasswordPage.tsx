"use client";
import type React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { useState } from "react";
import RedirectIfAuthenticated from "@/components/auth/RedirectIfAuthenticated";
import { selectAuthToken } from "@/lib/redux/features/auth/authSlice";
import { useAppSelector } from "@/lib/redux/hooks";
import { useResetPasswordMutation } from "@/lib/redux/features/api/authApiSlice";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { ClipLoader } from "react-spinners";
import { Eye, EyeOff } from "lucide-react";

interface ResetPasswordResponse {
  success: boolean;
  data?: string;
  message?: string;
}

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const authToken = useAppSelector(selectAuthToken);
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const router = useRouter();
  console.log(authToken);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic password validation
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    try {
      const result = (await resetPassword({
        password,
        confirmPassword,
        authToken,
      }).unwrap()) as unknown as ResetPasswordResponse;

      if (result.success) {
        toast.success("Password reset successfully");
        router.push("/login");
      }

      console.log("Reset password attempt:", result);
    } catch (error) {
      console.log("Error:", error);

      // Type guard for FetchBaseQueryError
      if (error && typeof error === "object" && "status" in error) {
        const apiError = error as FetchBaseQueryError;

        if (
          apiError.status === 400 &&
          apiError.data &&
          typeof apiError.data === "object" &&
          "message" in apiError.data
        ) {
          const errorData = apiError.data as { message: string };
          toast.error(errorData.message);
        } else if (apiError.status === 401) {
          toast.error("Session expired. Please try again.");
          router.push("/forgot-password");
        } else {
          toast.error("Failed to reset password");
        }
      }
      // Type guard for SerializedError
      else if (error && typeof error === "object" && "message" in error) {
        const serializedError = error as SerializedError;
        toast.error(serializedError.message || "Failed to reset password");
      }
      // Fallback for unknown errors
      else {
        toast.error("An unexpected error occurred");
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
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

        <h2 className="text-xl font-semibold  mt-8">Reset Password</h2>
        <p className="text-sm text-gray-600 mt-2">
          Enter your new password below
        </p>
      </CardHeader>

      <CardContent className="px-8 pb-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium ">
              New Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 bg-neutral-50 border-gray-200 focus:bg-white rounded-xl pr-12"
                minLength={6}
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
          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-sm font-medium ">
              Confirm New Password
            </Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="h-12 bg-gray-50 border-gray-200 focus:bg-white rounded-xl pr-12"
                minLength={6}
                required
              />
              <button
                type="button"
                onClick={toggleConfirmPasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full h-12 bg-black hover:bg-gray-800 text-white font-medium"
            disabled={!authToken || isLoading} // Disable if no auth token or loading
          >
            {isLoading ? <ClipLoader color="#ffffff" /> : "Reset Password"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}