"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { CircularProgress } from "@mui/material";
import { useAuth } from "./use-auth";
import type { UserRole } from "@saas/users/domain";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}

export function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { user, isAuthenticated, isHydrated, isLoading, clearAuth } = useAuth();
  const router = useRouter();
  const hasAllowedRole = !allowedRoles || (user && allowedRoles.includes(user.role));

  useEffect(() => {
    if (!isHydrated || isLoading) return;
    if (!isAuthenticated) router.replace("/login");
    else if (!hasAllowedRole) {
      clearAuth();
      router.replace("/login");
    }
  }, [clearAuth, hasAllowedRole, isAuthenticated, isHydrated, isLoading, router]);

  if (!isHydrated || isLoading || !isAuthenticated || !hasAllowedRole) {
    return <CircularProgress />;
  }
  return <>{children}</>;
}
