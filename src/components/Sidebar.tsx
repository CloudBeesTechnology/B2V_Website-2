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
  const [storedPermissions, setStoredPermissions] = useState<string[]>([]);
  type UserRole = "EMPLOYEE" | "INTERN" | "ADMIN";
  const userRole =
    typeof window !== "undefined"
      ? (localStorage.getItem("userRole")?.toUpperCase() as UserRole | null)
      : null;

  const userID =
    typeof window !== "undefined"
      ? localStorage.getItem("empID")?.toString()?.toUpperCase()
      : null;

  const adminPortal = [
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
    // {
    //   icons: employee,
    //   icons2: whiteemployee,
    //   name: "Upcoming Holidays",
    //   path: "/empUpcomingHolidays",
    // },
    // {
    //   icons: attendance,
    //   icons2: whiteattendance,
    //   name: "Apply Leave",
    //   path: "/empApplyLeave",
    // },
    // {
    //   icons: employee,
    //   icons2: whiteemployee,
    //   name: "Task",
    //   path: "/internTask",
    // },
    {
      icons: timesheet,
      icons2: whitetimesheet,
      name: "Timesheet",
      path: "/timesheet",
    },
    {
      icons: setting,
      icons2: whitesetting,
      name: "Settings",
      path: "/settings",
    },
    {
      icons: report,
      icons2: whitereport,
      name: "Report",
      path: "/report",
    },
  ];

  const employeePortal = [
    {
      icons: overview,
      icons2: whiteoverview,
      name: "Overview",
      path: "/",
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
      icons: timesheet,
      icons2: whitetimesheet,
      name: "Timesheet",
      path: "/empTimeSheet",
    },
    {
      icons: setting,
      icons2: whitesetting,
      name: "Settings",
      path: "/settings",
    },
  ];

  const internPortal = [
    {
      icons: overview,
      icons2: whiteoverview,
      name: "Overview",
      path: "/",
    },
    {
      icons: employee,
      icons2: whiteemployee,
      name: "Task",
      path: "/internTask",
    },
    {
      icons: timesheet,
      icons2: whitetimesheet,
      name: "Timesheet",
      path: "/empTimeSheet",
    },
    {
      icons: setting,
      icons2: whitesetting,
      name: "Settings",
      path: "/settings",
    },
  ];

  const roleAccessMap = {
    EMPLOYEE: [
      "Overview",
      "Upcoming Holidays",
      "Apply Leave",
      "Timesheet",
      "Settings",
    ],
    INTERN: ["Overview", "Task", "Timesheet", "Settings"],
    ADMIN: [
      "Overview",
      "Employee",
      "Attendance",
      "Internship",
      "User",
      "Leave Management",
      "Timesheet",
      "Settings",
      "Report",
    ],
  };

  const portalMap: Record<string, typeof adminPortal> = {
    ADMIN: adminPortal,
    EMPLOYEE: employeePortal,
    INTERN: internPortal,
  };

  const filteredNavList =
    userRole && roleAccessMap[userRole]
      ? portalMap[userRole].filter((item) =>
          roleAccessMap[userRole].includes(item.name)
        )
      : [];

  useEffect(() => {
    const getUserAndPermissions = async (empID: string) => {
      const empQuery = query(
        collection(db, "users"),
        where("empID", "==", empID),
        where("role", "==", "Admin")
      );
      const userQuery = query(
        collection(db, "userDetails"),
        where("empID", "==", empID)
      );

      const [listEmpDetails, listUserDetails] = await Promise.all([
        getDocs(empQuery),
        getDocs(userQuery),
      ]);

      const empData = listEmpDetails.docs[0]?.data() || {};
      const userData = listUserDetails.docs[0]?.data() || {};

      return { ...empData, ...userData };
    };

    // let userRole =
    //   typeof window !== "undefined" ? localStorage.getItem("userRole") : null;

    if (userID) {
      getUserAndPermissions(userID).then((data) => {
        setStoredPermissions(data.permission);
      });
    }
  }, []);

  const RemoveLocalValues = () => {
    localStorage.removeItem("experienceData");
    localStorage.removeItem("personalInfo");
    localStorage.removeItem("educationData");
  };

  return (
    <section className="p-5 h-full overflow-y-auto">
      <div className="max-w-[100px] w-full h-20 mx-auto center">
        <Image src={logo} alt="logo not found" />
      </div>
      <div className="h-[calc(100%-5rem)] flex flex-col justify-between ">
        <div className=" space-y-5 mt-3">
          {filteredNavList.map((link, index) => {
            return (
              <section key={index}>
                {/* {storedPermissions?.includes(link.name) && ( */}
                <div
                  className={clsx(
                    pathname === link.path
                      ? "bg-primary px-2 py-2 rounded-sm text-white"
                      : "px-2 py-2"
                  )}
                >
                  <Link
                    href={link.path}
                    onClick={RemoveLocalValues}
                    className="flex items-center gap-3"
                  >
                    {pathname === link.path ? (
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
                {/* )} */}
              </section>
            );
          })}
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
