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
    <Dialog
      open={Boolean(user)}
      onClose={() => {
        if (!isDeleting) onCancel();
      }}
      aria-busy={isDeleting}
    >
      <DialogTitle>حذف کاربر</DialogTitle>
      <DialogContent>آیا از حذف «{user?.name}» مطمئن هستید؟</DialogContent>
      <DialogActions>
        <Button onClick={onCancel} disabled={isDeleting}>
          انصراف
        </Button>
        <Button color="error" variant="contained" loading={isDeleting} onClick={onConfirm}>
          {isDeleting ? "در حال حذف…" : "حذف"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
