import {
  LeaveFormData,
  leaveSchema,
} from "@/app/services/validations/empPortalValidation/applyLeaveValitaion";
import { db } from "@/lib/firebaseConfig";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  doc,
  setDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { useForm } from "react-hook-form";
import axios from 'axios';
import useFetchHolidayList from "../utils/customHooks/useFetchHolidayList";
import checkNonWorkingDays from "../utils/customHooks/checkNonWorkingDays";
import { useState } from "react";
import { SuccessPopUp } from "@/components/SuccessPopUp";


export type Holiday = {
  date: string;
  name?: string;
  description?: string;
  [key: string]: any;
};

const EmpApplyLeave = () => {
  const { publicHolidays } = useFetchHolidayList();
  // console.log(publicHolidays,"7986453210"); 
  const [showPopup, setShowPopup] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LeaveFormData>({
    resolver: zodResolver(leaveSchema),
  });

  const isHalfDay = watch("halfDay");

  const onSubmit = async (data: LeaveFormData) => {
    const empID = localStorage.getItem("empID");
    if (!empID) {
      alert("Employee ID not found.");
      return;
    }
    // Fetch employee details to get leadEmpID and managerEmpID
    try {
      const employeesRef = collection(db, "employeeDetails");
      const q = query(employeesRef, where("empID", "==", empID));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        alert("Employee details not found.");
        return;
      }

      const employeeData = querySnapshot.docs[0].data();
      const leadEmpID = employeeData.leadEmpID || "";
      const managerEmpID = employeeData.manager || "";

      const createdAt = new Date().toISOString();
      const start = new Date(data.startDate);
      const end = new Date(data.endDate);

      if (end < start) {
        alert("End Date cannot be before Start Date");
        return;
      }

      // Check for overlapping leave dates
      const leaveStatusRef = collection(db, "leaveStatus");
      const leaveQuery = query(leaveStatusRef, where("empID", "==", empID));
      const leaveSnapshot = await getDocs(leaveQuery);

      const isOverlap = leaveSnapshot.docs.some((doc) => {
        const leave = doc.data();
        const leaveStart = new Date(leave.startDate);
        const leaveEnd = new Date(leave.endDate);


        const leadStatus = leave.leadStatus;
        const managerStatus = leave.managerStatus;

        const hasLead = !!leadEmpID;
        const hasManager = !!managerEmpID;

        // Check if the leave is rejected
        const isRejected =
          leadStatus === "Rejected" || managerStatus === "Rejected";

        const isApprovedOrPending =
          (hasLead && (leadStatus === "Pending" || leadStatus === "Approved")) ||
          (hasManager && (managerStatus === "Pending" || managerStatus === "Approved"));

        // If the leave is rejected, ignore it
        if (isRejected) return false;

        // Check for overlap
        if (isApprovedOrPending) {
          const isOverlap =
            (start <= leaveEnd && start >= leaveStart) ||
            (end <= leaveEnd && end >= leaveStart) ||
            (start <= leaveStart && end >= leaveEnd);

          return isOverlap;
        }
      });

      if (isOverlap) {
        alert("You have already applied for leave during this period.");
        return;
      }

      const halfDayValue = isHalfDay ? "0.5" : "0";
      let takenDay = 0;

      const leaveDetails: any = {
        endDate: data.endDate,
        leaveReason: data.leaveReason,
        leaveType: data.leaveType,
        startDate: data.startDate,
        leaveStatus: "Pending",
        empID: empID,
        leadEmpID: leadEmpID,
        managerEmpID: managerEmpID,
        halfDay: halfDayValue,
        remarks: "",
        managerRemarks: "",
        leadRemarks: "",
        leadDate: "",
        managerDate: "",
        managerStatus: "Pending",
        leadStatus: "Pending",
        takenDay: takenDay,
        createdAt: createdAt,
      };

      const validLeaveDates = await checkNonWorkingDays(
        leaveDetails,
        publicHolidays as Holiday[]
      );

      if (validLeaveDates.length > 0) {
        // Use the actual filtered length for taken days
        const takenDays = validLeaveDates.length;
        leaveDetails.takenDay = isHalfDay
          ? (takenDays - 0.5).toString()
          : takenDays.toString();
      } else {
        leaveDetails.takenDay = "0";
      }

      // console.log(leaveDetails, "LeaveDetails");

      await setDoc(doc(db, "leaveStatus", createdAt), {
        ...leaveDetails,
      });

      // Send email to the manager
      const managerEmail = employeeData.managerEmail;

      const emailData = {
        empName: employeeData.name,
        leaveType: data.leaveType,
        startDate: data.startDate,
        endDate: data.endDate,
        leaveReason: data.leaveReason,
        managerEmail: managerEmail,
      };

      // Send email notification to manager
      try {
        await axios.post('/api/sendLeaveEmail', emailData);
        console.log('Leave email sent successfully');
      } catch (error) {
        console.error('Error sending leave email:', error);
      }

      setShowPopup(true);
    } catch (error) {
      console.error("Error applying for leave:", error);
      alert("There was an error submitting your leave request.");
    }
  };

  return (
    <section className="mt-7">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-white border-[#D7D5D5] rounded-md py-5">
          <div className="space-y-4 grid grid-cols-3 gap-10 justify-center items-center px-20 my-5 py-3">
            {/* Leave Type */}
            <div className="flex flex-col">
              <label className="text_size_5 text-medium_gray mb-1">
                Leave Type
              </label>
              <select
                {...register("leaveType")}
                className="rounded-md px-2 py-2 border text-mediumlite_grey border-lite_gray shadow-md text_size_5 outline-none"
              >
                <option value="">Select Leave</option>
                <option value="casual">Casual Leave</option>
                <option value="sick">Sick Leave</option>
                <option value="maternity">Maternity Leave</option>
                <option value="paternity">Paternity Leave</option>
                <option value="other">Other</option>
              </select>
              {errors.leaveType && (
                <p className="text-dark_red text-sm py-1">
                  {errors.leaveType.message}
                </p>
              )}
            </div>

            {/* Start Date */}
            <div className="flex flex-col">
              <label className="text_size_5 text-medium_gray mb-1">
                Start Date
              </label>
              <input
                type="date"
                {...register("startDate")}
                className="border border-lite_gray rounded-md px-2 py-2 shadow-md text_size_5 outline-none text-mediumlite_grey"
              />
              {errors.startDate && (
                <p className="text-dark_red text-sm py-1">
                  {errors.startDate.message}
                </p>
              )}
            </div>

            {/* End Date */}
            <div className="flex flex-col">
              <label className="text_size_5 text-medium_gray mb-1">
                End Date
              </label>
              <input
                type="date"
                {...register("endDate")}
                className="border border-lite_gray rounded-md px-2 py-2 shadow-md text_size_5 outline-none text-mediumlite_grey"
              />
              {errors.endDate && (
                <p className="text-dark_red text-sm py-1">
                  {errors.endDate.message}
                </p>
              )}
            </div>

            {/* Leave Reason */}
            <div className="flex flex-col ">
              <label className="text_size_5 text-medium_gray mb-1">
                Leave Reason
              </label>
              <input
                type="text"
                {...register("leaveReason")}
                placeholder="Reason"
                className="border border-lite_gray rounded-md px-2 py-2 shadow-md text_size_5 outline-none text-mediumlite_grey"
              />
              {errors.leaveReason && (
                <p className="text-medium_red text-sm py-1">
                  {errors.leaveReason.message}
                </p>
              )}
            </div>

            {/* Half Day Checkbox */}
            <div className="flex flex-col gap-1 mb-3">
              <label className="text-medium_gray text_size_5">Half Day</label>
              <input
                type="checkbox"
                {...register("halfDay")}
                className="accent-blue-500 w-6 h-6"
              />
            </div>
          </div>

          <div className="center pt-2 py-2">
            <button
              type="submit"
              className="rounded-xl border-2 px-4 py-2 border-[#1C40AE] text-[#1C40AE] cursor-pointer"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
      {showPopup && <SuccessPopUp path="/empApplyLeave" />}
    </section>
  );
};

export default EmpApplyLeave;
