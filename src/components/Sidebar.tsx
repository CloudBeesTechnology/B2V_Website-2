
// "use client"; // Ensure this runs on the client side

// import React from "react";
// import Link from "next/link";
// // import { FaThLarge } from "react-icons/fa";
// import { MdOutlineLogout } from "react-icons/md";
// import { FiSettings } from "react-icons/fi";
// import overview from "../assets/overview.png"
// import logo from "../assets/logo.png"
// import employee from "../assets/employee.png"
// import attendance from "../assets/attendance.png"
// import leaveManagement from "../assets/leavemanagement.png"
// import timesheet from "../assets/timesheet.png"
// import setting from "../assets/settings.png"

// // import { BsClock, BsFileText, BsPerson, BsJournalBookmark } from "react-icons/bs";
// import Image from "next/image";

// const Sidebar: React.FC = () => {
//   return (
//     <div className="h-screen w-64 bg-white shadow-lg flex flex-col p-4">
//       {/* Logo */}
//       <div className="flex items-center justify-center py-9">
//       <Image src={logo} alt="logo"  width={150} height={200} />
//       </div>

//       {/* Menu Items */}
//       <nav className="flex flex-col space-y-7">
//         <Link href="/" className="flex items-center space-x-3 p-3 bg-[#2F91DE]  text-white rounded-lg transition">
     
//           <Image src={overview} alt="overview" width={28} height={28} />
//           <span>Overview</span>
//         </Link>

//         <Link href="/employee" className="flex items-center space-x-3 text-[#757575]  hover:text-black p-2 transition">
//         <Image src={employee} alt="employee" width={28} height={28} />
//           <span>Employee</span>
//         </Link>

//         <Link href="/attendance" className="flex items-center space-x-3 text-[#757575] hover:text-black p-2 transition">
//         <Image src={attendance} alt="attendance" width={28} height={28} />
//           <span>Attendance</span>
//         </Link>

//         <Link href="/timesheet" className="flex items-center space-x-3 text-[#757575] hover:text-black p-2 transition">
//         <Image src={leaveManagement} alt="leaveManagement" width={28} height={28} />
//           <span>Leave Management</span>
//         </Link>

//         <Link href="/settings" className="flex items-center space-x-3 text-[#757575] hover:text-black p-2 transition">
//         <Image src={timesheet} alt="timesheet" width={28} height={28} />
//           <span>Timesheet</span>
//         </Link>

//         <Link href="/report" className="flex items-center space-x-3 text-[#757575] hover:text-black p-2 transition">
//         <Image src={setting} alt="setting" width={28} height={28} />
//           <span>Setting</span>
//         </Link>
//         {/* <button className="text-danger text_size_1"  >
//            checking color
//          </button> */}
//       </nav>

//       {/* Logout Button */}
//       <div className="mt-52 px-2">
//         <Link href="/logout" className="flex items-center space-x-3 text-gray-600 hover:text-black p-2 pb-10 transition">
//           <MdOutlineLogout size={28}/>
//           <span>Logout</span>
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;


"use client"; // Ensure this runs on the client side

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Import usePathname to track the current route
import { MdOutlineLogout } from "react-icons/md";
import Image from "next/image";

// Import images
import overview from "../assets/overview.png";
import logo from "../assets/logo.png";
import employee from "../assets/employee.png";
import attendance from "../assets/attendance.png";
import leaveManagement from "../assets/leavemanagement.png";
import timesheet from "../assets/timesheet.png";
import setting from "../assets/settings.png";

const Sidebar: React.FC = () => {
  const pathname = usePathname(); // Get the current route

  const menuItems = [
    { name: "Overview", path: "/", icon: overview },
    { name: "Employee", path: "/employee", icon: employee },
    { name: "Attendance", path: "/attendance", icon: attendance },
    { name: "Leave Management", path: "/leavemanagement", icon: leaveManagement },
    { name: "Timesheet", path: "/timesheet", icon: timesheet },
    { name: "Settings", path: "/settings", icon: setting },
  ];

  return (
    <div className="h-screen w-64 bg-white shadow-lg flex flex-col p-4">
      {/* Logo */}
      <div className="flex items-center justify-center py-9">
        <Image src={logo} alt="logo" width={150} height={200} />
      </div>

      {/* Menu Items */}
      <nav className="flex flex-col space-y-4">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={`flex items-center space-x-3 p-3 rounded-lg transition ${
              pathname === item.path ? "bg-[#2F91DE] text-white" : "text-[#757575] hover:bg-gray-200"
            }`}
          >
            <Image src={item.icon} alt={item.name} width={28} height={28} />
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>

      {/* Logout Button */}
      <div className="mt-auto px-2">
        <Link
          href="/logout"
          className={`flex items-center space-x-3 p-3 rounded-lg transition ${
            pathname === "/logout" ? "bg-[#2F91DE] text-white" : "text-gray-600 hover:bg-gray-200"
          }`}
        >
          <MdOutlineLogout size={28} />
          <span>Logout</span>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
