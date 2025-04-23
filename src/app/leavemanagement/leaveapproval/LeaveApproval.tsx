"use client";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { useRouter } from "next/navigation";
import { IoArrowBack } from "react-icons/io5";
import LeaveTable from "../leaveTable";

const LeaveApproval: React.FC = () => {
  const router = useRouter();
  return (
    <main>
      <div className="flex justify-start items-center text-[22px] text-gray gap-10 my-10">
        <IoArrowBack onClick={() => router.back()} className="cursor-pointer" />
        <h3>Leave Management</h3>
      </div>
      <div className="py-7 bg-white rounded-xl px-10 space-y-7">
        <section className="flex justify-between items-center ">
          <h1 className="text-xl font-semibold text-gray">Leave Approval</h1>
          <div className="center gap-5 py-3 px-4 bg-primary text-white rounded-xl text-lg font-bold ">
            <p>Export</p>
            <IoIosArrowDropdownCircle />
          </div>
        </section>
        <LeaveTable />
      </div>
    </main>
  );
};
export default LeaveApproval;
