import { LoginScreen } from "@saas/auth";

export default function LoginPage() {
  return (
    <LoginScreen
      title="ورود به پنل مدیریت"
      successPath="/dashboard"
      defaultEmail="admin@saas.io"
      defaultPassword="admin123"
    />
  );
}
