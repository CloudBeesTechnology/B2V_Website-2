"use client";
import { useEffect, useState } from "react";

type Props = {
  empLeave?: any[];
  empPermission?: any[];
  handleFilteredData: (filtered: any[]) => void;
  titleName?: string;
};

const EmpLeaveDateFilter: React.FC<Props> = ({
  empLeave,
  empPermission,
  handleFilteredData,
  titleName,
}) => {
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  useEffect(() => {
    function filterByDateRange(
      leaveList: any,
      startDate: string,
      endDate: string
    ) {
      const start = new Date(startDate);
      const end = new Date(endDate);

      return leaveList.filter((item: any) => {
        const itemStart = new Date(item.startDate);
        const itemEnd = new Date(item.endDate);

        return itemStart >= start && itemEnd <= end;
      });
    }
    if (startDate && endDate && empLeave) {
      const filteredData = filterByDateRange(empLeave, startDate, endDate);

      handleFilteredData(filteredData);
    }
  }, [empLeave, startDate, endDate]);

  useEffect(() => {
    function filterByDateRange(
      empPermission: any,
      startDate: string,
      endDate: string
    ) {
      const filteredData = empPermission.filter((item: any) => {
        const itemDate = new Date(item.date);
        const start = startDate ? new Date(startDate) : null;
        const end = endDate ? new Date(endDate) : null;

        return (!start || itemDate >= start) && (!end || itemDate <= end);
      });
      return filteredData;
    }

    if (startDate && endDate && empPermission) {
      const filteredData = filterByDateRange(empPermission, startDate, endDate);

      handleFilteredData(filteredData);
    }
  }, [empPermission, startDate, endDate]);

  return (
    <div className="flex justify-between items-center  mt-10 mb-5">
      <h4 className="pb-2 px-2 w-68 mb-7 mt-5 text_size_2 text-gray">
        {titleName}
      </h4>
      <div className="flex justify-center items-center gap-12 ">
        <div>
          <label
            htmlFor="start-date"
            className="block text-[16px] text-gray font-bold "
          >
            Start Date
          </label>
          <input
            id="start-date"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="outline-none text-gray border border-lite_gray bg-white rounded-md p-1"
          />
        </div>
        <div>
          <label
            htmlFor="end-date"
            className="block text-[16px] text-gray font-bold"
          >
            End Date
          </label>
          <input
            id="end-date"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="outline-none text-gray border border-lite_gray bg-white rounded-md p-1"
          />
        </div>
      </div>
    </div>
  );
};
export default EmpLeaveDateFilter;
