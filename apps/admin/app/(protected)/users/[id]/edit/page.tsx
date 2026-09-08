import { EditUserScreen } from "@saas/admin/users/feature-form";

export default function EditUserPage({ params }: { params: { id: string } }) {
  return <EditUserScreen userId={params.id} />;
}
