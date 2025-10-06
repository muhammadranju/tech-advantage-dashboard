// "use client";
// import { Alert, AlertDescription } from "@/components/ui/alert";
// import { Button } from "@/components/ui/button";
// import { CheckCircle2, Save } from "lucide-react"; // Assuming lucide-react for icons, common with shadcn
// import { useEffect, useState } from "react";
// import dynamic from "next/dynamic";
// import "react-quill-new/dist/quill.snow.css"; // Import Quill styles (adjust if using react-quill-new)
// import TermsConditionsSkeleton from "@/components/skeletons/TermsConditionsSkeleton";

// const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

// const TermsConditions = () => {
//   const [terms, setTerms] = useState(""); // State to manage the rich text content
//   const [showSuccess, setShowSuccess] = useState(false);
//   const [lastUpdated, setLastUpdated] = useState("January 15, 2024");
//   const [showEditor, setShowEditor] = useState(true);

//   const handleSave = () => {
//     // Here, you would typically send 'terms' to a backend API.
//     // For demonstration, we'll simulate saving by logging it and showing success.
//     console.log("Saving Terms & Conditions:", terms);

//     // Update last updated date
//     const currentDate = new Date();
//     setLastUpdated(
//       currentDate.toLocaleDateString("en-US", {
//         year: "numeric",
//         month: "long",
//         day: "numeric",
//       })
//     );

//     // Show success alert
//     setShowSuccess(true);

//     // Optionally, hide the alert after a few seconds
//     setTimeout(() => setShowSuccess(false), 5000);
//   };

//   useEffect(() => {
//     setTimeout(() => {
//       setShowEditor(false);
//     }, 300);
//   }, []);

//   return (
//     <>
//       {showEditor ? (
//         <TermsConditionsSkeleton />
//       ) : (
//         <div className="p-6 mx-auto bg-white">
//           <h1 className="text-3xl font-bold text-black">
//             Manage Terms & Conditions
//           </h1>
//           <p className="mt-2 text-sm text-gray-600 max-w-5xl">
//             Use this section to write or update the Terms and Conditions for
//             your website. These terms will be displayed to users within the
//             website and must be accepted during registration or major updates.
//           </p>
//           {showSuccess && (
//             <Alert className="mt-4 flex items-center gap-2 bg-green-100 border-none rounded-lg">
//               <CheckCircle2 className="h-5 w-5 text-green-600" />
//               <AlertDescription className="text-green-800">
//                 Your Terms & Conditions have been successfully updated and will
//                 now appear in the Website.
//               </AlertDescription>
//             </Alert>
//           )}
//           <h2 className="mt-4 text-xl font-semibold text-black">
//             Terms & Conditions Editor
//           </h2>
//           <ReactQuill
//             className="mt-1 border-none  border-gray-300"
//             theme="snow"
//             value={terms}
//             onChange={setTerms}
//             placeholder="Write or paste your Terms & Conditions here..."
//             style={{
//               height: "400px",

//               border: "1px solid #e5e7eb",
//             }} // Approximate height to match original h-64 (considering toolbar)
//           />
//           <p className="mt-4 ml-2 text-sm text-gray-600">
//             Last Updated On: {lastUpdated}
//           </p>
//           <Button
//             onClick={handleSave}
//             className="mt-4 w-64 py-6 z-50 bg-black text-white hover:bg-black/90 rounded-md"
//           >
//             <Save /> Save
//           </Button>
//         </div>
//       )}
//     </>
//   );
// };

// export default TermsConditions;

"use client";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Save } from "lucide-react";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";
import TermsConditionsSkeleton from "@/components/skeletons/TermsConditionsSkeleton";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

const TermsConditions = () => {
  const [terms, setTerms] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [lastUpdated, setLastUpdated] = useState("January 15, 2024");
  const [showEditor, setShowEditor] = useState(true);

  const handleSave = () => {
    console.log("Saving Terms & Conditions:", terms);

    const currentDate = new Date();
    setLastUpdated(
      currentDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    );

    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 5000);
  };

  useEffect(() => {
    setTimeout(() => {
      setShowEditor(false);
    }, 300);
  }, []);

  console.log(terms.length);
  return (
    <>
      {showEditor ? (
        <TermsConditionsSkeleton />
      ) : (
        <div className="px-10 mt-5 ">
          <h1 className="text-2xl sm:text-3xl font-bold text-black">
            Manage Your Terms & Conditions
          </h1>
          <p className="mt-2 text-sm text-gray-600 max-w-5xl">
            Use this section to write or update the Terms and Conditions for
            your website. These terms will be displayed to users within the
            website and must be accepted during registration or major updates.
          </p>

          {showSuccess && (
            <Alert className="mt-4 flex items-center gap-2 bg-green-100 border-none rounded-lg">
              <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
              <AlertDescription className="text-green-800">
                Your Terms & Conditions have been successfully updated and will
                now appear in the Website.
              </AlertDescription>
            </Alert>
          )}

          <h2 className="mt-6 text-lg sm:text-xl font-semibold text-black">
            Terms & Conditions Editor
          </h2>

          {/* Responsive Editor Container */}
          <div className="mt-3 mb-5  border border-gray-300 rounded-lg overflow-hidden bg-white">
            <ReactQuill
              theme="snow"
              value={terms}
              onChange={setTerms}
              placeholder="Write or paste your Terms & Conditions here..."
              className="quill-editor-custom"
              modules={{
                toolbar: [
                  [{ header: [1, 2, 3, false] }],
                  ["bold", "italic", "underline", "strike"],
                  [{ list: "ordered" }, { list: "bullet" }],
                  [{ indent: "-1" }, { indent: "+1" }],
                  ["link"],
                  ["clean"],
                ],
              }}
            />
          </div>

          <p className=" text-sm text-gray-600">
            Last Updated On: {lastUpdated}
          </p>

          <Button
            onClick={handleSave}
            className="mt-4 w-full sm:w-64 py-6 bg-black text-white hover:bg-black/90 rounded-md"
            disabled={!terms.trim() || terms.length === 11}
          >
            <Save className="mr-2" /> Save
          </Button>
        </div>
      )}

      <style jsx global>{`
        .quill-editor-custom {
          border: none;
        }

        .quill-editor-custom .ql-container {
          border: none;
          min-height: 250px;
          max-height: 300px;
          overflow-y: auto;
          font-size: 15px;
        }

        .quill-editor-custom .ql-editor {
          min-height: 250px;
          padding: 16px;
        }

        .quill-editor-custom .ql-toolbar {
          border: none;
          border-bottom: 1px solid #e5e7eb;
          background-color: #f9fafb;
          padding: 12px 8px;
        }

        /* Responsive adjustments */
        @media (min-width: 640px) {
          .quill-editor-custom .ql-container {
            min-height: 300px;
            max-height: 500px;
          }

          .quill-editor-custom .ql-editor {
            min-height: 300px;
            padding: 20px;
          }
        }

        @media (min-width: 1024px) {
          .quill-editor-custom .ql-container {
            min-height: 400px;
            max-height: 400px;
          }

          .quill-editor-custom .ql-editor {
            min-height: 400px;
          }
        }

        /* Toolbar button responsiveness */
        @media (max-width: 400px) {
          .quill-editor-custom .ql-toolbar {
            padding: 8px 6px;
          }

          .quill-editor-custom .ql-toolbar button {
            width: 24px;
            height: 24px;
          }
        }

        /* Focus state */
        .quill-editor-custom:focus-within {
          outline: 2px solid #3b82f6;
          outline-offset: 2px;
        }
      `}</style>
    </>
  );
};

export default TermsConditions;
