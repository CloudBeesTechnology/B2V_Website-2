import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import avatar from "../../public/assets/navbar/Missing_avatar.svg.png";
import { DateFormat } from "./DateFormate";
import html2pdf from "html2pdf.js";
import { IoMdDownload } from "react-icons/io";
import { AiFillPrinter } from "react-icons/ai";
import printJS from "print-js";

interface allEmployee {
  profile?: string;
  empID: string;
  name: string;
  position: string;
  department: string;
  contact: string;
  email: string;
  createdAt?: string;
  [key: string]: any;
}

interface TableProps {
  allEmp?: allEmployee;
  close: () => void;
}

export const ViewEmpData = ({ allEmp, close }: TableProps) => {
  const printRef = useRef<HTMLDivElement>(null);

  const personalFields: { label: string; key: string }[] = [
    { label: "Name", key: "name" },
    { label: "Date of Birth", key: "dob" },
    { label: "Gender", key: "gender" },
    { label: "Nationality", key: "nationality" },
    { label: "Address", key: "address" },
    { label: "Contact", key: "contact" },
    { label: "Date of Join", key: "doj" },
    { label: "Alternate No", key: "alternateNo" },
    { label: "Email", key: "email" },
    { label: "Language", key: "lang" },
    { label: "Religion", key: "religion" },
    { label: "Department", key: "department" },
    { label: "Position", key: "position" },
    { label: "Total Leave", key: "totalLeave" },
    { label: "Manager", key: "manager" },
    { label: "Lead", key: "leadEmpID" },
    { label: "Effective Date", key: "effectiveDate" },
    { label: "Proof", key: "proof" },
  ];
  const educMenu = [
    { label: "Degree", key: "degree" },
    { label: "Field of Study", key: "study" },
    { label: "School", key: "school" },
    { label: "Master Degree", key: "master" },
    { label: "Field of Study", key: "field" },
    { label: "High School", key: "highSchool" },
    { label: "Courses", key: "courses" },
  ];
  const experMenu = [
    { label: "No of Year", key: "year" },
    { label: "Company", key: "company" },
    { label: "Work", key: "work" },
    { label: "Manager", key: "manager" },
    { label: "Department", key: "dept" },
    { label: "Location", key: "location" },
  ];
  const familyMenu = [
    { label: "Father Name", key: "father" },
    { label: "Mother Name", key: "mother" },
    { label: "Siblings", key: "siblings" },
    { label: "Status", key: "personalStatus" },
    { label: "Husband Name", key: "husbandName" },
    { label: "Wife Name", key: "wifeName" },
    { label: "Child", key: "child" },
    { label: "Contact No", key: "familyPNo" },
    { label: "Family Address", key: "familyAddress" },
  ];

  const handleDownloadPDF = () => {
    const content = printRef.current;
    if (!content) return;

    const opt = {
      margin: [10, 10, 0, 10], // top, left, bottom, right
      filename: `${allEmp?.name || "employee"}_details.pdf`,
      image: { type: "jpeg", quality: 1 },
      html2canvas: {
        scale: 3,
        useCORS: true,
        allowTaint: false,
      },
      jsPDF: {
        unit: "mm",
        format: "a4",
        orientation: "portrait",
      },
    };

    html2pdf().set(opt).from(content).save();
  };

  const handlePrint = () => {
    printJS({
      printable: "print-section",
      type: "html",
      targetStyles: ["*"],
    });
    // const content = printRef.current;
    // if (!content) return;
    // printJS({
    //   printable: content.innerHTML,
    //   type: "html",
    //   targetStyles: ["*"],
    // });
  };

  if (!allEmp)
    return <div className="text-center py-4">No employee data available.</div>;

  return (
    <section className="fixed inset-0 bg-[#07060788] z-[99999] flex items-center justify-center">
      <div className="relative w-[90%] max-w-5xl max-h-[90vh] overflow-hidden bg-white rounded-lg shadow-lg">
        {/* Close Button */}

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-6 max-h-[85vh]">
          <div className="relative">
            {/* <h1 className="text_size_2 text-center text-gray my-5">
              Employee Details
            </h1> */}
            <button
              onClick={close}
              className="absolute right-0 top-0 text-gray hover:text-black"
            >
              <IoMdCloseCircle className="text-3xl" />
            </button>
          </div>
          <div ref={printRef} id="print-section">
            <h1 className="text_size_2 text-center my-5">Employee Details</h1>
            <h2 className="font-bold text-lg mb-2">Personal Information :</h2>

            <div className="flex justify-between">
              {/* Left Column - Personal Fields */}
              <div className="w-3/4">
                {personalFields.map(
                  ({ label, key }) =>
                    key !== "profilePhoto" && (
                      <div key={key} className="flex w-full">
                        <p className="px-2 py-1 font-semibold w-8/10">
                          {label}
                        </p>
                        <p className="px-2 py-1 font-semibold w-1/20 text-right ">
                          :
                        </p>

                        {["dob", "doj", "effectiveDate"].includes(key) ? (
                          <p className="px-2 py-1 w-1/2">
                            {allEmp[key] ? DateFormat(allEmp[key]) : "N/A"}
                          </p>
                        ) : // Proof Link
                        key === "proof" ? (
                          <p className="px-2 py-1 w-1/2">
                            {allEmp[key] && typeof allEmp[key] === "string" ? (
                              <a
                                href={allEmp[key]}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 underline"
                              >
                                View Document
                              </a>
                            ) : (
                              "N/A"
                            )}
                          </p>
                        ) : (
                          // Other Fields
                          <p className="px-2 py-1 w-1/2">
                            {allEmp[key] || "N/A"}
                          </p>
                        )}
                      </div>
                    )
                )}
              </div>

              {/* Right Column - Profile Photo */}
              <div className="w-1/4 flex justify-center items-start">
                {allEmp?.profilePhoto ? (
                  <img
                    src={allEmp?.profilePhoto}
                    // src="https://thumbs.dreamstime.com/b/pink-flower-rests-sandy-beach-contrasting-natural-landscape-pink-flower-rests-sandy-beach-contrasting-367953686.jpg"
                    alt="Profile"
                    width={150}
                    height={150}
                    className="rounded-md object-cover shadow-lg"
                  />
                ) : (
                  <div className="w-[100px] h-[100px] bg-gray-200 rounded-md flex items-center justify-center text-sm text-gray-500">
                    <Image
                      src={avatar}
                      alt="Profile"
                      width={150}
                      height={150}
                      className="rounded-md object-cover"
                    />
                  </div>
                )}
              </div>
            </div>

            <h2 className="font-bold text-lg my-5">Education Information :</h2>

            <div>
              {educMenu.map(({ label, key }) => {
                const value = allEmp?.[key];
                let displayValue;

                if (key === "courses" && Array.isArray(value)) {
                  displayValue = (
                    <section className="pl-5">
                      {value.map((item: any, index: number) => (
                        <div key={index}>
                          <span className="font-medium">{index + 1} .</span>
                          <span className="font-semibold px-1">Course:</span>
                          {item.course},
                          <span className="font-semibold px-2">Academic:</span>
                          {item.academic}
                        </div>
                      ))}
                    </section>
                  );
                } else if (typeof value === "object" && value !== null) {
                  displayValue = Object.entries(value)
                    .map(([k, v]) => `${k}: ${v}`)
                    .join(", ");
                } else {
                  displayValue = value || "N/A";
                }

                return (
                  <div key={key} className="flex">
                    <div className="px-2 py-1 font-semibold w-9/20 ">
                      {label}
                    </div>
                    <div className="px-2 py-1 font-semibold w-1/20 text-right ">
                      :
                    </div>
                    <div className="px-2 py-1 w-11/20 ">{displayValue}</div>
                  </div>
                );
              })}
            </div>

            <h2 className="font-bold text-lg  my-5">Experience Information:</h2>

            <div className="flex">
              <div className="px-2 py-1 font-semibold align-top w-9/20">
                Experiences
              </div>
              <div className="px-2 py-1 font-semibold text-right w-1/20">:</div>
              <div className=" px-2 py-1 w-11/20">
                {Array.isArray(allEmp?.experiences) &&
                allEmp.experiences.length > 0 ? (
                  <ol className="list-decimal pl-5 space-y-2">
                    {allEmp.experiences.map((exp: any, index: number) => (
                      <li key={index}>
                        {experMenu.map(({ label, key }) => (
                          <div key={key} className="flex items-center">
                            <div className="font-semibold">{label}:</div>
                            <div className="pl-1">
                              {" "}
                              {exp[key]?.trim()
                                ? exp[key]
                                    .trim()
                                    .split(" ")
                                    .map(
                                      (word: string) =>
                                        word.charAt(0).toUpperCase() +
                                        word.slice(1).toLowerCase()
                                    )
                                    .join(" ")
                                : "N/A"}
                            </div>
                          </div>
                        ))}
                      </li>
                    ))}
                  </ol>
                ) : (
                  "N/A"
                )}
              </div>
            </div>

            <h2 className="font-bold text-lg  my-5">Family Information:</h2>

            <div>
              {familyMenu.map(({ label, key }) => (
                <div key={key} className="flex">
                  <div className="px-2 py-1 font-semibold w-9/20">{label}</div>
                  <div className="px-2 py-1 font-semibold w-1/20 text-right">
                    :
                  </div>
                  <div className="px-2 py-1 w-11/20">
                    {allEmp[key] || "N/A"}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center gap-5 mb-4 mt-2">
          {/* Download Button */}
          <div onClick={handleDownloadPDF}>
            <div className="flex items-center gap-2 px-4 py-1.5 bg-primary text-white rounded shadow hover:bg-primary/90 cursor-pointer">
              <p>Download</p>
              <IoMdDownload className="text-lg" />
            </div>
          </div>

          {/* Print Button */}
          <div
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-1.5 bg-primary text-white rounded shadow hover:bg-primary/90 cursor-pointer"
          >
            <p>Print</p>

            <AiFillPrinter />
          </div>
        </div>
      </div>
    </section>
  );
};
