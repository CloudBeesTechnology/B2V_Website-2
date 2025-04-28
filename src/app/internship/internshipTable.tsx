// import { IoIosArrowDropdownCircle } from "react-icons/io";

// interface InternTableProps {
//   data: RequestInternData[];
//   ActionData: any;
// }

// interface RequestInternData {
//   name: string;
//   role: string;
//   category: string;
//   courseContent: string;
//   email: string;
// }
// const InternshipTable: React.FC<InternTableProps> = ({ data, ActionData }) => {
//   return (
//     <section className="bg-white rounded-md my-3">
//       <table className="table-fixed w-full">
//         <thead>
//           <tr className="font-semibold text-gray text-center border-b border-[#D2D2D240]">
//             <th className="py-5">Name</th>
//             <th className="py-5">Role</th>
//             <th className="py-5">Category</th>
//             <th className="py-5">Course Content</th>
//             <th className="py-5">Email ID</th>
//             <th className="py-5">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data.map((intern, index) => (
//             <tr
//               key={index}
//               className="text-center text-sm border-b border-[#D2D2D240]"
//             >
//               <td className="py-5">{intern.name}</td>
//               <td className="py-5">{intern.role}</td>
//               <td className="py-5">{intern.category}</td>
//               <td className="py-5">{intern.courseContent}</td>
//               <td className="py-5">{intern.email}</td>
//               <td className="center py-5">
//                 <div
//                   className={`${ActionData.textColor} text-[13px] w-fit center font-medium ${ActionData.bgColor} py-1 px-2 rounded-sm space-x-3`}
//                 >
//                   <span>{ActionData.text}</span>
//                   {ActionData.text === "Action" && (
//                     <span className="text-base">
//                       <IoIosArrowDropdownCircle />
//                     </span>
//                   )}
//                 </div>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </section>
//   );
// };
// export default InternshipTable;
