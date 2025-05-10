"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";
import { TableFormate } from "@/components/TableFormate";
import EmpLeaveDateFilter from "./empLeaveDateFilter";
import { LeaveStatus, EnrichedLeaveStatus } from "../leaveapproval/LeaveApproval";


const EmpHistoryOfLeave = () => {
  const Heading = [
    "EmpID",
    "Duration",
    "Start Date",
    "End Date",
    "leaveType",
    "Status",
  ];
  const [empLeave, setEmpLeave] = useState<Array<any>>([]);
  const [secondaryEmpLeave, setSecondaryEmpLeave] = useState<Array<any>>([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        setLoading(true);
        const empID = localStorage.getItem("empID"); // Example: "CBT0002"
        if (!empID) return;

        const querySnapshot = await getDocs(collection(db, "leaveStatus"));

        const leaveList: EnrichedLeaveStatus[] = querySnapshot.docs.sort((a, b) => {
          const dateA = new Date(a.data().createdAt).getTime();
          const dateB = new Date(b.data().createdAt).getTime();
          return dateB - dateA; // descending: latest first
        })
        .map((doc) => {
          const data = doc.data();
          let finalStatus = "";
      
          if (
            (data.leadEmpID &&
              data.leadStatus === "Approved" &&
              data.managerStatus === "Approved") ||
            (!data.leadEmpID && data.managerStatus === "Approved")
          ) {
            finalStatus = "Approved";
          } else if (
            (data.leadEmpID && data.leadStatus === "Rejected") ||
            (!data.leadEmpID && data.managerStatus === "Rejected") ||
            (data.leadEmpID &&
              data.leadStatus === "Approved" &&
              data.managerStatus === "Rejected")
          ) {
            finalStatus = "Rejected";
          } else {
            finalStatus = "Pending";
          }
      
          return {
            docId: doc.id,
            empID: data.empID,
            leaveStatus: data.leaveStatus,
            leaveType: data.leaveType,
            takenDay: data.takenDay,
            startDate: data.startDate,
            endDate: data.endDate,
            leaveReason: data.leaveReason,
            leadEmpID: data.leadEmpID,
            managerEmpID: data.managerEmpID,
            createdAt: data.createdAt,
            leadStatus: data.leadStatus,
            managerStatus: data.managerStatus,
            leadRemarks: data.leadRemarks,
            managerRemarks: data.managerRemarks,
            name: "",
            remarks: data.remarks || "",
            leadName: "",
            managerName: "",
            department: "",
            finalStatus,
          };
        })
        .filter((item) => item.empID === empID);
      
        // console.log(leaveList, "leavelist");

        setSecondaryEmpLeave(leaveList);
        setEmpLeave(leaveList);
      } catch (error) {
        console.error("Error fetching leave data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaves();
  }, []);

  if (loading)
    return (
      <div className="text-center text-gray my-20 text-lg">Loading...</div>
    );

  return (
    <section>
      <EmpLeaveDateFilter
        empLeave={empLeave}
        handleFilteredData={(filteredData) =>
          setSecondaryEmpLeave(filteredData)
        }
        titleName="History of Leave"
      />
      <div className="bg-white mb-10 py-5 rounded-lg">
        {secondaryEmpLeave && secondaryEmpLeave.length > 0 ? (
          <TableFormate
            heading={Heading}
            list="empLeave"
            secondaryEmpLeave={secondaryEmpLeave}
            ovla={[]}
            allEmp={[]}
            leaveApproval={[]}
          />
        ) : (
          <p className="text-center py-4 text-gray">Data not found</p>
        )}
      </div>
    </section>
  );
};

export default EmpHistoryOfLeave;
