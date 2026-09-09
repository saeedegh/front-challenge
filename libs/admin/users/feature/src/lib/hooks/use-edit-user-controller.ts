"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { dashboardKeys } from "@saas/admin/dashboard/data-access";
import { useUpdateUser, useUser } from "@saas/users/data-access";
import type { UserInput } from "@saas/users/domain";

export function useEditUserController(userId: string) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const userQuery = useUser(userId);
  const mutation = useUpdateUser(userId);
  const lockRef = useRef(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function submit(values: UserInput) {
    if (lockRef.current) return;

    lockRef.current = true;
    setIsSubmitting(true);
    const toastId = toast.loading("در حال ویرایش کاربر…");

    try {
      await mutation.mutateAsync(values);
      await queryClient.invalidateQueries({ queryKey: dashboardKeys.all });
      toast.success("اطلاعات کاربر با موفقیت ویرایش شد", { id: toastId });
      router.push(`/users/${userId}`);
    } catch (error) {
      toast.error((error as Error).message, { id: toastId });
      lockRef.current = false;
      setIsSubmitting(false);
    }
  }

  const initialValues: UserInput | undefined = userQuery.data
    ? {
        name: userQuery.data.name,
        email: userQuery.data.email,
        department: userQuery.data.department ?? "",
        role: userQuery.data.role,
      }
    : undefined;

  return {
    initialValues,
    error: userQuery.error,
    isLoading: userQuery.isLoading,
    isRetrying: userQuery.isFetching,
    retry: userQuery.refetch,
    isSubmitting: isSubmitting || mutation.isPending,
    submit,
    cancel: () => router.push(`/users/${userId}`),
  };
}
