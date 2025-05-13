"use client";
import SearchDisplay from "@/app/utils/searchDisplay";
import { useState } from "react";

const AttendanceTab: React.FC = () => {
  const [selectedOption1, setSelectedOption1] = useState<string>("");
  const options1 = ["Option 1A", "Option 1B", "Option 1C"];

  return (
    <section className="flex justify-between ">
      <div className="center gap-7 py-7 ">
        <div>
          <select
            className="border border-[#DCE0E5] font-semibold py-2 px-5 rounded outline-none"
            value={selectedOption1}
            onChange={(e) => setSelectedOption1(e.target.value)}
          >
            <option value="">February</option>
            {options1.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div>
          <select
            className="border border-[#DCE0E5] font-semibold py-2 px-5 rounded outline-none"
            value={selectedOption1}
            onChange={(e) => setSelectedOption1(e.target.value)}
          >
            <option value="">Week 1</option>
            {options1.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div>
          <select
            className="border border-[#DCE0E5] font-semibold py-2 px-5 rounded outline-none"
            value={selectedOption1}
            onChange={(e) => setSelectedOption1(e.target.value)}
          >
            <option value="">Year</option>
            {options1.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="center gap-7 py-7">
        {/* <Searchbox /> */}
      </div>
    </section>
  );
};
export default AttendanceTab;
