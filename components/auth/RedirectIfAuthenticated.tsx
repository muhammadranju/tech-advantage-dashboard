import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/lib/redux/hooks";
import { selectIsAuthenticated } from "@/lib/redux/features/auth/authSlice";

const RedirectIfAuthenticated: React.FC = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard/overview");
    }
  }, [isAuthenticated, router]);

  return null; // This component doesn't render anything
};

export default RedirectIfAuthenticated;
