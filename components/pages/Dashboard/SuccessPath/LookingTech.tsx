"use client";
import BusinessAssessment from "@/components/coaching/BusinessAssessment";
import DropdownAndLinks from "@/components/discoverStrength/DropdownAndLinks";
import { useRouter } from "next/navigation";

const LookingToGetIntoTech = () => {
  const router = useRouter();
  return (
    <div>
      <div className="flex justify-between gap-8 ">
        <div className="flex gap-8 mb-5">
          <button
            onClick={() => router.push("/dashboard/success-path")}
            className={`pb-2 text-lg font-medium hover:border-b-2 border-black`}
          >
            Quiz
          </button>
          {/* </Link> */}
          <button
            className={`pb-2 text-lg font-medium border-b-2 border-black`}
          >
            Assessment
          </button>
        </div>
        <DropdownAndLinks
          initialOption="Looking to Get Into Tech" // The starting selected option in the dropdown
          options={[
            {
              label: "Aspiring Entrepreneur",
              route:
                "/dashboard/success-path/aspiring-entrepreneur?q=aspiring-entrepreneur",
            },
            {
              label: "Small Business",
              route: "/dashboard/success-path/small-business?q=small-business",
            },
            {
              label: "Looking to Get Into Tech",
              route: "/dashboard/success-path/looking-tech?q=looking-tech",
            },
          ]}
          staticLabel="Quiz" // Optional: Customizes the static button/label on the left
          staticLabel2="Assessment"
        />
      </div>
      <BusinessAssessment />
    </div>
  );
};

export default LookingToGetIntoTech;
