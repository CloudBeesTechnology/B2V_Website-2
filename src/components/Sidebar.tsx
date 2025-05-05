"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import attendance from "../../public/assets/sidebar/attendance.svg";
import overview from "../../public/assets/sidebar/overview.svg";
import internship from "../../public/assets/sidebar/internship.svg";
import user from "../../public/assets/sidebar/usergrey.svg";
import employee from "../../public/assets/sidebar/employee.svg";
import leavemanagement from "../../public/assets/sidebar/leavemanagement.svg";
import timesheet from "../../public/assets/sidebar/timesheet.svg";
import setting from "../../public/assets/sidebar/setting.svg";
import report from "../../public/assets/sidebar/report.svg";
import whiteattendance from "../../public/assets/sidebar/attendanceWhite.svg";
import whiteoverview from "../../public/assets/sidebar/main dashboard white.svg";
import whiteinternship from "../../public/assets/sidebar/InternTaskwhite.svg";
import whiteuser from "../../public/assets/sidebar/user white.svg";
import whiteemployee from "../../public/assets/sidebar/employee white.svg";
import whiteleavemanagement from "../../public/assets/sidebar/leave white.svg";
import whitetimesheet from "../../public/assets/sidebar/timesheetwhite.svg";
import whitesetting from "../../public/assets/sidebar/settings white.svg";
import whitereport from "../../public/assets/sidebar/reportwhite.svg";
import logout from "../../public/assets/sidebar/Logout.svg";
import logo from "../../public/assets/logo/logo.png";
import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";

