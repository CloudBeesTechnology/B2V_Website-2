import React, { useEffect, useState } from "react";
import { FaRegCircle, FaCircleCheck } from "react-icons/fa6";
import { RiArrowDownSFill, RiArrowRightSFill } from "react-icons/ri";

type Module = {
  name: string;
  submodules: string[];
};

type SelectedModules = {
  [module: string]: string[];
};

type SetPermissionBoxProps = {
  selectedModules: SelectedModules;
  setSelectedModules: React.Dispatch<React.SetStateAction<SelectedModules>>;
};

const modulesData: Module[] = [
  {
    name: "Dashboard",
    submodules: [
      "Overview",
      "Employee",
      "Attendance",
      "Internship",
      "User",
      "Leave  Management",
      "Timesheet",
      "Settings",
      "Report",
    ],
  },
  {
    name: "Employee",
    submodules: [
      "Overview",
      "Upcoming Holidays",
      "Apply Leave",
      "Time Sheet",
      "Settings",
    ],
  },
  {
    name: "Intership",
    submodules: ["Overview", "Task", "TimeSheet", "Settings"],
  },
];

const SetPermissionBox: React.FC<SetPermissionBoxProps> = ({
  selectedModules,
  setSelectedModules,
}) => {
  //   const [selectedModules, setSelectedModules] = useState<SelectedModules>({});
  const [openModules, setOpenModules] = useState<{ [key: string]: boolean }>(
    {}
  );

  const isAllChecked = (module: Module): boolean | undefined => {
    const selected = selectedModules[module.name];
    return selected && selected.length === module.submodules.length;
  };

  const handleModuleToggle = (module: Module) => {
    const allSelected = isAllChecked(module);

    setSelectedModules((prev) => ({
      ...prev,
      [module.name]: allSelected ? [] : [...module.submodules],
    }));
  };

  const handleSubmoduleToggle = (moduleName: string, submoduleName: string) => {
    setSelectedModules((prev) => {
      const current = prev[moduleName] || [];
      const exists = current.includes(submoduleName);
      const updated = exists
        ? current.filter((item) => item !== submoduleName)
        : [...current, submoduleName];

      return {
        ...prev,
        [moduleName]: updated,
      };
    });
  };

  const toggleModuleCollapse = (moduleName: string) => {
    setOpenModules((prev) => ({
      ...prev,
      [moduleName]: !prev[moduleName],
    }));
  };

  return (
    <section>
      <h2 className="text-[#303030] text_size_4 mb-2">Set Permissions</h2>
      <div className="p-4 border border-[#E2E2E2] rounded-md w-full  bg-white">
        {/* Header Row */}
        {/* <div className="flex justify-between px-2 mb-2 text-gray font-semibold pb-1">
          <span>Module</span>
          <span>Access</span>
        </div> */}

        {modulesData.map((module) => {
          const isOpen = !!openModules[module.name];
          const checkedAll = isAllChecked(module);

          return (
            <div key={module.name} className="mb-4">
              {/* Module Name Row */}
              <div className="flex justify-between items-center cursor-pointer px-2 py-1 rounded-md">
                <div
                  onClick={() => toggleModuleCollapse(module.name)}
                  className="flex items-center"
                >
                  {isOpen ? (
                    <RiArrowDownSFill className="text-xl mr-2" />
                  ) : (
                    <RiArrowRightSFill className="text-xl mr-2" />
                  )}
                  <span className="text_size_3 text-gray">{module.name}</span>
                </div>
                <div
                  onClick={() => handleModuleToggle(module)}
                  className="cursor-pointer"
                >
                  {checkedAll ? (
                    <FaCircleCheck className="text-gray text-lg" />
                  ) : (
                    <FaRegCircle className="text-gray text-lg" />
                  )}
                </div>
              </div>

              {/* Submodules */}
              {isOpen && (
                <div className="ml-6 mt-2 space-y-2">
                  {module.submodules.map((sub) => {
                    const isChecked =
                      selectedModules[module.name]?.includes(sub);

                    return (
                      <div
                        key={sub}
                        onClick={() => handleSubmoduleToggle(module.name, sub)}
                        className="flex justify-between items-center text-gray text_size_4 cursor-pointer p-2 rounded-md"
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
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default SetPermissionBox;
