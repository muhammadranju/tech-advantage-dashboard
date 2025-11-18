/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import BackButton from "@/components/logo/BackButton";
import LogoComponent from "@/components/logo/Logo";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUpdateUserPasswordProfileMutation } from "@/lib/redux/features/api/profile/profileSliceApi";
import { Save } from "lucide-react";
import type React from "react";
import { useState } from "react";

import { ClipLoader } from "react-spinners";
import { DialogTriggerComponent } from "./DialogTriggerComponent";
import { toast } from "sonner";

export default function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [updateUserPasswordProfile, { isLoading, isError }] =
    useUpdateUserPasswordProfileMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const result = await updateUserPasswordProfile({
        body: {
          currentPassword,
          newPassword: password,
          confirmPassword,
        },
      }).unwrap();

      if (result?.success) {
        setIsOpen(true);
        toast.success("Password changed successfully");
        setCurrentPassword("");
        setPassword("");
        setConfirmPassword("");
      } else {
        toast.error("Failed to change password");
      }
    } catch (error: any) {
      setErrorMsg(error?.data?.message);
      toast.error((error as string) || "Failed to change password");
    }
  };

  return (
    <>
      <BackButton />
      <Card className="w-full  max-w-xl mx-auto shadow-[2px_4px_4px_rgba(0,0,0,0.1)] border-0">
        <LogoComponent
          title="Change Password"
          paragraph="Tech Advantage Admin Access"
        />

        <CardContent className="px-8 pb-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="currentPassword" className="text-sm font-medium ">
                Current Password
              </Label>
              <Input
                id="currentPassword"
                type="text"
                placeholder="Enter your current password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="h-12 bg-gray-50 border-gray-200 focus:bg-white rounded-xl"
                required
              />
              <small>
                {isError && errorMsg ? (
                  <p className="text-red-500">{errorMsg}</p>
                ) : null}
              </small>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium ">
                Password
              </Label>
              <Input
                id="password"
                type="text"
                placeholder="Enter your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 bg-gray-50 border-gray-200 focus:bg-white rounded-xl"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-sm font-medium ">
                Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                type="text"
                placeholder="Enter your Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="h-12 bg-gray-50 border-gray-200 focus:bg-white rounded-xl"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-black hover:bg-gray-800 text-white font-medium"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <ClipLoader color="#ffffff" size={16} />
                </>
              ) : (
                <>
                  <Save />
                  Save & Continue
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
      <DialogTriggerComponent
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title="Password Changed🎉"
        description="Your password has been changed successfully."
      />
    </>
  );
}
