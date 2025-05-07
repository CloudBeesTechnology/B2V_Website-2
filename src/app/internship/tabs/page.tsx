"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FaPlus } from "react-icons/fa6";
import InternshipTable from "../internshipTable";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig"; // Make sure this is your correct Firestore config

interface InternshipData {
  intID: string;
  firstName: string;
  role: string;
  category: string;
  courseContent: string;
  email: string;
  status: string; // "Pending" | "Approved" | "Rejected"
}

const Intern: React.FC = () => {
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

  const [interns, setInterns] = useState<InternshipData[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchInterns = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "Internship"));
      const fetchedData: InternshipData[] = querySnapshot.docs.map((doc) => ({
        intID: doc.id,
        ...doc.data(),
      })) as InternshipData[];
      setInterns(fetchedData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching interns:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInterns();
  }, []);

  const handleTabClick = (status: string) => {
    router.push(`/internship/tabs?tab=${status}`);
  };

  let tableData: InternshipData[] = [];
  let ActionData: { text: string; textColor: string; bgColor: string };

  if (getURLparam === "all") {
    tableData = interns;
    ActionData = {
      text: "Status",
      textColor: "text-gray-700",
      bgColor: "bg-gray-200",
    };
  } else {
    tableData = interns.filter(
      (item) =>
        item.status.toLowerCase() ===
        (getURLparam === "request" ? "pending" : getURLparam)
    );
    ActionData = {
      text:
        getURLparam === "request"
          ? "Action"
          : getURLparam.charAt(0).toUpperCase() + getURLparam.slice(1),
      textColor:
        getURLparam === "request"
          ? "text-medium_orange"
          : getURLparam === "approved"
          ? "text-medium_blue"
          : "text-medium_red",
      bgColor:
        getURLparam === "request"
          ? "bg-lite_orange"
          : getURLparam === "approved"
          ? "bg-lite_blue"
          : "bg-lite_red",
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

  const handleClick = () => {
    router.push("/internship/addInternship");
  };

  return (
    <main>
      <header className="center my-10 text-xl font-semibold text-gray">
        <h2>Internship</h2>
      </header>

      <section>
        <nav className="relative flex justify-between p-7 text-xl font-semibold text-gray">
          {/* Tabs Section */}
          <div className="relative center gap-20">
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

          <div>
            <button
              className="center rounded space-x-2 bg-primary text-white px-5 py-2"
              onClick={handleClick}
            >
              <span>Add</span>
              <FaPlus />
            </button>
          </div>
        </nav>
      </section>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : (
        <InternshipTable data={tableData}  />
      )}
    </main>
  );
};

export default Intern;
