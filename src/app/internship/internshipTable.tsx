"use client";

import { useState } from "react";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import Link from "next/link";
import InternPopup from "./InternPopup";

interface InternTableProps {
  data: RequestInternData[];
}

interface RequestInternData {
  intID?: string;
  firstName: string;
  lastName?: string;
  role?: string;
  category: string;
  courseContent: string;
  email: string;
  status?: string;
  dateOfBirth?: string;
  contact?: string;
  gender?: string;
  doj?: string;
  durationStart?: string;
  durationEnd?: string;
  mentor?: string;
}

const InternshipTable: React.FC<InternTableProps> = ({ data }) => {
  const [selectedIntern, setSelectedIntern] = useState<RequestInternData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleView = (intern: RequestInternData) => {
    setSelectedIntern(intern);
    setIsModalOpen(true);
  };

  return (
    <section className="bg-white rounded-md my-3 p-4">
      {data.length === 0 ? (
        <p className="text-center text-gray-500 py-4">No data available.</p>
      ) : (
        <table className="table-fixed w-full">
          <thead>
            <tr className="font-semibold text-gray text-center border-b border-[#D2D2D240]">
              <th className="py-5">Int ID</th>
              <th className="py-5">Name</th>
              <th className="py-5">Category</th>
              <th className="py-5">Course Content</th>
              <th className="py-5">Email ID</th>
              <th className="py-5">View Form</th>
            </tr>
          </thead>
          <tbody>
            {data.map((intern, index) => (
              <tr key={index} className="text-center text-sm border-b border-[#D2D2D240]">
                <td className="py-5">{intern.intID}</td>
                <td className="py-5">{intern.firstName}</td>
                <td className="py-5">{intern.category}</td>
                <td className="py-5">{intern.courseContent}</td>
                <td className="py-5">{intern.email}</td>
                <td className="py-5">
                  <button
                    onClick={() => handleView(intern)}
                    className="text-blue-600 underline"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

{isModalOpen && selectedIntern && (
  <InternPopup onClose={() => setIsModalOpen(false)}>
    <div className="text-sm text-left">
      <h2 className="text-lg text-center font-semibold mb-3">Intern Details</h2>
      <table className="table-auto w-full border border-gray-300">
        <tbody>
        <tr>
            <td className="font-semibold  px-4 py-2">Int ID </td>
            <td className=" px-4 py-2">: {selectedIntern.intID || "N/A"}</td>
          </tr>
          <tr>
            <td className="font-semibold  px-4 py-2">Name</td>
            <td className=" px-4 py-2">: {selectedIntern.firstName}</td>
          </tr>
         
          <tr>
            <td className="font-semibold  px-4 py-2">Date of Birth</td>
            <td className=" px-4 py-2">: {selectedIntern.dateOfBirth || "N/A"}</td>
          </tr>
          <tr>
            <td className="font-semibold  px-4 py-2">Email</td>
            <td className=" px-4 py-2">: {selectedIntern.email}</td>
          </tr>
          <tr>
            <td className="font-semibold  px-4 py-2">Contact</td>
            <td className=" px-4 py-2">: {selectedIntern.contact || "N/A"}</td>
          </tr>
          <tr>
            <td className="font-semibold  px-4 py-2">Gender</td>
            <td className=" px-4 py-2">: {selectedIntern.gender || "N/A"}</td>
          </tr>
          <tr>
            <td className="font-semibold  px-4 py-2">Category</td>
            <td className=" px-4 py-2">: {selectedIntern.category}</td>
          </tr>
          <tr>
            <td className="font-semibold  px-4 py-2">Course Content</td>
            <td className=" px-4 py-2">: {selectedIntern.courseContent}</td>
          </tr>
          <tr>
            <td className="font-semibold  px-4 py-2">Date of Joining</td>
            <td className=" px-4 py-2">: {selectedIntern.doj || "N/A"}</td>
          </tr>
          <tr>
            <td className="font-semibold  px-4 py-2">Duration Start</td>
            <td className=" px-4 py-2">: {selectedIntern.durationStart || "N/A"}</td>
          </tr>
          <tr>
            <td className="font-semibold  px-4 py-2">Duration End</td>
            <td className=" px-4 py-2">: {selectedIntern.durationEnd || "N/A"}</td>
          </tr>
          <tr>
            <td className="font-semibold  px-4 py-2">Mentor</td>
            <td className=" px-4 py-2">: {selectedIntern.mentor || "N/A"}</td>
          </tr>
          <tr>
            <td className="font-semibold  px-4 py-2">Status</td>
            <td className=" px-4 py-2">: {selectedIntern.status || "N/A"}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </InternPopup>
)}

    </section>
  );
};

export default InternshipTable;

