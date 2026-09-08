"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Alert, Box, Button, Card, CardContent, TextField, Typography } from "@mui/material";
import { useAuth } from "./use-auth";

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
  const { login, isLoading } = useAuth();
  const router = useRouter();
  const [error, setError] = useState("");
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const data = new FormData(event.currentTarget);
    const result = await login({
      email: String(data.get("email")),
      password: String(data.get("password")),
    });
    if (result.success) router.replace(successPath);
    else setError(result.error || "ورود ناموفق بود");
  }
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
