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
  // remaining?: string;
  days: number;
}

const LeaveData: React.FC = () => {
  const [leaveData, setLeaveData] = useState<CombinedData[]>([]);
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

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
          // console.log(empDoc,"empDoc");

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
              leaveType: leave.leaveType, // adjust field name if different
              leaveReason: leave.leaveReason, // adjust field name if different
              takenDay: leave.takenDay, // adjust field name if different
              days: leave.days, // adjust field name if different
              // remaining: remaining.toString(),
            });
          }
        }
        // console.log(combined, "combined");

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
  const groupedData = leaveData.reduce((acc, entry) => {
    acc[entry.empID] = acc[entry.empID] || [];
    acc[entry.empID].push(entry);
    return acc;
  }, {} as Record<string, CombinedData[]>);
  return (
    <main>
      <header className="center text-2xl font-medium text-gray my-10">
        <header>
          Reports - {new Date().toLocaleString("default", { month: "long" })}
        </header>
      </header>
      <section className="flex justify-between items-center my-10">
        <div className="flex justify-start  items-center gap-7">
          <div className="flex gap-5 ">
            <div className="flex flex-col">
              <label className="text-[#7E7D7D] mb-1">Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="border border-[#9D9393]   text-gray rounded px-3 py-2"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-[#7E7D7D] mb-1">End Date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="border border-[#9D9393] text-gray rounded px-3 py-2"
              />
            </div>
          </div>
        </div>
        <div className="mt-auto">{/* <Searchbox /> */}</div>
      </section>
      <section className="bg-white rounded-xl p-5 my-7">
        <table className="table-fixed w-full">
          <thead>
            <tr className="text-center bg-primary text-white text_size_4">
              <th className="py-3">Emp ID</th>
              <th className="py-3">Name</th>
              <th className="py-3">Position</th>
              <th className="py-3">Total Leave Assigned</th>
              <th className="py-3">Start Date</th>
              <th className="py-3">End Date</th>
              <th className="py-3">Type</th>
              <th className="py-3">Reason</th>
              <th className="py-3">Taken Leave</th>
              <th className="py-3">Remaining</th>
            </tr>
          </thead>
          <tbody>
            {Object.values(groupedData).map((employeeLeaves, empIndex) => {
              // Parse the selected start and end dates
              const startFilterDate = startDate ? new Date(startDate) : null;
              const endFilterDate = endDate ? new Date(endDate) : null;

              // Filter leaves based on the selected date range
              const filteredLeaves = employeeLeaves.filter((leave) => {
                const leaveStartDate = new Date(leave.startDate);
                const leaveEndDate = new Date(leave.endDate);

                // If no date range is selected, default to current month
                const currentMonth = new Date().getMonth() + 1;
                const currentYear = new Date().getFullYear();

                if (startFilterDate && endFilterDate) {
                  return (
                    leaveStartDate >= startFilterDate &&
                    leaveEndDate <= endFilterDate
                  );
                }

                // Default to current month if no range selected
                return (
                  leaveStartDate.getMonth() + 1 === currentMonth &&
                  leaveStartDate.getFullYear() === currentYear
                );
              });

              if (filteredLeaves.length === 0) return null;

              const totalTakenDays = filteredLeaves.reduce(
                (sum, leave) => sum + (parseFloat(leave.takenDay) || 0),
                0
              );

              const remainingDays =
                parseFloat(employeeLeaves[0].totalLeave) - totalTakenDays;

              return (
                <>
                  {filteredLeaves.map((entry, idx) => {
                    // console.log(entry,"entery");

                    return (
                      <tr
                        key={`${empIndex}-${idx}`}
                        className="text-center border-b border-[#D2D2D240] text_size_4 text-gray"
                      >
                        <td className="py-4">{entry.empID || "N/A"}</td>
                        <td className="py-4">{entry.name || "N/A"}</td>
                        <td className="py-4">{entry.position || "N/A"}</td>
                        <td className="py-4">{entry.totalLeave || 0}</td>
                        <td className="py-4">
                          {DateFormat(entry.startDate) || "N/A"}
                        </td>
                        <td className="py-4">
                          {DateFormat(entry.endDate) || "N/A"}
                        </td>
                        <td className="py-4 ">{entry.leaveType.charAt(0).toUpperCase()+entry.leaveType.slice(1).toLowerCase() || "N/A"}</td>
                        <td className="py-4 h-[80px]">
                          <div className="overflow-y-auto h-[80px]">
                            {entry.leaveReason || "N/A"}
                          </div>
                        </td>
                        <td className="py-4">{entry.takenDay || "N/A"}</td>
                        {/* <td className="py-4">{entry.remaining}</td> */}
                      </tr>
                    );
                  })}
                  {/* Summary row */}
                  <tr className="text-center font-semibold bg-gray-100">
                    <td colSpan={8 } className="py-4">Total for {filteredLeaves[0].name}</td>

                    <td className="py-4">{totalTakenDays || 0}</td>
                    <td className="py-4">{remainingDays || 0}</td>
                  </tr>
                </>
              );
            })}
          </tbody>

          {/* <tbody>
            {Object.values(groupedData).filter((month)=> month.startDate && month.endDate === current Month).map((employeeLeaves, empIndex) => {
              const totalTakenDays = employeeLeaves.reduce(
                (sum, leave) => sum + (parseFloat(leave.takenDay) || 0),
                0
              );
              const remainingDays =
                parseFloat(employeeLeaves[0].totalLeave) - totalTakenDays;

              return (
                <>
                  {employeeLeaves.map((entry, idx) => (
                    <tr
                      key={`${empIndex}-${idx}`}
                      className="text-center border-b border-[#D2D2D240] text_size_4 text-gray"
                    >
                      <td className="py-4">{entry.empID || "N/A"}</td>
                      <td className="py-4">{entry.name || "N/A"}</td>
                      <td className="py-4">{entry.position || "N/A"}</td>
                      <td className="py-4">{entry.totalLeave || 0}</td>
                      <td className="py-4">
                        {DateFormat(entry.startDate) || "N/A"}
                      </td>
                      <td className="py-4">
                        {DateFormat(entry.endDate) || "N/A"}
                      </td>
                      <td className="py-4">{entry.takenDay || "N/A"}</td>
                      <td className="py-4 h-[80px]">
                        <div className="overflow-y-auto h-[80px]">
                          {entry.leaveReason || "N/A"}
                        </div>
                      </td>
                      <td className="py-4">{entry.remaining}</td>
                    </tr>
                  ))}
                  {/* Summary row */}
          {/* <tr className="text-center font-semibold bg-gray-100">
                    <td colSpan={6}>Total for {employeeLeaves[0].name}</td>
                    <td>{totalTakenDays}</td>
                    <td>-</td>
                    <td>{remainingDays}</td>
                  </tr>
                </>
              );
            })}
          </tbody> */}
          {/* <tbody>
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
          </tbody> */}
        </table>
      </section>
    </main>
  );
};

export default LeaveData;
