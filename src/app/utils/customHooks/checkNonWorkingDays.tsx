import { Holiday } from "@/app/empApplyLeave/empApplyLeaveTable";

const checkNonWorkingDays = async (leaveDetails: any, publicHolidays: Holiday[]) => {
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
  const thirdSaturdays: string[] = [];
  for (let month = 0; month < 12; month++) {
    let saturdayCount = 0;
    for (let day = 1; day <= 21; day++) {
      const date = new Date(Date.UTC(currentYear, month, day));
      const indiaDate = new Date(date.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));

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

