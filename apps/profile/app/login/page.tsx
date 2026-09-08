import { LoginScreen } from "@saas/auth";

export default function LoginPage() {
  return (
    <LoginScreen
      title="ورود به حساب کاربری"
      successPath="/profile"
      defaultEmail="user@saas.io"
      defaultPassword="user123"
    />
  );
}
