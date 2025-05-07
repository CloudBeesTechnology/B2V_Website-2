// type Holiday = {
//   [keys: string]: any;
// };
// const checkNonWorkingDays = async (
//   leaveDetails: any,
//   publicHolidays: Holiday[]
// ) => {
//   // Get ranged dates based on startDate and enddate
//   async function getLeaveDateRange(startDateStr: string, endDateStr: string) {
//     const result = [];
//     const startDate = new Date(startDateStr);
//     const endDate = new Date(endDateStr);

//     let current = new Date(startDate);

//     while (current <= endDate) {
//       const formatted = current.toISOString().split("T")[0];
//       result.push(formatted);
//       current.setDate(current.getDate() + 1);
//     }

//     return result;
//   }

//   // Get Third Saturday list
//   async function getThirdSaturdaysIndia(year: number) {
//     const thirdSaturdays = [];

//     for (let month = 0; month < 12; month++) {
//       let count = 0;
//       for (let day = 1; day <= 21; day++) {
//         const date = new Date(Date.UTC(year, month, day));
//         const indiaDate = new Date(
//           date.toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
//         );

//         if (indiaDate.getDay() === 6) {
//           // Saturday
//           count++;
//           if (count === 3) {
//             const yyyy = indiaDate.getFullYear();
//             const mm = String(indiaDate.getMonth() + 1).padStart(2, "0");
//             const dd = String(indiaDate.getDate()).padStart(2, "0");

//             thirdSaturdays.push({
//               month: indiaDate.toLocaleString("default", {
//                 month: "long",
//                 timeZone: "Asia/Kolkata",
//               }),
//               date: `${yyyy}-${mm}-${dd}`, // YYYY-MM-DD
//               day: "Saturday",
//             });
//             break;
//           }
//         }
//       }
//     }

//     return thirdSaturdays;
//   }

//   const rangeOfLeaveDates = await getLeaveDateRange(
//     leaveDetails?.startDate,
//     leaveDetails?.endDate
//   );
//   const getCuurentYear = new Date().getFullYear();
//   // Example usage:
//   const thirdSaturdayList = await getThirdSaturdaysIndia(getCuurentYear);

//   let typesOfHolidayList = {
//     rangeOfLeaveDates: rangeOfLeaveDates,
//     publicHolidays: publicHolidays,
//     thirdSaturday: thirdSaturdayList,
//   };

//   //   Removed all holidays from the leave date range.
//   const removeHolidayDates = async (
//     rangeOfLeaveDates: string[],
//     holidays: Holiday[]
//   ) => {
//     const holidayDates = new Set(holidays.map((holiday) => holiday.date));
//     // Step 2: Filter out holidays from rangeOfLeaveDate
//     const filteredLeaveDates = rangeOfLeaveDates.filter(
//       (date) => !holidayDates.has(date)
//     );
//     return filteredLeaveDates;
//   };
//   const removedPH = await removeHolidayDates(
//     typesOfHolidayList.rangeOfLeaveDates,
//     typesOfHolidayList.publicHolidays
//   );
//   const removedThirdSaturday = await removeHolidayDates(
//     removedPH,
//     typesOfHolidayList.thirdSaturday
//   );

//   const dayNames = [
//     "Sunday",
//     "Monday",
//     "Tuesday",
//     "Wednesday",
//     "Thursday",
//     "Friday",
//     "Saturday",
//   ];

//   //  Removed if a day is sunday
//   const validLeaveDates  = removedThirdSaturday?.filter((item) => {
//     const dateObj = new Date(item);
//     const dayName = dayNames[dateObj?.getDay()];
//     return dayName !== "Sunday";
//   });

//   return validLeaveDates ;
// };
// export default checkNonWorkingDays;

import { Holiday } from "@/app/empApplyLeave/empApplyLeaveTable";

const checkNonWorkingDays = async (
  leaveDetails: any,
  publicHolidays: Holiday[]
) => {
  const { startDate, endDate } = leaveDetails;
  const start = new Date(startDate);
  const end = new Date(endDate);

  // Generate the range of leave dates
  const rangeOfLeaveDates = [];
  for (let date = new Date(start); date <= end; date.setDate(date.getDate() + 1)) {
    rangeOfLeaveDates.push(date.toISOString().split("T")[0]);
  }

  // Generate the list of third Saturdays for the current year
  const currentYear = new Date().getFullYear();
  const thirdSaturdays: string[]  = [];
  for (let month = 0; month < 12; month++) {
    let saturdayCount = 0;
    for (let day = 1; day <= 21; day++) {
      const date = new Date(Date.UTC(currentYear, month, day));
      const indiaDate = new Date(
        date.toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
      );

      if (indiaDate.getDay() === 6) {
        saturdayCount++;
        if (saturdayCount === 3) {
          thirdSaturdays.push(indiaDate.toISOString().split("T")[0]);
          break;
        }
      }
    }
  }

  // Filter out Sundays, third Saturdays, and public holidays
  const validLeaveDates = rangeOfLeaveDates.filter((dateStr) => {
    const dateObj = new Date(dateStr);
    const isSunday = dateObj.getDay() === 0;
    const isThirdSaturday = thirdSaturdays.includes(dateStr);
    const isPublicHoliday = publicHolidays.some(
      (holiday) => holiday.date === dateStr
    );

    return !isSunday && !isThirdSaturday && !isPublicHoliday;
  });

  return validLeaveDates;
};

export default checkNonWorkingDays;
