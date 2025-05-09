"use client";

import {
  PermissionFormSchema,
  permissionSchema,
} from "@/app/services/validations/empPortalValidation/applyLeaveValitaion";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";
import { SuccessPopUp } from "@/components/SuccessPopUp";
import { useState } from "react";

const EmpPermissionPage: React.FC = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [fromTimeRange, setFromTimeRange] = useState("");
  const [toTimeRange, setToTimeRange] = useState("");
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<PermissionFormSchema>({
    resolver: zodResolver(permissionSchema),
  });
  const handleTimeChange = (time: string, period: string, type: string) => {
 

    if (!time) {
      alert("Please enter a valid time in HH:MM format.");
      return (window.location.href = "/empApplyLeave?tab=permission");
    }

    const combinedTime = `${time}${period}`;
    if (type === "fromTime") {
      setValue("fromTime", time);
      setFromTimeRange(combinedTime);
    } else if (type === "toTime") {
      setValue("toTime", time);
      setToTimeRange(combinedTime);
    }
  };

  const createEmpPermission = async (data: any) => {
    try {
      const docRef = await addDoc(collection(db, "applyPermission"), {
        ...data,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const onSubmit = async (data: PermissionFormSchema) => {
    const empID = localStorage.getItem("empID");
    if (data) {
      const FromtimeValue = parseTime(fromTimeRange);
      const TotimeValue = parseTime(toTimeRange);
      const totalHoursValue = calculateTimeDifference(
        FromtimeValue,
        TotimeValue
      );
      let finalData = {
        empID: empID,
        date: data?.date,
        fromTime: fromTimeRange,
        toTime: toTimeRange,
        reason: data?.reason,
        status: "Pending",
        totalHours: totalHoursValue,
        createdAt: new Date().toISOString(),
      };
      // console.log("finalData : ", finalData);
      await createEmpPermission(finalData);
      setShowPopup(true);
    }
  };

  const parseTime = (time: string): Date => {
    const [timePart, period] = [time.slice(0, -2), time.slice(-2)];
    const [hours, minutes] = timePart.split(":").map(Number);
    const date = new Date();
    date.setHours(
      period === "PM" && hours !== 12
        ? hours + 12
        : period === "AM" && hours === 12
        ? 0
        : hours
    );
    date.setMinutes(minutes || 0);
    date.setSeconds(0);
    return date;
  };
  const calculateTimeDifference = (start: Date, end: Date): string => {
    let diff = end.getTime() - start.getTime();

    // Handle overnight cases
    if (diff < 0) diff += 24 * 60 * 60 * 1000;

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    // Format the result
    const formattedHours = hours > 0 ? `${hours}hr ` : "";
    const formattedMinutes = minutes > 0 ? `${minutes}min` : "";

    return formattedHours + formattedMinutes || "0min";
  };
  return (
    <section className="mt-7">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-white border-[#D7D5D5] rounded-md py-5">
          <div className=" space-y-4 grid grid-cols-3 gap-10 justify-center items-center px-20 my-5 py-3">
            {/* Date */}

            <div className="flex flex-col">
              <label className="text_size_5 text-gray mb-1">Date</label>
              <input
                type="date"
                {...register("date")}
                className="border border-lite_gray rounded-md p-2 shadow-md text_size_5 outline-none"
              />
              {errors.date && (
                <p className="text-dark_red text-sm py-1">
                  {errors.date.message}
                </p>
              )}
            </div>

            {/* Hours */}
            <div className="flex flex-col">
              <label className="text_size_5 text-gray mb-1">From</label>
              <div className="flex gap-2 border-lite_gray border shadow-md rounded-md">
                <input
                  type="text"
                  {...register("fromTime")}
                  placeholder="HH:MM"
                  className="p-2 text_size_5 outline-none w-full"
                  onChange={(e) =>
                    handleTimeChange(e.target.value, "AM", "fromTime")
                  }
                />
                <select
                  // {...register("fromPeriod")}
                  className="p-2 text_size_5 outline-none"
                  onChange={(e) =>
                    handleTimeChange(
                      fromTimeRange.replace(/[AP]M$/, ""),
                      e.target.value,
                      "fromTime"
                    )
                  }
                >
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                </select>
              </div>
              {errors.fromTime && (
                <p className="text-dark_red text-sm py-1">
                  {errors.fromTime.message}
                </p>
              )}
            </div>

            <div className="flex flex-col ">
              <label className="text_size_5 text-gray mb-1">To</label>
              <div className="flex gap-2 border border-lite_gray rounded-md shadow-md">
                <input
                  type="text"
                  {...register("toTime")}
                  placeholder="HH:MM"
                  className=" p-2  text_size_5 outline-none w-full"
                  onChange={(e) =>
                    handleTimeChange(e.target.value, "AM", "toTime")
                  }
                />
                <select
                  // {...register("toPeriod")}
                  className=" p-2 text_size_5 outline-none"
                  onChange={(e) =>
                    handleTimeChange(
                      toTimeRange.replace(/[AP]M$/, ""),
                      e.target.value,
                      "toTime"
                    )
                  }
                >
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                </select>
              </div>
              {errors.toTime && (
                <p className="text-dark_red text-sm py-1">
                  {errors.toTime.message}
                </p>
              )}
            </div>

            {/* Reason */}
            <div className="flex flex-col mb-auto">
              <label className="text_size_5 text-gray mb-1">Reason</label>
              <input
                {...register("reason")}
                placeholder="Reason"
                className="border border-lite_gray rounded-md p-2 shadow-md text_size_5 outline-none"
              />
              {errors.reason && (
                <p className="text-dark_red text-sm py-1">
                  {errors.reason.message}
                </p>
              )}
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
      {showPopup && <SuccessPopUp path="/empApplyLeave?tab=permission" />}
    </section>
  );
};
export default EmpPermissionPage;
