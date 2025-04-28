"use client";

import { PiMedalMilitary } from "react-icons/pi";
import { TbTargetArrow } from "react-icons/tb";
import { useEffect, useState } from "react";

type Employee = {
  id: string;
  [key: string]: any;
};

type TotalEmployeeProps = {
  allEmployee: Employee[];
};
const TotalEmployee: React.FC<TotalEmployeeProps> = ({ allEmployee }) => {
  const currentTime = new Date();
  const formattedDate = currentTime.toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  });

  const [maleEmpCount, setMaleEmpCount] = useState<number>(0);
  const [femaleEmpCount, setFemaleEmpCount] = useState<number>(0);

  useEffect(() => {
    const getAllEmployee = async () => {
      const allEmpData = allEmployee.map((val) => ({
        ...val,
        gender: val.name === "Vedambigai@Sevanthi" ? "female" : "male",
      }));

      let maleCount = 0;
      let femaleCount = 0;

      allEmployee.forEach((val) => {
        if (val?.gender === "male") maleCount++;
        else if (val?.gender === "female") femaleCount++;
      });

      setMaleEmpCount(maleCount);
      setFemaleEmpCount(femaleCount);
    };
    getAllEmployee();
  }, [allEmployee]);

  return (
    <section className="shadow-xl  max-w-sm w-full px-5 py-8 space-y-3 rounded-2xl">
      <div className="flex justify-between items-center border-b pb-1 border-morelite_grey">
        <p className="text-gray text_size_2">Total Employee</p>
        <p className="text_size_5 text-mediumlite_grey">{formattedDate}</p>
      </div>
      <div className="flex justify-between mt-5">
        <div className="space-y-3">
          <article className="flex gap-2">
            <span className="text-gray">
              <PiMedalMilitary />
            </span>
            <article className="space-y-1">
              <p className="text-mediumlite_grey text-xs">Male</p>
              <p className="text-gray text_size_3">{maleEmpCount}</p>
            </article>
          </article>
          <article className="flex gap-2">
            <span className="text-gray">
              <TbTargetArrow />
            </span>
            <article className="space-y-1">
              <p className="text-mediumlite_grey text-xs">Female</p>
              <p className="text-gray text_size_3">{femaleEmpCount}</p>
            </article>
          </article>
        </div>
        <div>
          <p className="text-medium_gray text-xs font-medium">Gender</p>
        </div>
      </div>
    </section>
  );
};
export default TotalEmployee;
