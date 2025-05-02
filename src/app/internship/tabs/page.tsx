"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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

const Internship: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const getURLparam = searchParams.get("tab") || "request";

  const tabs = [
    { label: "Request Interns", path: "request" },
    { label: "Approved", path: "approved" },
    { label: "Rejected", path: "rejected" },
  ];

  const tabRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 });

  const handleTabClick = (status: string) => {
    router.push(`/internship?tab=${status}`);
  };

  let tableData: InternshipData[] = [];
  let ActionData = {};

  if (getURLparam === "request") {
    tableData = requestInterns;
    ActionData = {
      text: "Action",
      textColor: "text-medium_orange",
      bgColor: "bg-lite_orange",
    };
  } else if (getURLparam === "approved") {
    tableData = approvedInterns;
    ActionData = {
      text: "Approved",
      textColor: "text-medium_blue",
      bgColor: "bg-lite_blue",
    };
  } else if (getURLparam === "rejected") {
    tableData = rejectedInterns;
    ActionData = {
      text: "Rejected",
      textColor: "text-medium_red",
      bgColor: "bg-lite_red",
    };
  }

  useEffect(() => {
    const activeIndex = tabs.findIndex((tab) => tab.path === getURLparam);
    const activeTab = tabRefs.current[activeIndex];

    if (activeTab) {
      setUnderlineStyle({
        left: activeTab.offsetLeft,
        width: activeTab.offsetWidth,
      });
    }
  }, [getURLparam]);

  return (
    <main>
      <header className="center my-10 text-xl font-semibold text-gray">
        <h2>Internship</h2>
      </header>

      <section>
        <nav className="relative flex justify-between p-7 text-xl font-semibold text-gray">
          {/* Tabs Section */}
          <div className="relative center gap-20">
            {/* Moving Underline */}
            <div
              className="absolute bottom-0 h-[2px] bg-primary transition-all duration-300 ease-in-out"
              style={{
                left: underlineStyle.left,
                width: underlineStyle.width,
              }}
            />

            {tabs.map((tab, idx) => (
              <p
                key={tab.path}
                ref={(el) => {
                  tabRefs.current[idx] = el;
                }}
                className={`cursor-pointer pb-1 ${
                  getURLparam === tab.path ? "text-primary" : "text-gray-500"
                }`}
                onClick={() => handleTabClick(tab.path)}
              >
                {tab.label}
              </p>
            ))}
          </div>

          {/* Add Button */}
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

      {/* Table and Modal */}
      <InternshipTable data={tableData} ActionData={ActionData} />
      {isModalOpen && <AddInternship onClose={() => setIsModalOpen(false)} />}
    </main>
  );
};

export default Internship;
