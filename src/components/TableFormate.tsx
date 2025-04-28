"use client";
import Image from "next/image";
import { FaEdit } from "react-icons/fa";
import { useState } from "react";
import avatar from "../../public/assets/employee/avatar.webp";
import { DateFormat } from "./DateFormate";

interface Ovla {
  date: string;
  appType: string;
  duration: string;
  status: string;
}

interface LA {
  empID: string;
  name?: string;
  duration?: string;
  startDate?: string;
  endDate?: string;
  takenDay?: string;
  leaveType?: string;
  leaveStatus?: string;
  remarks?: string;
}

interface EmpLeave {
  empID: string;
  duration: string;
  startDate: string;
  endDate: string;
  leaveType: string;
  takenDay?: string;
  leaveStatus: string;
  remarks?: string;
  leaveReason?:string;
  createdAt?:string;

}

interface allEmployee {
  profile?: string;
  empID: string;
  name: string;
  position: string;
  department: string;
  contact: string;
  email: string;
  createdAt?:string;
}

interface TableProps {
  heading?: string[];
  ovla?: Ovla[];
  list?: "OVLA" | "AllEmp" | "LeaveApproval" | "empLeave";
  allEmp?: allEmployee[];
  leaveApproval?: LA[];
  empLeave?: EmpLeave[];
  filterStatus?: "Approved" | "Rejected";
}

