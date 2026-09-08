"use client";

import { Card, CardContent, CircularProgress, Stack, Typography } from "@mui/material";
import { useAuth } from "@saas/auth";
import { useUser } from "@saas/users/data-access";

export function ProfileScreen() {
  const { user: authenticatedUser } = useAuth();
  const userQuery = useUser(authenticatedUser?.id ?? "");

  if (userQuery.isLoading) return <CircularProgress />;
  if (!userQuery.data) {
    return <Typography color="error">اطلاعات کاربر در دسترس نیست</Typography>;
  }

  const user = userQuery.data;

  return (
    <>
      <Typography variant="h4" gutterBottom>
        پروفایل من
      </Typography>
      <Card sx={{ maxWidth: 720 }}>
        <CardContent>
          <Stack spacing={1}>
            <Typography variant="h5">{user.name}</Typography>
            <Typography>{user.email}</Typography>
            <Typography>{user.department}</Typography>
            <Typography>{user.role === "admin" ? "مدیر" : "کاربر"}</Typography>
          </Stack>
        </CardContent>
      </Card>
    </>
  );
}
