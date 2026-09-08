"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
} from "@mui/material";
import { useAuth } from "@saas/auth";
export default function Login() {
  const { login } = useAuth();
  const router = useRouter();
  const [error, setError] = useState("");
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const r = await login({
      email: String(d.get("email")),
      password: String(d.get("password")),
    });
    if (r.success) router.push("/dashboard");
    else setError(r.error || "ورود ناموفق بود");
  }
  return (
    <Box
      sx={{ minHeight: "100vh", display: "grid", placeItems: "center", p: 2 }}
    >
      <Card sx={{ maxWidth: 420, width: "100%" }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            ورود به پنل مدیریت
          </Typography>
          {error && <Alert severity="error">{error}</Alert>}
          <Box component="form" onSubmit={submit}>
            <TextField
              name="email"
              label="ایمیل"
              defaultValue="admin@saas.io"
              fullWidth
              margin="normal"
            />
            <TextField
              name="password"
              label="رمز عبور"
              type="password"
              defaultValue="admin123"
              fullWidth
              margin="normal"
            />
            <Button type="submit" variant="contained" fullWidth>
              ورود
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
