"use client";
import React, { useState } from "react";



const DateFilter: React.FC = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

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
