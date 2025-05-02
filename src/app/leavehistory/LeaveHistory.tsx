"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import Link from "next/link";
import { TableFormate } from "@/components/TableFormate";
import { IoArrowBack } from "react-icons/io5";
import { useRouter } from "next/navigation";

type LeaveStatus = {
  empID: string;
  leaveStatus: string;
  leaveType: string;
  duration: string;
  startDate: string;
  endDate: string;
  createdDate: string;
  remarks?: string;
  reason?:string
};

type EnrichedLeaveStatus = LeaveStatus & {
  name: string;
  docId: string;
};

const LeaveHistory = () => {
  const router = useRouter();
  const [leaveApproval, setLeaveApproval] = useState<EnrichedLeaveStatus[]>([]);
  const [filterStatus, setFilterStatus] = useState<"Approved" | "Rejected">(
    "Approved"
  );
  const [loading, setLoading] = useState(true);
  const Heading = [
    "EmpID",
    "Name(s)",
    "Type",
    "Start Date",
    "End Date",
    "Duration(s)",
    "Reason(s)",
    ...(filterStatus === "Rejected" ? ["Remarks"] : []),
    "Actions",
  ];

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        setLoading(true);
        const leaveSnapshot = await getDocs(collection(db, "leaveStatus"));
        const leaveList: EnrichedLeaveStatus[] = leaveSnapshot.docs.map(
          (doc) => ({
            docId: doc.id,
            empID: doc.data().empID,
            leaveStatus: doc.data().leaveStatus,
            leaveType: doc.data().leaveType,
            duration: doc.data().takenDay,
            startDate: doc.data().startDate,
            endDate: doc.data().endDate,
            reason: doc.data().leaveReason,
            createdDate: doc.data().createdDate,
            remarks: doc.data().remarks || "",
            name: "",
          })
        );
        

        const employeeSnapshot = await getDocs(
          collection(db, "employeeDetails")
        );
        const employeeDetails = employeeSnapshot.docs.map((doc) => ({
          empID: doc.id,
          ...(doc.data() as { name: string }),
        }));

        const empMap = new Map<string, string>();
        employeeDetails.forEach((emp) => {
          empMap.set(emp.empID, emp.name);
        });

        const enrichedList = leaveList.map((leave) => ({
          ...leave,
          name: empMap.get(leave.empID) || "Unknown",
        }));

        setLeaveApproval(enrichedList);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const filteredData = leaveApproval.filter(
    (item) => item.leaveStatus === filterStatus
  );
  if (loading)
    return (
      <div className="text-center text-gray-500 my-20 text-lg">Loading...</div>
    );

  return (
    <section>
      <div className="flex justify-start items-center text-[22px] text-gray gap-10 my-10">
        <IoArrowBack onClick={() => router.back()} className="cursor-pointer" />
        <h3>Leave History</h3>
      </div>
      <section className="flex justify-between items-center my-10">
        <div className="flex justify-start  items-center gap-7">
          <div className="flex gap-5 ">
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
        <div className="mt-auto">{/* <Searchbox /> */}</div>
      </section>
      <section className="py-7 bg-white rounded-xl px-10 space-y-7 my-10  overflow-x-auto">
        {/* <LeaveTable /> */}
        <div className="flex gap-4 mb-4 text-gray">
          <button
            onClick={() => setFilterStatus("Approved")}
            className={`px-4 py-2 rounded ${
              filterStatus === "Approved" && "bg-lite_blue "
            }`}
          >
            Approved List
          </button>
          <button
            onClick={() => setFilterStatus("Rejected")}
            className={`px-4 py-2 rounded ${
              filterStatus === "Rejected" && "bg-lite_blue "
            }`}
          >
            Rejected List
          </button>
        </div>
        <div className="my-10">
          {filteredData && filteredData?.length > 0 ? (
            <TableFormate
              heading={Heading}
              list="LeaveApproval"
              leaveApproval={filteredData}
              filterStatus={filterStatus}
            />
          ) : (
            <p className="text-center py-4 text-gray-400">Data not found</p>
          )}
        </div>
      </section>
    </section>
  );
};

export default LeaveHistory;
