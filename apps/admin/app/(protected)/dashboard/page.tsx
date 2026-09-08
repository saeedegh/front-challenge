"use client";

import PeopleIcon from "@mui/icons-material/People";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { Alert, Card, CardContent, CircularProgress, Grid, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { usersApi } from "@saas/api-client";

export default function DashboardPage() {
  const { data: users, isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn: usersApi.getAll,
  });

  if (isLoading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error.message}</Alert>;

  const admins = users?.filter((user) => user.role === "admin").length ?? 0;

  return (
    <>
      <Typography variant="h4" gutterBottom>داشبورد</Typography>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Card>
            <CardContent>
              <PeopleIcon color="primary" fontSize="large" />
              <Typography color="text.secondary">تعداد کل کاربران</Typography>
              <Typography variant="h3">{users?.length ?? 0}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Card>
            <CardContent>
              <AdminPanelSettingsIcon color="primary" fontSize="large" />
              <Typography color="text.secondary">مدیران</Typography>
              <Typography variant="h3">{admins}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
