"use client";

import { useRouter } from "next/navigation";
import { Card, CardContent, Typography } from "@mui/material";
import toast from "react-hot-toast";
import { useCreateUser } from "@saas/users/data-access";
import type { UserInput } from "@saas/users/domain";
import { UserForm } from "../components/user-form";
import { useQueryClient } from "@tanstack/react-query";
import { dashboardKeys } from "@saas/admin/dashboard/data-access";

export function CreateUserScreen() {
  const router = useRouter();
  const mutation = useCreateUser();
  const queryClient = useQueryClient();
  async function submit(values: UserInput) {
    const id = toast.loading("در حال ساخت کاربر…");
    try {
      await mutation.mutateAsync(values);
      await queryClient.invalidateQueries({ queryKey: dashboardKeys.all });
      toast.success("کاربر با موفقیت ساخته شد", { id });
      router.push("/users");
    } catch (error) {
      toast.error((error as Error).message, { id });
    }
  }
  return (
    <>
      <Typography variant="h4" gutterBottom>
        ساخت کاربر جدید
      </Typography>
      <Card sx={{ maxWidth: 680 }}>
        <CardContent>
          <UserForm
            submitLabel="ساخت کاربر"
            isSubmitting={mutation.isPending}
            onSubmit={submit}
            onCancel={() => router.push("/users")}
          />
        </CardContent>
      </Card>
    </>
  );
}
