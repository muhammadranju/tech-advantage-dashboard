"use client";
import RedirectIfAuthenticated from "@/components/auth/RedirectIfAuthenticated";
import LogoComponent from "@/components/logo/Logo";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ForgotPasswordResponse } from "@/interface/auth.interface";
import { useForgotPasswordMutation } from "@/lib/redux/features/api/authApiSlice";
import { setUserEmail } from "@/lib/redux/features/auth/authSlice";
import { useAppDispatch } from "@/lib/redux/hooks";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type React from "react";
import { useState } from "react";

import { ClipLoader } from "react-spinners";
import { toast } from "sonner";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const validateForm = () => {
    let isValid = true;

    // Reset error
    setEmailError("");

    // Validate email
    if (!email.trim()) {
      setEmailError("Email is required");
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Please enter a valid email address");
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

    try {
      const result = (await forgotPassword({
        email,
      }).unwrap()) as unknown as ForgotPasswordResponse;

      if (result?.success) {
        dispatch(setUserEmail(email));
        setOpenDialog(true);

        // Only use browser APIs when in browser environment
        if (typeof window !== "undefined") {
          toast.success("Password reset link sent successfully");

          setTimeout(() => {
            router.push("/verify-otp");
            setOpenDialog(false);
          }, 2000);
        }
      }
    } catch (error) {
      // Handle error if needed
      if (typeof window !== "undefined") {
        toast.error((error as string) || "Failed to send password reset link");
      }
    }
  };

  // Clear error when user starts typing
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (emailError) setEmailError("");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-xl mx-auto shadow-[2px_4px_4px_rgba(0,0,0,0.1)] border-0">
        <RedirectIfAuthenticated />
        <LogoComponent
          title="Forgot Password"
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
                onChange={handleEmailChange}
                className={`h-12 bg-neutral-50 border-neutral-200 focus:bg-white rounded-xl ${
                  emailError ? "border-red-500 focus:border-red-500" : ""
                }`}
              />
              {emailError && (
                <p className="text-red-500 text-xs mt-1">{emailError}</p>
              )}
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
              disabled={isLoading || email.length === 0}
            >
              {isLoading ? (
                <>
                  Continue{" "}
                  <ClipLoader color="#ffffff" size={16} className="ml-2" />
                </>
              ) : (
                "Continue"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="w-full max-w-lg mx-auto p-10">
          <DialogDescription className="text-center text-black text-lg">
            We&apos;ve sent you an email with instructions to reset your
            password. Check your inbox and follow the steps there.
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </div>
  );
}
