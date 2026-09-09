import { Box, Card, CardContent, Chip, Divider, Stack, Typography } from "@mui/material";
import type { User } from "@saas/users/domain";

export function UserDetailsCard({ user }: { user: User }) {
  return (
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
  );
}
