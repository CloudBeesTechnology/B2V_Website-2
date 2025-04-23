"use client";

import { useEffect, useState } from "react";
import {
  collection,
  getDocs
} from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import Link from "next/link";

type LeaveStatus = {
  empID: string;
  leaveStatus: string;
  leaveType: string;
  duration: string;
  startDate: string;
  endDate: string;
  createdDate: string;
};

type EnrichedLeaveStatus = LeaveStatus & {
  name: string;
  docId: string;
};

const LeaveHistory = () => {
  const Heading = [
    "EmpID",
    "Name",
    "Duration",
    "Start Date",
    "End Date",
    "Leave Type",
    "Status",
  ];

  const [leaveApproval, setLeaveApproval] = useState<EnrichedLeaveStatus[]>([]);
  // const [filterStatus, setFilterStatus] = useState<"All" | "Approved" | "Rejected">("All");
  const [filterStatus, setFilterStatus] = useState<"Approved" | "Rejected">("Approved");
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const leaveSnapshot = await getDocs(collection(db, "leaveStatus"));
        const leaveList: EnrichedLeaveStatus[] = leaveSnapshot.docs.map((doc) => ({
          docId: doc.id,
          empID: doc.data().empID,
          leaveStatus: doc.data().leaveStatus,
          leaveType: doc.data().leaveType,
          duration: doc.data().duration,
          startDate: doc.data().startDate,
          endDate: doc.data().endDate,
          createdDate: doc.data().createdDate,
          name: "",
        }));

        const employeeSnapshot = await getDocs(collection(db, "employeeDetails"));
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
      }
    };

    fetchEmployees();
  }, []);

  const filteredData = leaveApproval.filter((item) =>
filterStatus==="Approved"?
    item.leaveStatus === "Approved":item.leaveStatus === "Rejected" 

).map((val)=>val)

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
            filterStatus === "Approved" ? "bg-green-600 text-white" : "bg-gray-200"
          }`}
        >
          Approved List
        </button>
        <button
          onClick={() => setFilterStatus("Rejected")}
          className={`px-4 py-2 rounded ${
            filterStatus === "Rejected" ? "bg-red-600 text-white" : "bg-gray-200"
          }`}
        >
          Rejected List
        </button>
      </div>

      <div className="bg-white px-10 py-5 rounded-lg overflow-x-auto">
        <table className="min-w-full border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              {Heading.map((title, idx) => (
                <th key={idx} className="px-4 py-2 text-left">
                  {title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr key={index}>
                <td className="px-4 py-2">{item.empID}</td>
                <td className="px-4 py-2">{item.name}</td>
                <td className="px-4 py-2">{item.duration}</td>
                <td className="px-4 py-2">{item.startDate}</td>
                <td className="px-4 py-2">{item.endDate}</td>
                <td className="px-4 py-2">{item.leaveType}</td>
                <td className="px-4 py-2">{item.leaveStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default LeaveHistory;
