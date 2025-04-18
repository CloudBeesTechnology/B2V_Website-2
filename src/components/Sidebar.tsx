"use client";

import Image from "next/image";
import React from "react";
import attendance from "../assets/sidebar/attendance.svg";
import overview from "../assets/sidebar/overview.svg";
import internship from "../assets/sidebar/internship.svg";
import user from "../assets/sidebar/usergrey.svg";
import employee from "../assets/sidebar/employee.svg";
import leavemanagement from "../assets/sidebar/leavemanagement.svg";
import timesheet from "../assets/sidebar/timesheet.svg";
import setting from "../assets/sidebar/setting.svg";
import report from "../assets/sidebar/report.svg";
import whiteattendance from "../assets/sidebar/attendanceWhite.svg";
import whiteoverview from "../assets/sidebar/main dashboard white.svg";
import whiteinternship from "../assets/sidebar/InternTaskwhite.svg";
import whiteuser from "../assets/sidebar/user white.svg";
import whiteemployee from "../assets/sidebar/employee white.svg";
import whiteleavemanagement from "../assets/sidebar/leave white.svg";
import whitetimesheet from "../assets/sidebar/timesheetwhite.svg";
import whitesetting from "../assets/sidebar/settings white.svg";
import whitereport from "../assets/sidebar/reportwhite.svg";
import logout from "../assets/sidebar/Logout.svg";
import logo from "../assets/logo/logo.png";
import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();
  type UserRole = "EMPLOYEE" | "INTERN" | "ADMIN";
  const userRole =
    typeof window !== "undefined"
      ? (localStorage.getItem("userRole")?.toUpperCase() as UserRole | null)
      : null;
  const navList = [
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

  const filteredNavList =
    typeof userRole === "string" && roleAccessMap[userRole]
      ? navList.filter((item) => roleAccessMap[userRole].includes(item.name))
      : [];

  return (
    <section className="p-5 h-full overflow-y-auto">
      <div className="max-w-[100px] w-full h-20 mx-auto center">
        <Image src={logo} alt="logo not found" />
      </div>
      <div className="h-[calc(100%-5rem)] flex flex-col justify-between">
        <div className=" space-y-5 mt-3">
          {filteredNavList.map((link, index) => {
            return (
              <div
                key={index}
                className={clsx(
                  pathname === link.path
                    ? "bg-primary px-2 py-2 rounded-sm text-white"
                    : "px-2 py-2"
                )}
              >
                <Link href={link.path} className="flex items-center gap-3">
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
