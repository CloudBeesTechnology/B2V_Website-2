import React, { useState, useEffect } from "react";

type Holiday = {
  [key: string]: any;
};

type HolidayType = {
  name: string;
  date: string;
};
const OverviewHolidays: React.FC = () => {
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [error, setError] = useState<string | null>(null);

  const HolidayList = [
    { date: "Jan 1", holiday: "New Year's Day", apiHname: "New Year's Day" },
    { date: "Jan 14", holiday: "Pongal", apiHname: "Pongal" },
    { date: "Jan 26", holiday: "Republic Day", apiHname: "Republic Day" },
    { date: "Mar 31", holiday: "Ramzan(Idul Fitr)", apiHname: "Ramzan Id" },
    {
      date: "Apr 14",
      holiday: "Tamil New Year's Day",
      apiHname: "Ambedkar Jayanti",
    },
    {
      date: "May 1",
      holiday: "International Worker's Day",
      apiHname: "International Worker's Day",
    },
    {
      date: "Aug 15",
      holiday: "Independence Day",
      apiHname: "Independence Day",
    },
    {
      date: "Aug 27",
      holiday: "Vinayakar Chathurthi",
      apiHname: "Ganesh Chaturthi/Vinayaka Chaturthi",
    },
    { date: "Oct 2", holiday: "Gandhi Jayanthi", apiHname: "Gandhi Jayanti" },
    { date: "Oct 20", holiday: "Deepavali", apiHname: "Diwali/Deepavali" },
    { date: "Dec 25", holiday: "Christmas", apiHname: "Christmas" },
  ];

  useEffect(() => {
    const formatDate = (isoDate: string) => {
      const date = new Date(isoDate);
      const options: Intl.DateTimeFormatOptions = {
        month: "short",
        day: "2-digit",
      };
      return date.toLocaleDateString("en-US", options); // e.g. "April 16"
    };

    const fetchHolidays = async () => {
      let getCurrentYear = new Date().getFullYear();

      let India = "IN";
      let Year = `${getCurrentYear}`;
      try {
        const response = await fetch(
          `https://calendarific.com/api/v2/holidays?api_key=KaX8Jjn8nBTUDWalYku3aMvqgJ7A8sz3&country=${India}&year=${Year}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch holidays");
        }

        const data = await response.json();
        if (data?.response?.holidays) {
          const holidayRes = data.response.holidays;

          const finalHolidayList = HolidayList.map((val) => {
            // find the holiday in API response that matches apiHname
            const match = holidayRes.find(
              (holi: any) => holi.name === val.apiHname
            );
            if (match) {
              return {
                name: val.holiday,
                date: formatDate(match.date.iso),
              };
            } else {
              return null; // if no match found
            }
          }).filter((item): item is HolidayType => item !== null); // remove null values

          setHolidays(finalHolidayList);
        } else {
          throw new Error("No holidays data found");
        }
      } catch (error) {
        setError(
          "Error fetching holidays: " +
            (error instanceof Error ? error.message : "")
        );
      }
    };

    fetchHolidays();
  }, []);

  const presentDate = new Date(); // today's date

  const filteredHolidays = holidays
    .filter((holiday) => {
      const holidayDate = new Date(
        `${holiday.date}, ${presentDate.getFullYear()}`
      );
      return holidayDate > presentDate;
    })
    .slice(0, 7);
  return (
    <section className="rounded-xl p-5 shadow-xl mb-10 h-full overflow-hidden">
      <p className="text-gray text_size_3 ">Holidays</p>

      <div className="py-3">
        {filteredHolidays.map((holiday, index) => (
          <article
            key={index}
            className="text_size_5 flex items-center space-y-4 "
          >
            <p className="text-gray w-1/4">{holiday.date}</p>

            <p className="text-mediumlite_grey text-start w-3/4">
              {holiday.name}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
};
export default OverviewHolidays;
