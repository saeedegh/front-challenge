import Link from "next/link";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  Chip,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";
import type { User } from "@saas/users/domain";

interface UsersTableProps {
  users: User[];
  onEdit: (userId: string) => void;
  onDelete: (user: User) => void;
}

export function UsersTable({ users, onEdit, onDelete }: UsersTableProps) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>نام</TableCell>
            <TableCell>ایمیل</TableCell>
            <TableCell>واحد سازمانی</TableCell>
            <TableCell>نقش</TableCell>
            <TableCell align="left">عملیات</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow
              key={user.id}
              hover
              tabIndex={0}
              sx={{ cursor: "pointer" }}
              onClick={() => onEdit(user.id)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && event.target === event.currentTarget) {
                  onEdit(user.id);
                }
              }}
            >
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.department || "—"}</TableCell>
              <TableCell>
                <Chip
                  size="small"
                  label={user.role === "admin" ? "مدیر" : "کاربر"}
                  color={user.role === "admin" ? "primary" : "default"}
                />
              </TableCell>
              <TableCell align="left" onClick={(event) => event.stopPropagation()}>
                <Tooltip title="مشاهده کاربر">
                  <IconButton
                    component={Link}
                    href={`/users/${user.id}`}
                    aria-label={`مشاهده ${user.name}`}
                  >
                    <VisibilityIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="ویرایش کاربر">
                  <IconButton
                    component={Link}
                    href={`/users/${user.id}/edit`}
                    aria-label={`ویرایش ${user.name}`}
                  >
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="حذف کاربر">
                  <IconButton
                    color="error"
                    onClick={() => onDelete(user)}
                    aria-label={`حذف ${user.name}`}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
          {users.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} align="center">
                کاربری پیدا نشد
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
