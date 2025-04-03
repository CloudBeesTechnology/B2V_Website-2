import { z } from "zod";

export const leaveSchema = z
  .object({
    leaveType: z.string().nonempty("Leave type is required."),
    startDate: z.string().nonempty("Start date is required."),
    endDate: z.string().nonempty("End date is required."),
    leaveReason: z.string().min(3, "Reason must be at least 3 characters."),
  })
  .refine((data) => data.startDate <= data.endDate, {
    message: "End date must be after start date.",
    path: ["endDate"],
  });

export type LeaveFormData = z.infer<typeof leaveSchema>;