import Link from "next/link";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import { TableFormate } from "@/components/TableFormate";

export default function LeaveHistory() {
  const Heading = [
    "Name(s)",
    "Duration(s)",
    "Start Date",
    "End Date",
    "Type",
    "Reason(s)",
    "Actions",
  ];
  const LA = [
    {
      name: "hema",
      duration: "2",
      startDate: "29-03-2025",
      endDate: "30-03-2025",
      type: "sick",
      reason: "vomiting",
      action: "pending",
    },
    {
      name: "hema",
      duration: "2",
      startDate: "29-03-2025",
      endDate: "30-03-2025",
      type: "sick",
      reason: "vomiting",
      action: "pending",
    },
    {
      name: "hema",
      duration: "2",
      startDate: "29-03-2025",
      endDate: "30-03-2025",
      type: "sick",
      reason: "vomiting",
      action: "pending",
    },
    {
      name: "hema",
      duration: "2",
      startDate: "29-03-2025",
      endDate: "30-03-2025",
      type: "sick",
      reason: "vomiting",
      action: "pending",
    },
    {
      name: "hema",
      duration: "2",
      startDate: "29-03-2025",
      endDate: "30-03-2025",
      type: "sick",
      reason: "vomiting",
      action: "pending",
    },
    {
      name: "hema",
      duration: "2",
      startDate: "29-03-2025",
      endDate: "30-03-2025",
      type: "sick",
      reason: "vomiting",
      action: "pending",
    },
    {
      name: "hema",
      duration: "2",
      startDate: "29-03-2025",
      endDate: "30-03-2025",
      type: "sick",
      reason: "vomiting",
      action: "pending",
    },
    {
      name: "hema",
      duration: "2",
      startDate: "29-03-2025",
      endDate: "30-03-2025",
      type: "sick",
      reason: "vomiting",
      action: "pending",
    },
  ];
  return (
    <div className="py-14">
      <h1 className="text-[22px] font-normal text-gray flex items-center gap-3">
        <Link href="/leavemanagement" className="text-mediumlite_grey">
          <MdOutlineKeyboardBackspace />
        </Link>
        Leave History
      </h1>
      <div className="flex justify-between items-center mt-8">
        <div className="space-x-5">
          <input type="date" placeholder="From" className="outline-none border border-morelite_grey p-2" />
          <input type="date" placeholder="To" className="outline-none border border-morelite_grey p-2" />
        </div>
        <div className="border border-morelite_grey overflow-hidden rounded-md flex items-center bg-primary">
          <input
            type="text"
            placeholder="Search"
            className="outline-none text-[12px] px-3 py-2 bg-white"
          />
          <span className="px-2 text-white">
            <IoSearch />
          </span>
        </div>
      </div>
      <div className="bg-white px-10 py-5 rounded-lg mb-7 mt-5">
        <article className="">
          <h5 className="text-gray text_size_9">Leave History List</h5>
        </article>
        <div className="mt-8">
          <TableFormate
            list="leaveApproval"
            allEmp={[]}
            ovla={[]}
            heading={Heading}
            leaveApproval={LA}
          />
        </div>
      </div>
    </div>
  );
}
