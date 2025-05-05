"use client";
import React, { useState, useEffect } from "react";
import useFetchHolidayList from "../utils/customHooks/useFetchHolidayList";

type Holiday = {
  [key: string]: any;
};

const OverviewHolidays: React.FC = () => {
  const { publicHolidays } = useFetchHolidayList();
  const [formattedHolidays, setFormattedHolidays] = useState<Holiday[]>([]);

  useEffect(() => {
    const formatDate = (isoDate: string) => {
      const date = new Date(isoDate);
      const options: Intl.DateTimeFormatOptions = {
        month: "short",
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
    <section className="rounded-xl p-5 shadow-xl mb-10 h-full overflow-hidden">
      <p className="text-gray text_size_3 ">Holidays</p>

      <div className="py-3">
        {formattedHolidays && formattedHolidays.length > 0 ? (
          formattedHolidays?.map((holiday, index) => (
            <article
              key={index}
              className="text_size_5 flex  text-start space-y-4 "
            >
              <p className="text-gray w-1/4 ">{holiday.date}</p>

              <p className="text-mediumlite_grey  w-3/4">{holiday.name}</p>
            </article>
          ))
        ) : (
          <p>No upcoming public holidays for the rest of the year.</p>
        )}
      </div>
    </section>
  );
};
export default OverviewHolidays;
