"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useLogoutMutation } from "./auth.mutations";

export function useLogout() {
  const router = useRouter();
  const logoutMutation = useLogoutMutation();
  const lockRef = useRef(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  async function logout() {
    if (lockRef.current) return;

    lockRef.current = true;
    setIsLoggingOut(true);

    try {
      await logoutMutation.mutateAsync();
    } finally {
      router.replace("/login");
    }
  }

  return { logout, isLoggingOut: isLoggingOut || logoutMutation.isPending };
}
