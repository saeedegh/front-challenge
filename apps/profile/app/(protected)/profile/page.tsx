"use client";

import { Box, Typography } from "@mui/material";
import { useAuth } from "@saas/auth";
import { UserDetail } from "@saas/user-feature";

export default function Profile() {
  const { user } = useAuth();

  return (
    <Box>
      <Typography variant="h4">پروفایل من</Typography>
      {user && <UserDetail userId={user.id} />}
    </Box>
  );
}
