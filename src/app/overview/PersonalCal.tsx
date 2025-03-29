"use client";
import React from "react";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const PersonalCal = () => {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const daysInMonth = currentDate.daysInMonth();
  const firstDayOfMonth = currentDate.startOf("month").day();

  const generateCalendarDates = () => {
    let dates = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      dates.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      dates.push(
        dayjs(`${currentDate.year()}-${currentDate.month() + 1}-${i}`)
      );
    }
    return dates;
  };

  const handlePrevMonth = () =>
    setCurrentDate(currentDate.subtract(1, "month"));
  const handleNextMonth = () => setCurrentDate(currentDate.add(1, "month"));

  const dates = generateCalendarDates();

  return (
    <div className="rounded-xl shadow-lg p-4">
      <h2 className="text-gray text-[16px] font-semibold p-4">
        Personal Calender
      </h2>
      <div className="flex justify-between mb-4 ">
        <button className="px-3 py-2  " onClick={handlePrevMonth}>
          <FaChevronLeft className="text-[22px] text-mediumlite_grey" />
        </button>
        <h2 className="text-[22px] text-mediumlite_grey">
          {currentDate.format("MMMM YYYY")}
        </h2>
        <button className="px-3 py-2  " onClick={handleNextMonth}>
          <FaChevronRight className="text-[22px] text-mediumlite_grey" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-2 text-center">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, idx) => (
          <div key={idx} className="text-mediumlite_grey">
            {day.toUpperCase()}
          </div>
        ))}

        {dates.map((date, idx) =>
          date ? (
            <div
              key={idx}
              className={`p-1  rounded-lg ${
                date.day() === 0
                  ? " text-dark_red"
                  : date.day() === 6
                  ? " text-medium_blue"
                  : ""
              }`}
            >
              {date.date()}
            </div>
          ) : (
            <div key={idx}></div> 
          )
        )}
      </div>
      <div className="flex justify-start font-medium text-mediumlite_grey p-4 gap-5">
        <span>Govt Holiday</span>
        <span>Leave</span>
      </div>
    </div>
  );
};

export default PersonalCal;
