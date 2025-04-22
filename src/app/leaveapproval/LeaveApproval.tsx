"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";
import { TableFormate } from "@/components/TableFormate";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import Link from "next/link";

// Define types
type LeaveStatus = {
  empID: string;
  leaveStatus: string;
  leaveType: string;
  duration: string;
  startDate: string;
  endDate: string;
};

type EnrichedLeaveStatus = LeaveStatus & {
  name: string;
};

const LeaveApproval = () => {
  const Heading = [
    "EmpID",
    "Name",
    "Duration",
    "Start Date",
    "End Date",
    "leaveType",
    "Status",
  ];

  const [leaveApproval, setLeaveApproval] = useState<EnrichedLeaveStatus[]>([]);
  console.log(leaveApproval)

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        // Fetch leaveStatus documents
        const leaveSnapshot = await getDocs(collection(db, "leaveStatus"));
        const leaveList: LeaveStatus[] = leaveSnapshot.docs.map((doc) => ({
          empID: doc.id,
          ...(doc.data() as Omit<LeaveStatus, "empID">),
        }));

        // Fetch employeeDetails documents
        const employeeSnapshot = await getDocs(collection(db, "employeeDetails"));
        const employeeDetails = employeeSnapshot.docs.map((doc) => ({
          empID: doc.id,
          ...(doc.data() as { name: string }),
        }));

        // Map empID to employee name
        const empMap = new Map<string, string>();
        employeeDetails.forEach((emp) => {
          empMap.set(emp.empID, emp.name);
        });

        // Filter pending leave requests and attach employee name
        const pendingLeave: EnrichedLeaveStatus[] = leaveList
          .filter((leave) => leave.leaveStatus === "Pending")
          .map((leave) => ({
            ...leave,
            name: empMap.get(leave.empID) || "Unknown",
          }));

        setLeaveApproval(pendingLeave);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchEmployees();
  }, []);

  return (
    <section>
      <h4 className="text-primary  pb-2 px-2  mt-3 mb-7 text_size_2 flex items-center gap-10">
      <Link href="/leavemanagement" className="text-mediumlite_grey">
          <MdOutlineKeyboardBackspace />
        </Link>
      Leave Approval List
      </h4>
      <div className="bg-white px-10 py-5 rounded-lg">
        <TableFormate
          heading={Heading}
          allEmp={[]}
          list="LeaveApproval"
          ovla={[]}
          leaveApproval={leaveApproval}
          empLeave={[]}
        />
      </div>
    </section>
  );
};

export default LeaveApproval;
// "use client";

// import { useEffect, useState } from "react";
// import { collection, getDocs } from "firebase/firestore";
// import { db } from "@/lib/firebaseConfig";
// import { TableFormate } from "@/components/TableFormate";

// const LeaveApproval = () => {
//   const Heading = ["EmpID", "Name", "Duration", "Start Date", "End Date", "leaveType", "Status"];
//   const [leaveApproval, setLeaveApproval] = useState<Array<any>>([]);

//   useEffect(() => {
//     const fetchEmployees = async () => {
//       try {
//         // Fetch leave status data
//         const leaveSnapshot = await getDocs(collection(db, "leaveStatus"));
//         const leaveList = leaveSnapshot.docs.map((doc) => ({
//           empID: doc.id,
//           ...doc.data(),
//         }));
  
//         // Fetch employee details data
//         const employeeSnapshot = await getDocs(collection(db, "employeeDetails"));
//         const employeeDetails = employeeSnapshot.docs.map((doc) => ({
//           empID: doc.id,
//           ...doc.data(),
//         }));
  
//         // Create a map for quick empID -> name lookup
//         const empMap = new Map();
//         employeeDetails.forEach(emp => {
//           empMap.set(emp.empID, emp.name); // assuming the field is 'name'
//         });
  
//         // Filter for pending leave and attach employee name
//         const pendingLeave = leaveList
//           .filter((leave) => leave.leaveStatus === "Pending")
//           .map((leave) => ({
//             ...leave,
//             name: empMap.get(leave.empID) || "Unknown", // add name from employeeDetails
//           }));
  
//         console.log(pendingLeave, "Pending leave with employee names");
  
//         setLeaveApproval(pendingLeave); // Set the state with enriched data
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };
  
//     fetchEmployees();
//   }, []);
  

//   return (
//     <section>
//       <div className="text-mediumlite_grey text_size_2 mt-5">Employee</div>
//       <h4 className="text-primary border-b-2 border-primary pb-2 px-2 w-9 mt-3 mb-7 text_size_3">All</h4>
//       <div className="bg-white px-10 py-5 rounded-lg">
//         <TableFormate
//           heading={Heading}
//           allEmp={[]}
//           list="LeaveApproval"
//           ovla={[]}
//           leaveApproval={leaveApproval??[]}
//           empLeave={[]}
//         />
//       </div>
//     </section>
//   );
// };

// export default LeaveApproval;

