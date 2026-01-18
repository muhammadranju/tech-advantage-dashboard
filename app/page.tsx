import { redirect, RedirectType } from "next/navigation";
export default function Page() {
  redirect("/dashboard", RedirectType.push);
}

// import React from "react";
// import HomePage from "./(main)/index/page";

// function page() {
//   return (
//     <>
//       <HomePage />
//     </>
//   );
// }

// export default page;
