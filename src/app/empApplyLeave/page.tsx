"use client";
import EmpApplyLeaveTable from "./empApplyLeaveTable";
import EmpLeaveCounts from "./empLeaveCounts";
import EmpHistoryOfLeave from "./empHistoryOfLeave";
import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";
import { useRouter, useSearchParams } from "next/navigation";
import EmpPermission from "./empPermission/page";
import { DiVim } from "react-icons/di";

const EmpApplyLeave: React.FC = () => {
  const [empLeave, setEmpLeave] = useState<any>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const getURLparam = searchParams.get("tab") || "applyLeave";
  const tabs = [
    { tabName: "Apply Leave", path: "applyLeave" },
    { tabName: "Permission", path: "permission" },
  ];

  const handleTabClick = (tabName: string) => {
    router.push(`/empApplyLeave?tab=${tabName}`);
  };

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
          console.log("Employee Data:", empData);
          setEmpLeave(empData);
        } catch (error) {
          console.error("Error fetching employee data:", error);
        }
      }
    };

    fetchData();
  }, []);



  return (
    <main>
      <header className="center gap-10 py-14 px-6">
        <h2 className="text-2xl font-medium text-[#303030]">Apply Leave</h2>
      </header>
      <EmpLeaveCounts  data={empLeave} />

      <div className="flex justify-start gap-10 pt-15  text-xl font-bold">
        {tabs.map((tab, index) => {
          return (
            <h3
              key={index}
              onClick={() => handleTabClick(tab.path)}
              className={`cursor-pointer pb-1 ${
                getURLparam === tab.path ? "text-primary" : "text-gray"
              }`}
            >
              {tab.tabName}
            </h3>
          );
        })}
      </div>
      {getURLparam === "permission" ? (
        <EmpPermission />
      ) : (
        <section>
          <EmpApplyLeaveTable />
          <EmpHistoryOfLeave />
        </section>
      )}
    </main>
  );
};
export default EmpApplyLeave;
