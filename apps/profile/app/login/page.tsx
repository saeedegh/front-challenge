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
    if (r.success) router.push("/profile");
    else setError(r.error || "Login failed");
  }
  return (
    <Box
      sx={{ minHeight: "100vh", display: "grid", placeItems: "center", p: 2 }}
    >
      <Card sx={{ maxWidth: 420, width: "100%" }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Sign in
          </Typography>
          {error && <Alert severity="error">{error}</Alert>}
          <Box component="form" onSubmit={submit}>
            <TextField
              name="email"
              label="Email"
              defaultValue="user@saas.io"
              fullWidth
              margin="normal"
            />
            <TextField
              name="password"
              label="Password"
              type="password"
              defaultValue="user123"
              fullWidth
              margin="normal"
            />
            <Button type="submit" variant="contained" fullWidth>
              Sign in
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
