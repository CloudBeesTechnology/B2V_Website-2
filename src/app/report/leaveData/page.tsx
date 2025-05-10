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
  remaining: string;
  days: number;
}

const LeaveData: React.FC = () => {
  const [leaveData, setLeaveData] = useState<CombinedData[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const leaveStatusSnap = await getDocs(collection(db, "leaveStatus"));
        const leaveStatusDocs = leaveStatusSnap.docs.map((doc) => doc.data());

        const combined: CombinedData[] = [];
        const currentYear = new Date().getFullYear();
        const currentMonth = new Date().getMonth() + 1;
        for (const leave of leaveStatusDocs) {
          const empQuery = query(
            collection(db, "employeeDetails"),
            where("empID", "==", leave.empID)
          );
          const empSnap = await getDocs(empQuery);
          const empDoc = empSnap.docs[0]?.data();

          if (empDoc) {
            let remaining = 0;
            let totalLeavesTaken = 0;
            for (let month = 1; month <= currentMonth; month++) {
              // Calculate total leaves taken in each month
              const monthlyLeaves = leaveStatusDocs.filter(
                (l) =>
                  l.empID === leave.empID &&
                  new Date(l.startDate).getMonth() + 1 === month &&
                  new Date(l.startDate).getFullYear() === currentYear
              );

              const totalDaysTaken = monthlyLeaves.reduce(
                (sum, l) => sum + (parseFloat(l.takenDay) || 0),
                0
              );

              // Add 1 leave each month
              remaining += 1;
              totalLeavesTaken += totalDaysTaken;

              // Subtract leaves taken in this month
              if (totalDaysTaken >= remaining) {
                remaining = 0;
              } else {
                remaining -= totalDaysTaken;
              }
            }
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
              remaining: remaining.toString(),
            });
          }
        }
        console.log(combined, "combined");

        setLeaveData(combined);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  if (loading)
    return (
      <div className="text-center text-gray-500 my-20 text-lg">Loading...</div>
    );
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
                <td className="py-4">{entry.empID || "N/A"}</td>
                <td className="py-4">{entry.name || "N/A"}</td>
                <td className="py-4">{entry.position || "N/A"}</td>
                <td className="py-4">{entry.totalLeave || 0}</td>
                <td className="py-4">{DateFormat(entry.startDate) || "N/A"}</td>
                <td className="py-4">{DateFormat(entry.endDate) || "N/A"}</td>
                <td className="py-4">{entry.takenDay || "N/A"}</td>
                <td className="py-4 h-[80px]">
                  <div className=" overflow-y-auto h-[80px] ">
                    {entry.leaveReason}
                  </div>
                </td>
                <td className="py-4">{entry.remaining}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
};

export default LeaveData;
