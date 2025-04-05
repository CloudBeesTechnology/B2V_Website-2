interface LeaveRecord {
  name: string;
  duration: number;
  startDate: string;
  endDate: string;
  type: string;
  reason: string;
  status: "Processing" | "Rejected";
}

const leaveData: LeaveRecord[] = [
  {
    name: "Feven Tesfaye",
    duration: 120,
    startDate: "22/04/2024",
    endDate: "28/06/2025",
    type: "Maternity",
    reason: "Child Care",
    status: "Processing",
  },
  {
    name: "Feven Tesfaye",
    duration: 120,
    startDate: "22/04/2024",
    endDate: "28/06/2025",
    type: "Maternity",
    reason: "Child Care",
    status: "Rejected",
  },
  {
    name: "Feven Tesfaye",
    duration: 120,
    startDate: "22/04/2024",
    endDate: "28/06/2025",
    type: "Maternity",
    reason: "Child Care",
    status: "Rejected",
  },
];
const EmpLeaveStatusTable: React.FC = () => {
  return (
    <section className="mt-10 rounded bg-white p-5">
      <div className="text-xl font-semibold py-5 px-14">
        <h2>Apply Leaves</h2>
      </div>

      <table className="table-fixed w-full ">
        <thead>
          <tr className="text-center text-gray text_size_4 ">
            <th className="py-5">Name</th>
            <th className="py-5">Duration</th>
            <th className="py-5">Start Date</th>
            <th className="py-5">End Date</th>
            <th className="py-5">Type</th>
            <th className="py-5">Reason</th>
            <th className="py-5">Actions</th>
          </tr>
        </thead>
        <tbody>
        {leaveData.map((leave, index) => (
            <tr key={index} className="text-center border-b border-[#D2D2D240] text-gray font-medium">
              <td className="py-5">{leave.name}</td>
              <td className="py-5">{leave.duration}</td>
              <td className="py-5">{leave.startDate}</td>
              <td className="py-5">{leave.endDate}</td>
              <td className="py-5">{leave.type}</td>
              <td className="py-5">{leave.reason}</td>
              <td>
                <span
                  className={`text-[13px] font-medium py-1 px-2 rounded-sm ${
                    leave.status === "Processing"
                      ? "text-approved_blue bg-lite_blue"
                      : "text-medium_red bg-lite_red"
                  }`}
                >
                  {leave.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};
export default EmpLeaveStatusTable;
