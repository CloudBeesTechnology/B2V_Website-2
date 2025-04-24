import * as Yup from "yup";
import * as z from 'zod';

export const SignInSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export const signUpSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    role: Yup.string().required("Role is required"),
    number: Yup.string()
    .required("Phone Number is required")
    .matches(/^\d{10}$/, "Phone Number must be exactly 10 digits"),
      password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character"),
  });

  // Schema for password validation
  export const PasswordSchema = Yup.object().shape({
    password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character"),
    confirmPassword: Yup.string()
      .required("Please confirm your password")
      .oneOf([Yup.ref("password")], "Passwords must match"),
  });


  export const personalInfoSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    contact: z.string().min(1, 'Contact is required'),
    alternateNo: z
    .string()
    .optional()
    .refine((val) => !val || val.length >= 10, {
      message: "Alternate number must be at least 10 characters if provided",
    }),
      email: z.string().email('Invalid email address'),
    department: z.string().min(1, 'Department is required'),
    position: z.string().min(1, 'Position is required'),
    proof: z.string().min(1, 'Proof is required'),
    profilePhoto: z.any().optional(),
    totalLeave:z.string(),
    manager:z.string()
  });

  export const educationSchema = z.object({
    degree: z.string().nonempty("Bachelor’s degree is required"),
    study: z.string().nonempty("Field of study is required"),
    school: z.string().nonempty("School is required"),
    master: z.string().nonempty("Master’s degree is required"),
    field: z.string().nonempty("Field of study is required"),
    highSchool: z.string().nonempty("High school is required"),
    courses: z
      .array(
        z.object({
          course: z.string().nonempty("Course certificate is required"),
          academic: z.string().nonempty("Academic name is required"),
        })
      )
      .min(1, "At least one course is required"),
  });


  export const familySchema = Yup.object().shape({
    father: Yup.string().required("Father's name is required"),
    mother: Yup.string().required("Mother's name is required"),
    siblings: Yup.string().required("Siblings info is required"),
    fatherOcc: Yup.string().required("Father's occupation is required"),
    motherOcc: Yup.string().required("Mother's occupation is required"),
    familyPNo: Yup
      .string()
      .matches(/^[0-9]{10}$/, "Contact number must be 10 digits")
      .required("Contact number is required"),
    address: Yup.string().required("Address is required"),
  });


  export const experienceSchema = z.object({
    experiences: z.array(
      z.object({
        year: z.string().nonempty("Year of experience is required"),
        company: z.string().nonempty("Company name is required"),
        work: z.string().nonempty("Work type is required"),
        manager: z.string().nonempty("Manager name is required"),
        dept: z.string().nonempty("Department is required"),
        location: z.string().nonempty("Location is required"),
      })
    ),
  });
  