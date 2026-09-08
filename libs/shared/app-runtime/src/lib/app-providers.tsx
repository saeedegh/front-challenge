"use client";

import { useEffect, useState } from "react";
import { Alert, CssBaseline, ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@saas/auth";
import { RtlProvider, theme } from "@saas/ui";

interface AppProvidersProps {
  children: React.ReactNode;
  enableMocks?: boolean;
}

export function AppProviders({ children, enableMocks = false }: AppProvidersProps) {
  const [queryClient] = useState(
    () => new QueryClient({ defaultOptions: { queries: { retry: 1, staleTime: 30_000 } } }),
  );
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
        ) : mockState === "loading" ? null : (
          <QueryClientProvider client={queryClient}>
            <AuthProvider>{children}</AuthProvider>
          </QueryClientProvider>
        )}
      </ThemeProvider>
    </RtlProvider>
  );
}
