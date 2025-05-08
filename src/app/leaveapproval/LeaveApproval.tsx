"use client";

import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  query,
  where,
  getDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { DateFormat } from "@/components/DateFormate";
import { useRouter } from "next/navigation";
import { IoArrowBack } from "react-icons/io5";
import clsx from "clsx";
import { ViewLeaveStatus } from "@/components/ViewLeaveStatus";

export type LeaveStatus = {
  empID: string;
  leaveStatus: string;
  leadStatus: string;
  managerStatus: string;
  leaveType: string;
  takenDay?: string;
  startDate: string;
  endDate: string;
  leaveReason: string;
  leadEmpID: string;
  managerEmpID: string;
  createdAt: string;
  duration?: string;
  createdDate?: string;
};

export type EnrichedLeaveStatus = LeaveStatus & {
  name: string;
  docId: string;
  leadName?: string;
  managerName?: string;
  department?: string;
  remarks?: string;
  finalValue?: string;
};

const LeaveApproval = () => {
  const [leaveApproval, setLeaveApproval] = useState<EnrichedLeaveStatus[]>([]);
  const [userRoleAccess, setUserRoleAccess] = useState<string | null>(null);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [leaveDetails, setLeaveDetails] = useState<any | null>(null);
  const [leaveDetailsPopup, setLeaveDetailsPopup] = useState(false);
  const checking = async (leave: any) => {
    let leadName = "N/A";
    if (leave?.leadEmpID) {
      const qLead = query(
        collection(db, "employeeDetails"),
        where("empID", "==", leave.leadEmpID)
      );
      const leadSnap = await getDocs(qLead);
      if (!leadSnap.empty) {
        leadName = leadSnap.docs[0].data().name || "N/A";
      }
    }
    let managerName = "N/A";
    if (leave?.managerEmpID) {
      const qManager = query(
        collection(db, "employeeDetails"),
        where("empID", "==", leave.managerEmpID)
      );
      const managerSnapshot = await getDocs(qManager);
      if (!managerSnapshot.empty) {
        managerName = managerSnapshot.docs[0].data().name || "N/A";
      }
    }
    return {
      leadName,
      managerName,
    };
  };

  useEffect(() => {
    const userRole = localStorage?.getItem("userRole")?.toUpperCase() || null;
    const userEmpID = localStorage?.getItem("empID")?.toUpperCase() || null;
    setUserRoleAccess(userRole);
    async function fetchEmployees() {
      try {
        setLoading(true);
        const leaveSnapshot = await getDocs(collection(db, "leaveStatus"));
        const leaveList: EnrichedLeaveStatus[] = leaveSnapshot.docs
          .sort((a, b) => {
            const dateA = new Date(a.data().createdAt).getTime();
            const dateB = new Date(b.data().createdAt).getTime();
            return dateB - dateA; // descending: latest first
          })
          .map((doc) => ({
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
            leadStatus: doc.data().leadStatus,
            managerStatus: doc.data().managerStatus,
            leadRemarks: doc.data().leadRemarks,
            managerRemarks: doc.data().managerRemarks,
            name: "",
            remarks: doc.data().remarks || "",
            leadName: "", // To be added
            managerName: "",
            department: "",
          }));

        const employeeSnapshot = await getDocs(
          collection(db, "employeeDetails")
        );
        const employeeDetails = employeeSnapshot.docs.map((doc) => ({
          empID: doc.id,
          ...(doc.data() as {
            name: string;
            department: string;
          }),
        }));

        const empMap = new Map<string, { name: string; department: string }>();
        employeeDetails.forEach((emp) => {
          empMap.set(emp.empID, {
            name: emp.name,
            department: emp.department,
          });
        });

        const enrichedList: EnrichedLeaveStatus[] = [];

        for (const leave of leaveList) {
          console.log(userRole);

          if (
            userRole === "ADMIN" ||
            (leave.leadStatus === "Pending" && userEmpID === leave.leadEmpID) ||
            (userEmpID === leave.managerEmpID &&
              leave.managerStatus === "Pending" &&
              leave.leadStatus === "Approved") ||
            (userEmpID === leave.managerEmpID &&
              !leave.leadEmpID &&
              leave.managerStatus === "Pending")
          ) {
            const { leadName, managerName } = await checking(leave);
            console.log(leadName, managerName);
            const empInfo = empMap.get(leave.empID);
            enrichedList.push({
              ...leave,
              name: empInfo?.name || "N/A",
              department: empInfo?.department || "N/A",
              leadName,
              managerName,
            });
          }
        }
        // console.log(enrichedList);

        setLeaveApproval(enrichedList);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }

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
      ? "Manager Name"
      : userRoleAccess === "MANAGER"
      ? "Lead Name"
      : null,

    "Reason(s)",
    "View",
  ].filter(Boolean);

  if (loading)
    return (
      <div className="text-center text-gray-500 my-20 text-lg">Loading...</div>
    );
  const handleClose = () => {
    setLeaveDetailsPopup(!leaveDetailsPopup);
  };
  const handleLeaveDetails = (items: any) => {
    // console.log(items, "7845");

    setLeaveDetails(items);
    handleClose();
  };
  return (
    <section>
      <div className="flex justify-start items-center text-[22px] text-gray gap-10 my-10">
        <IoArrowBack onClick={() => router.back()} className="cursor-pointer" />
        <h3>Leave Management</h3>
      </div>

      <div className="py-7 bg-white rounded-xl px-5 space-y-7 overflow-x-auto">
        <section className="flex justify-between items-center ">
          <h1 className="text-xl font-semibold text-gray">Leave List</h1>
          {/* <div className="center gap-5 py-3 px-4 bg-primary text-white rounded-xl text-lg font-bold ">
            <p>Export</p>
            <IoIosArrowDropdownCircle />
          </div> */}
        </section>
        {leaveApproval && leaveApproval.length > 0 ? (
          <table className="min-w-full  overflow-x-auto">
            <thead className="border-b  border-morelite_grey">
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
                return (
                  <tr
                    className="text-sm text-gray border-b  border-morelite_grey"
                    key={index}
                  >
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
                        ? DateFormat(item.createdAt)
                        : "-"}
                    </td>

                    <td className="px-4 py-2 text-center">
                      {DateFormat(item.startDate)}
                    </td>
                    <td className="px-4 py-2 text-center">
                      {DateFormat(item.endDate)}
                    </td>
                    <td className="px-4 py-2 text-center">{item.takenDay}</td>

                    {/* {item.managerEmpID &&
                    userRoleAccess?.includes("MANAGER") ? (
                      <td className="px-4 py-2 pt-3  flex">{item.leadName}</td>
                    ) : (
                      <td>N/A</td>
                    )}
                    {item.leadEmpID && userRoleAccess?.includes("LEAD") ? (
                      <td className="px-4 py-2 pt-3 flex">
                        {item.managerName}
                      </td>
                    ) : (
                      <td>N/A</td>
                    )} */}
                    {(userRoleAccess === "LEAD" ||
                      userRoleAccess === "MANAGER") && (
                      <td className="px-4 py-2 pt-3">
                        {userRoleAccess === "LEAD"
                          ? item.managerName
                          : userRoleAccess === "MANAGER" && item.leadEmpID
                          ? item.leadName
                          : "N/A"}
                      </td>
                    )}

                    <td className="px-4 py-2 w-[250px] pt-3 overflow-y-auto text-wrap overflow-wrap-break-word flex">
                      {item.leaveReason}
                    </td>

                    <td
                      className="text-approved_blue text-center px-4 py-2"
                      onClick={() => handleLeaveDetails(item)}
                    >
                      {" "}
                      View
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

      {/* view form popup */}
      {leaveDetailsPopup && (
        <ViewLeaveStatus
          leaveData={leaveDetails}
          setLeaveApproval={setLeaveApproval}
          close={handleClose}
          userAcess={{ userAcess: userRoleAccess }}
          hiddenBtn={true}
        />
      )}
    </section>
  );
};

export default LeaveApproval;
