import { IoIosArrowDropdownCircle } from "react-icons/io";

type LeaveData = {
  id: number;
  name: string;
  duration: number;
  startDate: string;
  endDate: string;
  type: string;
  reason: string;
  status: "Approved" | "Rejected" | "Action";
};

const LeaveTable: React.FC = () => {
  const leaveTableData: LeaveData[] = [
    {
      id: 1,
      name: "Krishna",
      duration: 5,
      startDate: "22/04/2022",
      endDate: "28/04/2022",
      type: "Sick",
      reason: "Personal",
      status: "Action",
    },
    {
      id: 2,
      name: "Krishna",
      duration: 5,
      startDate: "22/04/2022",
      endDate: "28/04/2022",
      type: "Sick",
      reason: "Personal",
      status: "Approved",
    },
    {
      id: 3,
      name: "Madhava",
      duration: 5,
      startDate: "22/04/2022",
      endDate: "28/04/2022",
      type: "Sick",
      reason: "Personal",
      status: "Rejected",
    },
  ];
  return (
    <table className="table-fixed w-full ">
      <thead>
        <tr className="text-center text-gray text_size_4">
          <th className="py-3">Name(s)</th>
          <th className="py-3">Duration(s)</th>
          <th className="py-3">Start Date</th>
          <th className="py-3">End Date</th>
          <th className="py-3">Type</th>
          <th className="py-3">Reason(s)</th>
          <th className="py-3">Actions</th>
        </tr>
      </thead>
      <tbody>
        {leaveTableData.map((item) => {
          return (
            <tr className="text-center text-gray text_size_6 border-b border-[#D2D2D240]">
              <td className="py-4">{item.name}</td>
              <td className="py-4">{item.duration}</td>
              <td className="py-4">{item.startDate}</td>
              <td className="py-4">{item.endDate}</td>
              <td className="py-4">{item.type}</td>
              <td className="py-4">{item.reason}</td>
              <td className="py-4 center">
                <div
                  className={`text-medium_blue text-[13px] w-fit center font-medium bg-lite_blue py-1 px-2 rounded-sm space-x-3 ${
                    item.status === "Action"
                      ? "text-medium_orange bg-lite_orange"
                      : item.status === "Approved"
                      ? "text-medium_blue bg-lite_blue"
                      : item.status === "Rejected"
                      ? "text-medium_red bg-lite_red "
                      : ""
                  } `}
                >
                  <span>{item.status}</span>
                  {item.status === "Action" && (
                    <span className="text_size_5">
                      <IoIosArrowDropdownCircle />
                    </span>
                  )}
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
export default LeaveTable;
