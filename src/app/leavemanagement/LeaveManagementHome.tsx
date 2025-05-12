"use client";
import Link from "next/link";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { usePathname } from "next/navigation";
import useCheckPermission from "../utils/customHooks/useCheckPermission";

export const LeaveManagementHome = () => {
  const { hasPermission } = useCheckPermission();
  const pathname = usePathname();
  const tiles = [
    { title: "Leave List", route: "leaveapproval" },
    { title: "Leave History", route: "leavehistory" },
    { title: "Leave Policy", route: "" },
    { title: "Permission List", route: "permission" },
    { title: "Permission History", route: "permissionhistory" },
    //   route: 'leavepolicy'
  ];
  return (
    <div className="py-14 px-6">
      <h1 className="text-[22px] font-normal leading-[32px] mb-6">
        Leave Tracking
      </h1>
      <div className="grid grid-cols-3 gap-6">
        {tiles
          .filter((fil, i) => hasPermission("Leave Management", fil.title))
          .map((tile, index) => (
            <div
              key={index}
              className="w-[352px] min-w-[200px] max-w-[500px] h-[152px] rounded-lg bg-white flex flex-col gap-6 justify-center items-center shadow-md"
            >
              <p className="text-xl font-medium mb-2">{tile.title}</p>
              <Link href={`/${tile.route}`}>
                <button className="bg-primary text_size_5 w-[110px] h-[36px] text-white px-14 py-4 rounded flex items-center justify-center gap-2 hover:bg-medium_blue">
                  <span>View</span>
                  <MdOutlineKeyboardArrowRight />
                </button>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
};
