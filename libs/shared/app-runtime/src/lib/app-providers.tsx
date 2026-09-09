"use client";

import { useEffect, useState } from "react";
import { Alert, CssBaseline, ThemeProvider } from "@mui/material";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@saas/auth";
import { PageLoading, RtlProvider, theme } from "@saas/ui";
import { createAppQueryClient } from "./query-client";

interface AppProvidersProps {
  children: React.ReactNode;
  enableMocks?: boolean;
}

export function AppProviders({ children, enableMocks = false }: AppProvidersProps) {
  const [queryClient] = useState(createAppQueryClient);
  const [mockState, setMockState] = useState<"loading" | "ready" | "failed">(
    enableMocks ? "loading" : "ready",
  );

  useEffect(() => {
    if (!enableMocks) return;
    let active = true;
    import("@saas/shared/mock-api")
      .then(({ startMockWorker }) => startMockWorker())
      .then(() => active && setMockState("ready"))
      .catch(() => active && setMockState("failed"));
    return () => {
      active = false;
    };
  }, [enableMocks]);

  return (
    <RtlProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Toaster position="top-left" />
        {mockState === "failed" ? (
          <Alert severity="error">راه‌اندازی سرویس آزمایشی با خطا مواجه شد.</Alert>
        ) : mockState === "loading" ? (
          <PageLoading fullPage />
        ) : (
          <QueryClientProvider client={queryClient}>
            <AuthProvider>{children}</AuthProvider>
          </QueryClientProvider>
        )}
      </ThemeProvider>
    </RtlProvider>
  );
}
