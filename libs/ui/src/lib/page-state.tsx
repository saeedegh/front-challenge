"use client";

import { Alert, Box, Button, CircularProgress } from "@mui/material";

export function PageLoading() {
  return (
    <Box sx={{ display: "grid", placeItems: "center", minHeight: 240 }}>
      <CircularProgress />
    </Box>
  );
}

interface PageErrorProps {
  reset: () => void;
  message?: string;
}

export function PageError({ reset, message = "نمایش این صفحه با خطا مواجه شد." }: PageErrorProps) {
  return (
    <Alert
      severity="error"
      action={
        <Button color="inherit" onClick={reset}>
          تلاش دوباره
        </Button>
      }
    >
      {message}
    </Alert>
  );
}