export const TableFormate = ({
  heading,
  ovla = [],
  list,
  allEmp,
  leaveApproval,
  empLeave,
  filterStatus,
}: TableProps) => {
  const [selectedLeave, setSelectedLeave] = useState<EmpLeave | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleRowClick = (data: EmpLeave) => {
    setSelectedLeave(data);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedLeave(null);
  };

  return (
    <>
      <table className="w-full border-collapse">
        {heading && (
          <thead className="text-mediumlite_grey text-sm font-bold text-start w-full">
            <tr>
              {heading.map((val, index) => (
                <th key={index} className="text-start py-2 px-4">
                  {val}
                </th>
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {list === "OVLA" &&
            ovla.slice(0, 4).map((val, index) => (
              <tr key={index} className="text-sm text-medium_gray">
                <td className="text-start py-2 px-4">{val.date || "N/A"}</td>
                <td className="text-start py-2 px-4">{val.appType || "N/A"}</td>
                <td className="text-start py-2 px-4">
                  {val.duration || "N/A"}
                </td>
                <td className="text-start py-2 px-4">{val.status || "N/A"}</td>
              </tr>
            ))}

          {list === "AllEmp" &&
            allEmp?.map((val, index) => (
              <tr key={index} className="text-sm text-medium_gray">
                <td className="text-start py-2 px-4 flex items-center gap-2">
                  <Image
                    src={val.profile || avatar}
                    width={25}
                    height={25}
                    alt={`${val.name} profile`}
                    className="rounded-full"
                  />
                  {val.empID || "N/A"}
                </td>
                <td className="text-start py-2 px-4">{val.name || "N/A"}</td>
                <td className="text-start py-2 px-4">
                  {val.position || "N/A"}
                </td>
                <td className="text-start py-2 px-4">
                  {val.department || "N/A"}
                </td>
                <td className="text-start py-2 px-4">{val.contact || "N/A"}</td>
                <td className="text-start py-2 px-4">{val.email || "N/A"}</td>
                <td className="text-start py-2 px-4">
                  <FaEdit />
                </td>
              </tr>
            ))}

          {list === "LeaveApproval" &&
            leaveApproval?.map((val, index) => {
              let takenDay = "-";
              if (val?.startDate && val?.endDate) {
                const startDate = new Date(val.startDate);
                const endDate = new Date(val.endDate);
                const durationInMs = endDate.getTime() - startDate.getTime();
                takenDay = Math.ceil(
                  durationInMs / (1000 * 60 * 60 * 24)
                ).toString();
              }

              return (
                <tr key={index} className="text-sm text-medium_gray">
                  <td className="text-start py-3 px-4">{val.empID || "N/A"}</td>
                  <td className="text-start py-3 px-4">{val?.name || "N/A"}</td>
                  <td className="text-start py-3 px-4">{takenDay}</td>
                  <td className="text-start py-3 px-4">
                  {val?.startDate ? DateFormat(val.startDate) : "N/A"}
                  </td>
                  <td className="text-start py-3 px-4">
                    {val?.endDate ? DateFormat(val.endDate) : "N/A"}
                  </td>
                  <td className="text-start py-3 px-4">
                    {val?.leaveType || "N/A"}
                  </td>
                  <td className="text-start py-3 px-4">
  <span
    className={`
      ${val?.leaveStatus === "Pending" ? "bg-lite_orange text-medium_orange" : ""}
      ${val?.leaveStatus === "Rejected" ? "bg-lite_red text-medium_red" : ""}
      ${val?.leaveStatus === "Approved" ? "bg-lite_blue text-medium_blue" : ""}
    `}
  >
    {val?.leaveStatus || "N/A"}
  </span>
</td>
                  {filterStatus === "Rejected" && (
                    <td className="text-start py-3 px-4 text-wrap overflow-wrap-break-word w-[250px]">
                      {val?.remarks || "No remarks"}
                    </td>
                  )}
                </tr>
              );
            })}

          {list === "empLeave" &&
            empLeave?.map((val, index) => (
              <tr
                key={index}
                className="text-sm text-medium_gray cursor-pointer hover:bg-gray-100"
                onClick={() => handleRowClick(val)}
              >
                <td className="text-start py-3 px-4 border-b border-t border-morelite_grey">
                  {val.empID || "N/A"}
                </td>
                <td className="text-start py-3 px-4 border-b border-t border-morelite_grey">
                  {val.takenDay || "N/A"}
                </td>
                <td className="text-start py-3 px-4 border-b border-t border-morelite_grey">
                  {val.startDate ? DateFormat(val.startDate) : "N/A"}
                </td>
                <td className="text-start py-3 px-4 border-b border-t border-morelite_grey">
                  {val.endDate ? DateFormat(val.endDate): "N/A"}
                </td>
                <td className="text-start py-3 px-4 border-b border-t border-morelite_grey">
                  {val.leaveType || "N/A"}
                </td>
                <td className="text-start py-3 px-4">
  <span
    className={`
      ${val?.leaveStatus === "Pending" ? "bg-lite_orange text-medium_orange" : ""}
      ${val?.leaveStatus === "Rejected" ? "bg-lite_red text-medium_red" : ""}
      ${val?.leaveStatus === "Approved" ? "bg-lite_blue text-medium_blue" : ""}
    `}
  >
    {val?.leaveStatus || "N/A"}
  </span>
</td>
{/* <td className="text-start py-3 px-4 border-b border-t border-morelite_grey">
  {val.createdAt ? (
    <>
      <div>{new Date(val.createdAt).toLocaleDateString()}</div>
      <div className="text-sm text-gray-500">
        {new Date(val.createdAt).toLocaleTimeString()}
      </div>
    </>
  ) : "N/A"}
</td> */}
              </tr>
            ))}
        </tbody>
      </table>

      {isPopupOpen && selectedLeave && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0000004d] bg-opacity-50">
    <div className="bg-white rounded-lg max-w-md w-full relative">
      <button
        onClick={closePopup}
        className="absolute top-3 right-5 text-white"
      >
        ✖
      </button>
      <h2 className="text-lg text-center text-white py-2 font-semibold mb-4 bg-[#319CE5] w-full">
        Details
      </h2>
      <div className="p-6">
        <table className="w-full text-sm text-left border-separate border-spacing-y-2">
          <tbody>
            <tr>
              <td className="font-semibold text-gray-700">Employee ID</td>
              <td>{selectedLeave.empID}</td>
            </tr>
            <tr>
              <td className="font-semibold text-gray-700">Leave Type</td>
              <td>{selectedLeave.leaveType}</td>
            </tr>
            <tr>
              <td className="font-semibold text-gray-700">Start Date</td>
              <td>{DateFormat(selectedLeave.startDate)}</td>
            </tr>
            <tr>
              <td className="font-semibold text-gray-700">End Date</td>
              <td>{DateFormat(selectedLeave.endDate)}</td>
            </tr>
            <tr>
              <td className="font-semibold text-gray-700">Reason</td>
              <td>{selectedLeave.leaveReason}</td>
            </tr> 
            <tr>
              <td className="font-semibold text-gray-700 w-[200px] text-wrap overflow-wrap-break-word">Remarks</td>
              <td>{selectedLeave.remarks || "No Remarks"}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
)}


    </>
  );
};
