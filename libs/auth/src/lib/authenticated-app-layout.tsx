"use client";

import { AppLayout, type AppNavigationItem } from "@saas/ui";
import { useLogout } from "./use-logout";

interface AuthenticatedAppLayoutProps {
  title: string;
  navigationTitle: string;
  navigationItems: AppNavigationItem[];
  children: React.ReactNode;
}

export function AuthenticatedAppLayout(props: AuthenticatedAppLayoutProps) {
  const { logout, isLoggingOut } = useLogout();
  return <AppLayout {...props} onLogout={logout} isLoggingOut={isLoggingOut} />;
}
