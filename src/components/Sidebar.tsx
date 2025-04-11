"use client";

import Image from "next/image";
import React from "react";
import attendance from "../assets/sidebar/attendance.svg";
import internship from "../assets/sidebar/internship.svg";
import overview from "../assets/sidebar/overview.svg";
import employee from "../assets/sidebar/employee.svg";
import leavemanagement from "../assets/sidebar/leavemanagement.svg";
import timesheet from "../assets/sidebar/timesheet.svg";
import setting from "../assets/sidebar/setting.svg";
import report from "../assets/sidebar/report.svg";
import logout from "../assets/sidebar/Logout.svg";
import logo from "../assets/logo/logo.png";
import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();
 
  const navList = [
    {
      icons: overview,
      name: "Overview",
      path: "/",
    },
    {
      icons: employee,
      name: "Employee",
      path: "/employee",
    },
    {
      icons: attendance,
      name: "Attendance",
      path: "/attendance",
    },
    {
      icons: internship,
      name: "Internship",
      path: "/internship",
    },
    {
      icons: leavemanagement,
      name: "Leave Management",
      path: "/leavemanagement",
    },
    {
      icons: timesheet,
      name: "Timesheet",
      path: "/timesheet",
    },
    {
      icons: setting,
      name: "Settings",
      path: "/settings",
    },
    {
      icons: report,
      name: "Report",
      path: "/report",
    },
  ];
 
  
  return (
    <section className="p-5 space-y-2 h-full ">
      <div className="max-w-[100px] w-full h-20 mx-auto center">
        <Image src={logo} alt="logo not found" />
      </div>
      <div className="h-[calc(100%-5rem)] flex flex-col justify-between">
        <div className=" space-y-5 mt-3">
          {navList.map((link, index) => {
            return (
              <div
                key={index}
                className={clsx(
                  pathname === link.path ? "bg-primary px-2 py-2 rounded-sm text-white" : "px-2 py-2"
                )}
              >
                <Link href={link.path} className="flex items-center gap-3">
                  <Image
                    src={link.icons}
                    alt={`${link.name} not found`}
                    width={24}
                    height={24}
                  />
                  <p className="text_size_4">{link.name}</p>
                </Link>
              </div>
            );
          })}
        </div>
        <div className="">
          <Link href="" className="flex items-center gap-3">
            <Image src={logout} alt="Logout not found" width={24} height={24} />
            <p className="text_size_5">Logout</p>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Sidebar;
