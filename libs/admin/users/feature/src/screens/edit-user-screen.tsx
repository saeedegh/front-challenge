"use client";

import { useRouter } from "next/navigation";
import { Alert, Card, CardContent, CircularProgress, Typography } from "@mui/material";
import toast from "react-hot-toast";
import { useUpdateUser, useUser } from "@saas/users/data-access";
import type { UserInput } from "@saas/users/domain";
import { UserForm } from "../components/user-form";

export function EditUserScreen({ userId }: { userId: string }) {
  const router = useRouter();
  const userQuery = useUser(userId);
  const mutation = useUpdateUser(userId);
  async function submit(values: UserInput) {
    const id = toast.loading("در حال ویرایش کاربر…");
    try {
      await mutation.mutateAsync(values);
      toast.success("اطلاعات کاربر با موفقیت ویرایش شد", { id });
      router.push(`/users/${userId}`);
    } catch (error) {
      toast.error((error as Error).message, { id });
    }
  }
  if (userQuery.isLoading) return <CircularProgress />;
  if (userQuery.error) return <Alert severity="error">{userQuery.error.message}</Alert>;
  if (!userQuery.data) return null;
  const user = userQuery.data;
  return (
    <>
      <Typography variant="h4" gutterBottom>
        ویرایش کاربر
      </Typography>
      <Card sx={{ maxWidth: 680 }}>
        <CardContent>
          <UserForm
            initialValues={{
              name: user.name,
              email: user.email,
              department: user.department ?? "",
              role: user.role,
            }}
            submitLabel="ذخیره تغییرات"
            isSubmitting={mutation.isPending}
            onSubmit={submit}
            onCancel={() => router.push(`/users/${userId}`)}
          />
        </CardContent>
      </Card>
    </>
  );
}
