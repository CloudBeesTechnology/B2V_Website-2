"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import Link from "next/link";
import {DateFormat} from "@/components/DateFormate"

type LeaveStatus = {
  empID: string;
  leaveStatus: string;
  leaveType: string;
  takenDay: string;
  startDate: string;
  endDate: string;
  leaveReason: string;
  createdAt: string;
};

type EnrichedLeaveStatus = LeaveStatus & {
  name: string;
  docId: string;
  remarks?: string;
};

const LeaveApproval = () => {
  const Heading = [
    "EmpID",
    "Name",
    "Leave Type",
    "Apply Date",
    "Start Date",
    "End Date",
    "takenDay",
    "Leave Reason",
    "Status",
  ];

  const [leaveApproval, setLeaveApproval] = useState<EnrichedLeaveStatus[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedDocId, setSelectedDocId] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string>("Pending");
  const [remarks, setRemarks] = useState("");

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const leaveSnapshot = await getDocs(collection(db, "leaveStatus"));
        const leaveList: EnrichedLeaveStatus[] = leaveSnapshot.docs.map(
          (doc) => ({
            docId: doc.id,
            empID: doc.data().empID,
            leaveStatus: doc.data().leaveStatus,
            leaveType: doc.data().leaveType,
            takenDay: doc.data().takenDay,
            startDate: doc.data().startDate,
            endDate: doc.data().endDate,
            leaveReason: doc.data().leaveReason,
            createdAt: doc.data().createdAt,
            name: "",
            remarks: doc.data().remarks || "",
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

        const enrichedList = leaveList
          .filter((leave) => leave.leaveStatus === "Pending")
          .map((leave) => ({
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

  const handleStatusChange = (docId: string, newStatus: string) => {
    if (newStatus === "Rejected") {
      setSelectedDocId(docId);
      setSelectedStatus(newStatus);
      setShowPopup(true);
    } else {
      updateLeaveStatus(docId, newStatus);
    }
  };

  const updateLeaveStatus = async (
    docId: string,
    status: string,
    remarksText: string = ""
  ) => {
    try {
      const leaveDocRef = doc(db, "leaveStatus", docId);
      await updateDoc(leaveDocRef, {
        leaveStatus: status,
        ...(status === "Rejected" && { remarks: remarksText }),
      });

      setLeaveApproval((prev) =>
        prev.map((leave) =>
          leave.docId === docId
            ? { ...leave, leaveStatus: status, remarks: remarksText }
            : leave
        )
      );

      setShowPopup(false);
      setRemarks("");
      setSelectedDocId(null);
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
                <th key={idx} className="px-4 py-2 text-left">
                  {title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {leaveApproval.map((item, index) => {
              let durationInDays = "-";
              if (item?.startDate && item?.endDate) {
                const startDate = new Date(item.startDate);
                const endDate = new Date(item.endDate);
                const durationInMs = endDate.getTime() - startDate.getTime();
                durationInDays = Math.ceil(
                  durationInMs / (1000 * 60 * 60 * 24)
                ).toString();
              }

              return (
                <tr key={index}>
                  <td className="px-4 py-2">{item.empID}</td>
                  <td className="px-4 py-2">{item.name}</td>
                  <td className="px-4 py-2">{item.leaveType}</td>
                  <td className="px-4 py-2">
                    {item.createdAt
                      ? new Date(item.createdAt).toLocaleDateString()
                      : "-"}
                  </td>
                  
                  <td className="px-4 py-2">{DateFormat(item.startDate)}</td>
                  <td className="px-4 py-2">{DateFormat(item.endDate)}</td>
                  <td className="px-4 py-2">{item.takenDay}</td>
                
                  <td className="px-4 py-2 w-[250px] h-[80px] overflow-y-auto text-wrap overflow-wrap-break-word flex">{item.leaveReason}</td>

                  <td className="px-4 py-2">
                    <select
                      value={item.leaveStatus}
                      onChange={(e) =>
                        handleStatusChange(item.docId, e.target.value)
                      }
                      className="border border-gray-300 rounded px-2 py-1 outline-none"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Approved">Approved</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>


      {/* POPUP Modal */}
      {showPopup && (
        <div className="fixed inset-0 bg-transparent flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-[400px] shadow-lg">
            <h3 className="text-lg font-semibold mb-4">
              Add Rejection Remarks
            </h3>
            <textarea
              className="w-full border border-gray-300 rounded p-2 outline-none"
              rows={4}
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              placeholder="Enter remarks for rejection..."
            />
            <div className="mt-4 flex justify-end gap-2">
              <button
                className="bg-gray-300 text-black px-4 py-2 rounded"
                onClick={() => {
                  setShowPopup(false);
                  setRemarks("");
                  setSelectedDocId(null);
                }}
              >
                Cancel
              </button>
              <button
                className="bg-primary text-white px-4 py-2 rounded"
                onClick={() => {
                  if (selectedDocId) {
                    updateLeaveStatus(selectedDocId, selectedStatus, remarks);
                  }
                }}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default LeaveApproval;
