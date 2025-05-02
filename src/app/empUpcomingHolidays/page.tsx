"use client";
import { useEffect, useState } from "react";
import useFetchHolidayList from "../utils/customHooks/useFetchHolidayList";

type Holiday = {
  [key: string]: any;
};

const EmpUpcommingHolidays: React.FC = () => {
  const { publicHolidays } = useFetchHolidayList();
  const [formattedHolidays, setFormattedHolidays] = useState<Holiday[]>([]);

  useEffect(() => {
    const formatDate = (isoDate: string) => {
      const date = new Date(isoDate);
      const options: Intl.DateTimeFormatOptions = {
        month: "long",
        day: "2-digit",
      };
      return date.toLocaleDateString("en-US", options); // e.g. "April 16"
    };

    const updatedList = publicHolidays?.map((val) => ({
      ...val,
      date: formatDate(val.date),
    }));

    const presentDate = new Date(); // today's date

    const filteredHolidays = updatedList
      .filter((holiday) => {
        const holidayDate = new Date(
          `${holiday.date}, ${presentDate.getFullYear()}`
        );
        return holidayDate > presentDate;
      })
      .slice(0, 7);

    setFormattedHolidays(filteredHolidays);
  }, [publicHolidays]);
  return (
    <main className="my-20 center ">
      <div className="border border-lite_gray px-4 py-2 rounded-xl bg-white">
        <table className="w-full  rounded-lg max-w-7xl  table-fixed border-separate border-spacing-y-3">
          <thead>
            <tr className="text-center text-base font-semibold text-[#6A6A6A]">
              <th className="py-3 border-b border-lite_gray">S.NO</th>
              <th className="py-3 border-b border-lite_gray">HOLIDAY</th>
              <th className="py-3 border-b border-lite_gray">DAY</th>
              <th className="py-3 border-b border-lite_gray">DATE</th>
            </tr>
          </thead>
          <tbody>
            {formattedHolidays && formattedHolidays.length > 0 ? (
              formattedHolidays.map((val, index) => {
                return (
                  <tr
                    className={`text-center ${
                      index % 2 === 0 ? "bg-[#319CE526]" : "bg-[#1C40AE26]"
                    } rounded-lg mt-5`}
                    key={index}
                  >
                    <td className="py-3 ">{index + 1}</td>
                    <td className="py-3 ">{val?.name}</td>
                    <td className="py-3 ">{val?.day}</td>
                    <td className="py-3 ">{val?.date}</td>
                  </tr>
                );
              })
            ) : (
              <p>No upcoming public holidays for the rest of the year.</p>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
};
export default EmpUpcommingHolidays;
