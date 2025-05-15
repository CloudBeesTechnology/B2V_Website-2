
"use client";
import React, { useEffect, useState } from "react";

interface permissionObj {
  id?: string;
  empID?: string;
  [keys: string]: any;
}
interface propsType {
  handleDateFilter: (filterByDate: permissionObj) => void;
  primaryData: permissionObj[];
}
const DateFilter: React.FC<propsType> = ({ handleDateFilter, primaryData }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    if (startDate && endDate) {
      const filteredData = primaryData.filter((item) => {
        if (startDate && item.date < startDate) return false;
        if (endDate && item.date > endDate) return false;
        return true;
      });

      handleDateFilter(filteredData);
    } else {
      handleDateFilter([]);
    }
  }, [startDate, endDate]);
  return (
    <div className="flex flex-col md:flex-row items-center gap-4 p-4 ">
      <div className="flex flex-col">
        <label className="text_size_4 text-gray">Start Date</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border border-lite_gray bg-white rounded px-3 py-2 mt-1"
        />
      </div>
      <div className="flex flex-col">
        <label className="text_size_4 text-gray">End Date</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="border border-lite_gray bg-white rounded px-3 py-2 mt-1"
        />
      </div>
    </div>
  );
};

export default DateFilter;
