"use client";
import { usePathname, useRouter } from "next/navigation";

const HeaderTitle = () => {
  const router = useRouter();
  const pathname = usePathname();
  const path = pathname.split("/")[2];

  console.log(path);

  return (
    <div className="flex gap-8 mb-5">
      {/* </Link> */}
      <button className={`pb-2 text-lg font-medium  border-b-2 border-black`}>
        Upload Video
      </button>
      <button
        onClick={() => router.push("/dashboard/boot-camp/playlist")}
        className={`pb-2 text-lg font-medium hover:border-b-2 border-black`}
      >
        Playlist
      </button>
      <button
        onClick={() => router.push("/dashboard/course")}
        className={`pb-2 text-lg font-medium hover:border-b-2 border-black`}
      >
        Modules
      </button>
    </div>
  );
};

export default HeaderTitle;
