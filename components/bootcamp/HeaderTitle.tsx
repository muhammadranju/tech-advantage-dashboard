"use client";
import { useRouter } from "next/navigation";

const HeaderTitle = () => {
  const router = useRouter();
  return (
    <div className="flex gap-8 mb-5">
      {/* </Link> */}
      <button className={`pb-2 text-lg font-medium  border-b-2 border-black`}>
        Upload Solo Video
      </button>
      <button
        onClick={() => router.push("/dashboard/boot-camp/playlist")}
        className={`pb-2 text-lg font-medium hover:border-b-2 border-black`}
      >
        Create Playlist
      </button>
    </div>
  );
};

export default HeaderTitle;
