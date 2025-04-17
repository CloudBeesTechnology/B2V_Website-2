import * as Yup from "yup";

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

  export const educationSchema = Yup.object().shape({
    degree: Yup.string().required("Bachelor’s degree is required"),
    study: Yup.string().required("Field of study is required"),
    school: Yup.string().required("School is required"),
    master: Yup.string().required("Master’s degree is required"),
    field: Yup.string().required("Field of study is required"),
    highSchool: Yup.string().required("High school is required"),
    courses: Yup
      .array()
      .of(
        Yup.object().shape({
          course: Yup.string().required("Course certificate is required"),
          academic: Yup.string().required("Academic name is required"),
        })
      )
      .min(1, "At least one course is required"),
  });

  export const familySchema = Yup.object().shape({
    father: Yup.string().required("Father's name is required"),
    mother: Yup.string().required("Mother's name is required"),
    siblings: Yup.string().required("Siblings info is required"),
    fatherOcc: Yup.string().required("Father's occupation is required"),
    motherocc: Yup.string().required("Mother's occupation is required"),
    contactNO: Yup
      .string()
      .matches(/^[0-9]{10}$/, "Contact number must be 10 digits")
      .required("Contact number is required"),
    address: Yup.string().required("Address is required"),
  });

  export const experienceSchema = Yup.object().shape({
    experiences: Yup.array().of(
      Yup.object().shape({
        year: Yup.string().required("Year of experience is required"),
        company: Yup.string().required("Company name is required"),
        work: Yup.string().required("Work type is required"),
        manager: Yup.string().required("Manager name is required"),
        dept: Yup.string().required("Department is required"),
        location: Yup.string().required("Location is required"),
      })
    ),
  });