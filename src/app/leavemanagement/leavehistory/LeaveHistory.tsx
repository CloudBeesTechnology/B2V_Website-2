"use client";
import Searchbox from "@/app/utils/searchbox";
import { useRouter } from "next/navigation";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { IoArrowBack } from "react-icons/io5";
import LeaveTable from "../leaveTable";

const LeaveHistory: React.FC = () => {
  const router = useRouter();
  return (
    <main>
      <div className="flex justify-start items-center text-[22px] text-gray gap-10 my-10">
        <IoArrowBack onClick={() => router.back()} className="cursor-pointer" />
        <h3>Leave History</h3>
      </div>

      <section className="flex justify-between items-center my-10">
        <div className="flex justify-start items-center gap-7">
          <div className="flex gap-5">
            <div className="flex flex-col">
              <label className="text-[#7E7D7D] mb-1">Start Date</label>
              <input
                type="date"
                className="border border-[#9D9393]   text-gray rounded px-3 py-2"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-[#7E7D7D] mb-1">End Date</label>
              <input
                type="date"
                className="border border-[#9D9393] text-gray rounded px-3 py-2"
              />
            </div>
          </div>
        </div>
        <div className="mt-auto">
          {/* <Searchbox /> */}
        </div>
      </section>
      <section className="py-7 bg-white rounded-xl px-10 space-y-7 my-10">
        <div className="flex justify-start items-center ">
          <h1 className="text-xl font-semibold text-gray">Leave History</h1>
        </div>

        <LeaveTable />
      </section>
    </main>
  );
};
export default LeaveHistory;
