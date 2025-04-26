import { TableFormate } from "@/components/TableFormate";
import React from "react";

export const OverviewLeaveApproval = () => {
  const Heading = [
    "Date of Application",
    "Application type",
    "Duration",
    "Status",
  ];
  const OVLA = [
    {
      date: "batch001",
      appType: "Hema",
      duration: "ui",
      status: "ui",
    },
    {
      date: "batch001",
      appType: "Hema",
      duration: "ui",
      status: "ui",
    },
    {
      date: "batch001",
      appType: "Hema",
      duration: "ui",
      status: "ui",
    },
    {
      date: "batch001",
      appType: "Hema",
      duration: "ui",
      status: "ui",
    },
    {
      date: "batch001",
      appType: "Hema",
      duration: "ui",
      status: "ui",
    },
    {
      date: "batch001",
      appType: "Hema",
      duration: "ui",
      status: "ui",
    },
    {
      date: "batch001",
      appType: "Hema",
      duration: "ui",
      status: "ui",
    },
    {
      date: "batch001",
      appType: "Hema",
      duration: "ui",
      status: "ui",
    },
    {
      date: "batch001",
      appType: "Hema",
      duration: "ui",
      status: "ui",
    },
  ];
  return (
    <section className="rounded-xl px-5 py-8 shadow-xl h-full">
      <div className=" pb-1">
        <p className="text-gray text_size_3">Leave Approval</p>
      </div>
      <div>
        <TableFormate
          heading={Heading}
          ovla={OVLA}
          list="OVLA"
          allEmp={[]}
          leaveApproval={[]}
        />
      </div>
      <div className="text-mediumlite_grey text-[13px] font-medium flex gap-10 my-5">
        <p className=" relative before:mx-2 before:w-2.5 before:h-2.5 before:bg-approved_blue before:content-[''] before:inline-block">
          Approved
        </p>
        <p className=" relative before:mx-2 before:w-2.5 before:h-2.5 before:bg-medium_red before:content-[''] before:inline-block">
          Rejected
        </p>
        <p className=" relative before:mx-2 before:w-2.5 before:h-2.5 before:bg-medium_orange before:content-[''] before:inline-block">
          Pending
        </p>
      </div>
    </section>
  );
};
