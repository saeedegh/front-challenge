"use client";

import { useFormik } from "formik";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import type { UserInput } from "@saas/users/domain";
import { userFormSchema } from "./user-form.schema";

const emptyValues: UserInput = { name: "", email: "", department: "", role: "user" };

interface UserFormProps {
  initialValues?: UserInput;
  isSubmitting: boolean;
  submitLabel: string;
  onSubmit: (values: UserInput) => Promise<void>;
  onCancel: () => void;
}

export function UserForm({
  initialValues = emptyValues,
  isSubmitting,
  submitLabel,
  onSubmit,
  onCancel,
}: UserFormProps) {
  const formik = useFormik<UserInput>({
    initialValues,
    enableReinitialize: true,
    validationSchema: userFormSchema,
    onSubmit,
  });
  return (
    <Box component="form" onSubmit={formik.handleSubmit} noValidate>
      <TextField
        fullWidth
        margin="normal"
        name="name"
        label="نام و نام خانوادگی"
        value={formik.values.name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.name && Boolean(formik.errors.name)}
        helperText={formik.touched.name && formik.errors.name}
      />
      <TextField
        fullWidth
        margin="normal"
        name="email"
        label="ایمیل"
        type="email"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
      />
      <TextField
        fullWidth
        margin="normal"
        name="department"
        label="واحد سازمانی"
        value={formik.values.department ?? ""}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.department && Boolean(formik.errors.department)}
        helperText={formik.touched.department && formik.errors.department}
      />
      <FormControl
        fullWidth
        margin="normal"
        error={formik.touched.role && Boolean(formik.errors.role)}
      >
        <InputLabel id="role-label">نقش</InputLabel>
        <Select
          labelId="role-label"
          name="role"
          label="نقش"
          value={formik.values.role}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        >
          <MenuItem value="user">کاربر</MenuItem>
          <MenuItem value="admin">مدیر</MenuItem>
        </Select>
        {formik.touched.role && formik.errors.role && (
          <FormHelperText>{formik.errors.role}</FormHelperText>
        )}
      </FormControl>
      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1, mt: 3 }}>
        <Button onClick={onCancel} disabled={isSubmitting}>
          انصراف
        </Button>
        <Button type="submit" variant="contained" disabled={isSubmitting}>
          {isSubmitting ? "در حال ذخیره…" : submitLabel}
        </Button>
      </Box>
    </Box>
  );
}
