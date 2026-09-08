"use client";

import Link from "next/link";
import EditIcon from "@mui/icons-material/Edit";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { usersApi } from "@saas/api-client";

export default function UserDetailPage({ params }: { params: { id: string } }) {
  const { data: user, isLoading, error } = useQuery({
    queryKey: ["users", params.id],
    queryFn: () => usersApi.getById(params.id),
  });

  if (isLoading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error.message}</Alert>;
  if (!user) return null;

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Button component={Link} href="/users" startIcon={<ArrowBackIcon />}>Back to users</Button>
        <Button component={Link} href={`/users/${user.id}/edit`} variant="contained" startIcon={<EditIcon />}>Edit user</Button>
      </Box>
      <Card sx={{ maxWidth: 720 }}>
        <CardContent>
          <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
            <Typography variant="h4">{user.name}</Typography>
            <Chip label={user.role} color={user.role === "admin" ? "primary" : "default"} />
          </Stack>
          <Divider sx={{ my: 3 }} />
          <Stack spacing={2}>
            <Box><Typography color="text.secondary" variant="body2">Email</Typography><Typography>{user.email}</Typography></Box>
            <Box><Typography color="text.secondary" variant="body2">Department</Typography><Typography>{user.department || "—"}</Typography></Box>
            <Box><Typography color="text.secondary" variant="body2">Created at</Typography><Typography>{new Date(user.createdAt).toLocaleString()}</Typography></Box>
          </Stack>
        </CardContent>
      </Card>
    </>
  );
}
