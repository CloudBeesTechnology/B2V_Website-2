import { z } from "zod";

export const internshipSchema = z.object({
  firstName: z.string().min(1, "First Name is required"),
  lastName: z.string().min(1, "Last Name is required"),
  dateOfBirth: z.string().min(1, "Date of Birth is required"),
  email: z.string().email("Invalid email"),
  contact: z.string().min(10, "Contact number must be at least 10 digits"),
  category: z.string().min(1, "Category is required"),
  gender: z.string().min(1, "Gender is required"),
  courseContent: z.string().min(1, "Course Content is required"),
  doj: z.string().min(1, "Date of Joining is required"),
  durationStart: z.string().min(1, "Duration Start is required"),
  durationEnd: z.string().min(1, "Duration End is required"),
  mentor: z.string().min(1, "Mentor name is required"),
});

// Define TypeScript type based on schema
export type InternshipFormData = z.infer<typeof internshipSchema>;
