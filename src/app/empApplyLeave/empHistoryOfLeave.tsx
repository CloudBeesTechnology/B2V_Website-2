"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";
import { TableFormate } from "@/components/TableFormate";

const EmpHistoryOfLeave = () => {
  const Heading = ["EmpID", "Duration", "Start Date", "End Date", "leaveType", "Status"];
  const [empLeave, setEmpLeave] = useState<Array<any>>([]);

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const empID = localStorage.getItem("empID"); // Example: "CBT0002"
        if (!empID) return;

        const querySnapshot = await getDocs(collection(db, "leaveStatus"));

        const leaveList = querySnapshot.docs
          .map((doc) => doc.data())
          .filter((item) => item.empID === empID); // Only that person's data

        setEmpLeave(leaveList);
      } catch (error) {
        console.error("Error fetching leave data:", error);
      }
    };

    fetchLeaves();
  }, []);

  return (
    <section>
      <div className="flex justify-between items-center  mt-10 mb-5">
        <h4 className="pb-2 px-2 w-48 mb-7 mt-5 text_size_2">
          History of Leave
        </h4>
        <div className="flex justify-center items-center gap-12 ">
          <div>
            <label htmlFor="start-date" className="block text-[16px] font-medium ">
              Start Date
            </label>
            <input
              id="start-date"
              type="date"
              className="outline-none text-gray border rounded-md p-1"
            />
          </div>
          <div>
            <label htmlFor="end-date" className="block text-[16px] font-medium ">
              End Date
            </label>
            <input
              id="end-date"
              type="date"
              className="outline-none text-gray border rounded-md p-1 "
            />
          </div>
        </div>
      </div>
      <div className="bg-white  py-5 rounded-lg">
        <TableFormate
          heading={Heading}
          list="empLeave"
          empLeave={empLeave}
          ovla={[]}
          allEmp={[]}
          leaveApproval={[]}
        />
      </div>
    </section>
  );
};

export default EmpHistoryOfLeave;