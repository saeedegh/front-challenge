"use client";

import { Alert, Box, Button, CircularProgress } from "@mui/material";

export function PageLoading() {
  return (
    <Box sx={{ display: "grid", placeItems: "center", minHeight: 240 }}>
      <CircularProgress />
    </Box>
  );
}

export function PageError({ reset }: { reset: () => void }) {
  return (
    <Alert
      severity="error"
      action={
        <Button color="inherit" onClick={reset}>
          تلاش دوباره
        </Button>
      }
    >
      نمایش این صفحه با خطا مواجه شد.
    </Alert>
  );
}
