import {
  LeaveFormData,
  leaveSchema,
} from "@/app/services/validations/empPortalValidation/applyLeaveValitaion";
import { db } from "@/lib/firebaseConfig";
import { zodResolver } from "@hookform/resolvers/zod";
import { doc, setDoc } from "firebase/firestore";
import { useForm } from "react-hook-form";

const EmpApplyLeaveTable = () => {
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
    const createdAt = new Date().toISOString();
    const start = new Date(data.startDate);
    const end = new Date(data.endDate);
  
    if (end < start) {
      alert("End Date cannot be before Start Date");
      return;
    }
  
    const isSameDate =
      start.getFullYear() === end.getFullYear() &&
      start.getMonth() === end.getMonth() &&
      start.getDate() === end.getDate();
  
    let takenDay = 0;
  
    if (isSameDate) {
      // Same day leave
      takenDay = isHalfDay ? 0.5 : 1;
    } else {
      const timeDiff = end.getTime() - start.getTime();
      const days = Math.floor(timeDiff / (1000 * 3600 * 24)) + 1;
      takenDay = isHalfDay ? days + 0.5 : days;
    }
  
    const halfDayValue = isHalfDay ? "0.5" : "0";
  
          await setDoc(doc(db, "leaveStatus", createdAt), {

      endDate: data.endDate,
      leaveReason: data.leaveReason,
      leaveType: data.leaveType,
      startDate: data.startDate,
      leaveStatus: "Pending",
      empID: empID,
      halfDay: halfDayValue,
      remarks:"",
      takenDay: takenDay.toString(),
      createdAt: createdAt,  
  })
      .then((res) => {
        console.log(res, "res");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
  
  
  return (
    <section className="mt-10">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3 className="text-gray text-xl font-bold py-5">Apply Leave</h3>
        <div className="bg-white border-[#D7D5D5] rounded-md ">
        <div className="space-y-4 grid grid-cols-3 gap-10 justify-center items-center px-20 my-5">
  {/* Leave Type */}
  <div className="flex flex-col">
    <label className="text_size_5 text-gray mb-1">Leave Type</label>
    <select
      {...register("leaveType")}
      className="rounded-md px-2 py-2 border border-lite_gray shadow-md text_size_5 outline-none"
    >
      <option value="">Select Leave</option>
      <option value="casual">Casual Leave</option>
      <option value="sick">Sick Leave</option>
      <option value="maternity">Maternity Leave</option>
      <option value="other">Other</option>
    </select>
    {errors.leaveType && (
      <p className="text-dark_red text-sm py-1">{errors.leaveType.message}</p>
    )}
  </div>

  {/* Start Date */}
  <div className="flex flex-col">
    <label className="text_size_5 text-gray mb-1">Start Date</label>
    <input
      type="date"
      {...register("startDate")}
      className="border border-lite_gray rounded-md px-2 py-2 shadow-md text_size_5 outline-none"
    />
    {errors.startDate && (
      <p className="text-dark_red text-sm py-1">{errors.startDate.message}</p>
    )}
  </div>

  {/* End Date */}
  <div className="flex flex-col">
    <label className="text_size_5 text-gray mb-1">End Date</label>
    <input
      type="date"
      {...register("endDate")}
      className="border border-lite_gray rounded-md px-2 py-2 shadow-md text_size_5 outline-none"
    />
    {errors.endDate && (
      <p className="text-dark_red text-sm py-1">{errors.endDate.message}</p>
    )}
  </div>

  {/* Leave Reason */}
  <div className="flex flex-col ">
    <label className="text_size_5 text-gray mb-1">Leave Reason</label>
    <input
      type="text"
      {...register("leaveReason")}
      placeholder="Reason"
      className="border border-lite_gray rounded-md px-2 py-2 shadow-md text_size_5 outline-none"
    />
    {errors.leaveReason && (
      <p className="text-medium_red text-sm py-1">
        {errors.leaveReason.message}
      </p>
    )}
  </div>

  {/* Half Day Checkbox */}
  <div className="flex flex-col gap-1 mb-3">
  <label className="text-gray text_size_5">Half Day</label>

    <input
      type="checkbox"
      {...register("halfDay")}
      className="accent-blue-600 w-6 h-6"
    />
  </div>
</div>
<div className="center pt-4">
    <button
      type="submit"
      className="rounded-xl border-2 px-4 py-2 border-[#1C40AE] text-[#1C40AE] cursor-pointer"
    >
      Submit
    </button>
  </div>
        </div>
      </form>
    </section>
  );
};

export default EmpApplyLeaveTable;

