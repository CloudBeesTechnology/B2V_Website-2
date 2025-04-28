import Image from "next/image";
import birth from "../../../public/assets/home/image 7.svg";
import { RxCross1 } from "react-icons/rx";
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
  const [toggleHandler, setToggleHandler] = useState(false);

  useEffect(() => {
    const getAllEmployee = async () => {
      let currentDate = new Date().toISOString().split("T")[0];

      const getDOB = allEmployee.filter((val) => val.dob === currentDate);

      const dummyData = [
        {
          name: "Sriram",
          date: "2025-10-28",
          img: "https://img.freepik.com/premium-vector/cute-baby-boy-profile-picture-kid-avatar_176411-4644.jpg",
        },
        {
          name: "Hari",
          date: "2025-10-28",
          img: "https://img.freepik.com/free-vector/cute-boy-traditional-attire_1308-175715.jpg",
        },
        {
          name: "Karthi",
          date: "2025-10-28",
          img: "https://media.istockphoto.com/id/2100521872/vector/smiling-boy-happy-child-avatar-for-social-networks-vector-illustration.jpg?s=612x612&w=0&k=20&c=y9S5ojgkuVzu_kZpELJgJU57ZIO0oUrgYWWXQtSTIoA=",
        },
      ];
      setEmpBirthday(getDOB);
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

  const empBirthDayDetails = (val: any, index: number) => {
    return (
      <section key={index} className="p-2">
        <div className="flex justify-start items-center rounded-lg  px-2 py-1 gap-2 bg-[#ecf1f8]">
          <div className="w-[45px] h-[45px] rounded-full overflow-hidden">
            <img
              // src="https://media.istockphoto.com/id/2151669184/vector/vector-flat-illustration-in-grayscale-avatar-user-profile-person-icon-gender-neutral.jpg?s=612x612&w=0&k=20&c=UEa7oHoOL30ynvmJzSCIPrwwopJdfqzBs0q69ezQoM8="
              src={
                val.img ||
                "https://media.istockphoto.com/id/2151669184/vector/vector-flat-illustration-in-grayscale-avatar-user-profile-person-icon-gender-neutral.jpg?s=612x612&w=0&k=20&c=UEa7oHoOL30ynvmJzSCIPrwwopJdfqzBs0q69ezQoM8="
              }
              alt="External Logo"
              width={45}
              height={45}
              className="w-full h-full object-cover"
            />
          </div>
          <div className=" text_size_6">
            <p>{val.name}</p>
            <p>Happy Birthday!</p>
            <p>{formatDate(val.date)}</p>
          </div>
        </div>
      </section>
    );
  };
  return (
    <section className="rounded-xl px-5 py-8 shadow-xl h-full">
      <div className=" pb-1">
        <p className="text-gray text_size_3">Today's Birthday</p>
      </div>
      {empBirthday && empBirthday.length > 0 ? (
        <div>
          <div className="grid grid-cols-2">
            {empBirthday.slice(0, 2).map((val, index) => {
              return empBirthDayDetails(val, index);
            })}
          </div>
          <p
            className={`border-b border-[#3528ee] w-fit mx-3 pt-3 text-[#3528ee] cursor-pointer ${
              empBirthday && empBirthday.length < 3 && "hidden"
            }`}
            onClick={() => {
              setToggleHandler(true);
            }}
          >
            View More
          </p>
        </div>
      ) : (
        <p className="text-center text_size_5 p-4">No birthdays today.</p>
      )}
      {/* Model */}
      {toggleHandler && (
        <div className="fixed inset-0 flex items-center justify-center  bg-black/50 z-50">
          <div className="bg-white rounded-lg p-6 max-w-5xl h-[550px] w-full shadow-lg relative">
            <h3 className="text_size_3 px-2 text-gray">All Birthdays</h3>
            <button
              className="absolute top-4 right-4 text_size_2 cursor-pointer"
              onClick={() => {
                setToggleHandler(false);
              }}
            >
              <RxCross1 />
            </button>
            <div className="grid grid-cols-2 gap-3 py-2">
              {empBirthday?.map((val, index) => {
                return empBirthDayDetails(val, index);
              })}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
export default Birthday;
