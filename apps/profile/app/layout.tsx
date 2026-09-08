import type { Metadata } from "next";
import { AppProviders } from "@saas/shared/app-runtime";
export const metadata: Metadata = {
  title: "پروفایل SaaS",
  description: "پروفایل کاربری سامانه SaaS",
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl">
      <body style={{ margin: 0 }}>
        <AppProviders
          enableMocks={
            process.env.NODE_ENV === "development" ||
            process.env.NEXT_PUBLIC_ENABLE_MOCKS === "true"
          }
        >
          {children}
        </AppProviders>
      </body>
    </html>
  );
}
