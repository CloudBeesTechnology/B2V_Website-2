"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";
import { TableFormate } from "@/components/TableFormate";
import EmpLeaveDateFilter from "./empLeaveDateFilter";

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

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        setLoading(true);
        const empID = localStorage.getItem("empID"); // Example: "CBT0002"
        if (!empID) return;

        const querySnapshot = await getDocs(collection(db, "leaveStatus"));

        const leaveList = querySnapshot.docs
          .map((doc) => doc.data())
          .filter((item) => item.empID === empID); // Only that person's data

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
