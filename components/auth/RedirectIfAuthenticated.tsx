import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/lib/redux/hooks";
import { selectIsAuthenticated } from "@/lib/redux/features/auth/authSlice";

const RedirectIfAuthenticated: React.FC = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const queryParams = new URLSearchParams(window?.location.search);
  const redirect = queryParams.get("redirect");

  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push(`/${(redirect?.slice(1) as string) || "dashboard/overview"}`);
    }
  }, [isAuthenticated, router, redirect]);

  return null; // This component doesn't render anything
};

export default RedirectIfAuthenticated;
