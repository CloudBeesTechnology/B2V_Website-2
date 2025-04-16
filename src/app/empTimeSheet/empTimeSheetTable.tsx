"use client"
import { FaRegSquarePlus } from "react-icons/fa6";

// Define the type for timesheet records
interface TimeSheetRecord {
  day: string;
  date: string;
  task: string;
  totalHours: string;
}

// Sample timesheet data
const timeSheetData: TimeSheetRecord[] = [
  {
    day: "Mon",
    date: "Mar 03 2025",
    task: "Worked poster design",
    totalHours: "8:00 hrs",
  },
  {
    day: "Tues",
    date: "Mar 04 2025",
    task: "Mobile screen worked",
    totalHours: "8:00 hrs",
  },
];

const EmpTimeSheetTable: React.FC = () => {
  return (
    <section className="overflow-hidden px-5 my-10 mx-20 bg-white rounded-xl">
      <table className="table-fixed w-full border-separate border-spacing-y-5">
        <thead className="bg-primary text-white text-base font-semibold">
          <tr className="h-[44px]">
            <th className="px-4 py-2 rounded-tl-lg">Days</th>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Task Description</th>
            <th className="px-4 py-2 last:rounded-tr-lg">Total Hours</th>
          </tr>
        </thead>
        <tbody>
          {timeSheetData.map((entry, index) => (
            <tr key={index} className="text-center">
              <td>
                <span className="px-7 py-3 border border-[#EDEDED] rounded-lg">
                  {entry.day}
                </span>
              </td>
              <td>
                <span className="px-7 py-3 border border-[#EDEDED] rounded-lg">
                  {entry.date}
                </span>
              </td>
              <td>
                <div className="flex justify-between items-center px-7 py-3 border border-[#EDEDED] rounded-lg">
                  <span>{entry.task}</span>
                  <span className="medium_gray">
                    <FaRegSquarePlus />
                  </span>
                </div>
              </td>
              <td>
                <span className="px-7 py-3 border border-[#EDEDED] rounded-lg">
                  {entry.totalHours}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="text-center">
            <td colSpan={3} className="text-end text_size_8 text-gray">
              <span>Total</span>
            </td>
            <td className="py-3">
              <span className="px-7 py-3 border border-[#EDEDED] rounded-lg">
                {timeSheetData.reduce(
                  (total, entry) =>
                    total +
                    parseFloat(entry.totalHours.replace(" hrs", "")),
                  0
                )}
                :00 hrs
              </span>
            </td>
          </tr>
        </tfoot>
      </table>
    </section>
  );
};

export default EmpTimeSheetTable;
