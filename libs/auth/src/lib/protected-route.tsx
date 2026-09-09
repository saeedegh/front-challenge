"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { PageError, PageLoading } from "@saas/ui";
import { useAuth } from "./use-auth";
import type { UserRole } from "@saas/users/domain";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}

export function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const {
    user,
    isAuthenticated,
    isHydrated,
    isSessionLoading,
    isSessionRetrying,
    sessionError,
    retrySession,
    clearAuth,
  } = useAuth();
  const router = useRouter();
  const hasAllowedRole = !allowedRoles || (user && allowedRoles.includes(user.role));

  useEffect(() => {
    if (!isHydrated || isSessionLoading || sessionError) return;
    if (!isAuthenticated) router.replace("/login");
    else if (!hasAllowedRole) {
      clearAuth();
      router.replace("/login");
    }
  }, [
    clearAuth,
    hasAllowedRole,
    isAuthenticated,
    isHydrated,
    isSessionLoading,
    router,
    sessionError,
  ]);

  if (sessionError) {
    return (
      <PageError
        message={sessionError.message}
        isRetrying={isSessionRetrying}
        reset={retrySession}
      />
    );
  }

  if (!isHydrated || isSessionLoading || !isAuthenticated || !hasAllowedRole) {
    return <PageLoading fullPage />;
  }
  return <>{children}</>;
}
