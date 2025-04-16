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
  name: string;
  duration: string;
  startDate: string;
  endDate: string;
  type: string;
  reason: string;
  action: string;
}
interface allEmployee {
  profile: string;
  empID: string;
  name: string;
  position: string;
  role: string;
  contactNo: string;
  email: string;
}
interface TableProps {
  heading: string[]; // Correctly type props
  ovla: Ovla[];
  list: string;
  allEmp: allEmployee[];
  leaveApproval: LA[];
}
export const TableFormate = ({
  heading,
  ovla,
  list,
  allEmp,
  leaveApproval,
}: TableProps) => {
  return (
    <table className="w-full border-collapse">
      <thead className="text-mediumlite_grey text-sm font-bold text-start w-full">
        <tr className=" w-full">
          {heading.map((val, index) => {
            return (
              <th key={index} className="text-start py-2 px-4">
                {val}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {list === "OVLA" &&
          ovla.slice(0, 4).map((val, index) => {
            return (
              <tr key={index} className="text-sm text-medium_gray">
                <td className="text-start py-2 px-4">{val.date}</td>
                <td className="text-start py-2 px-4">{val.appType}</td>
                <td className="text-start py-2 px-4">{val.duration}</td>
                <td className="text-start py-2 px-4">{val.status}</td>
              </tr>
            );
          })}
        {list === "AllEmp" &&
          allEmp.map((val, index) => {
            return (
              <tr key={index} className="text-sm text-medium_gray">
                <td className="text-start py-2 px-4 flex gap-1 items-center">
                  <Image
                    src={val.profile || avatar}
                    width={25}
                    height={25}
                    alt={`${val.name} profile not found`}
                  />
                  {val.empID}
                </td>
                <td className="text-start py-2 px-4">{val.name}</td>
                <td className="text-start py-2 px-4">{val.position}</td>
                <td className="text-start py-2 px-4">{val.role}</td>
                <td className="text-start py-2 px-4">{val.contactNo}</td>
                <td className="text-start py-2 px-4">{val.email}</td>
                <td className="text-start py-2 px-4">
                  <FaEdit />
                </td>
              </tr>
            );
          })}
        {list === "leaveApproval" &&
          leaveApproval.map((val, index) => {
            return (
              <tr key={index} className="text-sm text-medium_gray">
                <td className="text-start py-3 px-4 border-b border-t border-morelite_grey ">{val.name}</td>
                <td className="text-start py-3 px-4 border-b border-t border-morelite_grey">{val.duration}</td>
                <td className="text-start py-3 px-4 border-b border-t border-morelite_grey">{val.startDate}</td>
                <td className="text-start py-3 px-4 border-b border-t border-morelite_grey">{val.endDate}</td>
                <td className="text-start py-3 px-4 border-b border-t border-morelite_grey">{val.type}</td>
                <td className="text-start py-3 px-4 border-b border-t border-morelite_grey">{val.reason}</td>
                <td className="text-start py-3 px-4 border-b border-t border-morelite_grey">{val.action}</td>
          
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};
