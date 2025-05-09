"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";

import EmpLeaveDateFilter from "../empLeaveDateFilter";
import { TableFormate } from "@/components/TableFormate";

const EmpHistoryOfPermission = () => {
  const [empPermission, setEmpPermission] = useState<Array<any>>([]);
  const [secondaryEmpPermission, setSecondaryEmpPermission] = useState<
    Array<any>
  >([]);

  const [loading, setLoading] = useState(true);
  const Heading = ["EmpID","Timing", "Duration", "Applied Date", "Reason", "Status"];
  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        setLoading(true);
        const empID = localStorage.getItem("empID"); // Example: "CBT0002"
        if (!empID) return;

        const querySnapshot = await getDocs(collection(db, "applyPermission"));

        const permissionData = querySnapshot.docs
          .sort((a, b) => {
            const dateA = new Date(a.data().createdAt).getTime();
            const dateB = new Date(b.data().createdAt).getTime();
            return dateB - dateA; // descending: latest first
          })
          .map((doc) => doc.data())
          .filter((item) => item.empID === empID); // Only that person's data

        setEmpPermission(permissionData);
        setSecondaryEmpPermission(permissionData);
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
      <div className="text-center text-gray-500 my-20 text-lg">Loading...</div>
    );

  return (
    <section>
      <EmpLeaveDateFilter
        empPermission={empPermission}
        handleFilteredData={(filteredData) =>
          setSecondaryEmpPermission(filteredData)
        }
        titleName="History of Permission"
      />

      <div className="bg-white mb-10 py-5 rounded-lg">
        {secondaryEmpPermission && secondaryEmpPermission.length > 0 ? (
          <TableFormate
            heading={Heading}
            list="empPermission"
            secondaryEmpPermission={secondaryEmpPermission}
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

export default EmpHistoryOfPermission;
