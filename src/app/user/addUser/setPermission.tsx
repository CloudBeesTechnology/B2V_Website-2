import React from "react";
import { FaRegCircle, FaCircleCheck } from "react-icons/fa6";

type SetPermissionBoxProps = {
  selectedModules: string[];
  setSelectedModules: React.Dispatch<React.SetStateAction<string[]>>;
};

const submodulesList: string[] = [
  "Overview",
  "Employee",
  "Attendance",
  "Internship",
  "User",
  "Leave  Management",
  "Timesheet",
  "Settings",
  "Report",
];

const SetPermissionBox: React.FC<SetPermissionBoxProps> = ({
  selectedModules,
  setSelectedModules,
}) => {
  const handleToggle = (submodule: string) => {
    const exists = selectedModules.includes(submodule);
    const updated = exists
      ? selectedModules.filter((item) => item !== submodule)
      : [...selectedModules, submodule];

    setSelectedModules(updated);
  };

  return (
    <section>
      <h2 className="text-[#303030] text_size_4 mb-2">Set Permissions</h2>
      <div className="p-4 border border-[#E2E2E2] rounded-md w-full bg-white">
        {submodulesList.map((sub) => {
          const isChecked = selectedModules?.includes(sub);
          return (
            <div
              key={sub}
              onClick={() => handleToggle(sub)}
              className="flex justify-between items-center text-gray text_size_3 cursor-pointer p-2 rounded-md"
            >
              <span>{sub}</span>
              {isChecked ? (
                <FaCircleCheck className="text-gray text-lg" />
              ) : (
                <FaRegCircle className="text-gray text-lg" />
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default SetPermissionBox;
