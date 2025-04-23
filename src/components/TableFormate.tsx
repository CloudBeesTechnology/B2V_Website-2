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
  leaveType?: string;
  leaveStatus?: string;
}

interface EmpLeave {
  empID: string;
  duration: string;
  startDate: string;
  endDate: string;
  leaveType: string;
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
  allEmp = [],
  leaveApproval = [],
  empLeave = [],
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
              <td className="text-start py-2 px-4">{val.date}</td>
              <td className="text-start py-2 px-4">{val.appType}</td>
              <td className="text-start py-2 px-4">{val.duration}</td>
              <td className="text-start py-2 px-4">{val.status}</td>
            </tr>
          ))}

        {/* All Employee list */}
        {list === "AllEmp" &&
          allEmp.map((val, index) => (
            <tr key={index} className="text-sm text-medium_gray">
              <td className="text-start py-2 px-4 flex items-center gap-2">
                <Image
                  src={val.profile || avatar}
                  width={25}
                  height={25}
                  alt={`${val.name} profile`}
                  className="rounded-full"
                />
                {val.empID}
              </td>
              <td className="text-start py-2 px-4">{val.name}</td>
              <td className="text-start py-2 px-4">{val.position}</td>
              <td className="text-start py-2 px-4">{val.department}</td>
              <td className="text-start py-2 px-4">{val.contact}</td>
              <td className="text-start py-2 px-4">{val.email}</td>
              <td className="text-start py-2 px-4">
                <FaEdit />
              </td>
            </tr>
          ))}

        {/* Leave Approval list */}
        {list === "LeaveApproval" &&
          leaveApproval.map((val, index) => (
            <tr key={index} className="text-sm text-medium_gray">
              <td className="text-start py-3 px-4 border-b border-t border-morelite_grey">{val.empID}</td>
              <td className="text-start py-3 px-4 border-b border-t border-morelite_grey">{val.name || "N/A"}</td>
              <td className="text-start py-3 px-4 border-b border-t border-morelite_grey">{val.duration}</td>
              <td className="text-start py-3 px-4 border-b border-t border-morelite_grey">{val.startDate}</td>
              <td className="text-start py-3 px-4 border-b border-t border-morelite_grey">{val.endDate}</td>
              <td className="text-start py-3 px-4 border-b border-t border-morelite_grey">{val.leaveType}</td>
              <td className="text-start py-3 px-4 border-b border-t border-morelite_grey">{val.leaveStatus}</td>
            </tr>
          ))}

        {/* Employee Leave list */}
        {list === "empLeave" &&
          empLeave.map((val, index) => (
            <tr key={index} className="text-sm text-medium_gray">
              <td className="text-start py-3 px-4 border-b border-t border-morelite_grey">{val.empID}</td>
              <td className="text-start py-3 px-4 border-b border-t border-morelite_grey">{val.duration}</td>
              <td className="text-start py-3 px-4 border-b border-t border-morelite_grey">{val.startDate}</td>
              <td className="text-start py-3 px-4 border-b border-t border-morelite_grey">{val.endDate}</td>
              <td className="text-start py-3 px-4 border-b border-t border-morelite_grey">{val.leaveType}</td>
              <td className="text-start py-3 px-4 border-b border-t border-morelite_grey">{val.leaveStatus}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};



// import Image from "next/image";
// import { FaEdit } from "react-icons/fa";
// import avatar from "../assets/employee/avatar.webp";

// interface Ovla {
//   date: string;
//   appType: string;
//   duration: string;
//   status: string;
// }

// interface LA {
//   empID: string;
//   name?: string;
//   duration?: string;
//   startDate?: string;
//   endDate?: string;
//   leaveType?: string;
//   leaveStatus?: string;
// }

// interface EmpLeave {
//   empID: string;
//   duration: string;
//   startDate: string;
//   endDate: string;
//   leaveType: string;
//   leaveStatus: string;
// }

// interface allEmployee {
//   profile: string;
//   empID: string;
//   name: string;
//   position: string;
//   department: string;
//   contact: string;
//   email: string;
// }

// interface TableProps {
//   heading?: string[];
//   ovla?: Ovla[];
//   list?: string;
//   allEmp?: allEmployee[];
//   leaveApproval?: LA[];
//   empLeave?: EmpLeave[];
// }

// export const TableFormate = ({
//   heading,
//   ovla,
//   list,
//   allEmp,
//   leaveApproval,
//   empLeave,
// }: TableProps) => {


//   return (
//     <table className="w-full border-collapse">
//       <thead className="text-mediumlite_grey text-sm font-bold text-start w-full">
//         <tr>
//           {heading?.map((val, index) => (
//             <th key={index} className="text-start py-2 px-4">
//               {val}
//             </th>
//           ))}
//         </tr>
//       </thead>
//       <tbody>
//         {list === "OVLA" &&
//           ovla?.slice(0, 4).map((val, index) => (
//             <tr key={index} className="text-sm text-medium_gray">
//               <td className="text-start py-2 px-4">{val.date}</td>
//               <td className="text-start py-2 px-4">{val.appType}</td>
//               <td className="text-start py-2 px-4">{val.duration}</td>
//               <td className="text-start py-2 px-4">{val.status}</td>
//             </tr>
//           ))}

//         {list === "AllEmp" &&
//           allEmp?.map((val, index) => (
//             <tr key={index} className="text-sm text-medium_gray">
//               <td className="text-start py-2 px-4 flex gap-1 items-center">
//                 <Image
//                   src={val.profile || avatar}
//                   width={25}
//                   height={25}
//                   alt={`${val.name} profile`}
//                 />
//                 {val.empID}
//               </td>
//               <td className="text-start py-2 px-4">{val.name}</td>
//               <td className="text-start py-2 px-4">{val.position}</td>
//               <td className="text-start py-2 px-4">{val.department}</td>
//               <td className="text-start py-2 px-4">{val.contact}</td>
//               <td className="text-start py-2 px-4">{val.email}</td>
//               <td className="text-start py-2 px-4">
//                 <FaEdit />
//               </td>
//             </tr>
//           ))}

//         {list === "LeaveApproval" &&
//           leaveApproval?.map((val, index) => (
//             <tr key={index} className="text-sm text-medium_gray">
//               <td className="text-start py-3 px-4 border-b border-t border-morelite_grey">{val.empID}</td>
//               <td className="text-start py-3 px-4 border-b border-t border-morelite_grey">{val?.name}</td>
//               <td className="text-start py-3 px-4 border-b border-t border-morelite_grey">{val?.duration}</td>
//               <td className="text-start py-3 px-4 border-b border-t border-morelite_grey">{val?.startDate}</td>
//               <td className="text-start py-3 px-4 border-b border-t border-morelite_grey">{val?.endDate}</td>
//               <td className="text-start py-3 px-4 border-b border-t border-morelite_grey">{val?.leaveType}</td>
//               <td className="text-start py-3 px-4 border-b border-t border-morelite_grey">{val?.leaveStatus}</td>
           
//             </tr>
//           ))}

//         {list === "empLeave" &&
//           empLeave?.map((val, index) => (
//             <tr key={index} className="text-sm text-medium_gray">
//               <td className="text-start py-3 px-4 border-b border-t border-morelite_grey">{val.empID}</td>
//               <td className="text-start py-3 px-4 border-b border-t border-morelite_grey">{val.duration}</td>
//               <td className="text-start py-3 px-4 border-b border-t border-morelite_grey">{val.startDate}</td>
//               <td className="text-start py-3 px-4 border-b border-t border-morelite_grey">{val.endDate}</td>
//               <td className="text-start py-3 px-4 border-b border-t border-morelite_grey">{val.leaveType}</td>
//               <td className="text-start py-3 px-4 border-b border-t border-morelite_grey">{val.leaveStatus}</td>
//             </tr>
//           ))}
//       </tbody>
//     </table>
//   );
// };

