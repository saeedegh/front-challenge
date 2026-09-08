import { ProtectedRoute } from "@saas/auth";
import { AdminShell } from "../../src/app-shell/admin-shell";

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <AdminShell>{children}</AdminShell>
    </ProtectedRoute>
  );
}
