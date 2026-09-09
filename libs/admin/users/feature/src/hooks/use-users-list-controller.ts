"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { dashboardKeys } from "@saas/admin/dashboard/data-access";
import { useDeleteUser, useUsers } from "@saas/users/data-access";
import type { User } from "@saas/users/domain";

export function useUsersListController() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const usersQuery = useUsers();
  const deleteMutation = useDeleteUser();
  const [pendingDelete, setPendingDelete] = useState<User | null>(null);

  function editUser(userId: string) {
    router.push(`/users/${userId}/edit`);
  }

  async function confirmDelete() {
    if (!pendingDelete) return;

    const toastId = toast.loading("در حال حذف کاربر…");

    try {
      await deleteMutation.mutateAsync(pendingDelete.id);
      await queryClient.invalidateQueries({ queryKey: dashboardKeys.all });
      toast.success("کاربر با موفقیت حذف شد", { id: toastId });
      setPendingDelete(null);
    } catch (error) {
      toast.error((error as Error).message, { id: toastId });
    }
  }

  return {
    users: usersQuery.data,
    error: usersQuery.error,
    isLoading: usersQuery.isLoading,
    retry: usersQuery.refetch,
    pendingDelete,
    isDeleting: deleteMutation.isPending,
    editUser,
    requestDelete: setPendingDelete,
    cancelDelete: () => setPendingDelete(null),
    confirmDelete,
  };
}
