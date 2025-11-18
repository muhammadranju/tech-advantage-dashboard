"use client";
import { ProtectedRouteProps } from "@/interface/auth.interface";
import {
  selectAuthLoading,
  selectIsAuthenticated,
} from "@/lib/redux/features/auth/authSlice";
import { useAppSelector } from "@/lib/redux/hooks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({
  children,
  redirectTo = "/login",
}: // fallback,
ProtectedRouteProps) {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  const isLoading = useAppSelector(selectAuthLoading);
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace(redirectTo);
    }
  }, [isAuthenticated, isLoading, router, redirectTo]);

  return <>{children}</>;
}
