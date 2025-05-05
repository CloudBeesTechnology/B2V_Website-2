"use client";

import { useEffect, useState } from "react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore"; // Firestore methods
import { db } from "@/lib/firebaseConfig"; // Firestore instance

import EmpAvailableLeaves from "./empAvailableLeaves";
import EmpBasicDetails from "./empBasicDetails";
import EmpLeaveStatusTable from "./empLeaveStatusTable";
import useCheckPermission from "../utils/customHooks/useCheckPermission";
import EmpTodayTask from "./empTodayTask";

const EmpOverview: React.FC = () => {
  const { hasPermission } = useCheckPermission();
  const [userName, setUserName] = useState<string | null>(null);
  const [empDetails, setempDetails] = useState<any>(null);

  useEffect(() => {
    const empID = localStorage.getItem("empID");

    const fetchData = async () => {
      if (empID) {
        try {
          const docRef = query(
            collection(db, "employeeDetails"),
            where("empID", "==", empID)
          ); // Firestore path
          const docSnap = await getDocs(docRef);

          if (docSnap.empty) {
            alert("Employee not found");
          }

          const empData = docSnap.docs[0].data();
          // console.log("Employee Data:", empData);
          setempDetails(empData);
          setUserName(empData?.name || "No name found");
        } catch (error) {
          console.error("Error fetching employee data:", error);
        }
      }
    };

    fetchData();
  }, []);

  return (
    <main className="mb-20">
      {hasPermission("Overview", "Employee card") && (
        <section>
          <div>
            <h3 className="text-2xl font-semibold my-10">
              Welcome {userName || "Employee"}
            </h3>
          </div>

          <EmpBasicDetails data={empDetails} />
        </section>
      )}
      <section className="flex justify-between items-center mt-20 gap-10 ">
        {hasPermission("Overview", "Available Leaves") && (
          <EmpAvailableLeaves data={empDetails} />
        )}
        {hasPermission("Overview", "Today task") && <EmpTodayTask />}
      </section>

      {hasPermission("Overview", "Leave Applications") && (
        <EmpLeaveStatusTable />
      )}
    </main>
  );
};

export default EmpOverview;
