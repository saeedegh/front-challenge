import { httpClient } from "@saas/shared/http-client";
import type { DashboardSummary } from "@saas/users/domain";

export const dashboardApi = {
  getSummary(signal?: AbortSignal) {
    return httpClient.get<DashboardSummary>("/api/admin/dashboard-summary", { signal });
  },
};
