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
import { useForgotPasswordMutation } from "@/lib/redux/features/api/authApiSlice";
import { setUserEmail } from "@/lib/redux/features/auth/authSlice";
import { useAppDispatch } from "@/lib/redux/hooks";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type React from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners";

interface ForgotPasswordResponse {
  success: boolean;
  data?: string;
  message?: string;
}

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = (await forgotPassword({
      email,
    }).unwrap()) as unknown as ForgotPasswordResponse;
    if (result?.success) {
      dispatch(setUserEmail(email));
      setOpenDialog(true);
      toast.success("Password reset link sent successfully");

      setTimeout(() => {
        router.push("/verify-otp");
        setOpenDialog(false);
      }, 2000);
    }
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
              Continue {isLoading && <ClipLoader color="#ffffff" />}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        {/* <Card> */}
        <DialogContent className="w-full max-w-lg mx-auto p-10">
          <DialogDescription className="text-center text-black text-lg">
            We’ve sent you an email with instructions to reset your password.
            Check your inbox and follow the steps there.
          </DialogDescription>
        </DialogContent>
        {/* </Card> */}
      </Dialog>
    </div>
  );
}
