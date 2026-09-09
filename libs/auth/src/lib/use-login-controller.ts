"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./use-auth";

export function useLoginController(successPath: string) {
  const { login, isLoading } = useAuth();
  const router = useRouter();
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const data = new FormData(event.currentTarget);
    const result = await login({
      email: String(data.get("email")),
      password: String(data.get("password")),
    });

    if (result.success) {
      router.replace(successPath);
      return;
    }

    setError(result.error || "ورود ناموفق بود");
  }

  return { error, isLoading, submit };
}
