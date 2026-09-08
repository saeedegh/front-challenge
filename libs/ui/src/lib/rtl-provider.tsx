"use client";

import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import rtlPlugin from "@mui/stylis-plugin-rtl";
import { prefixer } from "stylis";

const rtlCache = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

export function RtlProvider({ children }: { children: React.ReactNode }) {
  return <CacheProvider value={rtlCache}>{children}</CacheProvider>;
}
