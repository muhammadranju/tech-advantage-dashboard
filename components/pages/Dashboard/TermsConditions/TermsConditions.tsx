"use client";

import { Button } from "@/components/ui/button";
import { Save, Eye, Edit } from "lucide-react";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";

import TermsConditionsSkeleton from "@/components/skeletons/TermsConditionsSkeleton";
import {
  useGetTermsQuery,
  useCreateTermsMutation,
} from "@/lib/redux/features/api/termsSliceApi/termsSliceApi";
import { toast } from "sonner";

// Safe HTML Renderer
import parse from "html-react-parser";
import DOMPurify from "dompurify";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

export default function TermsConditions() {
  const [content, setContent] = useState<string>("");
  const [isPreview, setIsPreview] = useState(false);

  const { data, isLoading } = useGetTermsQuery({});
  const [createTerms, { isLoading: isSaving }] = useCreateTermsMutation();

  // Load content from API
  useEffect(() => {
    if (data?.success && data?.data?.content) {
      setContent(data.data.content);
    }
  }, [data]);

  const handleSave = async () => {
    if (!content.trim()) {
      toast.error("Content cannot be empty");
      return;
    }

    try {
      await createTerms({ body: { content } }).unwrap();
      toast.success("Terms & Conditions saved successfully!");
    } catch (err) {
      toast.error("Failed to save. Please try again");
      console.error(err);
    }
  };

  // Safe HTML sanitizer
  const sanitizeAndParse = (html: string) => {
    const clean = DOMPurify.sanitize(html, {
      USE_PROFILES: { html: true },
      ADD_TAGS: ["iframe"], // if you allow videos
      ADD_ATTR: ["target", "allowfullscreen"],
    });
    return parse(clean);
  };

  if (isLoading) return <TermsConditionsSkeleton />;

  const lastUpdated = data?.data?.updatedAt
    ? new Date(data.data.updatedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "Never";

  return (
    <div className="mx-auto p-6 space-y-2">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Terms & Conditions</h1>
        <p className="text-muted-foreground mt-2">
          Manage your platform&apos;s legal terms and conditions.
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-xl font-semibold">
          {isPreview ? "Preview Mode" : "Editor Mode"}
        </h2>

        <div className="flex gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsPreview(!isPreview)}
          >
            {isPreview ? (
              <>
                <Edit className="w-4 h-4 mr-2" /> Edit
              </>
            ) : (
              <>
                <Eye className="w-4 h-4 mr-2" /> Preview
              </>
            )}
          </Button>

          {!isPreview && (
            <Button
              onClick={handleSave}
              disabled={isSaving || !content.trim()}
              className="bg-black hover:bg-black/90 text-white"
            >
              {isSaving ? (
                "Saving..."
              ) : (
                <>
                  {" "}
                  <Save className="w-4 h-4 mr-2" /> Save Changes
                </>
              )}
            </Button>
          )}
        </div>
      </div>

      {/* Editor or Safe Preview */}
      <div className="border rounded-xl overflow-hidden bg-card shadow-lg">
        {isPreview ? (
          <div className="p-8 bg-white min-h-96 prose prose-lg max-w-none">
            {content ? (
              sanitizeAndParse(content)
            ) : (
              <p className="text-center text-muted-foreground">
                No content yet. Switch to editor mode.
              </p>
            )}
          </div>
        ) : (
          <ReactQuill
            theme="snow"
            value={content}
            onChange={setContent}
            placeholder="Start writing your Terms & Conditions..."
            className="h-[600px]"
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
      <p className="text-sm text-muted-foreground">
        <strong>Last updated:</strong> {lastUpdated}
      </p>

      {/* Clean & Safe Quill Styles */}
      <style jsx global>{`
        .ql-toolbar {
          border: none !important;
          border-bottom: 1px solid #e2e8f0 !important;
          background: #f9fafb;
          padding: 12px 16px;
        }
        .ql-container {
          border: none !important;
        }
        .ql-editor {
          min-height: 360px;
          font-size: 16px;
          line-height: 1.8;
          padding: 20px;
        }
        .ql-editor.ql-blank::before {
          color: #94a3b8;
          font-style: italic;
        }
        .prose {
          color: #1f2937;
        }
        .prose a {
          color: #3b82f6;
          text-decoration: underline;
        }
        .prose h1,
        .prose h2,
        .prose h3 {
          margin-top: 1.5em;
          margin-bottom: 0.5em;
          font-weight: 700;
        }
      `}</style>
    </div>
  );
}
