"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/lib/redux/hooks";
import { selectIsAuthenticated } from "@/lib/redux/features/auth/authSlice";

const RedirectIfAuthenticated: React.FC = () => {
  const [redirect, setRedirect] = useState<string | null>(null);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const queryParams = new URLSearchParams(window.location.search);
      const redirectParam = queryParams.get("redirect");
      setRedirect(redirectParam);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated && redirect !== null) {
      router.push(`/${(redirect?.slice(1) as string) || "dashboard/overview"}`);
    } else if (isAuthenticated) {
      // Fallback if no redirect param
      router.push("/dashboard/overview");
    }
  }, [isAuthenticated, router, redirect]);

  return null; // This component doesn't render anything
};

export default RedirectIfAuthenticated;
