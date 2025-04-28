"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import Link from "next/link";
import { TableFormate } from "@/components/TableFormate";

type LeaveStatus = {
  empID: string;
  leaveStatus: string;
  leaveType: string;
  duration: string;
  startDate: string;
  endDate: string;
  createdDate: string;
  remarks?: string;
};

type EnrichedLeaveStatus = LeaveStatus & {
  name: string;
  docId: string;
};

const LeaveHistory = () => {
  const [leaveApproval, setLeaveApproval] = useState<EnrichedLeaveStatus[]>([]);
  const [filterStatus, setFilterStatus] = useState<"Approved" | "Rejected">(
    "Approved"
  );
  const [loading, setLoading] = useState(true);
  const Heading = [
    "EmpID",
    "Name",
    "Duration",
    "Start Date",
    "End Date",
    "Leave Type",
    "Status",
    ...(filterStatus === "Rejected" ? ["Remarks"] : []),
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
            duration: doc.data().duration,
            startDate: doc.data().startDate,
            endDate: doc.data().endDate,
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
  if (loading) return <div className="text-center text-gray-500 my-20 text-lg">Loading...</div>;

  return (
    <section>
      <h4 className="text-primary pb-2 px-2 mt-3 mb-7 text_size_2 flex items-center gap-10">
        <Link href="/leavemanagement" className="text-mediumlite_grey">
          <MdOutlineKeyboardBackspace />
        </Link>
        Leave History
      </h4>

      <div className="flex gap-4 mb-4 px-10">
        <button
          onClick={() => setFilterStatus("Approved")}
          className={`px-4 py-2 rounded ${
            filterStatus === "Approved"
              ? "bg-green-600 text-white"
              : "bg-gray-200"
          }`}
        >
          Approved List
        </button>
        <button
          onClick={() => setFilterStatus("Rejected")}
          className={`px-4 py-2 rounded ${
            filterStatus === "Rejected"
              ? "bg-red-600 text-white"
              : "bg-gray-200"
          }`}
        >
          Rejected List
        </button>
      </div>

      <div className="bg-white px-10 py-5 rounded-lg overflow-x-auto">
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
  );
};

export default LeaveHistory;
