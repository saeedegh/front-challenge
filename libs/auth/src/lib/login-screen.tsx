"use client";

import { Alert, Box, Button, Card, CardContent, TextField, Typography } from "@mui/material";
import { useLoginController } from "./use-login-controller";

interface LoginScreenProps {
  title: string;
  successPath: string;
  defaultEmail: string;
  defaultPassword: string;
}

export function LoginScreen({
  title,
  successPath,
  defaultEmail,
  defaultPassword,
}: LoginScreenProps) {
  const { error, isLoading, submit } = useLoginController(successPath);

  return (
    <Box sx={{ minHeight: "100vh", display: "grid", placeItems: "center", p: 2 }}>
      <Card sx={{ maxWidth: 420, width: "100%" }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            {title}
          </Typography>
          {error && <Alert severity="error">{error}</Alert>}
          <Box component="form" onSubmit={submit}>
            <TextField
              name="email"
              label="ایمیل"
              defaultValue={defaultEmail}
              fullWidth
              margin="normal"
            />
            <TextField
              name="password"
              label="رمز عبور"
              type="password"
              defaultValue={defaultPassword}
              fullWidth
              margin="normal"
            />
            <Button type="submit" variant="contained" fullWidth disabled={isLoading}>
              {isLoading ? "در حال ورود…" : "ورود"}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
