"use client";
import { useRouter } from "next/navigation";

const HeaderTitle = ({ isActive }: { isActive: string }) => {
  const router = useRouter();
  return (
    <div className="flex gap-8 mb-5">
      {/* </Link> */}
      <button
        className={`pb-2 text-lg font-medium hover:border-b-2 border-black ${
          isActive === "bootcamp" ? "border-b-2 border-black" : ""
        }`}
        onClick={() => router.push("/dashboard/boot-camp")}
      >
        Bootcamp
      </button>
      <button
        onClick={() => router.push("/dashboard/boot-camp/playlist")}
        className={`pb-2 text-lg font-medium hover:border-b-2 border-black ${
          isActive === "playlist" ? "border-b-2 border-black" : ""
        }`}
      >
        Playlists
      </button>
      <button
        onClick={() => router.push("/dashboard/courses")}
        className={`pb-2 text-lg font-medium hover:border-b-2 border-black ${
          isActive === "courses" ? "border-b-2 border-black" : ""
        }`}
      >
        Courses
      </button>
    </div>
  );
};

export default HeaderTitle;
