import { redirect, RedirectType } from "next/navigation";

export default function Page() {
  redirect("/dashboard/overview", RedirectType.push);
}
