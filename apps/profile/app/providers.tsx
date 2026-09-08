'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { theme } from '@saas/ui';
import { AuthProvider } from '@saas/auth';
export function Providers({ children }: { children: React.ReactNode }) {
  const [qc] = useState(() => new QueryClient());
  const [mockReady, setMockReady] = useState(false);

  useEffect(() => {
    let active = true;

    import('@saas/api-client').then(({ worker }) =>
      worker.start({ onUnhandledRequest: 'bypass' }).then(() => {
        if (active) setMockReady(true);
      }),
    );

    return () => {
      active = false;
    };
  }, []);

  if (!mockReady) return null;

  return <ThemeProvider theme={theme}><CssBaseline/><QueryClientProvider client={qc}><AuthProvider>{children}</AuthProvider></QueryClientProvider></ThemeProvider>;
}
