import type { Metadata } from "next";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "SaaS Admin",
  description: "SaaS Admin portal",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
