import { z } from "zod";

// for Applying Leave
export const leaveSchema = z
  .object({
    leaveType: z.string().nonempty("Leave type is required."),
    startDate: z.string().nonempty("Start date is required."),
    endDate: z.string().nonempty("End date is required."),
    leaveReason: z.string().min(3, "Reason must be at least 3 characters."),
    halfDay: z.boolean().optional(), // Changed to boolean for checkbox compatibility
  })
  .refine((data) => data.startDate <= data.endDate, {
    message: "End date must be after start date.",
    path: ["endDate"],
  });
export type LeaveFormData = z.infer<typeof leaveSchema>;

// for Permission
  export const permissionSchema = z.object({
    date: z.string().nonempty("Date is required."),
    fromTime: z.string().nonempty("From Time is required.")  .regex(
      /^(0?[1-9]|1[0-2]):[0-5][0-9]$/,
      "Invalid time. Time should be in the format HH:MM, without 0 or 00."
    ),
    toTime: z.string().nonempty("To Time is required.")  .regex(
      /^(0?[1-9]|1[0-2]):[0-5][0-9]$/,
      "Invalid time. Time should be in the format HH:MM, without 0 or 00."
    ),
  // hours: z
  // .string()
  // .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Hours must be in HH:MM format"),
  reason: z.string().min(3, "Reason must be at least 3 characters."),
});

export type PermissionFormSchema = z.infer<typeof permissionSchema>;
