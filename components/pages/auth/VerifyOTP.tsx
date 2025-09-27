"use client";
import type React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { useState } from "react";
import RedirectIfAuthenticated from "@/components/auth/RedirectIfAuthenticated";
import {
  selectUserEmail,
  setAuthToken,
} from "@/lib/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { useVerifyOTPMutation } from "@/lib/redux/features/api/authApiSlice";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { ClipLoader } from "react-spinners";

// Define types for API responses
interface VerifyOTPResponse {
  success: boolean;
  data?: string;
  message?: string;
}

export default function VerifyOTPPage() {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [verifyOTP, { isLoading }] = useVerifyOTPMutation();
  const userEmail = useAppSelector(selectUserEmail);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const otpValue = otp.join("");
    console.log("OTP verification attempt:", { otp: otpValue });

    try {
      const result = (await verifyOTP({
        otp: Number(otpValue),
        email: userEmail,
      }).unwrap()) as unknown as VerifyOTPResponse;

      if (result.success) {
        if (result.data) {
          dispatch(setAuthToken(result.data));
        }
        toast.success("OTP verified successfully");
        router.push("/reset-password");
      }
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
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length <= 1 && /^[0-9]*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto-focus next input
      if (value && index < 3) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
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

        <h2 className="text-xl font-semibold mt-8">Verify OTP</h2>
        <p className="text-sm text-gray-600 mt-2">
          Please enter the 4-digit code sent to your email
        </p>
      </CardHeader>

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
                  className="w-14 h-14 text-center text-xl font-semibold bg-neutral-50 border-gray-200 focus:bg-white rounded-xl"
                  maxLength={1}
                  required
                />
              ))}
            </div>
          </div>

          <Button
            type="submit"
            className="w-full h-12 bg-black hover:bg-gray-800 text-white font-medium"
          >
            {isLoading ? <ClipLoader color="#ffffff" /> : "  Verify OTP"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
