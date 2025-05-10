// type TotalLeaveData = {
//   totalLeave: string;
// };

// type LeaveCalc = {
//   leaveStatus: string;
// };

// type EmpLeaveCountsProps = {
//   data: TotalLeaveData;
//   leaveStatus: LeaveCalc[];
// };

// const EmpLeaveCounts: React.FC<EmpLeaveCountsProps> = ({
//   data,
//   leaveStatus,
// }) => {
//   return (
//     <section className="center  gap-24 bg-white rounded-md w-full h-[126px] text-gray text-base border border-[#DBDBDBCC] px-2">
//       <div className="center gap-10">
//         <p className="text-2xl font-bold text-[#1C40AE]">{data?.totalLeave}</p>
//         <p>Available leaves</p>
//       </div>
//       <div className="center gap-10">
//         <p className="text-2xl font-bold text-[#1C40AE]">08</p>
//         <p>Previous Unused leaves</p>
//       </div>
//       <div className="center gap-10">
//         <p className="text-2xl font-bold text-[#E1982B]">02</p>
//         <p>Pending leaves requests</p>
//       </div>
//       <div className="center gap-10">
//         <p className="text-2xl font-bold text-[#BA1414]">02</p>
//         <p>Rejected Leaves</p>
//       </div>
//     </section>
//   );
// };
// export default EmpLeaveCounts;
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

const EmpLeaveCounts: React.FC<TotalLeaveData> = ({ data }) => {
  const [pendingCount, setPendingCount] = useState<number>(0);
  const [rejectedCount, setRejectedCount] = useState<number>(0);
  const [approvedCount, setApprovedCount] = useState<number>(0);

  const empID =
    typeof window !== "undefined"
      ? localStorage.getItem("empID")?.toString()?.toUpperCase()
      : null;

      // console.log("emp", empID);
      
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
    <article className="flex justify-around p-5 gap-5 border h-48 border-[#E4E4E4] bg-white rounded-md">
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

export default EmpLeaveCounts;