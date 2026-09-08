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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { usersApi } from "@saas/api-client";
import toast from "react-hot-toast";

export default function UsersPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: users, isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn: usersApi.getAll,
  });
  const deleteMutation = useMutation({
    mutationFn: usersApi.delete,
    onMutate: () => toast.loading("Deleting user…"),
    onSuccess: async (_, __, toastId) => {
      toast.success("User deleted successfully", { id: toastId });
      await queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (mutationError, _, toastId) => {
      toast.error(mutationError.message, { id: toastId });
    },
  });

  function handleDelete(id: string, name: string) {
    if (window.confirm(`Delete ${name}?`)) deleteMutation.mutate(id);
  }

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h4">Users</Typography>
        <Button component={Link} href="/users/new" variant="contained" startIcon={<AddIcon />}>
          Create user
        </Button>
      </Box>
      {isLoading && <CircularProgress />}
      {error && <Alert severity="error">{error.message}</Alert>}
      {users && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Department</TableCell>
                <TableCell>Role</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow
                  key={user.id}
                  hover
                  tabIndex={0}
                  sx={{ cursor: "pointer" }}
                  onClick={() => router.push(`/users/${user.id}/edit`)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") router.push(`/users/${user.id}/edit`);
                  }}
                >
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.department || "—"}</TableCell>
                  <TableCell><Chip size="small" label={user.role} color={user.role === "admin" ? "primary" : "default"} /></TableCell>
                  <TableCell align="right" onClick={(event) => event.stopPropagation()}>
                    <Tooltip title="View user"><IconButton component={Link} href={`/users/${user.id}`} aria-label={`View ${user.name}`}><VisibilityIcon /></IconButton></Tooltip>
                    <Tooltip title="Edit user"><IconButton component={Link} href={`/users/${user.id}/edit`} aria-label={`Edit ${user.name}`}><EditIcon /></IconButton></Tooltip>
                    <Tooltip title="Delete user"><IconButton color="error" onClick={() => handleDelete(user.id, user.name)} disabled={deleteMutation.isPending} aria-label={`Delete ${user.name}`}><DeleteIcon /></IconButton></Tooltip>
                  </TableCell>
                </TableRow>
              ))}
              {users.length === 0 && (
                <TableRow><TableCell colSpan={5} align="center">No users found</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
}
