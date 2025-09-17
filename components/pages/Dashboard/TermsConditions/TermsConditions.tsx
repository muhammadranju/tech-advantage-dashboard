"use client";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, Save } from "lucide-react"; // Assuming lucide-react for icons, common with shadcn

const TermsConditions = () => {
  return (
    <div className="p-6  mx-auto bg-white">
      <h1 className="text-3xl font-bold text-black">
        Manage Terms & Conditions
      </h1>
      <p className="mt-2 text-sm text-gray-600 max-w-5xl">
        Use this section to write or update the Terms and Conditions for your
        website. These terms will be displayed to users within the website and
        must be accepted during registration or major updates.
      </p>
      <Alert className="mt-4 flex items-center gap-2 bg-green-100 border-none rounded-lg">
        <CheckCircle2 className="h-5 w-5 text-green-600" />
        <AlertDescription className="text-green-800">
          Your Terms & Conditions have been successfully updated and will now
          appear in the Website.
        </AlertDescription>
      </Alert>
      <h2 className="mt-4 text-xl font-semibold text-black">
        Terms & Conditions Editor
      </h2>
      <Textarea
        className="mt-1 h-64 resize-none border border-gray-300 rounded-md placeholder:text-gray-400 focus:border-gray-400 focus:ring-0"
        placeholder="Write or paste your Terms & Conditions here..."
      />
      <p className="mt-4 text-sm text-gray-600">
        Last Updated On: January 15, 2024
      </p>
      <Button className="mt-4 w-64 py-6 bg-black text-white hover:bg-black/90 rounded-md">
        <Save /> Save
      </Button>
    </div>
  );
};

export default TermsConditions;
