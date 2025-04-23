"use client";

import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
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
  docId: string; // Firestore document ID
};

const LeaveApproval = () => {
  const Heading = [
    "EmpID",
    "Name",
    "Duration",
    "Start Date",
    "End Date",
    "Leave Type",
    // "Created Date",
    "Status",
  ];

  const [leaveApproval, setLeaveApproval] = useState<EnrichedLeaveStatus[]>([]);

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

        const enrichedList = leaveList .filter((leave) => leave.leaveStatus === "Pending").map((leave) => ({
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

  const handleStatusChange = async (docId: string, newStatus: string) => {
    try {
      const leaveDocRef = doc(db, "leaveStatus", docId);
      await updateDoc(leaveDocRef, { leaveStatus: newStatus });

      setLeaveApproval((prev) =>
        prev.map((leave) =>
          leave.docId === docId ? { ...leave, leaveStatus: newStatus } : leave
        )
      );
    } catch (err) {
      console.error("Failed to update leave status:", err);
    }
  };

  return (
    <section>
      <h4 className="text-primary pb-2 px-2 mt-3 mb-7 text_size_2 flex items-center gap-10">
        <Link href="/leavemanagement" className="text-mediumlite_grey">
          <MdOutlineKeyboardBackspace />
        </Link>
        Leave Approval List
      </h4>

      <div className="bg-white px-10 py-5 rounded-lg overflow-x-auto">
        <table className="min-w-full border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              {Heading.map((title, idx) => (
                <th key={idx} className="px-4 py-2  text-left">
                  {title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {leaveApproval.map((item, index) => (
              <tr key={index} className="">
                <td className="px-4 py-2 ">{item.empID}</td>
                <td className="px-4 py-2 ">{item.name}</td>
                <td className="px-4 py-2 ">{item.duration}</td>
                <td className="px-4 py-2 ">{item.startDate}</td>
                <td className="px-4 py-2 ">{item.endDate}</td>
                <td className="px-4 py-2 ">{item.leaveType}</td>
                {/* <td className="px-4 py-2 ">{item.createdDate}</td> */}
                <td className="px-4 py-2 ">
                  <select
                    value={item.leaveStatus}
                    onChange={(e) => handleStatusChange(item.docId, e.target.value)}
                    className="border border-gray-300 rounded px-2 py-1"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default LeaveApproval;
