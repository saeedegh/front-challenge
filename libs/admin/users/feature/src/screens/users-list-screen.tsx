"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import toast from "react-hot-toast";
import { useDeleteUser, useUsers } from "@saas/users/data-access";
import type { User } from "@saas/users/domain";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { dashboardKeys } from "@saas/admin/dashboard/data-access";

export function UsersListScreen() {
  const router = useRouter();
  const usersQuery = useUsers();
  const deleteMutation = useDeleteUser();
  const queryClient = useQueryClient();
  const [pendingDelete, setPendingDelete] = useState<User | null>(null);

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

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h4">کاربران</Typography>
        <Button component={Link} href="/users/new" variant="contained" startIcon={<AddIcon />}>
          ساخت کاربر جدید
        </Button>
      </Box>
      {usersQuery.isLoading && <CircularProgress />}
      {usersQuery.error && <Alert severity="error">{usersQuery.error.message}</Alert>}
      {usersQuery.data && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>نام</TableCell>
                <TableCell>ایمیل</TableCell>
                <TableCell>واحد سازمانی</TableCell>
                <TableCell>نقش</TableCell>
                <TableCell align="left">عملیات</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {usersQuery.data.map((user) => (
                <TableRow
                  key={user.id}
                  hover
                  tabIndex={0}
                  sx={{ cursor: "pointer" }}
                  onClick={() => router.push(`/users/${user.id}/edit`)}
                  onKeyDown={(event) =>
                    event.key === "Enter" && router.push(`/users/${user.id}/edit`)
                  }
                >
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.department || "—"}</TableCell>
                  <TableCell>
                    <Chip
                      size="small"
                      label={user.role === "admin" ? "مدیر" : "کاربر"}
                      color={user.role === "admin" ? "primary" : "default"}
                    />
                  </TableCell>
                  <TableCell align="left" onClick={(event) => event.stopPropagation()}>
                    <Tooltip title="مشاهده کاربر">
                      <IconButton
                        component={Link}
                        href={`/users/${user.id}`}
                        aria-label={`مشاهده ${user.name}`}
                      >
                        <VisibilityIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="ویرایش کاربر">
                      <IconButton
                        component={Link}
                        href={`/users/${user.id}/edit`}
                        aria-label={`ویرایش ${user.name}`}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="حذف کاربر">
                      <IconButton
                        color="error"
                        onClick={() => setPendingDelete(user)}
                        aria-label={`حذف ${user.name}`}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
              {usersQuery.data.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    کاربری پیدا نشد
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <Dialog open={Boolean(pendingDelete)} onClose={() => setPendingDelete(null)}>
        <DialogTitle>حذف کاربر</DialogTitle>
        <DialogContent>آیا از حذف «{pendingDelete?.name}» مطمئن هستید؟</DialogContent>
        <DialogActions>
          <Button onClick={() => setPendingDelete(null)}>انصراف</Button>
          <Button
            color="error"
            variant="contained"
            disabled={deleteMutation.isPending}
            onClick={confirmDelete}
          >
            حذف
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
