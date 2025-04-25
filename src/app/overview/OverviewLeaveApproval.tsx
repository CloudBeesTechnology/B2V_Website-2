
"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query, limit, where } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";
import { TableFormate } from "@/components/TableFormate";

interface LeaveData {
  id: string;
  empID: string;
  takenDay: string;
  startDate: string;
  endDate: string;
  leaveType: string;
  leaveStatus: string;
  leaveReason: string;
  remarks: string;
  createdAt: string;
  // Add other properties as needed
}

 export const OverviewLeaveApproval = () => {
  const Heading = ["EmpID", "Duration", "Start Date", "End Date", "Type", "Actions"];
  const [empLeave, setEmpLeave] = useState<Array<any>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        setLoading(true);
        const empID = localStorage.getItem("empID"); 
        if (!empID) {
          setError("Employee ID not found");
          return;
        }

        // Option 1: Try the optimized query first
        try {
          const q = query(
            collection(db, "leaveStatus"),
            where("empID", "==", empID),
            orderBy("createdAt", "desc"),
            limit(3)
          );
          
          const querySnapshot = await getDocs(q);
          const leaveList = querySnapshot.docs.map(doc => {
            const data = doc.data();
            return {
              id: doc.id,
              empID: data.empID,
              takenDay: data.takenDay || "N/A",
              startDate: data.startDate || "N/A",
              endDate: data.endDate || "N/A",
              leaveType: data.leaveType || "N/A",
              leaveStatus: data.leaveStatus || "N/A",
              leaveReason: data.leaveReason || "N/A",
              remarks: data.remarks || "N/A",
              createdAt: data.createdAt?.toDate?.().toLocaleString() || data.createdAt || "N/A"
            } as LeaveData;
          });
          
          setEmpLeave(leaveList);
          setError("");
        } catch (queryError) {
          console.warn("Optimized query failed, falling back to client-side filtering", queryError);
          
          // Option 2: Fallback to client-side filtering if index isn't ready
          const q = query(
            collection(db, "leaveStatus"),
            orderBy("createdAt", "desc"),
            limit(100) // Get more records and filter client-side
          );
          
          const querySnapshot = await getDocs(q);
          const leaveList = querySnapshot.docs
            .map(doc => {
              const data = doc.data();
              return {
                id: doc.id,
                empID: data.empID,
                takenDay: data.takenDay || "N/A",
                startDate: data.startDate || "N/A",
                endDate: data.endDate || "N/A",
                leaveType: data.leaveType || "N/A",
                leaveStatus: data.leaveStatus || "N/A",
                leaveReason: data.leaveReason || "N/A",
                remarks: data.remarks || "N/A",
                createdAt: data.createdAt?.toDate?.().toLocaleString() || data.createdAt || "N/A"
              } as LeaveData;
            })
            // .filter(item => item.empID === empID)
            .slice(0, 3); 
            
          setEmpLeave(leaveList);
        }
      } catch (error) {
        console.error("Error fetching leave data:", error);
        setError("Failed to load leave history. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchLeaves();
  }, []);

  if (loading) return <div>Loading leave history...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <section className="rounded-xl px-5 py-8 shadow-xl h-full">
    <div className=" pb-1 my-2">
      <p className="text-gray text-text_size_3">Leave Approval</p>
    </div>
       
      <div className="bg-white py-5 rounded-lg px-4">
        <TableFormate
          heading={Heading}
          list="empLeave"
          empLeave={empLeave}
          ovla={[]}
          allEmp={[]}
          leaveApproval={[]}
        />
      </div>
      <div className="text-mediumlite_grey text-[13px] font-medium flex gap-10 my-5">
        <p className=" relative before:mx-2 before:w-2.5 before:h-2.5 before:bg-approved_blue before:content-[''] before:inline-block ">
          Approved
        </p>
        <p className=" relative before:mx-2 before:w-2.5 before:h-2.5 before:bg-medium_red before:content-[''] before:inline-block ">
          Rejected
        </p>
        <p className=" relative before:mx-2 before:w-2.5 before:h-2.5 before:bg-medium_orange before:content-[''] before:inline-block ">
          Pending
        </p>
      </div>
    </section>
  );
};

