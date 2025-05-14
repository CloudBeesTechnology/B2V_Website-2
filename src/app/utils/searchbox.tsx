import React, { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";

interface objectType {
  id?: string;
  empID?: string;
  [keys: string]: any;
}
interface propsType {
  primaryData: objectType[];
  storeFilteredData?: objectType[] | any;
  handleFilter: (filteredData: objectType) => void;
  identify?: string;
}

const SearchBox: React.FC<propsType> = ({
  primaryData,
  storeFilteredData,
  handleFilter,
  identify,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const filteredData = primaryData
      .filter((item) => {
        const term = searchTerm.toUpperCase();
        return (
          item?.empID?.toString().toUpperCase().includes(term) ||
          item?.name?.toString().toUpperCase().includes(term)
        );
      })
      .sort((a, b) => {
        const term = searchTerm.toUpperCase();

        // Priority order: empID  > name
        const getPriority = (item: any): number => {
          if (item?.empID?.toString().toUpperCase().includes(term)) return 0;
          if (item?.name?.toString().toUpperCase().includes(term)) return 1;
          return 3;
        };

        return getPriority(a) - getPriority(b);
      });
    if (searchTerm) {
      handleFilter(filteredData);
    } else if (!searchTerm && identify === "forReportPermission") {
      handleFilter(storeFilteredData);
    } else if (!searchTerm && identify === "leaveDataReport") {
      handleFilter(primaryData);
    }
  }, [searchTerm]);
  return (
    <div className="flex">
      <input
        type="text"
        className="w-full p-2 font-semibold border border-[#DCE0E5] rounded-l-md outline-none text-gray bg-white"
        placeholder="Search EmpID / Name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value.toString().toUpperCase())}
      />
      <span className="rounded-r-md bg-primary p-3 text-lg text-white">
        <IoSearch />
      </span>
    </div>
  );
};

export default SearchBox;
