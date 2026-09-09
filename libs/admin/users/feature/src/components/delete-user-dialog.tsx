import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import type { User } from "@saas/users/domain";

interface DeleteUserDialogProps {
  user: User | null;
  isDeleting: boolean;
  onCancel: () => void;
  onConfirm: () => Promise<void>;
}

export function DeleteUserDialog({ user, isDeleting, onCancel, onConfirm }: DeleteUserDialogProps) {
  return (
    <Dialog open={Boolean(user)} onClose={onCancel}>
      <DialogTitle>حذف کاربر</DialogTitle>
      <DialogContent>آیا از حذف «{user?.name}» مطمئن هستید؟</DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>انصراف</Button>
        <Button color="error" variant="contained" disabled={isDeleting} onClick={onConfirm}>
          حذف
        </Button>
      </DialogActions>
    </Dialog>
  );
}
