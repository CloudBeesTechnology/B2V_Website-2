"use client";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { FaPlus } from "react-icons/fa6";
import InternshipTable from "../internshipTable";
import AddInternship from "../addIntership";

interface InternshipData {
  name: string;
  role: string;
  category: string;
  courseContent: string;
  email: string;
}

const Internship: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const router = useRouter();
  const pathname = usePathname();

  const tabs = [
    { label: "Request Interns", path: "/internship/request" },
    { label: "Approved", path: "/internship/approved" },
    { label: "Rejected", path: "/internship/rejected" },
  ];

  const requestInterns: InternshipData[] = [
    {
      name: "Sriram C",
      role: "Intern",
      category: "Web Developer",
      courseContent: "Basic",
      email: "dummy@gmail.com",
    },
    {
      name: "Krishna",
      role: "Intern",
      category: "Web Developer",
      courseContent: "Basic",
      email: "dummy@gmail.com",
    },
  ];
  const approvedInterns: InternshipData[] = [
    {
      name: "Hariharan",
      role: "Intern",
      category: "UI/UX Designer",
      courseContent: "Intermediate",
      email: "john@gmail.com",
    },
    {
      name: "Murali",
      role: "Intern",
      category: "UI/UX Designer",
      courseContent: "Intermediate",
      email: "john@gmail.com",
    },
  ];
  const rejectedInterns: InternshipData[] = [
    {
      name: "Ragul",
      role: "Intern",
      category: "Software Engineer",
      courseContent: "Advanced",
      email: "jane@gmail.com",
    },
  ];

  let tableData: InternshipData[] = [];
  let ActionData = {};
  if (pathname.includes("/internship/request")) {
    tableData = requestInterns;
    ActionData = {
      text: "Action",
      textColor: "text-medium_orange",
      bgColor: "bg-lite_orange",
    };
  } else if (pathname.includes("/internship/approved")) {
    tableData = approvedInterns;
    ActionData = {
      text: "Approved",
      textColor: "text-medium_blue",
      bgColor: "bg-lite_blue",
    };
  } else if (pathname.includes("/internship/rejected")) {
    tableData = rejectedInterns;
    ActionData = {
      text: "Rejected",
      textColor: "text-medium_red",
      bgColor: "bg-lite_red",
    };
  }

  return (
    <main>
      <header className="center my-10 text-xl font-semibold text-gray">
        <h2>Internship</h2>
      </header>

      <section>
        <nav className="flex justify-between p-7 text-xl font-semibold text-gray">
          <div className="center gap-20">
            {tabs.map((tab) => (
              <p
                key={tab.path}
                className={`cursor-pointer ${
                  pathname === tab.path ? "border-b-3 border-primary" : ""
                }`}
                onClick={() => router.push(tab.path)}
              >
                {tab.label}
              </p>
            ))}
          </div>
          <div>
            <button
              className="center rounded space-x-2 bg-primary text-white px-5 py-2"
              onClick={() => setIsModalOpen(true)}
            >
              <span>Add</span>
              <FaPlus />
            </button>
          </div>
        </nav>
      </section>

      <InternshipTable data={tableData} ActionData={ActionData} />

      {isModalOpen && <AddInternship onClose={() => setIsModalOpen(false)} />}
    </main>
  );
};

export default Internship;
