"use client";

import { Card, CardContent, Typography } from "@mui/material";
import { UserForm } from "../components/user-form";
import { useCreateUserController } from "../hooks/use-create-user-controller";

export function CreateUserScreen() {
  const { submit, cancel, isSubmitting } = useCreateUserController();

  return (
    <>
      <Typography variant="h4" gutterBottom>
        ساخت کاربر جدید
      </Typography>
      <Card sx={{ maxWidth: 680 }}>
        <CardContent>
          <UserForm
            submitLabel="ساخت کاربر"
            isSubmitting={isSubmitting}
            onSubmit={submit}
            onCancel={cancel}
          />
        </CardContent>
      </Card>
    </>
  );
}
