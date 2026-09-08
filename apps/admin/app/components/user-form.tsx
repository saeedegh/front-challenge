"use client";

import { useFormik } from "formik";
import * as yup from "yup";
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
import type { UserInput } from "@saas/api-client";

const validationSchema = yup.object({
  name: yup.string().trim().min(2, "Enter at least 2 characters").required("Name is required"),
  email: yup.string().trim().email("Enter a valid email").required("Email is required"),
  department: yup.string().trim().required("Department is required"),
  role: yup.string().oneOf(["admin", "user"]).required("Role is required"),
});

const emptyValues: UserInput = {
  name: "",
  email: "",
  department: "",
  role: "user",
};

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
    validationSchema,
    onSubmit,
  });

  return (
    <Box component="form" onSubmit={formik.handleSubmit} noValidate>
      <TextField
        fullWidth
        margin="normal"
        name="name"
        label="Name"
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
        label="Email"
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
        label="Department"
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
        <InputLabel id="role-label">Role</InputLabel>
        <Select
          labelId="role-label"
          name="role"
          label="Role"
          value={formik.values.role}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        >
          <MenuItem value="user">User</MenuItem>
          <MenuItem value="admin">Admin</MenuItem>
        </Select>
        {formik.touched.role && formik.errors.role && (
          <FormHelperText>{formik.errors.role}</FormHelperText>
        )}
      </FormControl>
      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1, mt: 3 }}>
        <Button onClick={onCancel} disabled={isSubmitting}>Cancel</Button>
        <Button type="submit" variant="contained" disabled={isSubmitting}>
          {isSubmitting ? "Saving…" : submitLabel}
        </Button>
      </Box>
    </Box>
  );
}
