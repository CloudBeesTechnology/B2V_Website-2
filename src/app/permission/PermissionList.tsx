"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";
import { DateFormat } from "@/components/DateFormate";
import { useRouter } from "next/navigation";
import { IoArrowBack } from "react-icons/io5";
import clsx from "clsx";

type PermissionHis = {
  empID: string;
  status: string;
  date: string;
  hours: string;
  reason: string;
  createdAt: string;
};

type EnrichedPermissionHis = PermissionHis & {
  name: string;
  docId: string;
  remarks?: string;
};

const PermissionList = () => {
  const [permissionHis, setPermissionHis] = useState<EnrichedPermissionHis[]>([]);
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
        const leaveSnapshot = await getDocs(collection(db, "applyPermission"));
        const permissHistory: EnrichedPermissionHis[] = leaveSnapshot.docs.map(
          (doc) => ({
            docId: doc.id,
            empID: doc.data().empID,
            status: doc.data().status,
            date: doc.data().date,
            hours: doc.data().hours,
            reason: doc.data().reason,
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

        const enrichedList = permissHistory
          .filter((leave) => leave.status === "Pending")
          .map((leave) => ({
            ...leave,
            name: empMap.get(leave.empID) || "Unknown",
          }));

        setPermissionHis(enrichedList);
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
    "Apply Date",
    "Hours",
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
      const leaveDocRef = doc(db, "applyPermission", docId); // Ensure you're updating the correct collection
      await updateDoc(leaveDocRef, {
        status: status,
        ...(status === "Rejected" && { remarks: remarksText }),
      });

      setPermissionHis((prev) =>
        prev.map((leave) =>
          leave.docId === docId
            ? { ...leave, status, remarks: remarksText }
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
          <h1 className="text-xl font-semibold text-gray">Permission List</h1>
        </section>

        {permissionHis.length > 0 ? (
          <table className="min-w-full  border-gray-200">
            <thead className="border-b text-center border-morelite_grey">
              <tr>
                {Heading.map((title, idx) => (
                  <th
                    key={idx}
                    className="px-4 py-2  text-gray text-[16px] font-medium"
                  >
                    {title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {permissionHis.map((item, index) => (
                <tr className="text-sm text-medium_gray text-center border-b  border-morelite_grey" key={index}>
                  <td className="px-4 py-2">{item.empID}</td>
                  <td className="px-4 py-2">{item.name}</td>
                  <td className="px-4 py-2 text-center">
                  {item?.date ? DateFormat(item?.date) : "N/A"}

                  </td>
                  <td className="px-4 py-2">{item.hours}</td>
                  <td className="px-4 py-2">{item.reason}</td>
                  <td className="px-4 py-2">
                    <select
                      value={item.status}
                      className={clsx(
                        "border border-gray-300 rounded px-2 py-1 outline-none",
                        item.status === "Pending"
                          ? "text-medium_orange bg-lite_orange"
                          : item.status === "Approved"
                          ? "text-approved_blue bg-lite_blue"
                          : item.status === "Rejected"
                          ? "text-red bg-lite_red"
                          : ""
                      )}
                      onChange={(e) =>
                        handleStatusChange(item.docId, e.target.value)
                      }
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
        ) : (
          <p className="text-center py-4 text-gray-400">No Leave Applied</p>
        )}
      </div>

      {/* POPUP Modal */}
      {showPopup && (
        <div className="fixed inset-0 bg-transparent flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-[400px] shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Add Rejection Remarks</h3>
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

export default PermissionList;