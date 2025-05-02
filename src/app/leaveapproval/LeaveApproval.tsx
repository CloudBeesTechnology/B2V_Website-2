"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { DateFormat } from "@/components/DateFormate";
import { useRouter } from "next/navigation";
import { IoArrowBack } from "react-icons/io5";
import clsx from "clsx";

type LeaveStatus = {
  empID: string;
  leaveStatus: string;
  leaveType: string;
  takenDay: string;
  startDate: string;
  endDate: string;
  leaveReason: string;
  leadEmpID: string;
  managerEmpID: string;
  createdAt: string;
};

type EnrichedLeaveStatus = LeaveStatus & {
  name: string;
  docId: string;
  remarks?: string;
};

const LeaveApproval = () => {
  const [leaveApproval, setLeaveApproval] = useState<EnrichedLeaveStatus[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedDocId, setSelectedDocId] = useState<string | null>(null);
  const [userRoleAccess, setUserRoleAccess] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string>("Pending");
  const [remarks, setRemarks] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userRole = localStorage?.getItem("userRole")?.toUpperCase() || null;
    const userEmpID = localStorage?.getItem("empID")?.toUpperCase() || null;
    setUserRoleAccess(userRole);
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
            takenDay: doc.data().takenDay,
            startDate: doc.data().startDate,
            endDate: doc.data().endDate,
            leaveReason: doc.data().leaveReason,
            leadEmpID: doc.data().leadEmpID,
            managerEmpID: doc.data().managerEmpID,
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
          .filter(
            (leave) =>
              (leave.leaveStatus === "Pending" &&
                userEmpID === leave.leadEmpID) ||
              userEmpID === leave.managerEmpID
          )
          .map((leave) => ({
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
  const Heading = [
    "EmpID",
    "Name(s)",
    "Type",
    "Applied",
    "Start Date",
    "End Date",
    "Duration(s)",
    userRoleAccess === "LEAD"
      ? "Lead Name"
      : userRoleAccess === "Manager" && "Manager Name",
    "Reason(s)",
    "Actions",
  ];

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
  if (loading)
    return (
      <div className="text-center text-gray-500 my-20 text-lg">Loading...</div>
    );
  return (
    <section>
      <div className="flex justify-start items-center text-[22px] text-gray gap-10 my-10">
        <IoArrowBack onClick={() => router.back()} className="cursor-pointer" />
        <h3>Leave Management</h3>
      </div>

      <div className="py-7 bg-white rounded-xl px-10 space-y-7">
        <section className="flex justify-between items-center ">
          <h1 className="text-xl font-semibold text-gray">Leave List</h1>
          {/* <div className="center gap-5 py-3 px-4 bg-primary text-white rounded-xl text-lg font-bold ">
            <p>Export</p>
            <IoIosArrowDropdownCircle />
          </div> */}
        </section>
        {leaveApproval && leaveApproval.length > 0 ? (
          <table className="min-w-full border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                {Heading.map((title, idx) => (
                  <th
                    key={idx}
                    className="px-4 py-2 text-left text-gray text-[16px] font-medium"
                  >
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
                  <tr className="text-sm text-gray" key={index}>
                    <td className="px-4 py-2">{item.empID}</td>
                    <td className="px-4 py-2">{item.name}</td>
                    <td className="px-4 py-2 ">
                      {" "}
                      {item?.leaveType
                        ? item.leaveType.charAt(0).toUpperCase() +
                          item.leaveType.slice(1).toLowerCase()
                        : "N/A"}
                    </td>
                    <td className="px-4 py-2 text-center">
                      {item.createdAt
                        ? new Date(item.createdAt).toLocaleDateString()
                        : "-"}
                    </td>

                    <td className="px-4 py-2 text-center">
                      {DateFormat(item.startDate)}
                    </td>
                    <td className="px-4 py-2 text-center">
                      {DateFormat(item.endDate)}
                    </td>
                    <td className="px-4 py-2 text-center">{item.takenDay}</td>

                    <td className="px-4 py-2 w-[250px] pt-3 overflow-y-auto text-wrap overflow-wrap-break-word flex">
                      {item.leaveReason}
                    </td>

                    <td className="px-4 py-2">
                      <select
                        value={item.leaveStatus}
                        className={clsx(
                          "border border-gray-300 rounded px-2 py-1 outline-none",
                          item.leaveStatus === "Pending"
                            ? "text-medium_orange bg-lite_orange"
                            : item.leaveStatus === "Approved"
                            ? "text-approved_blue bg-lite_blue"
                            : item.leaveStatus === "Rejected"
                            ? "text-red bg-lite_red"
                            : ""
                        )}
                        onChange={(e) =>
                          handleStatusChange(item.docId, e.target.value)
                        }
                      >
                        <option
                          className={clsx(
                            item.leaveStatus === "Pending" && "text-red"
                          )}
                          value="Pending"
                        >
                          Pending
                        </option>
                        <option
                          className={clsx(
                            item.leaveStatus === "Approved" &&
                              "text-medium_orange"
                          )}
                          value="Approved"
                        >
                          Approved
                        </option>
                        <option
                          className={clsx(
                            item.leaveStatus === "Rejected" && "text-red"
                          )}
                          value="Rejected"
                        >
                          Rejected
                        </option>
                      </select>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <p className="text-center py-4 text-gray-400">No Leave Applied</p>
        )}
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