const Sidebar = () => {
  const pathname = usePathname();
  // const [storedPermissions, setStoredPermissions] = useState<string[]>([]);
  const [allowedMenuItems, setAllowedMenuItems] = useState<string[]>([]);
  type UserRole = "EMPLOYEE" | "INTERN" | "ADMIN";
  const userRole =
    typeof window !== "undefined"
      ? (localStorage.getItem("userRole")?.toUpperCase() as UserRole | null)
      : null;

  const userID =
    typeof window !== "undefined"
      ? localStorage.getItem("empID")?.toString()?.toUpperCase()
      : null;

  const sidebarMenu = [
    {
      icons: overview,
      icons2: whiteoverview,
      name: "Overview",
      path: "/",
    },
    {
      icons: employee,
      icons2: whiteemployee,
      name: "Employee",
      path: "/employee",
    },
    {
      icons: attendance,
      icons2: whiteattendance,
      name: "Attendance",
      path: "/attendance",
    },
    {
      icons: internship,
      icons2: whiteinternship,
      name: "Internship",
      path: "/internship",
    },
    {
      icons: user,
      icons2: whiteuser,
      name: "User",
      path: "/user",
    },
    {
      icons: leavemanagement,
      icons2: whiteleavemanagement,
      name: "Leave Management",
      path: "/leavemanagement",
    },

    {
      icons: timesheet,
      icons2: whitetimesheet,
      name: "Timesheet",
      path: "/timesheet",
    },

    {
      icons: report,
      icons2: whitereport,
      name: "Report",
      path: "/report",
    },
    {
      icons: employee,
      icons2: whiteemployee,
      name: "Upcoming Holidays",
      path: "/empUpcomingHolidays",
    },
    {
      icons: attendance,
      icons2: whiteattendance,
      name: "Apply Leave",
      path: "/empApplyLeave",
    },
    {
      icons: employee,
      icons2: whiteemployee,
      name: "Task",
      path: "/internTask",
    },
    {
      icons: setting,
      icons2: whitesetting,
      name: "Settings",
      path: "/settings",
    },
  ];

  useEffect(() => {
    const getUserAndPermissions = async (empID: string) => {
      const userQuery = query(
        collection(db, "accessControl"),
        where("empID", "==", empID)
      );

      const [listUserDetails] = await Promise.all([getDocs(userQuery)]);

      const userData = listUserDetails.docs[0]?.data() || {};

      return { ...userData };
    };

    // let userRole =
    //   typeof window !== "undefined" ? localStorage.getItem("userRole") : null;

    if (userID) {
      getUserAndPermissions(userID).then((data) => {
        const flatPermissions = Object?.keys(data.setPermission);

        setAllowedMenuItems(flatPermissions);
      });
    }
  }, []);

  // console.log("storedPermissions : ", storedPermissions);

  const RemoveLocalValues = () => {
    localStorage.removeItem("experienceData");
    localStorage.removeItem("personalInfo");
    localStorage.removeItem("educationData");
  };
  const isLinkActive = (linkName: string, linkPath: string) => {
    const customPaths: Record<string, string[]> = {
      "Leave Management": [
        "/leavemanagement",
        "/leaveapproval",
        "/leavehistory",
      ],
      Employee: ["/employee", "/employeedetails", "/employeepersonal"],
      // Add more modules and paths here if needed
    };

    return customPaths[linkName]
      ? customPaths[linkName].includes(pathname)
      : pathname === linkPath;
  };

  return (
    <section className="p-5 h-full overflow-y-auto">
      <div className="max-w-[100px] w-full h-20 mx-auto center">
        <Image src={logo} alt="logo not found" />
      </div>
      <div className="h-[calc(100%-7rem)] flex flex-col justify-between">
        <div className=" space-y-5 mt-3">
          {sidebarMenu
            .filter((link) => allowedMenuItems.includes(link.name))
            .map((link, index) => (
              <div key={index}>
                <div
                  className={clsx(
                    isLinkActive(link.name, link.path)
                      ? "bg-primary px-2 py-2 rounded-sm text-white"
                      : "px-2 py-2"
                  )}
                >
                  <Link
                    href={link.path}
                    onClick={RemoveLocalValues}
                    className="flex items-center gap-3"
                  >
                    {isLinkActive(link.name, link.path) ? (
                      <Image
                        src={link.icons2}
                        alt={`${link.name} not found`}
                        width={24}
                        height={24}
                      />
                    ) : (
                      <Image
                        src={link.icons}
                        alt={`${link.name} not found`}
                        width={24}
                        height={24}
                      />
                    )}
                    <p className="text_size_4">{link.name}</p>
                  </Link>
                </div>
              </div>
            ))}
        </div>
        <div>
          <Link href="/logout" className="flex items-center gap-3">
            <Image src={logout} alt="Logout not found" width={24} height={24} />
            <p className="text_size_4">Logout</p>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Sidebar;

// "use client";

// import Image from "next/image";
// import React, { useEffect, useState } from "react";
// import attendance from "../../public/assets/sidebar/attendance.svg";
// import overview from "../../public/assets/sidebar/overview.svg";
// import internship from "../../public/assets/sidebar/internship.svg";
// import user from "../../public/assets/sidebar/usergrey.svg";
// import employee from "../../public/assets/sidebar/employee.svg";
// import leavemanagement from "../../public/assets/sidebar/leavemanagement.svg";
// import timesheet from "../../public/assets/sidebar/timesheet.svg";
// import setting from "../../public/assets/sidebar/setting.svg";
// import report from "../../public/assets/sidebar/report.svg";
// import whiteattendance from "../../public/assets/sidebar/attendanceWhite.svg";
// import whiteoverview from "../../public/assets/sidebar/main dashboard white.svg";
// import whiteinternship from "../../public/assets/sidebar/InternTaskwhite.svg";
// import whiteuser from "../../public/assets/sidebar/user white.svg";
// import whiteemployee from "../../public/assets/sidebar/employee white.svg";
// import whiteleavemanagement from "../../public/assets/sidebar/leave white.svg";
// import whitetimesheet from "../../public/assets/sidebar/timesheetwhite.svg";
// import whitesetting from "../../public/assets/sidebar/settings white.svg";
// import whitereport from "../../public/assets/sidebar/reportwhite.svg";
// import logout from "../../public/assets/sidebar/Logout.svg";
// import logo from "../../public/assets/logo/logo.png";
// import Link from "next/link";
// import clsx from "clsx";
// import { usePathname } from "next/navigation";
// import { collection, getDocs, query, where } from "firebase/firestore";
// import { db } from "@/lib/firebaseConfig";

// const Sidebar = () => {
//   const pathname = usePathname();
//   const [storedPermissions, setStoredPermissions] = useState<
//     Record<string, string[]>
//   >({});

//   type UserRole = "EMPLOYEE" | "INTERN" | "ADMIN";
//   const userRole =
//     typeof window !== "undefined"
//       ? (localStorage.getItem("userRole")?.toUpperCase() as UserRole | null)
//       : null;

//   const userID =
//     typeof window !== "undefined"
//       ? localStorage.getItem("empID")?.toString()?.toUpperCase()
//       : null;

//   const sidebarMenu = [
//     { icons: overview, icons2: whiteoverview, name: "Overview", path: "/" },
//     {
//       icons: employee,
//       icons2: whiteemployee,
//       name: "Employee",
//       path: "/employee",
//     },
//     {
//       icons: attendance,
//       icons2: whiteattendance,
//       name: "Attendance",
//       path: "/attendance",
//     },
//     {
//       icons: internship,
//       icons2: whiteinternship,
//       name: "Internship",
//       path: "/internship",
//     },
//     { icons: user, icons2: whiteuser, name: "User", path: "/user" },
//     {
//       icons: leavemanagement,
//       icons2: whiteleavemanagement,
//       name: "Leave Management",
//       path: "/leavemanagement",
//     },
//     {
//       icons: timesheet,
//       icons2: whitetimesheet,
//       name: "Timesheet",
//       path: "/timesheet",
//     },
//     { icons: report, icons2: whitereport, name: "Report", path: "/report" },
//     {
//       icons: employee,
//       icons2: whiteemployee,
//       name: "Upcoming Holidays",
//       path: "/empUpcomingHolidays",
//     },
//     {
//       icons: attendance,
//       icons2: whiteattendance,
//       name: "Apply Leave",
//       path: "/empApplyLeave",
//     },
//     {
//       icons: employee,
//       icons2: whiteemployee,
//       name: "Task",
//       path: "/internTask",
//     },
//     {
//       icons: setting,
//       icons2: whitesetting,
//       name: "Settings",
//       path: "/settings",
//     },
//   ];

//   useEffect(() => {
//     const getUserAndPermissions = async (empID: string) => {
//       try {
//         const userQuery = query(
//           collection(db, "accessControl"),
//           where("empID", "==", empID)
//         );
//         const snapshot = await getDocs(userQuery);
//         const userData = snapshot.docs[0]?.data();
//         if (userData?.setPermission) {
//           setStoredPermissions(userData.setPermission);
//         }
//       } catch (error) {
//         console.error("Error fetching permissions:", error);
//       }
//     };

//     if (userID) {
//       getUserAndPermissions(userID);
//     }
//   }, [userID]);

//   const allowedMenuNames = Object.keys(storedPermissions || {});

//   const RemoveLocalValues = () => {
//     localStorage.removeItem("experienceData");
//     localStorage.removeItem("personalInfo");
//     localStorage.removeItem("educationData");
//   };

//   const isLinkActive = (linkName: string, linkPath: string) => {
//     const customPaths: Record<string, string[]> = {
//       "Leave Management": [
//         "/leavemanagement",
//         "/leaveapproval",
//         "/leavehistory",
//       ],
//       Employee: ["/employee", "/employeedetails", "/employeepersonal"],
//     };

//     return customPaths[linkName]
//       ? customPaths[linkName].includes(pathname)
//       : pathname === linkPath;
//   };

//   return (
//     <section className="p-5 h-full overflow-y-auto">
//       <div className="max-w-[100px] w-full h-20 mx-auto center">
//         <Image src={logo} alt="logo not found" />
//       </div>
//       <div className="h-[calc(100%-5rem)] flex flex-col justify-between">
//         <div className=" space-y-5 mt-3">
//           {sidebarMenu
//             .filter((link) => allowedMenuNames.includes(link.name))
//             .map((link, index) => (
//               <div key={index}>
//                 <div
//                   className={clsx(
//                     isLinkActive(link.name, link.path)
//                       ? "bg-primary px-2 py-2 rounded-sm text-white"
//                       : "px-2 py-2"
//                   )}
//                 >
//                   <Link
//                     href={link.path}
//                     onClick={RemoveLocalValues}
//                     className="flex items-center gap-3"
//                   >
//                     <Image
//                       src={
//                         isLinkActive(link.name, link.path)
//                           ? link.icons2
//                           : link.icons
//                       }
//                       alt={`${link.name} not found`}
//                       width={24}
//                       height={24}
//                     />
//                     <p className="text_size_4">{link.name}</p>
//                   </Link>
//                 </div>
//               </div>
//             ))}
//         </div>
//         <div>
//           <Link href="/logout" className="flex items-center gap-3">
//             <Image src={logout} alt="Logout not found" width={24} height={24} />
//             <p className="text_size_5">Logout</p>
//           </Link>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Sidebar;
