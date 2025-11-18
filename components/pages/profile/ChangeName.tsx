"use client";
import BackButton from "@/components/logo/BackButton";
import LogoComponent from "@/components/logo/Logo";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthCheck } from "@/hooks/useAuthCheck";
import { useUpdateUserNameProfileMutation } from "@/lib/redux/features/api/profile/profileSliceApi";
import { Save } from "lucide-react";
import type React from "react";
import { useState } from "react";

import { ClipLoader } from "react-spinners";
import { DialogTriggerComponent } from "./DialogTriggerComponent";
import { FormFieldProps } from "./profile.interface";
import { toast } from "sonner";

const FormField: React.FC<FormFieldProps> = ({
  id,
  label,
  type = "text",
  placeholder,
  value,
  onChange,
}) => (
  <div className="space-y-2">
    <Label htmlFor={id} className="text-sm font-medium">
      {label}
    </Label>
    <Input
      id={id}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="h-12 bg-gray-50 border-gray-200 focus:bg-white rounded-xl"
      required
    />
  </div>
);

export default function ChangeName() {
  const { userProfile, refetch } = useAuthCheck();
  const userName = userProfile?.user.data.name;
  const [firstName, setFirstName] = useState(userName?.split(" ")[0]);
  const [lastName, setLastName] = useState(userName?.split(" ")[1]);
  const [isOpen, setIsOpen] = useState(false);

  const userId = userProfile?.user?.data._id;

  const [updateUserNameProfile, { isLoading }] =
    useUpdateUserNameProfileMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await updateUserNameProfile({
        userId: userId,
        body: {
          name: `${firstName} ${lastName}`,
          userId: userId,
        },
      }).unwrap();

      if (result?.success) {
        setIsOpen(true);
        refetch();
        toast.success("Name updated successfully");
      }
    } catch (error) {
      toast.error((error as string) || "Error updating name");
    }
  };

  return (
    <>
      <BackButton />
      <Card className="w-full mt-8 max-w-xl mx-auto shadow-[2px_4px_4px_rgba(0,0,0,0.1)] border-0">
        <LogoComponent
          title="Change Name"
          paragraph="Tech Advantage Admin Access"
        />

        <CardContent className="px-8 pb-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <FormField
              id="firstName"
              label="First Name"
              placeholder="Enter your First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <FormField
              id="lastName"
              label="Last Name"
              placeholder="Enter your Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />

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
        title="Name Updated🎉"
        description="Your name has been updated successfully."
      />
    </>
  );
}
