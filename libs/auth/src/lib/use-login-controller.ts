"use client";

import { useRef, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useLoginMutation } from "./auth.mutations";

export function useLoginController(successPath: string) {
  const router = useRouter();
  const loginMutation = useLoginMutation();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const lockRef = useRef(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (lockRef.current) return;

    lockRef.current = true;
    setIsSubmitting(true);
    setError("");

    const data = new FormData(event.currentTarget);
    try {
      await loginMutation.mutateAsync({
        email: String(data.get("email")),
        password: String(data.get("password")),
      });
      router.replace(successPath);
    } catch (error) {
      setError((error as Error).message || "ورود ناموفق بود");
      lockRef.current = false;
      setIsSubmitting(false);
    }
  }

  return { error, isLoading: loginMutation.isPending || isSubmitting, submit };
}
