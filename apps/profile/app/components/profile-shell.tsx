"use client";

import { useRouter } from "next/navigation";
import PersonIcon from "@mui/icons-material/Person";
import { useAuth } from "@saas/auth";
import { AppLayout, type AppNavigationItem } from "@saas/ui";

const navigationItems: AppNavigationItem[] = [
  { href: "/profile", label: "پروفایل من", icon: <PersonIcon /> },
];

export function ProfileShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { logout } = useAuth();

  async function handleLogout() {
    await logout();
    router.replace("/login");
  }

  return (
    <AppLayout
      title="حساب کاربری"
      navigationTitle="منوی کاربری"
      navigationItems={navigationItems}
      onLogout={handleLogout}
    >
      {children}
    </AppLayout>
  );
}
