// import { useEffect, useState } from "react";
// import {
//   collection,
//   getDocs,
//   query,
//   where,
// } from "firebase/firestore";
// import { db } from "@/lib/firebaseConfig";

// type Itemvalue = {
//   totalLeave: string;
// };

// type TotalLeaveData = {
//   data: Itemvalue;
// };

// const EmpAvailableLeaves: React.FC<TotalLeaveData> = ({ data }) => {


//   useEffect(() => {
//     const fetchDataByEmpID = async () => {
//       const fetchQuery = query(
//         collection(db, "leaveStatus"),
//         where("empID", "==", "CBT0010")
//       );

//       const querySnapshot = await getDocs(fetchQuery);

//       if (!querySnapshot.empty) {
//         const results = querySnapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));

//         console.log("Fetched data:", results);

//       } else {
//         console.log("No matching documents.");
//       }
//     };

//     fetchDataByEmpID();
//   }, []);

//   console.log("Total Leaves", data?.totalLeave);

//   return (
//     <article className="flex  w-2/3 justify-around p-5 gap-5 border h-48 border-[#E4E4E4] bg-white rounded-md">
//       <div className="center flex-col gap-2 border border-[#D4EBDC] w-full rounded-md">
//         <p className="text-gray text_size_4">Total Leave</p>
//         <p className="text-2xl font-medium text-[#01C441]">
//           {data?.totalLeave || "0"}
//         </p>
//         <p className="text-12px font-medium text-medium_gray">Available</p>
//       </div>
//       <div className="center flex-col gap-2 border border-[#D1DEE7] w-full rounded-md">
//         <p className="text-gray text_size_4">Pending</p>
//         <p className="text-2xl font-medium text-[#E1982B]">09</p>
//         <p className="text-12px font-medium text-medium_gray">Pending Leave</p>
//       </div>
//       <div className="center flex-col gap-2 border border-[#E3CFD4] w-full rounded-md">
//         <p className="text-gray text_size_4">Rejected</p>
//         <p className="text-2xl font-medium text-[#E83265]">09</p>
//         <p className="text-12px font-medium text-medium_gray">Rejected Leave</p>
//       </div>

//       {/* <div className="center flex-col gap-2 border border-[#D1DEE7] w-full rounded-md">
//         <p className="text-gray text_size_4">Other Leave</p>
//         <p className="text-2xl font-medium text-[#e3df01]">09</p>
//         <p className="text-12px font-medium text-medium_gray">Leave Taken</p>
//       </div> */}
//     </article>
//   );
// };
// export default EmpAvailableLeaves;
import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";

type ItemValue = {
  totalLeave: string;
};

type TotalLeaveData = {
  data: ItemValue;
};

interface LeaveData {
  id: string;
  empID: string;
  leaveStatus: "Pending" | "Approved" | "Rejected" | "Cancelled";
  // Other fields can remain if needed
}

const EmpAvailableLeaves: React.FC<TotalLeaveData> = ({ data }) => {
  const [pendingCount, setPendingCount] = useState<number>(0);
  const [rejectedCount, setRejectedCount] = useState<number>(0);
  const [approvedCount, setApprovedCount] = useState<number>(0);

  const empID =
    typeof window !== "undefined"
      ? localStorage.getItem("empID")?.toString()?.toUpperCase()
      : null;

      console.log("emp", empID);
      
  useEffect(() => {
    const fetchDataByEmpID = async () => {
      const fetchQuery = query(
        collection(db, "leaveStatus"),
        where("empID", "==", empID)
      );

      const querySnapshot = await getDocs(fetchQuery);

      if (!querySnapshot.empty) {
        const results = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as LeaveData[];


        const pending = results.filter(leave => leave.leaveStatus === "Pending").length;
        const rejected = results.filter(leave => leave.leaveStatus === "Rejected").length;
        const approved = results.filter(leave => leave.leaveStatus === "Approved").length;

        setPendingCount(pending);
        setRejectedCount(rejected);
        setApprovedCount(approved);

      } else {
        console.log("No matching documents.");
      }
    };

    fetchDataByEmpID();
  }, []);

  return (
    <article className="flex w-2/3 justify-around p-5 gap-5 border h-48 border-[#E4E4E4] bg-white rounded-md">
      <div className="center flex-col gap-2 border border-[#D4EBDC] w-full rounded-md">
        <p className="text-gray text_size_4">Total Leave</p>
        <p className="text-2xl font-medium text-[#01C441]">
          {data?.totalLeave || "0"}
        </p>
        <p className="text-12px font-medium text-medium_gray">Available</p>
      </div>
      <div className="center flex-col gap-2 border border-[#D1DEE7] w-full rounded-md">
        <p className="text-gray text_size_4">Approved</p>
        <p className="text-2xl font-medium text-[#1C40AE]">
          {approvedCount}
        </p>
        <p className="text-12px font-medium text-medium_gray">Leave Requests</p>
      </div>
      <div className="center flex-col gap-2 border border-[#D1DEE7] w-full rounded-md">
        <p className="text-gray text_size_4">Pending</p>
        <p className="text-2xl font-medium text-[#E1982B]">
          {pendingCount}
        </p>
        <p className="text-12px font-medium text-medium_gray">Leave Requests</p>
      </div>
      <div className="center flex-col gap-2 border border-[#E3CFD4] w-full rounded-md">
        <p className="text-gray text_size_4">Rejected</p>
        <p className="text-2xl font-medium text-[#E83265]">
          {rejectedCount}
        </p>
        <p className="text-12px font-medium text-medium_gray">Leave Requests</p>
      </div>
    </article>
  );
};

export default EmpAvailableLeaves;