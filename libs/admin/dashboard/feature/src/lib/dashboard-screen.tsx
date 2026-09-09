"use client";

import PeopleIcon from "@mui/icons-material/People";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { Card, CardContent, Grid, Typography } from "@mui/material";
import { useDashboardSummary } from "@saas/admin/dashboard/data-access";
import { PageError, PageLoading } from "@saas/ui";

export function DashboardScreen() {
  const { data, isLoading, isFetching, error, refetch } = useDashboardSummary();

  if (isLoading) return <PageLoading />;
  if (error) {
    return <PageError message={error.message} isRetrying={isFetching} reset={() => refetch()} />;
  }

  return (
    <>
      <Typography variant="h4" gutterBottom>
        داشبورد
      </Typography>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Card>
            <CardContent>
              <PeopleIcon color="primary" fontSize="large" />
              <Typography color="text.secondary">تعداد کل کاربران</Typography>
              <Typography variant="h3">{data?.totalUsers ?? 0}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Card>
            <CardContent>
              <AdminPanelSettingsIcon color="primary" fontSize="large" />
              <Typography color="text.secondary">مدیران</Typography>
              <Typography variant="h3">{data?.adminUsers ?? 0}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
