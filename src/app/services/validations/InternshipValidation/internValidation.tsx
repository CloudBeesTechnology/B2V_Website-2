import { z } from "zod";

export const internshipSchema = z.object({
  firstName: z.string().min(1, "First Name is required"),
  lastName: z.string().min(1, "Last Name is required"),
  dateOfBirth: z.string().min(1, "Date of Birth is required"),
  email: z.string().email("Invalid email"),
  contact: z.string().min(5, "Contact number must be at 5 digits above"),
  category: z.string().min(1, "Category is required"),
  gender: z.string().min(1, "Gender is required"),
  courseContent: z.string().min(1, "Course Content is required"),
  doj: z.string().min(1, "Date of Joining is required"),
  durationStart: z.string().min(1, "Duration Start is required"),
  durationEnd: z.string().min(1, "Duration End is required"),
  mentor: z.string().min(1, "Mentor name is required"),
  intID: z.string().optional(), // Now it's optional
});

// Define TypeScript type based on schema
export type InternshipFormData = z.infer<typeof internshipSchema>;
