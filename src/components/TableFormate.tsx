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
  totalHours: string;
  reason: string;
  fromTime: string;
  toTime: string;
  status: string;
}
interface permissionList {
  empID: string;
  name: string;
  date: string;
  totalHours: string;
  reason: string;
  fromTime: string;
  toTime: string;
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
interface Course {
  academic: string;
  course: string;
}
interface Experience {
  company: string;
  dept: string;
  location: string;
  manager: string;
  work: string;
  year: string;
}
interface allEmployeeReport {
  profile?: string;
  empID: string;
  name: string;
  position: string;
  department: string;
  contact: string;
  email: string;
  doj: string;
  dob: string;
  gender: string;
  address: string;
  alternateNo: string;
  religion: string;
  lang: string;
  proof: string;
  totalLeave: string;
  manager: string;
  leadEmpID: string;
  effectiveDate: string;
  degree: string;
  study: string;
  school: string;
  master: string;
  field: string;
  highSchool: string;
  courses: Course[];
  experiences: Experience[];
  father: string;
  mother: string;
  siblings: string;

  personalStatus: string;
  husbandName: string;
  wifeName: string;
  child: string;
  familyPNo: string;
  familyAddress: string;
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
    | "permissionList"
    | "AllEmpReport";
  allEmp?: allEmployee[];
  allEmployeeReport?: allEmployeeReport[];
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
  allEmployeeReport,
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
      <table className="w-full border-collapse overflow-x-auto">
        {heading && (
          <thead className="text-mediumlite_grey text-sm font-bold w-full">
            <tr className="text-center border-b border-morelite_grey overflow-x-auto w-full">
              {heading.map((val, index) => (
                <th key={index} className="py-2 px-4 min-w-[200px] w-full">
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
                  <td className=" py-3 px-4">
                    {val?.fromTime || "N/A"} to {val?.toTime || "N/A"}{" "}
                  </td>
                  <td className=" py-3 px-4">{val?.totalHours || "N/A"}</td>

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
                  <td className="px-4 py-2">
                    {val?.fromTime || "N/A"} to {val?.toTime || "N/A"}
                  </td>
                  <td className="px-4 py-2">{val.totalHours || "N/A"}</td>
                  <td className=" py-3 px-4">{val?.reason || "N/A"}</td>

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
                  {val.leaveType.charAt(0).toUpperCase() +
                    val.leaveType.slice(1).toLowerCase() || "N/A"}
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

          {list === "AllEmpReport" &&
            allEmployeeReport
              ?.sort((a, b) => {
                const numA = parseInt(a.empID?.replace(/\D/g, "") || "0");
                const numB = parseInt(b.empID?.replace(/\D/g, "") || "0");
                return numA - numB; // For ascending order. Use b - a for descending.
              })

              .map((val, index) => {
              

                return (
                  <tr
                    key={index}
                    className="text-center text-sm text-medium_gray border-b border-morelite_grey w-full border"
                  >
                    <td className=" py-2 px-4 min-w-[250px] w-full center gap-2 ">
                      <Image
                        src={val.profile || avatar}
                        width={25}
                        height={25}
                        alt={`${val.name} profile`}
                        className="rounded-full"
                      />
                      {val.empID || "N/A"}
                    </td>
                    <td className=" py-2 px-4 min-w-[250px] w-full  ">
                      {val.name || "N/A"}
                    </td>
                    <td className=" py-2 px-4 min-w-[250px] w-full  ">
                      {val.position || "N/A"}
                    </td>
                    <td className=" py-2 px-4 min-w-[250px] w-full  ">
                      {val.department || "N/A"}
                    </td>
                    <td className=" py-2 px-4 min-w-[250px] w-full  ">
                      {val.contact || "N/A"}
                    </td>
                    <td className=" py-2 px-4 min-w-[250px] w-full   break-words overflow-hidden">
                      {val.email || "N/A"}
                    </td>
                    <td className=" py-2 px-4 min-w-[250px] w-full  ">
                      {DateFormat(val.doj) || "N/A"}
                    </td>
                    <td className=" py-2 px-4 min-w-[250px] w-full  ">
                      {DateFormat(val.dob) || "N/A"}
                    </td>
                    <td className=" py-2 px-4 min-w-[250px] w-full  ">
                      {val.gender || "N/A"}
                    </td>
                    <td className=" py-2 px-4 min-w-[250px] w-full  ">
                      {val.address || "N/A"}
                    </td>
                    <td className=" py-2 px-4 min-w-[250px] w-full  ">
                      {val.alternateNo || "N/A"}
                    </td>
                    <td className=" py-2 px-4 min-w-[250px] w-full  ">
                      {val.religion || "N/A"}
                    </td>
                    <td className=" py-2 px-4 min-w-[250px] w-full  ">
                      {val.lang || "N/A"}
                    </td>
                    <td className=" py-2 px-4 min-w-[250px] w-full  ">
                      {val.proof ? (
                        <a href={val.proof} target="_blank">
                          View Document
                        </a>
                      ) : (
                        "N/A"
                      )}
                    </td>
                    <td className=" py-2 px-4 min-w-[250px] w-full  ">
                      {val.totalLeave || "N/A"}
                    </td>
                    <td className=" py-2 px-4 min-w-[250px] w-full  ">
                      {val.manager || "N/A"}
                    </td>
                    <td className=" py-2 px-4 min-w-[250px] w-full  ">
                      {val.leadEmpID || "N/A"}
                    </td>
                    <td className=" py-2 px-4 min-w-[250px] w-full  ">
                      {DateFormat(val.effectiveDate) || "N/A"}
                    </td>
                    <td className=" py-2 px-4 min-w-[250px] w-full  ">
                      {val.degree || "N/A"}
                    </td>
                    <td className=" py-2 px-4 min-w-[250px] w-full  ">
                      {val.study || "N/A"}
                    </td>
                    <td className=" py-2 px-4 min-w-[250px] w-full  ">
                      {val.school || "N/A"}
                    </td>
                    <td className=" py-2 px-4 min-w-[250px] w-full  ">
                      {val.master || "N/A"}
                    </td>
                    <td className=" py-2 px-4 min-w-[250px] w-full  ">
                      {val.field || "N/A"}
                    </td>
                    <td className=" py-2 px-4 min-w-[250px] w-full  ">
                      {val.highSchool || "N/A"}
                    </td>

                    <td className=" py-2 px-4 min-w-[250px] w-full  ">
                      {val.courses && val.courses.length > 0
                        ? val.courses.map((course, index) => (
                            <div key={index}>
                              {index + 1}.
                              <span className="font-semibold px-1">
                                Course:
                              </span>{" "}
                              {course.course || "N/A"},
                              <span className="font-semibold px-1">
                                Academic:
                              </span>{" "}
                              {course.academic || "N/A"}
                            </div>
                          ))
                        : "N/A"}
                    </td>
                    <td className=" py-2 px-4 min-w-[250px] w-full  ">
                      {val.experiences && val.experiences.length > 0
                        ? val.experiences.map((exp, index) => (
                            <div key={index}>
                              {index + 1}.
                              <span className="font-semibold px-1">
                                Company:
                              </span>{" "}
                              {exp.company || "N/A"},
                              <span className="font-semibold px-1">
                                Department:
                              </span>{" "}
                              {exp.dept || "N/A"}
                              <span className="font-semibold px-1">
                                Location:
                              </span>{" "}
                              {exp.location || "N/A"}
                              <span className="font-semibold px-1">
                                Manager:
                              </span>{" "}
                              {exp.manager || "N/A"}
                              <span className="font-semibold px-1">
                                Work:
                              </span>{" "}
                              {exp.work || "N/A"}
                              <span className="font-semibold px-1">
                                Year:
                              </span>{" "}
                              {exp.year || "N/A"}
                            </div>
                          ))
                        : "N/A"}
                    </td>
                    <td className=" py-2 px-4 min-w-[250px] w-full  ">
                      {val.father || "N/A"}
                    </td>
                    <td className=" py-2 px-4 min-w-[250px] w-full  ">
                      {val.mother || "N/A"}
                    </td>
                    <td className=" py-2 px-4 min-w-[250px] w-full  ">
                      {val.siblings || "N/A"}
                    </td>
                    <td className=" py-2 px-4 min-w-[250px] w-full  ">
                      {val.personalStatus || "N/A"}
                    </td>
                    <td className=" py-2 px-4 min-w-[250px] w-full  ">
                      {val.husbandName || "N/A"}
                    </td>
                    <td className=" py-2 px-4 min-w-[250px] w-full  ">
                      {val.wifeName || "N/A"}
                    </td>
                    <td className=" py-2 px-4 min-w-[250px] w-full  ">
                      {val.child || "N/A"}
                    </td>
                    <td className=" py-2 px-4 min-w-[250px] w-full  ">
                      {val.familyPNo || "N/A"}
                    </td>
                    <td className=" py-2 px-4 min-w-[250px] w-full  ">
                      {val.familyAddress || "N/A"}
                    </td>
                    <td
                      className="text-center text-primary py-2 px-4 min-w-[250px] w-full "
                      onClick={() => viewData?.(val)}
                    >
                      View
                    </td>
                  </tr>
                );
              })}
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
