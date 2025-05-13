// // schemas/employeeSchema.ts
// import * as yup from "yup";

// export const addUserSchema = yup.object({
//   name: yup.string().required("Name is required"),
//   empID: yup.string().required("Employee ID is required"),
//   phone: yup
//     .string()
//     .required("Phone number is required")
//     .matches(/^[0-9]{10}$/, "Enter a valid 10-digit phone number"),
//   email: yup
//     .string()
//     .required("Email is required")
//     .email("Enter a valid email address"),
//   position: yup.string().required("Position is required"),
//   department: yup.string().required("Department is required"),
//   //   permission: yup.string().required("Permission is required"),
// });

// // 👇 Infer TypeScript type directly from the schema
// export type AddUserFormData = yup.InferType<typeof addUserSchema>;

import * as yup from "yup";

export const addUserSchema = yup.object({
  name: yup.string().notRequired(),
  email: yup.string().required("Email ID is Required"),
  phone: yup.string().notRequired(),
  empID: yup.string().notRequired(),
  role: yup.string().notRequired(),
  position: yup.string().notRequired(),
  department: yup.string().notRequired(),
  // permission: yup.string().notRequired(),
});

export type AddUserFormData = yup.InferType<typeof addUserSchema>;
