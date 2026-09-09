import { EditUserScreen } from "@saas/admin/users/feature";

export default function EditUserPage({ params }: { params: { id: string } }) {
  return <EditUserScreen userId={params.id} />;
}
