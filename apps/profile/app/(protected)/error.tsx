"use client";

import { PageError } from "@saas/ui";

export default function ErrorPage({ reset }: { error: Error; reset: () => void }) {
  return <PageError reset={reset} />;
}
