import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaRegCircle, FaCircleCheck } from "react-icons/fa6";
import { RiArrowDownSFill, RiArrowRightSFill } from "react-icons/ri";

// ----------- Types --------------
type Section = string;

type Submodule = {
  submodule: string;
  sections: Section[];
};

type SelectedModules = {
  [submoduleName: string]: Section[];
};

type SetPermissionBoxProps = {
  selectedModules: SelectedModules;
  setSelectedModules: React.Dispatch<React.SetStateAction<SelectedModules>>;
};

// ---------- Sample Data ---------------
const modulesData: Submodule[] = [
  {
    submodule: "Overview",
    sections: [
      "Entry Time",
      "Total Employee",
      "Active Employee",
      "Personal Calender",
      "Notice",
      "Birthdays",
      "Leave Requests",
      "Holidays",
      "Employee card",
      "Available Leaves",
      "Leave Applications",
      "Today task",
    ],
  },
  { submodule: "Employee", sections: ["All Employee", "Add Employee Info"] },
  { submodule: "Attendance", sections: ["Attendance"] },
  { submodule: "Internship", sections: ["Internship"] },
  { submodule: "User", sections: ["Credential Request", "Add User"] },
  {
    submodule: "Leave Management",
    sections: [
      "Leave List",
      "Leave History",
      "Leave Policy",
      "Permission List",
      "Permission History",
    ],
  },
  { submodule: "Timesheet", sections: ["Timesheet"] },
  { submodule: "Report", sections: ["Report"] },
  {
    submodule: "Upcoming Holidays",
    sections: ["Upcoming Holidays"],
  },
  { submodule: "Apply Leave", sections: ["Apply Leave"] },
  { submodule: "Task", sections: ["Task"] },
  { submodule: "Settings", sections: ["Settings"] },
];

const SetPermissionBox: React.FC<SetPermissionBoxProps> = ({
  selectedModules,
  setSelectedModules,
  
}) => {
  const [openSubmodules, setOpenSubmodules] = useState<{
    [key: string]: boolean;
  }>({});
const { register, handleSubmit, watch } = useForm();

  const isSubmoduleChecked = (submodule: string, sections: string[]) => {
    const selected = selectedModules[submodule];
    return selected && selected.length === sections.length;
  };

  const isSectionChecked = (submodule: string, section: string) => {
    return selectedModules[submodule]?.includes(section);
  };

  const toggleSubmodule = (sub: Submodule) => {
    const allChecked = isSubmoduleChecked(sub.submodule, sub.sections);

    setSelectedModules((prev) => {
      const updated = { ...prev };
      if (allChecked) {
        delete updated[sub.submodule];
      } else {
        updated[sub.submodule] = sub.sections;
      }
      return updated;
    });
  };

  const toggleSection = (submodule: string, section: string) => {
    setSelectedModules((prev) => {
      const currentSections = prev[submodule] || [];
      const exists = currentSections.includes(section);
      const updatedSections = exists
        ? currentSections.filter((sec) => sec !== section)
        : [...currentSections, section];

      return {
        ...prev,
        [submodule]: updatedSections,
      };
    });
  };

  const toggleCollapse = (submodule: string) => {
    setOpenSubmodules((prev) => ({
      ...prev,
      [submodule]: !prev[submodule],
    }));
  };

  return (
    <section className="">
      

      <div className="mt-10">
        <h2 className=" text-[#303030] text_size_4 mb-3">Set Permissions</h2>
      <div className="border border-lite_gray rounded p-4 bg-white">
        <div className="flex text_size_3 text-gray  pb-2">
          <h2 className="pl-3">Modules</h2>
          <h2 className="ml-auto">Access</h2>
        </div>
        {modulesData.map((sub) => {
          const isChecked = isSubmoduleChecked(sub.submodule, sub.sections);
          const isOpen = openSubmodules[sub.submodule];

          return (
            <div key={sub.submodule} className="mb-2">
              {/* Submodule Header */}
              <div
                className="flex justify-between items-center cursor-pointer px-2 py-1"
                onClick={() => toggleSubmodule(sub)}
              >
                <div
                  className="flex items-center text_size_3 text-gray"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleCollapse(sub.submodule);
                  }}
                >
                  {sub.sections.length > 0 ? (
                    isOpen ? (
                      <RiArrowDownSFill className="text-lg mr-2" />
                    ) : (
                      <RiArrowRightSFill className="text-lg mr-2" />
                    )
                  ) : (
                    <span className="w-5 mr-2" />
                  )}
                  <span>{sub.submodule}</span>
                </div>
                {isChecked ? (
                  <FaCircleCheck className="text-gray" />
                ) : (
                  <FaRegCircle className="text-gray" />
                )}
              </div>

              {/* Sections */}
              {isOpen && sub.sections.length > 0 && (
                <div className="ml-6 space-y-1">
                  {sub.sections.map((section) => (
                    <div
                      key={section}
                      className="flex justify-between items-center text_size_4 cursor-pointer px-2 py-1 text-md text-gray"
                      onClick={() => toggleSection(sub.submodule, section)}
                    >
                      <span>{section}</span>
                      {isSectionChecked(sub.submodule, section) ? (
                        <FaCircleCheck className="text-gray" />
                      ) : (
                        <FaRegCircle className="text-gray" />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
      </div>
      {/* Selected Output */}
    </section>
  );
};

export default SetPermissionBox;
