"use client";

import Link from "next/link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";
import { Alert, Box, Button } from "@mui/material";
import { PageError, PageLoading } from "@saas/ui";
import { useUser } from "@saas/users/data-access";
import { UserDetailsCard } from "../components/user-details-card";

export function UserDetailScreen({ userId }: { userId: string }) {
  const { data: user, isLoading, error, refetch } = useUser(userId);

  if (isLoading) return <PageLoading />;
  if (error) return <PageError message={error.message} reset={() => void refetch()} />;
  if (!user) return <Alert severity="error">اطلاعات کاربر در دسترس نیست</Alert>;

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Button component={Link} href="/users" startIcon={<ArrowBackIcon />}>
          بازگشت به کاربران
        </Button>
        <Button
          component={Link}
          href={`/users/${user.id}/edit`}
          variant="contained"
          startIcon={<EditIcon />}
        >
          ویرایش کاربر
        </Button>
      </Box>
      <UserDetailsCard user={user} />
    </>
  );
}
