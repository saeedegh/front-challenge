import * as yup from "yup";

export const userFormSchema = yup.object({
  name: yup.string().trim().min(2, "نام باید حداقل ۲ حرف باشد").required("نام الزامی است"),
  email: yup.string().trim().email("یک ایمیل معتبر وارد کنید").required("ایمیل الزامی است"),
  department: yup.string().trim().required("واحد سازمانی الزامی است"),
  role: yup.string().oneOf(["admin", "user"]).required("نقش الزامی است"),
});
