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
import { usePathname, useRouter } from "next/navigation";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "@/lib/firebaseConfig";
import { signOut } from "firebase/auth";

interface UserPermissions {
  setPermission?: {
    [key: string]: string[];
  };
}

const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [allowedMenuItems, setAllowedMenuItems] = useState<string[]>([]);

  const userRole =
    typeof window !== "undefined"
      ? (localStorage.getItem("userRole")?.toUpperCase() as
          | "EMPLOYEE"
          | "INTERN"
          | "ADMIN"
          | null)
      : null;


        const empID = typeof window !== "undefined" ? localStorage.getItem("empID") : null;
  const intID = typeof window !== "undefined" ? localStorage.getItem("intID") : null;
  const userID = empID || intID;

  const sidebarMenu = [
    { icons: overview, icons2: whiteoverview, name: "Overview", path: "/" },
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
    { icons: user, icons2: whiteuser, name: "User", path: "/user" },
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
    { icons: report, icons2: whitereport, name: "Report", path: "/report" },
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

  const customPaths: Record<string, string[]> = {
    Employee: ["/employee", "/allEmployee", "/employeeDetails"],
    Attendance: ["/attendance"],
    Internship: [
      "/internship",
      "/internship/tabs",
      "/internship/addInternship",
      "/internship/internStatus",
    ],
    User: ["/user", "/user/credentialRequest", "/user/addUser"],
    "Leave Management": [
      "/leavemanagement",
      "/leaveapproval",
      "/leavehistory",
      "/permission",
      "/permissionhistory",
    ],
    Timesheet: ["/timesheet"],
    Report: [
      "/report",
      "/report/reportDetails",
      "/report/leaveData",
      "/report/records",
      "/report/permission",
    ],
    "Upcoming Holidays": ["/empUpcomingHolidays"],
    "Apply Leave": ["/empApplyLeave"],
    Task: ["/internTask"],
    Settings: ["/settings"],
  };

  useEffect(() => {
    const getUserAndPermissions = async (id: string): Promise<UserPermissions> => {
      try {
        const queries = [
          query(collection(db, "accessControl"), where("empID", "==", id)),
          query(collection(db, "accessControl"), where("intID", "==", id)),
        ];

        const querySnapshots = await Promise.all(queries.map((q) => getDocs(q)));

        for (const snapshot of querySnapshots) {
          if (!snapshot.empty) {
            return snapshot.docs[0].data() as UserPermissions;
          }
        }

        return {};
      } catch (error) {
        console.error("Error fetching permissions:", error);
        return {};
      }
    };

    if (userID) {
      getUserAndPermissions(userID).then((data) => {
        const permissions = data.setPermission || {};
        const flatPermissions = Object.keys(permissions);
        const filteredKeys = flatPermissions.filter(
          (key) => Array.isArray(permissions[key]) && permissions[key].length > 0
        );

        setAllowedMenuItems(filteredKeys);

        if (pathname === "/") {
          const firstAllowed = sidebarMenu.find((item) => filteredKeys.includes(item.name));
          if (firstAllowed) {
            router.push(firstAllowed.path);
          }
        }
      });
    }
  }, [userID, pathname, router]);

  const RemoveLocalValues = () => {
    localStorage.removeItem("experienceData");
    localStorage.removeItem("personalInfo");
    localStorage.removeItem("educationData");
  };

  const isLinkActive = (linkName: string, linkPath: string) => {
    // const customPaths: Record<string, string[]> = {
    //   Employee: ["/employee", "/allEmployee", "/employeeDetails"],
    //   Attendance: ["/attendance"],
    //   Internship: [
    //     "/internship",
    //     "/internship/tabs",
    //     "/internship/addInternship",
    //     "/internship/internStatus",
    //   ],
    //   User: ["/user", "/user/credentialRequest", "/user/addUser"],
    //   "Leave Management": [
    //     "/leavemanagement",
    //     "/leaveapproval",
    //     "/leavehistory",
    //     "/permission",
    //     "/permissionhistory",
    //   ],
    //   Timesheet: ["/timesheet"],
    //   Report: [
    //     "/report",
    //     "/report/reportDetails",
    //     "/report/leaveData",
    //     "/report/records",
    //   ],
    //   "Upcoming Holidays": ["/empUpcomingHolidays"],
    //   "Apply Leave": ["/empApplyLeave"],
    //   Task: ["/internTask"],
    //   Settings: ["/settings"],
    // };

    return customPaths[linkName]
      ? customPaths[linkName].includes(pathname)
      : pathname === linkPath;
  };
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        localStorage.clear();
        router.push("/signIn");
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
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
                    <Image
                      src={
                        isLinkActive(link.name, link.path)
                          ? link.icons2
                          : link.icons
                      }
                      alt={`${link.name} not found`}
                      width={24}
                      height={24}
                    />
                    <p className="text_size_4">{link.name}</p>
                  </Link>
                </div>
              </div>
            ))}
        </div>
        <div className="px-2">
          <button onClick={handleLogout} className="flex items-center gap-3">
            <Image src={logout} alt="Logout not found" width={24} height={24} />
            <p className="text_size_4">Logout</p>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Sidebar;