"use client";

import { useRouter } from "next/navigation";
import { Alert, Card, CardContent, CircularProgress, Typography } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { usersApi, type UserInput } from "@saas/api-client";
import toast from "react-hot-toast";
import { UserForm } from "../../../../components/user-form";

export default function EditUserPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: user, isLoading, error } = useQuery({
    queryKey: ["users", params.id],
    queryFn: () => usersApi.getById(params.id),
  });
  const mutation = useMutation({
    mutationFn: (input: UserInput) => usersApi.update(params.id, input),
  });

  async function handleSubmit(values: UserInput) {
    const toastId = toast.loading("در حال ویرایش کاربر…");
    try {
      await mutation.mutateAsync(values);
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["users"] }),
        queryClient.invalidateQueries({ queryKey: ["users", params.id] }),
      ]);
      toast.success("اطلاعات کاربر با موفقیت ویرایش شد", { id: toastId });
      router.push(`/users/${params.id}`);
    } catch (mutationError) {
      toast.error((mutationError as Error).message, { id: toastId });
    }
  }

  if (isLoading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error.message}</Alert>;
  if (!user) return null;

  return (
    <>
      <Typography variant="h4" gutterBottom>ویرایش کاربر</Typography>
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
            onSubmit={handleSubmit}
            onCancel={() => router.push(`/users/${params.id}`)}
          />
        </CardContent>
      </Card>
    </>
  );
}
