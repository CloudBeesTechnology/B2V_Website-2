"use client";
import Image from "next/image";
import { FaEdit } from "react-icons/fa";
import { useState } from "react";
import avatar from "../../public/assets/employee/avatar.webp";
import { DateFormat } from "./DateFormate";
import { UseEmployeeList } from "@/app/utils/EmpContext";
import { useRouter } from "next/navigation";

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
  reason?: string;
  leaveReason?: string;
}

interface EmpLeave {
  empID: string;
  duration: string;
  startDate: string;
  endDate: string;
  leaveType: string;
  takenDay?: string;
  leaveStatus: string;
  finalStatus?: string;
  remarks?: string;
  leaveReason?: string;
  createdAt?: string;
}

interface empPermission {
  empID: string;
  date: string;
  hours: string;
  reason: string;
  status: string;
}
interface permissionList {
  empID: string;
  name: string;
  date: string;
  hours: string;
  reason: string;
  status: string;
  remarks?: string;
}

interface allEmployee {
  profile?: string;
  empID: string;
  name: string;
  position: string;
  department: string;
  contact: string;
  email: string;
  createdAt?: string;
}

interface TableProps {
  heading?: string[];
  ovla?: Ovla[];
  list?:
    | "OVLA"
    | "AllEmp"
    | "LeaveApproval"
    | "empLeave"
    | "empPermission"
    | "permissionList";
  allEmp?: allEmployee[];
  leaveApproval?: LA[];
  permissionList?: permissionList[];
  secondaryEmpPermission?: empPermission[];
  secondaryEmpLeave?: EmpLeave[];
  filterStatus?: "Approved" | "Rejected";
  viewData?: (data: allEmployee) => void;
  handleLeaveDetails?: (data: any) => void;
}

