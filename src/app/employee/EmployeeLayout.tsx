
"use client";

import { useSearchParams } from "next/navigation";
import { EmpNav } from "./EmpNav";
import PersonalPage from "../employeeDetails/personalInfo/page";
import EducationPage from "../employeeDetails/educationInfo/page";
import ExperiencePage from "../employeeDetails/experience/page";
import FamilyPage from "../employeeDetails/familyInfo/page";


export default function EmployeeLayout() {
  const searchParams = useSearchParams();
  const selectedTab = searchParams.get("tab") || "personalInfo";

  return (
    <section>
      <div className="text-mediumlite_grey text_size_2 mt-5">Employee</div>
      <EmpNav />
      <div className="mt-5">
        {selectedTab === "personalInfo" && <PersonalPage />}
        {selectedTab === "educationInfo" && <EducationPage />}
        {selectedTab === "experience" && <ExperiencePage />}
        {selectedTab === "familyInfo" && <FamilyPage />} 
      </div>
    </section>
  );
}
