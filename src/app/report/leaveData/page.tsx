"use client";
import React from "react";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebaseConfig";
import { MdOutlineDownloading } from "react-icons/md";
import { collection, getDocs, query, where } from "firebase/firestore";
import { DateFormat } from "@/components/DateFormate";
import { exportLeaveReport } from "@/app/utils/exportLeaveReport";
import { FloatingActionButton } from "../../utils/FloatingActionButton";
import SearchBox from "@/app/utils/searchbox";

interface leaveDataType {
  empID?: string;
  [key: string]: any;
}


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
  effectiveDate: string;
  managerStatus: string;
}

const LeaveData: React.FC = () => {
  const [leaveData, setLeaveData] = useState<CombinedData[]>([]);
  const [filteredLeaveData, setFilteredLeaveData] = useState<CombinedData[]>([]);
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const leaveStatusQuery = query(
          collection(db, "leaveStatus"),
          where("managerStatus", "==", "Approved")
        );
        const leaveStatusSnap = await getDocs(leaveStatusQuery);
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
              leaveDate: leave.date,
              startDate: leave.startDate,
              endDate: leave.endDate,
              leaveType: leave.leaveType,
              leaveReason: leave.leaveReason,
              takenDay: leave.takenDay,
              days: leave.days,
              effectiveDate: empDoc.effectiveDate,
              managerStatus: leave.managerStatus,
            });
          }
        }
        setLeaveData(combined);
        setFilteredLeaveData(combined);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleFilter = (filteredData: leaveDataType | any) => {
    if (Array.isArray(filteredData) && filteredData.length > 0) {
      setFilteredLeaveData(filteredData);
    } else {
      setFilteredLeaveData(leaveData);
    }
  };

  const calculateRemainingLeave = (leaves: CombinedData[]): number => {
    if (!leaves.length) return 0;

    const effectiveDate = new Date(leaves[0].effectiveDate);
    const eligibilityDate = new Date(effectiveDate);
    eligibilityDate.setFullYear(eligibilityDate.getFullYear() + 1);

    const now = new Date();
    const currentYear = now.getFullYear();

    // console.log("=== Summary Row ===");
    // console.log("Effective Date:", effectiveDate.toISOString());
    // console.log("Eligibility Date (+1yr):", eligibilityDate.toISOString());
    // console.log("Today:", now.toISOString());

    let remaining = 0;

    const isEligible =
      now.getFullYear() > eligibilityDate.getFullYear() ||
      (now.getFullYear() === eligibilityDate.getFullYear() &&
        now.getMonth() >= eligibilityDate.getMonth());

    if (isEligible) {
      const accrualStart = new Date(
        Math.max(
          new Date(currentYear, 0, 1).getTime(),
          eligibilityDate.getTime()
        )
      );

      const datePointer = new Date(accrualStart);

      while (datePointer.getFullYear() === currentYear && datePointer <= now) {
        remaining += 1;
        datePointer.setMonth(datePointer.getMonth() + 1);
      }

      // Count ALL approved leaves for the current year (both past and future)
      const totalApprovedLeaveDays = leaves.reduce((total, leave) => {
        const leaveStart = new Date(leave.startDate);
        if (leaveStart.getFullYear() === currentYear) {
          total += parseFloat(leave.takenDay) || 0;
        }
        return total;
      }, 0);

      // console.log("Leave earned this year:", remaining);
      // console.log("Total approved leaves (past + future):", totalApprovedLeaveDays);

      remaining -= totalApprovedLeaveDays;
      return Math.max(0, remaining);
    }

    return 0;
  };

  const groupedData = filteredLeaveData.reduce((acc, entry) => {
    acc[entry.empID] = acc[entry.empID] || [];
    acc[entry.empID].push(entry);
    return acc;
  }, {} as Record<string, CombinedData[]>);

  if (loading)
    return (
      <div className="text-center text-gray-500 my-20 text-lg">Loading...</div>
    );

  const handleDownloadExcel = () => {
    exportLeaveReport(groupedData, startDate, endDate, calculateRemainingLeave);
  };

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
        <div className="mt-auto">
          <SearchBox primaryData={leaveData} handleFilter={handleFilter} identify={"leaveDataReport"}/>
        </div>
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
            {groupedData && Object.values(groupedData).length > 0 ? (Object.values(groupedData).map((employeeLeaves, empIndex) => {
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

                const totalApprovedLeaveDays = employeeLeaves.reduce(
                  (total, leave) => {
                    const leaveStart = new Date(leave.startDate);
                    if (leaveStart.getFullYear() === new Date().getFullYear()) {
                      total += parseFloat(leave.takenDay) || 0;
                    }
                    return total;
                  },
                  0
                );

                const remainingLeave = calculateRemainingLeave(filteredLeaves);

              return (
                <React.Fragment key={employeeLeaves[0].empID}>
                  {Array.isArray(filteredLeaves) && filteredLeaves.length > 0
                    ? filteredLeaves.map((entry, idx) => {
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
                          <td className="py-4 ">{entry.leaveType.charAt(0).toUpperCase() + entry.leaveType.slice(1).toLowerCase() || "N/A"}</td>
                          <td className="py-4 h-[80px]">
                            <div className="overflow-y-auto h-[80px]">
                              {entry.leaveReason || "N/A"}
                            </div>
                          </td>
                          <td className="py-4">{entry.takenDay || "N/A"}</td>
                        </tr>
                      );
                    }) : ""}
                  {/* Summary row */}
                  {/* <tr className="text-center font-semibold bg-gray-100">
                    <td colSpan={8} className="py-4">Total for {filteredLeaves[0].name}</td>
                        <td className="py-4">{totalTakenDays || 0}</td>
                    <td className="relative group py-4 ${remainingLeave <= 1 ? 'text-red-500' : 'text-green-600'}">
                      {remainingLeave}
                      <span className="invisible group-hover:visible absolute z-10 left-1/2 transform -translate-x-1/2 text-xs p-1 rounded shadow-lg border">
                        Includes {totalApprovedLeaveDays} approved days (past + future)
                      </span>
                    </td>
                  </tr> */}
                  <tr className="text-center font-semibold bg-gradient-to-r from-gray-100 to-gray-200 transition-all duration-300">
                    <td colSpan={8} className="py-4 text-lg text-gray-700">
                      Total for <span className="text-primary">{filteredLeaves[0].name}</span>
                    </td>
                    <td className="py-4 text-blue-700 text-lg">{totalTakenDays || 0}</td>
                    <td
                      className={`relative group py-4 text-lg font-bold ${remainingLeave <= 1 ? 'text-red-500' : 'text-green-600'
                        }`}
                      >
                        {remainingLeave}
                        {/* <span className="invisible group-hover:visible absolute z-10 bottom-[50px] left-1/2 -translate-x-1/2 mt-2 w-56 text-sm bg-white text-gray-800 p-2 rounded-md shadow-xl border border-gray-200 transition-opacity duration-300">
                        Includes <span className="font-semibold">{totalApprovedLeaveDays}</span> approved days (past + present + future)
                      </span> */}
                    </td>
                  </tr>

                </React.Fragment>
              );
            })) : (
              <tr className="text-center text-gray text_size_4">
                <td colSpan={10} className="py-4">
                  No data Available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div>
          <FloatingActionButton
            icon={<MdOutlineDownloading size={32} />}
            onClick={handleDownloadExcel}
            backgroundColor="primary"
            iconColor="text-white"
            className="bg-primary"
          />
        </div>
      </section>
    </main>
  );
};

export default LeaveData;
