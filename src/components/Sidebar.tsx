"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import overview from "../assets/sidebar/overview.png";
import employee from "../assets/sidebar/employee.png";
import attendance from "../assets/sidebar/attendance.png";
import internship from "../assets/sidebar/internship.png";
import leavemanagement from "../assets/sidebar/leavemanagement.png";
import timesheet from "../assets/sidebar/timesheet.png";
import setting from "../assets/sidebar/settings.png";
import report from "../assets/sidebar/report.png";
import logout from "../assets/sidebar/Logout.png";
import logo from "../assets/logo/logo.png";

const Sidebar = () => {
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedRole = localStorage.getItem("userRole");
      console.log("Stored Role:", storedRole);
      setRole(storedRole);
    }
  }, []);

  const fullNavList = [
    { icons: overview, name: "Overview", path: "/" },
    { icons: employee, name: "Employee", path: "/employee" },
    { icons: attendance, name: "Attendance", path: "/attendance" },
    { icons: internship, name: "Internship", path: "/internship" },
    { icons: leavemanagement, name: "Leave Management", path: "/leavemanagement" },
    { icons: timesheet, name: "Timesheet", path: "/timesheet" },
    { icons: setting, name: "Settings", path: "/settings" },
    { icons: report, name: "Report", path: "/report" },
  ];

  const getNavByRole = () => {
    switch (role) {
      case "Admin":
        return fullNavList;
      case "Employee":
        return fullNavList.filter(link =>
          ["Overview", "Employee", "Timesheet", "Settings"].includes(link.name)
        );
      case "Intern":
        return fullNavList.filter(link =>
          ["Overview", "Settings"].includes(link.name)
        );
      default:
        return [];
    }
  };

  const filteredNavList = getNavByRole();

  if (role === null) return null; // Optional: show spinner here

  return (
    <section className="p-5 space-y-2 h-full">
      <div className="max-w-[100px] w-full h-20 mx-auto center">
        <Image src={logo} alt="logo not found" />
      </div>
      <div className="h-[calc(100%-5rem)] flex flex-col justify-between">
        <div className="space-y-10 mt-3">
          {filteredNavList.map((link, index) => (
            <Link href={link.path} key={index} className="flex items-center gap-3">
              <Image src={link.icons} alt={`${link.name} not found`} width={24} height={24} />
              <p className="text_size_4">{link.name}</p>
            </Link>
          ))}
        </div>
        <div>
          <Link href="/logout" className="flex items-center gap-3">
            <Image src={logout} alt="Logout not found" width={24} height={24} />
            <p className="text_size_5">Logout</p>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Sidebar;


// import Image from "next/image";
// import React from "react";
// import attendance from "../assets/sidebar/attendance.png";
// import internship from "../assets/sidebar/internship.png";
// import overview from "../assets/sidebar/overview.png";
// import employee from "../assets/sidebar/employee.png";
// import leavemanagement from "../assets/sidebar/leavemanagement.png";
// import timesheet from "../assets/sidebar/timesheet.png";
// import setting from "../assets/sidebar/settings.png";
// import report from "../assets/sidebar/report.png";
// import logout from "../assets/sidebar/Logout.png";
// import logo from "../assets/logo/logo.png";
// import Link from "next/link";

// const Sidebar = () => {
//   const navList = [
//     {
//       icons: overview,
//       name: "Overview",
//       path: "/",
//     },
//     {
//       icons: employee,
//       name: "Employee",
//       path: "/employee",
//     },
//     {
//       icons: attendance,
//       name: "Attendance",
//       path: "/attendance",
//     },
//     {
//       icons: internship,
//       name: "Internship",
//       path: "/internship",
//     },
//     {
//       icons: leavemanagement,
//       name: "Leave Management",
//       path: "/leavemanagement",
//     },
//     {
//       icons: timesheet,
//       name: "Timesheet",
//       path: "/timesheet",
//     },
//     {
//       icons: setting,
//       name: "Settings",
//       path: "/settings",
//     },
//     {
//       icons: report,
//       name: "Report",
//       path: "/report",
//     },
//   ];
 
  
//   return (
//     <section className="p-5 space-y-2 h-full " >
//       <div className="max-w-[100px] w-full h-20 mx-auto center">
//         <Image src={logo} alt="logo not found" />
//       </div>
//       <div className="h-[calc(100%-5rem)] flex flex-col justify-between">
//         <div className=" space-y-10 mt-3">
//           {navList.map((link, index) => {
//             return (
//               <div key={index}>
//                 <Link href={link.path} className="flex items-center gap-3">
//                   <Image
//                     src={link.icons}
//                     alt={`${link.name} not found`}
//                     width={24}
//                     height={24}
//                   />
//                   <p className="text_size_4">{link.name}</p>
//                 </Link>
//               </div>
//             );
//           })}
//         </div>
//         <div className="">
//           <Link href="" className="flex items-center gap-3">
//             <Image src={logout} alt="Logout not found" width={24} height={24} />
//             <p className="text_size_5">Logout</p>
//           </Link>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Sidebar;
