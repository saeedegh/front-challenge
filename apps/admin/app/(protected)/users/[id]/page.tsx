import { UserDetailScreen } from "@saas/admin/users/feature";

export default function UserDetailPage({ params }: { params: { id: string } }) {
  return <UserDetailScreen userId={params.id} />;
}
