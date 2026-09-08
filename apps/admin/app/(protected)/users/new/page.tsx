"use client";

import { useRouter } from "next/navigation";
import { Card, CardContent, Typography } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usersApi, type UserInput } from "@saas/api-client";
import toast from "react-hot-toast";
import { UserForm } from "../../../components/user-form";

export default function CreateUserPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const mutation = useMutation({ mutationFn: usersApi.create });

  async function handleSubmit(values: UserInput) {
    const toastId = toast.loading("Creating user…");
    try {
      await mutation.mutateAsync(values);
      await queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("User created successfully", { id: toastId });
      router.push("/users");
    } catch (error) {
      toast.error((error as Error).message, { id: toastId });
    }
  }

  return (
    <>
      <Typography variant="h4" gutterBottom>Create user</Typography>
      <Card sx={{ maxWidth: 680 }}>
        <CardContent>
          <UserForm
            submitLabel="Create user"
            isSubmitting={mutation.isPending}
            onSubmit={handleSubmit}
            onCancel={() => router.push("/users")}
          />
        </CardContent>
      </Card>
    </>
  );
}
