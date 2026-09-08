"use client";

import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import { AuthenticatedAppLayout } from "@saas/auth";
import type { AppNavigationItem } from "@saas/ui";

const navigationItems: AppNavigationItem[] = [
  { href: "/dashboard", label: "داشبورد", icon: <DashboardIcon /> },
  { href: "/users", label: "کاربران", icon: <PeopleIcon /> },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <AuthenticatedAppLayout
      title="پنل مدیریت"
      navigationTitle="منوی مدیریت"
      navigationItems={navigationItems}
    >
      {children}
    </AuthenticatedAppLayout>
  );
}
