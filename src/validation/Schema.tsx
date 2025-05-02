import * as Yup from "yup";
import * as z from "zod";

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
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    ),
});

// Schema for password validation
export const PasswordSchema = Yup.object().shape({
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    ),
  confirmPassword: Yup.string()
    .required("Please confirm your password")
    .oneOf([Yup.ref("password")], "Passwords must match"),
});

export const personalInfoSchema = z.object({
  name: z.string().min(1, "Name is required"),
  dob: z.string().min(1, "Date of Birth is required"),
  gender: z.string().nonempty("Gender is required"),
  nationality: z.string().min(1, "Nationality is required"),
  address: z.string().nonempty("Address is required"),
  contact: z.string().min(1, "Contact is required"),
  doj: z.string().nonempty("Date of Join is required"),
  alternateNo: z
    .string()
    .optional()
    .refine((val) => !val || val.length >= 10, {
      message: "Alternate number must be at least 10 characters if provided",
    }),
  email: z.string().email("Invalid email address"),
  lang: z.string().min(1, "Language is required"),
  religion: z.string().optional(),
  proof:z.any().optional(),
  department: z.string().optional(),
  position: z.string().optional(),
  totalLeave: z.string().optional(),
  manager: z.string().optional(),
  leadEmpID: z.string().optional(),
  profilePhoto: z.any().optional(),
});

export const educationSchema = z.object({
  degree: z.string().nonempty("It is required"),
  study: z.string().nonempty("It is required"),
  school: z.string().nonempty("It is required"),
  master: z.string().optional(),
  field: z.string().optional(),
  highSchool: z.string().optional(),
  courses: z
    .array(
      z.object({
        course: z.string().optional(),
        academic: z.string().optional(),
      })
    )
    .min(1, "At least one course is required"),
});

export const familySchema = z.object({
  father: z.string().optional(),
  mother: z.string().optional(),
  siblings: z.string().optional(),
  personalStatus: z.string().optional(),
  husbandName: z.string().optional(),
  wifeName: z.string().optional(),
  child: z.string().optional(),
  familyPNo:  z.string().optional(),
  familyAddress: z.string().optional(),
});

export const experienceSchema = z.object({
  experiences: z.array(
    z.object({
      year: z.string().optional(),
      company: z.string().optional(),
      work: z.string().optional(),
      manager: z.string().optional(),
      dept: z.string().optional(),
      location: z.string().optional(),
    })
  ),
});
