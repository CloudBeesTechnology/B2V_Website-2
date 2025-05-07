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

const EmpPermissionTable: React.FC = () => {
  const [showPopup, setShowPopup] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PermissionFormSchema>({
    resolver: zodResolver(permissionSchema),
  });

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
      let finalData = {
        empID: empID,
        date: data?.date,
        hours: data?.hours,
        reason: data?.reason,
        status: "Pending",
        createdAt: new Date().toISOString(),
      };
      console.log("finalData : ", finalData);
      await createEmpPermission(finalData);
      alert("Form submitted successfully!");
      setShowPopup(true);
    }
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
            <div className="flex flex-col ">
              <label className="text_size_5 text-gray mb-1">Hours</label>
              <input
                type="text"
                {...register("hours")}
                placeholder="HH:MM"
                className="border border-lite_gray rounded-md p-2 shadow-md text_size_5 outline-none"
              />
              {errors.hours && (
                <p className="text-dark_red text-sm py-1">
                  {errors.hours.message}
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
      {showPopup && <SuccessPopUp path="/empApplyLeave" />}
    </section>
  );
};
export default EmpPermissionTable;
