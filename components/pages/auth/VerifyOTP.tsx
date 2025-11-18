"use client";
import RedirectIfAuthenticated from "@/components/auth/RedirectIfAuthenticated";
import LogoComponent from "@/components/logo/Logo";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { VerifyOTPResponse } from "@/interface/auth.interface";
import { useVerifyOTPMutation } from "@/lib/redux/features/api/authApiSlice";
import {
  selectUserEmail,
  setAuthToken,
} from "@/lib/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useRouter } from "next/navigation";
import type React from "react";
import { useState } from "react";

import { ClipLoader } from "react-spinners";
import { toast } from "sonner";

// Define types for API responses

export default function VerifyOTPPage() {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [otpError, setOtpError] = useState("");
  const [verifyOTP, { isLoading }] = useVerifyOTPMutation();
  const userEmail = useAppSelector(selectUserEmail);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const validateForm = () => {
    let isValid = true;

    // Reset error
    setOtpError("");

    // Check if all OTP fields are filled
    const otpValue = otp.join("");
    if (otpValue.length !== 4) {
      setOtpError("Please enter all 4 digits");
      isValid = false;
    } else if (!/^\d{4}$/.test(otpValue)) {
      setOtpError("OTP must contain only numbers");
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form before submission
    if (!validateForm()) {
      return;
    }

    const otpValue = otp.join("");

    try {
      const result = (await verifyOTP({
        otp: Number(otpValue),
        email: userEmail,
      }).unwrap()) as unknown as VerifyOTPResponse;

      if (result.success) {
        if (result.data) {
          dispatch(setAuthToken(result.data));
        }
        if (typeof window !== "undefined") {
          toast.success("OTP verified successfully");
          router.push("/reset-password");
        }
      }
    } catch (error) {
      toast.error((error as string) || "Failed to verify OTP");

      // Only show toast notifications in browser environment
      if (typeof window !== "undefined") {
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
          } else {
            toast.error("Failed to verify OTP");
          }
        }
        // Type guard for SerializedError
        else if (error && typeof error === "object" && "message" in error) {
          const serializedError = error as SerializedError;
          toast.error(serializedError.message || "Failed to verify OTP");
        }
        // Fallback for unknown errors
        else {
          toast.error("An unexpected error occurred");
        }
      }
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length <= 1 && /^[0-9]*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Clear error when user starts typing
      if (otpError) setOtpError("");

      // Auto-focus next input - only in browser environment
      if (value && index < 3 && typeof window !== "undefined") {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (
      e.key === "Backspace" &&
      !otp[index] &&
      index > 0 &&
      typeof window !== "undefined"
    ) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-xl mx-auto shadow-[2px_4px_4px_rgba(0,0,0,0.1)] border-0">
        <RedirectIfAuthenticated />
        <LogoComponent
          title="Verify OTP"
          paragraph="Tech Advantage Admin Access"
        />

        <CardContent className="px-8 pb-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="otp-0" className="text-sm font-medium">
                Verification Code
              </Label>
              <div className="flex justify-center space-x-3">
                {otp.map((digit, index) => (
                  <Input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    value={digit}
                    placeholder="0"
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className={`w-14 h-14 text-center text-xl font-semibold bg-neutral-50 border-gray-200 focus:bg-white rounded-xl ${
                      otpError ? "border-red-500 focus:border-red-500" : ""
                    }`}
                    maxLength={1}
                  />
                ))}
              </div>
              {otpError && (
                <p className="text-red-500 text-xs mt-1 text-center">
                  {otpError}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-black hover:bg-gray-800 text-white font-medium"
              disabled={isLoading || userEmail.length === 0}
            >
              {isLoading ? <ClipLoader color="#ffffff" /> : "Verify OTP"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
