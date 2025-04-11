import EmpTimeSheetInfo from "./empTimeSheetInfo";
import EmpTSOtherDetails from "./empTSOtherDetails";
import EmpTimeSheetTable from "./empTimeSheetTable";

const TimeSheet: React.FC = () => {
  return (
    <main className=" flex flex-col justify-center items-center">
      <header className="flex center text-[#303030] text-2xl font-medium py-10">
        <h2>TimeSheet</h2>
      </header>

      <EmpTimeSheetInfo />
      <EmpTimeSheetTable />
      <EmpTSOtherDetails />

      <button
        type="submit"
        className="bg-primary text_size_3 mt-2 text-white px-10 py-2 rounded-md cursor-pointer"
      >
        Submit
      </button>
    </main>
  );
};
export default TimeSheet;
