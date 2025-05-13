"use client";
import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import Link from "next/link";
import { TableFormate } from "@/components/TableFormate";
import { IoArrowBack } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { LeaveStatus } from "../leaveapproval/LeaveApproval";
import { EnrichedLeaveStatus } from "../leaveapproval/LeaveApproval";
import { ViewLeaveStatus } from "@/components/ViewLeaveStatus";

type LeaveEntry = {
  empID: string;
  [key: string]: string | undefined;
};
const LeaveHistory = () => {
  const router = useRouter();
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [leaveApproval, setLeaveApproval] = useState<EnrichedLeaveStatus[]>([]);
  const [finalData, setFinalData] = useState<LeaveEntry[]>([]);
  const [filterStatus, setFilterStatus] = useState<"Approved" | "Rejected">(
    "Approved"
  );
  const [leaveDetailsPopup, setLeaveDetailsPopup] = useState(false);
  const [leaveDetails, setLeaveDetails] = useState<any | null>(null);
  const [userRoleAccess, setUserRoleAccess] = useState<string | null>(null);

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
    const fetchEmployees = async () => {
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
            duration: doc.data().takenDay,
            startDate: doc.data().startDate,
            endDate: doc.data().endDate,
            leaveReason: doc.data().leaveReason,
            createdDate: doc.data().createdDate,
            remarks: doc.data().remarks || "",
            createdAt: doc.data().createdAt || doc.data().createdDate || "",
            name: "",
            leadStatus: doc.data().leadStatus,
            managerStatus: doc.data().managerStatus,
            leadRemarks: doc.data().leadRemarks,
            managerRemarks: doc.data().managerRemarks,
            leadName: "", // To be added
            managerName: "",
            department: "",
            leadEmpID: doc.data().leadEmpID,
            managerEmpID: doc.data().managerEmpID,
          }));

        const employeeSnapshot = await getDocs(
          collection(db, "employeeDetails")
        );
        const employeeDetails = employeeSnapshot.docs.map((doc) => ({
          empID: doc.id,
          ...(doc.data() as { name: string; department: string }),
        }));

        const empMap = new Map<string, { name: string; department: string }>();
        employeeDetails.forEach((emp) => {
          empMap.set(emp.empID, {
            name: emp.name,
            department: emp.department,
          });
        });

        // const enrichedList = leaveList.map((leave) => ({
        //   ...leave,
        //   name: empMap.get(leave.empID) || "Unknown",
        // }));
        const enrichedList: EnrichedLeaveStatus[] = [];

        for (const leave of leaveList) {
          // console.log(userRole);

          if (
            userRole === "ADMIN" ||
            (userEmpID === leave.leadEmpID && leave.leadStatus !== "Pending") ||
            (userEmpID === leave.managerEmpID &&
              leave.managerStatus !== "Pending") ||
            (userEmpID === leave.managerEmpID &&
              !leave.leadEmpID &&
              leave.managerStatus !== "Pending")
          ) {
            const { leadName, managerName } = await checking(leave);
            // console.log(leadName, managerName);
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

        setLeaveApproval(enrichedList);
        setFinalData(enrichedList);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const handleClose = () => {
    setLeaveDetailsPopup(!leaveDetailsPopup);
  };
  const handleLeaveDetails = (items: any) => {
    // console.log(items, "7845");

    setLeaveDetails(items);
    handleClose();
  };
  // const filteredData = leaveApproval.filter(
  //   (item) => item.leaveStatus === filterStatus
  // );

  useEffect(() => {
    function filterByDateRange(data: any, startDate: string, endDate: string) {
      const start = new Date(startDate);
      const end = new Date(endDate);

      return data.filter((item: any) => {
        const itemStart = new Date(item.startDate);
        const itemEnd = new Date(item.endDate);

        return itemStart >= start && itemEnd <= end;
      });
    }

    if (startDate && endDate && leaveApproval) {
      const filteredByDate = filterByDateRange(
        leaveApproval,
        startDate,
        endDate
      );

      setFinalData(filteredByDate);
    } else {
      setFinalData(leaveApproval);
    }
  }, [leaveApproval, startDate, endDate]);
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
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="border border-[#9D9393]   text-gray rounded px-3 py-2"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-[#7E7D7D] mb-1">End Date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="border border-[#9D9393] text-gray rounded px-3 py-2"
              />
            </div>
          </div>
        </div>
        <div className="mt-auto">{/* < /> */}</div>
      </section>
      <section className="py-7 bg-white rounded-xl px-10 space-y-7 my-10  overflow-x-auto">
        {/* <LeaveTable /> */}
        {/* <div className="flex gap-4 mb-4 text-gray">
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
        </div> */}
        <div className="my-10">
          {finalData && finalData?.length > 0 ? (
            <TableFormate
              heading={Heading}
              list="LeaveApproval"
              leaveApproval={finalData}
              filterStatus={filterStatus}
              handleLeaveDetails={handleLeaveDetails}
            />
          ) : (
            <p className="text-center py-4 text-gray-400">Data not found</p>
          )}
        </div>
      </section>
      {leaveDetailsPopup && (
        <ViewLeaveStatus
          leaveData={leaveDetails}
          setLeaveApproval={setLeaveApproval}
          close={handleClose}
          userAcess={{ userAcess: userRoleAccess }}
          hiddenBtn={false}
        />
      )}
    </section>
  );
};

export default LeaveHistory;
