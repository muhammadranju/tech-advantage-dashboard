/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash } from "lucide-react";
import data from "@/data/success-assessment.json";
import { PiPencilFill } from "react-icons/pi";

// Raw shapes coming from various sources
type IncomingAssessment =
  | {
      range: string;
      title: string;
      subtitle?: string; // legacy
      description?: string; // new
      findings?: string[]; // legacy
      what_we_found?: string[]; // new
      recommendations?: string[]; // legacy
      recommended_next_steps?: string[]; // new
    }
  | Record<string, never>;

// The normalized shape used in the UI
interface NormalizedAssessment {
  range: string;
  title: string;
  description: string;
  whatWeFound: string[];
  recommendedNextSteps: string[];
}

// Normalize any known variant to our render shape
const normalize = (a: IncomingAssessment): NormalizedAssessment => ({
  range: a.range ?? "",
  title: a.title ?? "",
  description: a.description ?? a.subtitle ?? "",
  whatWeFound: a.what_we_found ?? a.findings ?? [],
  recommendedNextSteps: a.recommended_next_steps ?? a.recommendations ?? [],
});

// Local fallback data (already in the new schema)
const BusinessAssessment = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");

  // Decide which raw list to use based on query
  const rawList: IncomingAssessment[] = useMemo(() => {
    if (query === "small-business") return (data as any).SmallBusiness ?? [];
    if (query === "aspiring-entrepreneur")
      return (data as any).AspiringEntrepreneur ?? [];
    if (query === "looking-tech")
      return (data as any).LookingToGetIntoTech ?? [];
    // return FALLBACK;
  }, [query]);

  // Normalize once the source changes
  const [assessmentData, setAssessmentData] = useState<NormalizedAssessment[]>(
    []
  );
  console.log(assessmentData);
  useEffect(() => {
    setAssessmentData(rawList.map(normalize));
  }, [rawList]);

  return (
    <div className="space-y-3 mt-10">
      {assessmentData.map((assessment, index) => (
        <Card key={`${assessment.range}-${index}`} className="w-full">
          <CardHeader className="flex flex-row items-start justify-between">
            <div className="space-y-3 flex-1">
              <Badge
                variant="secondary"
                className="bg-white shadow rounded-md border text-sm text-foreground hover:bg-muted"
              >
                Range - {assessment.range}
              </Badge>
              <div>
                <h3 className="text-xl font-bold">{assessment.title}</h3>
                {assessment.description ? (
                  <p className="leading-relaxed">{assessment.description}</p>
                ) : null}
              </div>
            </div>
            <div className="flex gap-2">
              <button
                // onClick={() => handleEdit(comment.id)}
                className="hover:bg-gray-100 cursor-pointer p-3 rounded-full"
                type="button"
              >
                <PiPencilFill className="text-2xl font-bold " />
              </button>

              <button
                // onClick={() => handleDelete(comment.id)}
                className="hover:bg-red-100 cursor-pointer p-3 rounded-full"
                type="button"
              >
                <Trash className="text-2xl font-bold text-red-500 " />
              </button>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {assessment.whatWeFound.length > 0 && (
              <div>
                <h4 className="font-bold">What We Found</h4>
                <ul className="space-y-1">
                  {assessment.whatWeFound.map((finding, i) => (
                    <li key={i} className="flex items-start">
                      <span className="mr-1">•</span>
                      <span className="leading-relaxed">{finding}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {assessment.recommendedNextSteps.length > 0 && (
              <div>
                <h4 className="font-bold">Recommended Next Steps</h4>
                <ul className="space-y-1">
                  {assessment.recommendedNextSteps.map((rec, i) => (
                    <li key={i} className="flex items-start">
                      <span className="mr-1">•</span>
                      <span className="leading-relaxed">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default BusinessAssessment;
