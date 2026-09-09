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
import { useUser } from "@saas/users/data-access";

export function UserDetailScreen({ userId }: { userId: string }) {
  const { data: user, isLoading, error } = useUser(userId);
  if (isLoading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error.message}</Alert>;
  if (!user) return null;
  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Button component={Link} href="/users" startIcon={<ArrowBackIcon />}>
          بازگشت به کاربران
        </Button>
        <Button
          component={Link}
          href={`/users/${user.id}/edit`}
          variant="contained"
          startIcon={<EditIcon />}
        >
          ویرایش کاربر
        </Button>
      </Box>
      <Card sx={{ maxWidth: 720 }}>
        <CardContent>
          <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
            <Typography variant="h4">{user.name}</Typography>
            <Chip
              label={user.role === "admin" ? "مدیر" : "کاربر"}
              color={user.role === "admin" ? "primary" : "default"}
            />
          </Stack>
          <Divider sx={{ my: 3 }} />
          <Stack spacing={2}>
            <Box>
              <Typography color="text.secondary" variant="body2">
                ایمیل
              </Typography>
              <Typography>{user.email}</Typography>
            </Box>
            <Box>
              <Typography color="text.secondary" variant="body2">
                واحد سازمانی
              </Typography>
              <Typography>{user.department || "—"}</Typography>
            </Box>
            <Box>
              <Typography color="text.secondary" variant="body2">
                تاریخ ساخت
              </Typography>
              <Typography>{new Date(user.createdAt).toLocaleString("fa-IR")}</Typography>
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </>
  );
}
