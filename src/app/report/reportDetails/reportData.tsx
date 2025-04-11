"use client";

import Image from "next/image";
import React from "react";

type ReportTypes = {
  id: number;
  empId: string;
  empName: string;
  Position: string;
  dateOfJoining: string;
  emailId: string;
  Education: string;
  Course: string;
  yearsOfExperience: string;
  CompanyName: string;
};

const reportData: ReportTypes[] = [
  {
    id: 1,
    empId: "CBT0256",
    empName: "Sriram",
    Position: "Developer",
    dateOfJoining: "25 Oct 2024",
    emailId: "sriram@gmail.com",
    Education: "B.Tech",
    Course: "React JS",
    yearsOfExperience: "3 years",
    CompanyName: "Ippo Private Limited",
  },
];

const empReportDetailsKey = [
  "Emp Id",
  "Emp Name",
  "Position",
  "Date of Joining",
  "Email Id",
  "Education details",
  "Education",
  "Course",
  "experience",
  "years of experience",
  "Company name",
];
const ReportData: React.FC = () => {
  return (
    <section className="w-full center my-15 ">
      <div className="max-w-4xl w-full px-20 py-15  bg-white shadow-xl rounded-xl max-h-[700px] overflow-y-scroll">
        <div className="center text-gray text-2xl font-medium mb-12">
          <h3>Employee Details</h3>
        </div>

        {reportData.map((employee) => (
          <div
            key={employee.id}
            className="flex flex-row justify-between gap-6"
          >
            <div className="flex-1 space-y-8 font-medium text-gray ">
              {Object.entries(employee).map(([key, value], index) => {
                // Skip rendering the id field
                if (key === "id") return null;

                return (
                  <p key={key} className=" flex justify-between">
                    <span className="font-medium  w-full">
                      {empReportDetailsKey[index - 1]}
                    </span>
                    <span className="font-medium center w-full">:</span>
                    <span className="font-medium  w-full"> {value}</span>
                  </p>
                );
              })}
            </div>

            <figure>
              <img
                src="https://png.pngtree.com/png-clipart/20230913/original/pngtree-profile-picture-png-image_11063391.png" // make sure this image exists
                alt="Employee"
                className="w-32 h-32 rounded-xl object-cover "
              />
            </figure>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ReportData;
