"use client";

import { Box, Typography, Button } from "@mui/material";
import { useAuth } from "@saas/auth";
import { UserDetail } from "@saas/user-feature";

export default function Profile() {
  const { user, logout } = useAuth();

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4">پروفایل من</Typography>
      {user && <UserDetail userId={user.id} />}
      <Button onClick={logout}>خروج</Button>
    </Box>
  );
}
