"use client";

import { Alert, Card, CardContent, Typography } from "@mui/material";
import { PageError, PageLoading } from "@saas/ui";
import { UserForm } from "../components/user-form";
import { useEditUserController } from "../hooks/use-edit-user-controller";

export function EditUserScreen({ userId }: { userId: string }) {
  const { initialValues, error, isLoading, isRetrying, retry, isSubmitting, submit, cancel } =
    useEditUserController(userId);

  if (isLoading) return <PageLoading />;
  if (error) {
    return <PageError message={error.message} isRetrying={isRetrying} reset={() => retry()} />;
  }
  if (!initialValues) return <Alert severity="error">اطلاعات کاربر در دسترس نیست</Alert>;

  return (
    <>
      <Typography variant="h4" gutterBottom>
        ویرایش کاربر
      </Typography>
      <Card sx={{ maxWidth: 680 }}>
        <CardContent>
          <UserForm
            initialValues={initialValues}
            submitLabel="ذخیره تغییرات"
            isSubmitting={isSubmitting}
            onSubmit={submit}
            onCancel={cancel}
          />
        </CardContent>
      </Card>
    </>
  );
}
