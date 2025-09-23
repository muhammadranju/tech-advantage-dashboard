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
  fallback,
}: ProtectedRouteProps) {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  const isLoading = useAppSelector(selectAuthLoading);
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push(redirectTo);
    }
  }, [isAuthenticated, isLoading, router, redirectTo]);

  // Show loading spinner while checking authentication
  // if (isLoading) {
  //   return (
  //     fallback || (
  //       <div className="min-h-screen flex items-center justify-center">
  //         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
  //       </div>
  //     )
  //   );
  // }

  // If not authenticated, show nothing (redirect will happen)
  // if (!isAuthenticated) {
  //   router.push("/login");
  //   return null;
  // }

  // If authenticated, render the protected content
  return <>{children}</>;
}
