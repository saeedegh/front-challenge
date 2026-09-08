"use client";

import PersonIcon from "@mui/icons-material/Person";
import { AppLayout, type AppNavigationItem } from "@saas/ui";

const navigationItems: AppNavigationItem[] = [
  { href: "/profile", label: "پروفایل من", icon: <PersonIcon /> },
];

export function ProfileShell({ children }: { children: React.ReactNode }) {
  return (
    <AppLayout
      title="حساب کاربری"
      navigationTitle="منوی کاربری"
      navigationItems={navigationItems}
    >
      {children}
    </AppLayout>
  );
}
