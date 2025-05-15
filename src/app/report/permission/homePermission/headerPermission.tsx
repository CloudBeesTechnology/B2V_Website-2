"use client";
import DateFilter from "@/app/utils/dateFilter";
import SearchBox from "@/app/utils/searchbox";

interface permissionObj {
  empID?: string;
  [keys: string]: any;
}
interface propsType {
  allPermissions: permissionObj[];
  storeFilteredData: permissionObj[];
  handleFilter: (filteredData: permissionObj) => void;
  handleDateFilter: (filterByDate: permissionObj) => void;
}
const HeaderPermission: React.FC<propsType> = ({
  allPermissions,
  storeFilteredData,
  handleFilter,
  handleDateFilter,
}) => {
  return (
    <section>
      <header className="flex justify-between items-center">
        <div>
          <DateFilter
            handleDateFilter={handleDateFilter}
            primaryData={allPermissions}
          />
        </div>
        <div className="text-gray text-2xl font-medium">Permission Report</div>
        <div>
          <SearchBox
            primaryData={allPermissions}
            storeFilteredData={storeFilteredData}
            handleFilter={handleFilter}
            identify={"forReportPermission"}
          />
        </div>
      </header>
    </section>
  );
};
export default HeaderPermission;
