"use client";

import { useRef, useState } from "react";
import { Alert, Box, Button, CircularProgress } from "@mui/material";

export function PageLoading({ fullPage = false }: { fullPage?: boolean }) {
  return (
    <Box sx={{ display: "grid", placeItems: "center", minHeight: fullPage ? "100vh" : 240 }}>
      <CircularProgress />
    </Box>
  );
}

interface PageErrorProps {
  reset: () => void | Promise<unknown>;
  message?: string;
  isRetrying?: boolean;
}

export function PageError({
  reset,
  message = "نمایش این صفحه با خطا مواجه شد.",
  isRetrying = false,
}: PageErrorProps) {
  const [isResetting, setIsResetting] = useState(false);
  const resetLockRef = useRef(false);
  const isLoading = isRetrying || isResetting;

  async function handleRetry() {
    if (isLoading || resetLockRef.current) return;

    resetLockRef.current = true;
    setIsResetting(true);
    try {
      await reset();
    } finally {
      resetLockRef.current = false;
      setIsResetting(false);
    }
  }

  return (
    <Alert
      severity="error"
      action={
        <Button color="inherit" loading={isLoading} onClick={handleRetry}>
          {isLoading ? "در حال تلاش…" : "تلاش دوباره"}
        </Button>
      }
    >
      {message}
    </Alert>
  );
}
