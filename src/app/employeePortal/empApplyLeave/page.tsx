"use client";
import EmpApplyLeaveTable from "./empApplyLeaveTable";
import EmpLeaveCounts from "./empLeaveCounts";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LeaveFormData, leaveSchema } from "@/app/services/validations/empPortalValidation/applyLeaveValitaion";


const EmpApplyLeave: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LeaveFormData>({
    resolver: zodResolver(leaveSchema),
  });

  const onSubmit = (data: LeaveFormData) => {
    console.log("✅ Submitted Data:", data);
  };

  return (
    <main>
      <header className="center  py-14 px-6">
        <h2 className="text-2xl font-medium text-[#303030]">Apply Leave</h2>
      </header>
      <EmpLeaveCounts />
      <EmpApplyLeaveTable
        register={register}
        handleSubmit={handleSubmit}
        errors={errors}
        onSubmit={onSubmit}
      />
    </main>
  );
};
export default EmpApplyLeave;
