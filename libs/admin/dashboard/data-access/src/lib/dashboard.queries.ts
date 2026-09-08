"use client";

import { useQuery } from "@tanstack/react-query";
import type { DashboardSummary } from "@saas/users/domain";
import { dashboardKeys } from "./dashboard.keys";

async function getDashboardSummary() {
  const response = await fetch("/api/admin/dashboard-summary");
  const body = (await response.json()) as DashboardSummary & { message?: string };
  if (!response.ok) throw new Error(body.message ?? "دریافت اطلاعات داشبورد ناموفق بود");
  return body;
}

export function useDashboardSummary() {
  return useQuery({
    queryKey: dashboardKeys.summary(),
    queryFn: getDashboardSummary,
  });
}
