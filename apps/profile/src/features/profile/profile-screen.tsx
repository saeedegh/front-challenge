"use client";

import { Alert, Card, CardContent, Stack, Typography } from "@mui/material";
import { useAuth } from "@saas/auth";
import { PageError, PageLoading } from "@saas/ui";
import { useUser } from "@saas/users/data-access";

export function ProfileScreen() {
  const { user: authenticatedUser } = useAuth();
  const userQuery = useUser(authenticatedUser?.id ?? "");

  if (userQuery.isLoading) return <PageLoading />;
  if (userQuery.error) {
    return (
      <PageError
        message={userQuery.error.message}
        isRetrying={userQuery.isFetching}
        reset={() => userQuery.refetch()}
      />
    );
  }
  if (!userQuery.data) {
    return <Alert severity="error">اطلاعات کاربر در دسترس نیست</Alert>;
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
