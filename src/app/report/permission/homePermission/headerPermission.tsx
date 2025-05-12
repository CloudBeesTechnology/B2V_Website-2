import Searchbox from "@/app/utils/searchbox";

const HeaderPermission: React.FC = () => {
  return (
    <section>
      <header className="flex justify-between items-center">
        <div>dateFilter</div>
        <div className="text-gray text-2xl font-medium">Permission Report</div>
        <div>
          {/* <Searchbox /> */}
          searchBox
        </div>
      </header>
    </section>
  );
};
export default HeaderPermission;
