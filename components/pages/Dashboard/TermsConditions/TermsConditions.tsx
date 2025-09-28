// "use client";
// import { Alert, AlertDescription } from "@/components/ui/alert";
// import { Button } from "@/components/ui/button";
// import { Textarea } from "@/components/ui/textarea";
// import { CheckCircle2, Save } from "lucide-react"; // Assuming lucide-react for icons, common with shadcn

// const TermsConditions = () => {
//   return (
//     <div className="p-6  mx-auto bg-white">
//       <h1 className="text-3xl font-bold text-black">
//         Manage Terms & Conditions
//       </h1>
//       <p className="mt-2 text-sm text-gray-600 max-w-5xl">
//         Use this section to write or update the Terms and Conditions for your
//         website. These terms will be displayed to users within the website and
//         must be accepted during registration or major updates.
//       </p>
//       <Alert className="mt-4 flex items-center gap-2 bg-green-100 border-none rounded-lg">
//         <CheckCircle2 className="h-5 w-5 text-green-600" />
//         <AlertDescription className="text-green-800">
//           Your Terms & Conditions have been successfully updated and will now
//           appear in the Website.
//         </AlertDescription>
//       </Alert>
//       <h2 className="mt-4 text-xl font-semibold text-black">
//         Terms & Conditions Editor
//       </h2>
//       <Textarea
//         className="mt-1 h-64 resize-none border border-gray-300 rounded-md placeholder:text-gray-400 focus:border-gray-400 focus:ring-0"
//         placeholder="Write or paste your Terms & Conditions here..."
//       />
//       <p className="mt-4 text-sm text-gray-600">
//         Last Updated On: January 15, 2024
//       </p>
//       <Button className="mt-4 w-64 py-6 bg-black text-white hover:bg-black/90 rounded-md">
//         <Save /> Save
//       </Button>
//     </div>
//   );
// };

// export default TermsConditions;

"use client";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Save } from "lucide-react"; // Assuming lucide-react for icons, common with shadcn
import { useState } from "react";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css"; // Import Quill styles (adjust if using react-quill-new)

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

const TermsConditions = () => {
  const [terms, setTerms] = useState(""); // State to manage the rich text content
  const [showSuccess, setShowSuccess] = useState(false);
  const [lastUpdated, setLastUpdated] = useState("January 15, 2024");

  const handleSave = () => {
    // Here, you would typically send 'terms' to a backend API.
    // For demonstration, we'll simulate saving by logging it and showing success.
    console.log("Saving Terms & Conditions:", terms);

    // Update last updated date
    const currentDate = new Date();
    setLastUpdated(
      currentDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    );

    // Show success alert
    setShowSuccess(true);

    // Optionally, hide the alert after a few seconds
    setTimeout(() => setShowSuccess(false), 5000);
  };

  return (
    <div className="p-6 mx-auto bg-white">
      <h1 className="text-3xl font-bold text-black">
        Manage Terms & Conditions
      </h1>
      <p className="mt-2 text-sm text-gray-600 max-w-5xl">
        Use this section to write or update the Terms and Conditions for your
        website. These terms will be displayed to users within the website and
        must be accepted during registration or major updates.
      </p>
      {showSuccess && (
        <Alert className="mt-4 flex items-center gap-2 bg-green-100 border-none rounded-lg">
          <CheckCircle2 className="h-5 w-5 text-green-600" />
          <AlertDescription className="text-green-800">
            Your Terms & Conditions have been successfully updated and will now
            appear in the Website.
          </AlertDescription>
        </Alert>
      )}
      <h2 className="mt-4 text-xl font-semibold text-black">
        Terms & Conditions Editor
      </h2>
      <ReactQuill
        className="mt-1 border-none  border-gray-300"
        theme="snow"
        value={terms}
        onChange={setTerms}
        placeholder="Write or paste your Terms & Conditions here..."
        style={{
          height: "256px",

          border: "1px solid #e5e7eb",
        }} // Approximate height to match original h-64 (considering toolbar)
      />
      <p className="mt-4 ml-2 text-sm text-gray-600">
        Last Updated On: {lastUpdated}
      </p>
      <Button
        onClick={handleSave}
        className="mt-4 w-64 py-6 bg-black text-white hover:bg-black/90 rounded-md"
      >
        <Save /> Save
      </Button>
    </div>
  );
};

export default TermsConditions;
