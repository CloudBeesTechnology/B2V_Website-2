"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query, limit } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";
import { TableFormate } from "@/components/TableFormate";

const EmpHistoryOfLeave = () => {
  const Heading = ["EmpID", "Duration", "Start Date", "End Date", "Reason", "Actions"];
  const [empLeave, setEmpLeave] = useState<Array<any>>([]);

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const empID = localStorage.getItem("empID"); 
        if (!empID) return;

        const q = query(
          collection(db, "leaveStatus"),
          orderBy("createdAt", "desc"),
          limit(5)
        );

        const querySnapshot = await getDocs(q);

        const leaveList = querySnapshot.docs
          .map((doc) => doc.data())
          .filter((item) => item.empID === empID); 

        setEmpLeave(leaveList);
      } catch (error) {
        console.error("Error fetching leave data:", error);
      }
    };

    fetchLeaves();
  }, []);

  return (
    <section className="mt-10 rounded bg-white p-5">
      <div className="text-xl font-semibold py-5 ">
        <h2>Apply Leaves</h2>
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
