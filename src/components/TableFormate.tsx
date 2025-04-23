import Image from "next/image";
import { FaEdit } from "react-icons/fa";
import avatar from "../assets/employee/avatar.webp";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";

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
  profile: string;
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
  list?: string;
  allEmp?: allEmployee[];
  leaveApproval?: LA[];
  empLeave?: EmpLeave[];
}

export const TableFormate = ({
  heading,
  ovla,
  list,
  allEmp,
  leaveApproval,
  empLeave,
}: TableProps) => {
  const handleStatusChange = async (empID: string, status: string) => {
    try {
      const docRef = doc(db, "leaveStatus", empID);
      await updateDoc(docRef, { leaveStatus: status });
      alert(`Leave status for ${empID} updated to ${status}`);
    } catch (error) {
      console.error("Failed to update leave status:", error);
    }
  };

  return (
    <table className="w-full border-collapse">
      <thead className="text-mediumlite_grey text-sm font-bold text-start w-full">
        <tr>
          {heading?.map((val, index) => (
            <th key={index} className="text-start py-2 px-4">
              {val}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {list === "OVLA" &&
          ovla?.slice(0, 4).map((val, index) => (
            <tr key={index} className="text-sm text-medium_gray">
              <td className="text-start py-2 px-4">{val.date}</td>
              <td className="text-start py-2 px-4">{val.appType}</td>
              <td className="text-start py-2 px-4">{val.duration}</td>
              <td className="text-start py-2 px-4">{val.status}</td>
            </tr>
          ))}

        {list === "AllEmp" &&
          allEmp?.map((val, index) => (
            <tr key={index} className="text-sm text-medium_gray">
              <td className="text-start py-2 px-4 flex gap-1 items-center">
                <Image
                  src={val.profile || avatar}
                  width={25}
                  height={25}
                  alt={`${val.name} profile`}
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

        {list === "LeaveApproval" &&
          leaveApproval?.map((val, index) => (
            <tr key={index} className="text-sm text-medium_gray">
              <td className="text-start py-3 px-4 border-b border-t border-morelite_grey">{val.empID}</td>
              <td className="text-start py-3 px-4 border-b border-t border-morelite_grey">{val?.name}</td>
              <td className="text-start py-3 px-4 border-b border-t border-morelite_grey">{val?.duration}</td>
              <td className="text-start py-3 px-4 border-b border-t border-morelite_grey">{val?.startDate}</td>
              <td className="text-start py-3 px-4 border-b border-t border-morelite_grey">{val?.endDate}</td>
              <td className="text-start py-3 px-4 border-b border-t border-morelite_grey">{val?.leaveType}</td>
              <td className="text-start py-3 px-4 border-b border-t border-morelite_grey">
                <select
                  className="bg-white border border-gray-300 rounded px-2 py-1"
                  defaultValue={val?.leaveStatus}
                  onChange={(e) => handleStatusChange(val.empID, e.target.value)}
                >
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </td>
            </tr>
          ))}

        {list === "empLeave" &&
          empLeave?.map((val, index) => (
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
//   heading: string[];
//   ovla: Ovla[];
//   list: string;
//   allEmp: allEmployee[];
//   leaveApproval: LA[];
//   empLeave: EmpLeave[];
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
//           {heading.map((val, index) => (
//             <th key={index} className="text-start py-2 px-4">{val}</th>
//           ))}
//         </tr>
//       </thead>
//       <tbody>
//         {list === "OVLA" &&
//           ovla.slice(0, 4).map((val, index) => (
//             <tr key={index} className="text-sm text-medium_gray">
//               <td className="text-start py-2 px-4">{val.date}</td>
//               <td className="text-start py-2 px-4">{val.appType}</td>
//               <td className="text-start py-2 px-4">{val.duration}</td>
//               <td className="text-start py-2 px-4">{val.status}</td>
//             </tr>
//           ))}

//         {list === "AllEmp" &&
//           allEmp.map((val, index) => (
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
//               <td className="text-start py-2 px-4"><FaEdit /></td>
//             </tr>
//           ))}

//         {list === "LeaveApproval" &&
//           leaveApproval.map((val, index) => (
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
//           empLeave.map((val, index) => (
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
// // import Image from "next/image";
// // import { FaEdit } from "react-icons/fa";
// // import avatar from "../assets/employee/avatar.webp";

// // interface Ovla {
// //   date: string;
// //   appType: string;
// //   duration: string;
// //   status: string;
// // }
// // interface LA {
// //   empID: string;
// //   name?: string;
// //   duration?: string;
// //   startDate?: string;
// //   endDate?: string;
// //   leaveType?: string;
// //   status?: string;
// // }

// // interface EmpLeave {
// //   empID: string;
// //   duration: string;
// //   startDate: string;
// //   endDate: string;
// //   leaveType: string;
// //   status: string;
// // }

// // interface allEmployee {
// //   profile: string;
// //   empID: string;
// //   name: string;
// //   position: string;
// //   department: string;
// //   // role: string;
// //   contact: string;
// //   email: string;
// // }
// // interface TableProps {
// //   heading: string[]; // Correctly type props
// //   ovla: Ovla[];
// //   list: string;
// //   allEmp: allEmployee[];
// //   leaveApproval: LA[];
// //   empLeave: EmpLeave[];
// // }

// // // empLeave={empLeave ?? []}
// // // list="empLeave"
// // export const TableFormate = ({
// //   heading,
// //   ovla,
// //   list,
// //   allEmp,
// //   leaveApproval,
// //   empLeave,
// // }: TableProps) => {
// //   return (
// //     <table className="w-full border-collapse">
// //       <thead className="text-mediumlite_grey text-sm font-bold text-start w-full">
// //         <tr className=" w-full">
// //           {heading.map((val, index) => {
// //             return (
// //               <th key={index} className="text-start py-2 px-4">
// //                 {val}
// //               </th>
// //             );
// //           })}
// //         </tr>
// //       </thead>
// //       <tbody>
// //         {list === "OVLA" &&
// //           ovla.slice(0, 4).map((val, index) => {
// //             return (
// //               <tr key={index} className="text-sm text-medium_gray">
// //                 <td className="text-start py-2 px-4">{val.date}</td>
// //                 <td className="text-start py-2 px-4">{val.appType}</td>
// //                 <td className="text-start py-2 px-4">{val.duration}</td>
// //                 <td className="text-start py-2 px-4">{val.status}</td>
// //               </tr>
// //             );
// //           })}
// //         {list === "AllEmp" &&
// //           allEmp.map((val, index) => {
// //             return (
// //               <tr key={index} className="text-sm text-medium_gray">
// //                 <td className="text-start py-2 px-4 flex gap-1 items-center">
// //                   <Image
// //                     src={val.profile || avatar}
// //                     width={25}
// //                     height={25}
// //                     alt={`${val.name} profile not found`}
// //                   />
// //                   {val.empID}
// //                 </td>
// //                 <td className="text-start py-2 px-4">{val.name }</td>
// //                 {/* <td className="text-start py-2 px-4">{val.role}</td> */}
// //                 <td className="text-start py-2 px-4">{val.position}</td>
// //                 <td className="text-start py-2 px-4">{val.department}</td>
// //                 <td className="text-start py-2 px-4">{val.contact}</td>
// //                 <td className="text-start py-2 px-4">{val.email}</td>
// //                 <td className="text-start py-2 px-4">
// //                   <FaEdit />
// //                 </td>
// //               </tr>
// //             );
// //           })}
          
// //         {list === "LeaveApproval" &&
// //           leaveApproval.map((val, index) => {
// //             return (
// //               <tr key={index} className="text-sm text-medium_gray">
// //                 <td className="text-start py-3 px-4 border-b border-t border-morelite_grey ">{val?.empID}</td>
// //                 <td className="text-start py-3 px-4 border-b border-t border-morelite_grey ">{val?.name}</td>
// //                 <td className="text-start py-3 px-4 border-b border-t border-morelite_grey">{val?.duration}</td>
// //                 <td className="text-start py-3 px-4 border-b border-t border-morelite_grey">{val?.startDate}</td>
// //                 <td className="text-start py-3 px-4 border-b border-t border-morelite_grey">{val?.endDate}</td>
// //                 <td className="text-start py-3 px-4 border-b border-t border-morelite_grey">{val?.leaveType}</td>
// //                 {/* <td className="text-start py-3 px-4 border-b border-t border-morelite_grey">{val?.reason}</td> */}
// //                 <td className="text-start py-3 px-4 border-b border-t border-morelite_grey">{val?.status}</td>
// //               </tr>
// //             );
// //           })}

// // {list === "empLeave" &&
// //           empLeave.map((val, index) => {
// //             return (
// //               <tr key={index} className="text-sm text-medium_gray">
// //                 <td className="text-start py-3 px-4 border-b border-t border-morelite_grey ">{val.empID}</td>
// //                 <td className="text-start py-3 px-4 border-b border-t border-morelite_grey">{val.duration}</td>
// //                 <td className="text-start py-3 px-4 border-b border-t border-morelite_grey">{val.startDate}</td>
// //                 <td className="text-start py-3 px-4 border-b border-t border-morelite_grey">{val.endDate}</td>
// //                 <td className="text-start py-3 px-4 border-b border-t border-morelite_grey">{val.leaveType}</td>
// //                 <td className="text-start py-3 px-4 border-b border-t border-morelite_grey">{val.status}</td>
           
          
// //               </tr>
// //             );
// //           })}
// //       </tbody>
// //     </table>
// //   );
// // };
