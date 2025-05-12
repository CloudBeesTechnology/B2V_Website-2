// get current year function 
import { useEffect, useState } from "react";
import { getCurrentYear } from "../getCurrentYear"

export const useYearChange = () => {
  const [hasYearChanged, setHasYearChanged] = useState(false);

  useEffect(() => {
    const currentYear = getCurrentYear();
    const lastRecordedYear = localStorage.getItem("lastYear");

    if (!lastRecordedYear || parseInt(lastRecordedYear) < currentYear) {
      setHasYearChanged(true);
      localStorage.setItem("lastYear", currentYear.toString());
    }
  }, []);

  const currentYear = new Date().getFullYear();
  const startOfYear = new Date(Date.UTC(currentYear, 0, 1, 0, 0, 0)).getTime();
  const endOfYear = new Date(Date.UTC(currentYear, 11, 31, 23, 59, 59, 999)).getTime();

  return { hasYearChanged, currentYear, startOfYear, endOfYear };
};
