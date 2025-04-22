"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";
import { TableFormate } from "@/components/TableFormate";

const EmpHistoryOfLeave = () => {
  const Heading = ["EmpID", "Duration", "Start Date", "End Date", "leaveType", "Status"];
  const [empLeave, setEmpLeave] = useState<Array<any>>([]);

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const empID = localStorage.getItem("empID"); // Get empID from localStorage
        if (!empID) return;

        const querySnapshot = await getDocs(collection(db, "leaveStatus"));
        const leaveList = querySnapshot.docs
          .map((doc) => doc.data()) // only get data, don't use doc.id
          .filter((leave) => leave.empID === empID); // filter by field inside document

        setEmpLeave(leaveList);
      } catch (error) {
        console.error("Error fetching leaves:", error);
      }
    };

    fetchLeaves();
  }, []);

  return (
    <section>
      <div className="flex justify-between items-center mt-10 mb-5">
        <h4 className="text-primary border-b-2 border-primary pb-2 px-2 w-48 mb-7 mt-5 text_size_2">
          History of Leave
        </h4>
        <div className="flex justify-center items-center gap-12">
          <div>
            <label htmlFor="start-date" className="block text-[16px] font-medium text-primary">
              Start Date
            </label>
            <input
              id="start-date"
              type="date"
              className="outline-none text-gray border rounded-md p-2 border-primary"
            />
          </div>

          <div>
            <label htmlFor="end-date" className="block text-[16px] font-medium text-primary">
              End Date
            </label>
            <input
              id="end-date"
              type="date"
              className="outline-none text-gray border rounded-md p-2 border-primary"
            />
          </div>
        </div>
      </div>
      <div className="bg-white px-10 py-5 rounded-lg">
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

// "use client";

// import { useEffect, useState } from "react";
// import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore"; // Firestore methods
// import { db } from "@/lib/firebaseConfig"; // Firestore instance

// import EmpAvailableLeaves from "./empAvailableLeaves";
// import EmpBasicDetails from "./empBasicDetails";
// import EmpLeaveStatusTable from "./empLeaveStatusTable";

// const EmpOverview: React.FC = () => {
//   const [userName, setUserName] = useState<string | null>(null);

//   useEffect(() => {
//     const empID = localStorage.getItem("empID");

//     const fetchData = async () => {
//       if (empID) {
//         try {
//           const docRef = query(collection(db, "employeeDetails"),where("empID","==",empID)); // Firestore path
//           const docSnap = await getDocs(docRef);

//           if (docSnap.empty) {
//             alert("Employee not found")  
//           } 
          
//           const empData = docSnap.docs[0].data();
//           // console.log("Employee Data:", empData);
//           setUserName(empData?.name || "No name found");
//         } catch (error) {
//           console.error("Error fetching employee data:", error);
//         }
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <main className="mb-20">
//       <header>
//         <h3 className="text-2xl font-semibold my-10">
//           Welcome {userName || "Employee"}
//         </h3>
//       </header>
//       <EmpBasicDetails />
//       <EmpAvailableLeaves />
//       <EmpLeaveStatusTable />
//     </main>
//   );
// };

// export default EmpOverview;
