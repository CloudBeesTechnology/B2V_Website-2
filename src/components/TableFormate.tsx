import Image from "next/image";
import { FaEdit } from "react-icons/fa";
import avatar from "../assets/employee/avatar.webp";

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
  takenDay?:string;
  leaveType?: string;
  leaveStatus?: string;
}

interface EmpLeave {
  empID: string;
  duration: string;
  startDate: string;
  endDate: string;
  leaveType: string;
  takenDay?:string;
  leaveStatus: string;
}

interface allEmployee {
  profile?: string;
  empID: string;
  name: string;
  position: string;
  department: string;
  contact: string;
  email: string;
}

interface TableProps {
  heading?: string[];
  ovla?: Ovla[];
  list?: "OVLA" | "AllEmp" | "LeaveApproval" | "empLeave";
  allEmp?: allEmployee[];
  leaveApproval?: LA[];
  empLeave?: EmpLeave[];
}

export const TableFormate = ({
  heading,
  ovla = [],
  list,
  allEmp,
  leaveApproval,
  empLeave,

}: TableProps) => {
  return (
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
        {/* OVLA list */}
        {list === "OVLA" &&
          ovla.slice(0, 4).map((val, index) => (
            <tr key={index} className="text-sm text-medium_gray">
              <td className="text-start py-2 px-4">{val.date || "N/A"}</td>
              <td className="text-start py-2 px-4">{val.appType || "N/A"}</td>
              <td className="text-start py-2 px-4">{val.duration || "N/A"}</td>
              <td className="text-start py-2 px-4">{val.status || "N/A"}</td>
            </tr>
          ))}

        {/* All Employee list */}
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
              <td className="text-start py-2 px-4">{val.position || "N/A"}</td>
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

        {/* Leave Approval list */}
        {list === "LeaveApproval" &&
          leaveApproval?.map((val, index) => {
            let takenDay = "-"; // default value if dates are missing

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
                <td className="text-start py-3 px-4 border-b border-t border-morelite_grey">
                  {val.empID || "N/A"}
                </td>
                <td className="text-start py-3 px-4 border-b border-t border-morelite_grey">
                  {val?.name || "N/A"}
                </td>
                <td className="text-start py-3 px-4 border-b border-t border-morelite_grey">
                  {takenDay || "N/A"}
                </td>
                <td className="text-start py-3 px-4 border-b border-t border-morelite_grey">
                  {val?.startDate || "N/A"}
                </td>
                <td className="text-start py-3 px-4 border-b border-t border-morelite_grey">
                  {val?.endDate || "N/A"}
                </td>
                <td className="text-start py-3 px-4 border-b border-t border-morelite_grey">
                  {val?.leaveType || "N/A"}
                </td>
                <td className="text-start py-3 px-4 border-b border-t border-morelite_grey">
                  {val?.leaveStatus || "N/A"}
                </td>
              </tr>
            );
          })}

        {/* Employee Leave list */}
        {list === "empLeave" &&
          empLeave?.map((val, index) => {
            
            return (
              <tr key={index} className="text-sm text-medium_gray">
                <td className="text-start py-3 px-4 border-b border-t border-morelite_grey">
                  {val.empID || "N/A"}
                </td>
                <td className="text-start py-3 px-4 border-b border-t border-morelite_grey">
                  {val.takenDay || "N/A"}
                </td>
                <td className="text-start py-3 px-4 border-b border-t border-morelite_grey">
                  {val.startDate || "N/A"}
                </td>
                <td className="text-start py-3 px-4 border-b border-t border-morelite_grey">
                  {val.endDate || "N/A"}
                </td>
                <td className="text-start py-3 px-4 border-b border-t border-morelite_grey">
                  {val.leaveType || "N/A"}
                </td>
                <td className="text-start py-3 px-4 border-b border-t border-morelite_grey">
                  {val.leaveStatus || "N/A"}
                </td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};

