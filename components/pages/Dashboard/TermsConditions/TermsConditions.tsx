"use client";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Save, Eye, Edit } from "lucide-react";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";
import TermsConditionsSkeleton from "@/components/skeletons/TermsConditionsSkeleton";
import {
  useCreateTermsMutation,
  useGetTermsQuery,
} from "@/lib/redux/features/api/termsSliceApi/termsSliceApi";
import { toast } from "sonner";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

const TermsConditions = () => {
  const [terms, setTerms] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [lastUpdated, setLastUpdated] = useState("January 15, 2024");
  const [showEditor, setShowEditor] = useState(true);
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  const { data: termsData } = useGetTermsQuery(null);

  useEffect(() => {
    if (termsData?.data?.length > 0) {
      setTerms(termsData?.data[0]?.terms);
    }
  }, [termsData]);

  const [createTerms] = useCreateTermsMutation();

  const handleSave = async () => {
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

    try {
      const result = await createTerms({
        body: {
          terms,
        },
      }).unwrap();

      if (result.success) {
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 5000);
        toast.success("Terms & Conditions saved successfully");
      }
    } catch (error) {
      console.error("Error saving Terms & Conditions:", error);
      setShowSuccess(false);
      setTimeout(() => setShowSuccess(true), 5000);
      toast.error("Error saving Terms & Conditions. Please try again.");
    }
  };

  const togglePreview = () => {
    setIsPreviewMode(!isPreviewMode);
  };

  useEffect(() => {
    setTimeout(() => {
      setShowEditor(false);
    }, 300);
  }, []);

  return (
    <>
      {showEditor ? (
        <TermsConditionsSkeleton />
      ) : (
        <div className="px-10 mt-5">
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

          <div className="mt-6 flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-semibold text-black">
              {isPreviewMode ? "Preview Mode" : "Terms & Conditions Editor"}
            </h2>
            <Button
              onClick={togglePreview}
              variant="outline"
              className="flex items-center gap-2"
              disabled={!terms.trim() || terms.length === 11}
            >
              {isPreviewMode ? (
                <>
                  <Edit className="h-4 w-4" />
                  <span className="hidden sm:inline">Edit</span>
                </>
              ) : (
                <>
                  <Eye className="h-4 w-4" />
                  <span className="hidden sm:inline">Preview</span>
                </>
              )}
            </Button>
          </div>

          {/* Editor or Preview Container */}
          <div className="mt-3 mb-5 border border-gray-300 rounded-lg overflow-hidden bg-white">
            {isPreviewMode ? (
              <div className="preview-content p-6 sm:p-8 min-h-[250px] sm:min-h-[300px] lg:min-h-[400px] max-h-[300px] sm:max-h-[500px] lg:max-h-[400px] overflow-y-auto">
                {terms.trim() && terms.length > 11 ? (
                  <div
                    className="ql-editor"
                    dangerouslySetInnerHTML={{ __html: terms }}
                  />
                ) : (
                  <p className="text-gray-400 text-center mt-20">
                    No content to preview. Start writing in the editor.
                  </p>
                )}
              </div>
            ) : (
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
            )}
          </div>

          <p className="text-sm text-gray-600">
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

        /* Preview mode styles */
        .preview-content .ql-editor {
          padding: 0;
          border: none;
          min-height: auto;
        }

        .preview-content h1 {
          font-size: 2em;
          font-weight: bold;
          margin-bottom: 0.5em;
        }

        .preview-content h2 {
          font-size: 1.5em;
          font-weight: bold;
          margin-bottom: 0.5em;
        }

        .preview-content h3 {
          font-size: 1.17em;
          font-weight: bold;
          margin-bottom: 0.5em;
        }

        .preview-content p {
          margin-bottom: 1em;
          line-height: 1.6;
        }

        .preview-content ul,
        .preview-content ol {
          margin-bottom: 1em;
          padding-left: 2em;
        }

        .preview-content li {
          margin-bottom: 0.5em;
        }

        .preview-content strong {
          font-weight: bold;
        }

        .preview-content em {
          font-style: italic;
        }

        .preview-content u {
          text-decoration: underline;
        }

        .preview-content s {
          text-decoration: line-through;
        }

        .preview-content a {
          color: #3b82f6;
          text-decoration: underline;
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
