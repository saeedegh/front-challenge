import { ProtectedRoute } from "@saas/auth";
import { ProfileShell } from "../components/profile-shell";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <ProfileShell>{children}</ProfileShell>
    </ProtectedRoute>
  );
}
