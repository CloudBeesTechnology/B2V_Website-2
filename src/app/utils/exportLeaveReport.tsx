import * as XLSX from "xlsx";
import { DateFormat } from "@/components/DateFormate";

// interface
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

// Main export function
export const exportLeaveReport = (
  groupedData: Record<string, CombinedData[]>,
  startDate: string,
  endDate: string,
  calculateRemainingLeave: (leaves: CombinedData[]) => number
) => {
  const excelData = Object.values(groupedData).flatMap(employeeLeaves => {
    const filteredLeaves = employeeLeaves.filter((leave) => {
      const leaveStartDate = new Date(leave.startDate);
      const leaveEndDate = new Date(leave.endDate);
      const currentMonth = new Date().getMonth() + 1;
      const currentYear = new Date().getFullYear();

      if (startDate && endDate) {
        const startFilterDate = new Date(startDate);
        const endFilterDate = new Date(endDate);
        return leaveStartDate >= startFilterDate && leaveEndDate <= endFilterDate;
      }

      return leaveStartDate.getMonth() + 1 === currentMonth &&
             leaveStartDate.getFullYear() === currentYear;
    });

    if (filteredLeaves.length === 0) return [];

    const totalTakenDays = filteredLeaves.reduce(
      (sum, leave) => sum + (parseFloat(leave.takenDay) || 0),
      0
    );

    const remainingLeave = calculateRemainingLeave(filteredLeaves);

    const leaveEntries = filteredLeaves.map(entry => ({
      'Emp ID': entry.empID || "N/A",
      'Name': entry.name || "N/A",
      'Position': entry.position || "N/A",
      'Total Leave Assigned': entry.totalLeave || 0,
      'Start Date': DateFormat(entry.startDate) || "N/A",
      'End Date': DateFormat(entry.endDate) || "N/A",
      'Type': entry.leaveType.charAt(0).toUpperCase() + entry.leaveType.slice(1).toLowerCase() || "N/A",
      'Reason': entry.leaveReason || "N/A",
      'Taken Leave': entry.takenDay || "N/A",
      'Remaining Leave': "",
      'Entry Type': 'Leave Detail'
    }));

    const summaryEntry = {
      'Emp ID': filteredLeaves[0].empID || "N/A",
      'Name': `Total for ${filteredLeaves[0].name}`,
      'Position': "",
      'Total Leave Assigned': "",
      'Start Date': "",
      'End Date': "",
      'Type': "",
      'Reason': "",
      'Taken Leave': totalTakenDays || 0,
      'Remaining Leave': remainingLeave,
      'Entry Type': 'Summary'
    };

    return [...leaveEntries, summaryEntry];
  });

  const ws = XLSX.utils.json_to_sheet(excelData);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Leave Report");

  const date = new Date();
  const fileName = `Leave_Report_${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}.xlsx`;

  XLSX.writeFile(wb, fileName);
};
