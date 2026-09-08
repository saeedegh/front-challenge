"use client";

import PersonIcon from "@mui/icons-material/Person";
import { AuthenticatedAppLayout } from "@saas/auth";
import type { AppNavigationItem } from "@saas/ui";

const navigationItems: AppNavigationItem[] = [
  { href: "/profile", label: "پروفایل من", icon: <PersonIcon /> },
];

export function ProfileShell({ children }: { children: React.ReactNode }) {
  return (
    <AuthenticatedAppLayout
      title="حساب کاربری"
      navigationTitle="منوی کاربری"
      navigationItems={navigationItems}
    >
      {children}
    </AuthenticatedAppLayout>
  );
}
