"use client";

import { useQuery } from "@tanstack/react-query";
import { dashboardApi } from "./dashboard.api";
import { dashboardKeys } from "./dashboard.keys";

export function useDashboardSummary() {
  return useQuery({
    queryKey: dashboardKeys.summary(),
    queryFn: ({ signal }) => dashboardApi.getSummary(signal),
  });
}
