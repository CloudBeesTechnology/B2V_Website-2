"use client";
import { useEffect, useState } from "react";

type Holiday = {
  [key: string]: any;
};

type HolidayType = {
  name: string;
  date: string;
  day: string;
};
const useFetchHolidayList = () => {
  const [publicHolidays, setPublicHolidays] = useState<Holiday[]>([]);

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
    {
      date: "Oct 2",
      holiday: "Gandhi Jayanti",
      apiHname: "Mahatma Gandhi Jayanti",
    },
    { date: "Oct 20", holiday: "Deepavali", apiHname: "Diwali/Deepavali" },
    { date: "Dec 25", holiday: "Christmas", apiHname: "Christmas" },
  ];

  useEffect(() => {
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

          const finalHolidayList = HolidayList?.map((val) => {
            // find the holiday in API response that matches apiHname

            const match = holidayRes.find(
              (holi: any) => holi.name === val.apiHname
            );
            if (match) {
              const dateObj = new Date(match.date.iso);
              const dayOfWeek = dateObj.toLocaleDateString("en-US", {
                weekday: "long",
              });

              return {
                name: val.holiday,
                date: match.date.iso,
                day: dayOfWeek,
              };
            } else {
              return null; // if no match found
            }
          }).filter((item): item is HolidayType => item !== null); // remove null values

          setPublicHolidays(finalHolidayList);
        } else {
          throw new Error("No holidays data found");
        }
      } catch (error) {
        console.log(
          "Error fetching holidays: " +
            (error instanceof Error ? error.message : "")
        );
      }
    };

    fetchHolidays();
  }, []);

  return { publicHolidays };
};

export default useFetchHolidayList;
