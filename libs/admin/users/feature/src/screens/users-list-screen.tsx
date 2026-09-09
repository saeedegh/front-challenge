"use client";

import Link from "next/link";
import AddIcon from "@mui/icons-material/Add";
import { Box, Button, Typography } from "@mui/material";
import { PageError, PageLoading } from "@saas/ui";
import { DeleteUserDialog } from "../components/delete-user-dialog";
import { UsersTable } from "../components/users-table";
import { useUsersListController } from "../hooks/use-users-list-controller";

export function UsersListScreen() {
  const {
    users,
    error,
    isLoading,
    retry,
    pendingDelete,
    isDeleting,
    editUser,
    requestDelete,
    cancelDelete,
    confirmDelete,
  } = useUsersListController();

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h4">کاربران</Typography>
        <Button component={Link} href="/users/new" variant="contained" startIcon={<AddIcon />}>
          ساخت کاربر جدید
        </Button>
      </Box>

      {isLoading && <PageLoading />}
      {error && <PageError message={error.message} reset={() => void retry()} />}
      {users && <UsersTable users={users} onEdit={editUser} onDelete={requestDelete} />}

      <DeleteUserDialog
        user={pendingDelete}
        isDeleting={isDeleting}
        onCancel={cancelDelete}
        onConfirm={confirmDelete}
      />
    </>
  );
}