export const TableFormate = ({
  heading,
  ovla = [],
  list,
  allEmp,
  leaveApproval,
  permissionList,
  secondaryEmpPermission,
  secondaryEmpLeave,
  filterStatus,
  viewData,
  handleLeaveDetails,
}: TableProps) => {
  const [selectedLeave, setSelectedLeave] = useState<EmpLeave | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const router = useRouter();
  const { handleStoredData } = UseEmployeeList();
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
      <table className="w-full border-collapse table-fixed">
        {heading && (
          <thead className="text-mediumlite_grey text-sm font-bold w-full">
            <tr className="text-center border-b border-morelite_grey">
              {heading.map((val, index) => (
                <th key={index} className="py-2 px-4">
                  {val}
                </th>
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {list === "OVLA" &&
            ovla.slice(0, 4).map((val, index) => (
              <tr
                key={index}
                className="text-center text-sm text-medium_gray border-b border-morelite_grey"
              >
                <td className=" py-2 px-4">{val.date || "N/A"}</td>
                <td className=" py-2 px-4">{val.appType || "N/A"}</td>
                <td className=" py-2 px-4">{val.duration || "N/A"}</td>
                <td className=" py-2 px-4">{val.status || "N/A"}</td>
              </tr>
            ))}

          {list === "AllEmp" &&
            allEmp
              ?.sort((a, b) => {
                const numA = parseInt(a.empID?.replace(/\D/g, "") || "0");
                const numB = parseInt(b.empID?.replace(/\D/g, "") || "0");
                return numA - numB; // For ascending order. Use b - a for descending.
              })

              .map((val, index) => (
                <tr
                  key={index}
                  className="text-center text-sm text-medium_gray border-b border-morelite_grey"
                >
                  <td className=" py-2 px-4 flex items-center gap-2">
                    <Image
                      src={val.profile || avatar}
                      width={25}
                      height={25}
                      alt={`${val.name} profile`}
                      className="rounded-full"
                    />
                    {val.empID || "N/A"}
                  </td>
                  <td className=" py-2 px-4">{val.name || "N/A"}</td>
                  <td className=" py-2 px-4">{val.position || "N/A"}</td>
                  <td className=" py-2 px-4">{val.department || "N/A"}</td>
                  <td className=" py-2 px-4">{val.contact || "N/A"}</td>
                  <td className=" py-2 px-4 break-words overflow-hidden">
                    {val.email || "N/A"}
                  </td>
                  <td
                    className="text-center text-primary py-2 px-4"
                    onClick={() => viewData?.(val)}
                  >
                    View
                  </td>
                  <td
                    className="center py-2 px-4"
                    onClick={() => {
                      handleStoredData(val);
                      router.push("/employeeDetails");
                      // console.log("784512qawesdrtfgyhujk");
                    }}
                  >
                    <FaEdit />
                  </td>
                </tr>
              ))}

          {list === "LeaveApproval" &&
            leaveApproval?.map((val, index) => {
              // console.log(val?.name, val);

              return (
                <tr
                  key={index}
                  className="text-center text-sm text-medium_gray border-b border-morelite_grey"
                >
                  <td className=" py-3 px-4">{val.empID || "N/A"}</td>
                  <td className=" py-3 px-4">{val?.name || "N/A"}</td>
                  <td className=" py-3 px-4">{val?.leaveType || "N/A"}</td>
                  <td className=" py-3 px-4">
                    {val?.startDate ? DateFormat(val.startDate) : "N/A"}
                  </td>
                  <td className=" py-3 px-4">
                    {val?.endDate ? DateFormat(val.endDate) : "N/A"}
                  </td>
                  <td className=" py-3 px-4">{val?.duration}</td>
                  <td className=" py-3 px-4">{val?.leaveReason}</td>
                  <td
                    className="text-approved_blue text-center px-4 py-2"
                    onClick={() => handleLeaveDetails?.(val)}
                  >
                    View
                  </td>
                  {filterStatus === "Rejected" && (
                    <td className=" py-3 px-4 text-wrap overflow-wrap-break-word w-[250px]">
                      {val?.remarks || "No remarks"}
                    </td>
                  )}
                </tr>
              );
            })}

          {list === "empPermission" &&
            secondaryEmpPermission?.map((val, index) => {
              return (
                <tr
                  key={index}
                  className="text-center text-sm text-medium_gray border-b border-morelite_grey"
                >
                  <td className=" py-3 px-4">{val.empID || "N/A"}</td>
                  <td className=" py-3 px-4">{val?.hours || "N/A"}</td>

                  <td className=" py-3 px-4">
                    {val?.date ? DateFormat(val?.date) : "N/A"}
                  </td>

                  <td className=" py-3 px-4">{val?.reason}</td>

                  <td className=" py-3 px-4">
                    <span
                      className={`
                        px-2 py-1 rounded
      ${
        val?.status === "Pending"
          ? "bg-lite_orange text-medium_orange"
          : val?.status === "Rejected"
          ? "bg-lite_red text-medium_red"
          : val?.status === "Approved"
          ? "bg-lite_blue text-medium_blue"
          : ""
      }
     
    `}
                    >
                      {val?.status || "N/A"}
                    </span>
                  </td>
                </tr>
              );
            })}

          {list === "permissionList" &&
            permissionList?.map((val, index) => {
              return (
                <tr
                  key={index}
                  className="text-center text-sm text-medium_gray border-b border-morelite_grey"
                >
                  <td className=" py-3 px-4">{val.empID || "N/A"}</td>
                  <td className=" py-3 px-4">{val.name || "N/A"}</td>
                  <td className=" py-3 px-4">
                    {val?.date ? DateFormat(val?.date) : "N/A"}
                  </td>
                  <td className=" py-3 px-4">{val?.hours || "N/A"}</td>
                  <td className=" py-3 px-4">{val?.reason}</td>

                  <td className=" py-3 px-4">
                    <span
                      className={`
      ${val?.status === "Pending" ? "bg-lite_orange text-medium_orange" : ""}
      ${val?.status === "Rejected" ? "bg-lite_red text-medium_red" : ""}
      ${val?.status === "Approved" ? "bg-lite_blue text-medium_blue" : ""}
    `}
                    >
                      {val?.status || "N/A"}
                    </span>
                  </td>
                  {/* {filterStatus === "Rejected" && (
                    <td className=" py-3 px-4 text-wrap overflow-wrap-break-word w-[250px]">
                      {val?.remarks || "No remarks"}
                    </td>
                  )} */}
                </tr>
              );
            })}

          {list === "empLeave" &&
            secondaryEmpLeave?.map((val, index) => (
              <tr
                key={index}
                className="text-center text-sm text-medium_gray cursor-pointer border-b border-morelite_grey hover:bg-gray-100"
                onClick={() => handleRowClick(val)}
              >
                <td className=" py-3 px-4 border-b border-t border-morelite_grey">
                  {val.empID || "N/A"}
                </td>
                <td className=" py-3 px-4 border-b border-t border-morelite_grey">
                  {val.takenDay || "N/A"}
                </td>
                <td className=" py-3 px-4 border-b border-t border-morelite_grey">
                  {val.startDate ? DateFormat(val.startDate) : "N/A"}
                </td>
                <td className=" py-3 px-4 border-b border-t border-morelite_grey">
                  {val.endDate ? DateFormat(val.endDate) : "N/A"}
                </td>
                <td className=" py-3 px-4 border-b border-t border-morelite_grey">
                  {val.leaveType.charAt(0).toUpperCase() + val.leaveType.slice(1).toLowerCase() || "N/A"}
                </td>
                <td className=" py-3 px-4">
                  <span
                    className={`
      ${
        val?.finalStatus === "Pending"
          ? "bg-lite_orange text-medium_orange"
          : ""
      }
      ${val?.finalStatus === "Rejected" ? "bg-lite_red text-medium_red" : ""}
      ${val?.finalStatus === "Approved" ? "bg-lite_blue text-medium_blue" : ""}
    `}
                  >
                    {val?.finalStatus || "N/A"}
                  </span>
                </td>
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
                    <td className="font-semibold text-gray-700 w-[200px] text-wrap overflow-wrap-break-word">
                      Remarks
                    </td>
                    <td>{selectedLeave.remarks || "No Remarks"}</td>
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
