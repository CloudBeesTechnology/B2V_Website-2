// "use client";
// import { useState } from "react";
// import { useRouter, usePathname } from "next/navigation";
// import { FaPlus } from "react-icons/fa6";
// import InternshipTable from "../internshipTable";
// import AddInternship from "../addIntership";

// interface InternshipData {
//   name: string;
//   role: string;
//   category: string;
//   courseContent: string;
//   email: string;
// }

// const Internship: React.FC = () => {
//   const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

//   const router = useRouter();
//   const pathname = usePathname();

//   const tabs = [
//     { label: "Request Interns", path: "request" },
//     { label: "Approved", path: "approved" },
//     { label: "Rejected", path: "rejected" },
//   ];
  
//   const handleTabClick = (status:string) => {
//     // Change URL dynamically, no need for [status] folder
//     router.push(`internship/tabs/${status}`);
//   };
// console.log(pathname);
//   const status = pathname.split('/')[3] || 'request'; 
//   console.log(status);
//   return (
//     <main>
//       <header className="center my-10 text-xl font-semibold text-gray">
//         <h2>Internship</h2>
//       </header>

//       <section>
//         <nav className="flex justify-between p-7 text-xl font-semibold text-gray">
//           <div className="center gap-20">
//             {tabs.map((tab) => (
//               <p
//                 key={tab.path}
//                 className={`cursor-pointer ${
//                     status === tab?.path ? "border-b-3 border-primary" : ""
//                 }`}
//                 onClick={() => handleTabClick(tab?.path)}
//               >
//                 {tab.label}
//               </p>
//             ))}
//           </div>
//           <div>
//             <button
//               className="center rounded space-x-2 bg-primary text-white px-5 py-2"
//               onClick={() => setIsModalOpen(true)}
//             >
//               <span>Add</span>
//               <FaPlus />
//             </button>
//           </div>
//         </nav>
//       </section>

//       {/* <InternshipTable data={tableData} ActionData={ActionData} />

//       {isModalOpen && <AddInternship onClose={() => setIsModalOpen(false)} />} */}
//     </main>
//   );
// };

// export default Internship;
