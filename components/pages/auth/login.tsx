/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import RedirectIfAuthenticated from "@/components/auth/RedirectIfAuthenticated";
import LogoComponent from "@/components/logo/Logo";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLoginMutation } from "@/lib/redux/features/api/authApiSlice";
import { logout } from "@/lib/redux/features/auth/authSlice";
import { useAppDispatch } from "@/lib/redux/hooks";
import Cookies from "js-cookie";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type React from "react";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { toast } from "sonner";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberPassword, setRememberPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const router = useRouter();
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useAppDispatch();
  const token = Cookies.get("token");

  useEffect(() => {
    if (token) {
      router.replace("/dashboard/overview");
      // window.location.href = "/dashboard/overview";
    }
  }, [router, token]);

  const validateForm = () => {
    let isValid = true;

    // Reset errors
    setEmailError("");
    setPasswordError("");

    // Validate email
    if (!email.trim()) {
      setEmailError("Email is required");
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Please enter a valid email address");
      isValid = false;
    }

    // Validate password
    if (!password.trim()) {
      setPasswordError("Password is required");
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

    // Handle login logic here
    try {
      const result = await login({
        email,
        password,
        rememberPassword,
      }).unwrap();

      // user successfully logged in
      if (result.role === process.env.NEXT_PUBLIC_ROLE) {
        // window.location.href = "/dashboard/overview";
        // router.refresh();
        toast.success("Login successful");
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

  // Clear error when user starts typing
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (emailError) setEmailError("");
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (passwordError) setPasswordError("");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
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
                onChange={handleEmailChange}
                className={`h-12 bg-neutral-50 border-neutral-200 focus:bg-white rounded-xl ${
                  emailError ? "border-red-500 focus:border-red-500" : ""
                }`}
              />
              {emailError && (
                <p className="text-red-500 text-xs mt-1">{emailError}</p>
              )}
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
                  onChange={handlePasswordChange}
                  className={`h-12 bg-neutral-50 border-neutral-200 focus:bg-white rounded-xl pr-12 ${
                    passwordError ? "border-red-500 focus:border-red-500" : ""
                  }`}
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
              {passwordError && (
                <p className="text-red-500 text-xs mt-1">{passwordError}</p>
              )}
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
              {isLoading ? <ClipLoader color="#ffffff" /> : "Login"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
