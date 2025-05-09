"use client";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebaseConfig"; // adjust based on your firebase config path
import {
  collection,
  getDocs,
  query,
  where,
  DocumentData,
} from "firebase/firestore";
import { DateFormat } from "@/components/DateFormate";

interface CombinedData {
  empID: string;
  name: string;
  position: string;
  leaveDate: string;
  leaveType: string;
  leaveReason: string;
  totalLeave: string;
  takenDay: string;
  startDate: string;
  endDate: string;
  days: number;
}

const LeaveData: React.FC = () => {
  const [leaveData, setLeaveData] = useState<CombinedData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const leaveStatusSnap = await getDocs(collection(db, "leaveStatus"));
      const leaveStatusDocs = leaveStatusSnap.docs.map((doc) => doc.data());

      const combined: CombinedData[] = [];

      for (const leave of leaveStatusDocs) {
        const empQuery = query(
          collection(db, "employeeDetails"),
          where("empID", "==", leave.empID)
        );
        const empSnap = await getDocs(empQuery);
        const empDoc = empSnap.docs[0]?.data();

        if (empDoc) {
          combined.push({
            empID: leave.empID,
            name: empDoc.name,
            position: empDoc.position,
            totalLeave: empDoc.totalLeave, 

            leaveDate: leave.date, // adjust field name if different
            startDate: leave.startDate, // adjust field name if different
            endDate: leave.endDate, // adjust field name if different
            leaveType: leave.type, // adjust field name if different
            leaveReason: leave.leaveReason, // adjust field name if different
            takenDay: leave.takenDay, // adjust field name if different
            days: leave.days, // adjust field name if different
          });
        }
      }

      setLeaveData(combined);
    };

    fetchData();
  }, []);

  return (
    <main>
      <header className="center text-2xl font-medium text-gray my-10">
        <header>Reports</header>
      </header>

      <section className="bg-white rounded-xl p-5 my-7">
        <table className="table-fixed w-full">
          <thead>
            <tr className="text-center bg-primary text-white text_size_4">
              <th className="py-3">Emp ID</th>
              <th className="py-3">Name</th>
              <th className="py-3">Position</th>
              <th className="py-3">Total Leave</th>
              <th className="py-3">Start Date</th>
              <th className="py-3">End Date</th>
              <th className="py-3">taken Leave</th>
              <th className="py-3">leave Reason</th>
              <th className="py-3">Remaining Days</th>
            </tr>
          </thead>
          <tbody>
            {leaveData.map((entry, idx) => (
              <tr
                key={idx}
                className="text-center border-b border-[#D2D2D240] text_size_4 text-gray"
              >
                <td className="py-4">{entry.empID}</td>
                <td className="py-4">{entry.name}</td>
                <td className="py-4">{entry.position}</td>
                <td className="py-4">{entry.totalLeave}</td>
                <td className="py-4">{DateFormat(entry.startDate)}</td>
                <td className="py-4">{DateFormat(entry.endDate)}</td>
                <td className="py-4">{entry.takenDay}</td>
                <td className="py-4 h-[80px]">
  <div className=" overflow-y-auto h-[80px] ">
    {entry.leaveReason}
  </div>
</td>
                <td className="py-4">{entry.days}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
};

export default LeaveData;
