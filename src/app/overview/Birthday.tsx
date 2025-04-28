import Image from "next/image";
import birth from "../../assets/home/image 7.svg";
import { useEffect, useState } from "react";

type Employee = {
  id: string;
  [key: string]: any;
};

type TotalEmployeeProps = {
  allEmployee: Employee[];
};

const Birthday: React.FC<TotalEmployeeProps> = ({ allEmployee }) => {
  const [empBirthday, setEmpBirthday] = useState<Employee[]>([]);

  useEffect(() => {
    const getAllEmployee = async () => {
      const empData = allEmployee.map((val, i) => ({
        ...val,
        dob: val.dob || `2025-06-0${i + 1}`,
      }));

      const today = new Date();

      const getUpcomingBirthday = (dobStr: string) => {
        const dob = new Date(dobStr);
        const next = new Date(
          today.getFullYear(),
          dob.getMonth(),
          dob.getDate()
        );
        if (next < today) {
          next.setFullYear(today.getFullYear() + 1);
        }
        return next;
      };

      const sortedEmployees = empData
        .map((emp) => ({
          ...emp,
          nextBirthday: getUpcomingBirthday(emp.dob),
        }))
        .sort((a, b) => a.nextBirthday.getTime() - b.nextBirthday.getTime());

      setEmpBirthday(sortedEmployees.slice(0, 4));
    };

    getAllEmployee();
  }, [allEmployee]);

  const formatDate = (isoDate: string) => {
    const date = new Date(isoDate);
    const options: Intl.DateTimeFormatOptions = {
      month: "short",
      day: "2-digit",
    };
    return date.toLocaleDateString("en-US", options); // e.g. "April 16"
  };

  return (
    <section className="rounded-xl px-5 py-8 shadow-xl h-full">
      <div className=" pb-1">
        <p className="text-gray text_size_3">Birthdays</p>
      </div>
      <div className="space-y-2 mt-2 px-8">
        {empBirthday.map((val, index) => {
          return (
            <p
              key={index}
              className="text-gray text_size_5 flex items-center justify-between"
            >
              {`${formatDate(val?.dob)} - ${val?.name}`}
              <span>
                <Image src={birth} alt="birthdays icon not found" />
              </span>
            </p>
          );
        })}
      </div>
    </section>
  );
};
export default Birthday;
