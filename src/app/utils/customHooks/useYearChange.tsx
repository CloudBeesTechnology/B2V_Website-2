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

  return hasYearChanged;
};
