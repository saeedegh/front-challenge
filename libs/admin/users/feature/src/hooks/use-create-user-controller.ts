"use client";

import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { dashboardKeys } from "@saas/admin/dashboard/data-access";
import { useCreateUser } from "@saas/users/data-access";
import type { UserInput } from "@saas/users/domain";

export function useCreateUserController() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const mutation = useCreateUser();

  async function submit(values: UserInput) {
    const toastId = toast.loading("در حال ساخت کاربر…");

    try {
      await mutation.mutateAsync(values);
      await queryClient.invalidateQueries({ queryKey: dashboardKeys.all });
      toast.success("کاربر با موفقیت ساخته شد", { id: toastId });
      router.push("/users");
    } catch (error) {
      toast.error((error as Error).message, { id: toastId });
    }
  }

  return {
    submit,
    cancel: () => router.push("/users"),
    isSubmitting: mutation.isPending,
  };
}
