"use client";
import DateFilter from "@/app/utils/dateFilter";
import SearchBox from "@/app/utils/searchbox";

interface permissionObj {
  empID?: string;
  [keys: string]: any;
}
interface propsType {
  allPermissions: permissionObj[];
  handleFilter: (filteredData: permissionObj) => void;
}
const HeaderPermission: React.FC<propsType> = ({
  allPermissions,
  handleFilter,
}) => {
  return (
    <section>
      <header className="flex justify-between items-center">
        <div>
          <DateFilter allPermissions={allPermissions} />
        </div>
        <div className="text-gray text-2xl font-medium">Permission Report</div>
        <div>
          <SearchBox primaryData={allPermissions} handleFilter={handleFilter} />
        </div>
      </header>
    </section>
  );
};
export default HeaderPermission;
