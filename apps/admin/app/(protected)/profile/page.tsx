"use client";

import { Box, Typography, Button } from "@mui/material";
import { useAuth } from "@saas/auth";
import { UserDetail } from "@saas/user-feature";

export default function Profile() {
  const { user, logout } = useAuth();

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4">My Profile</Typography>
      {user && <UserDetail userId={user.id} />}
      <Button onClick={logout}>Logout</Button>
    </Box>
  );
}
