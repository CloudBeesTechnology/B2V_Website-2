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
  leaveReason:string;
  remarks:string;
  createdAt: string;
  // Add other properties as needed
}

const EmpHistoryOfLeave = () => {
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
            limit(4)
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
            .filter(item => item.empID === empID)
            .slice(0, 4); 
            
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

  if (loading) return <div>Loading leave ...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <section className="mt-10 rounded bg-white p-5">
      <div className="text-xl font-semibold py-5">
        <h2>Recent Leave Applications</h2>
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
    </section>
  );
};

export default EmpHistoryOfLeave;

