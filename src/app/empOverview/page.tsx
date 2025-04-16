import EmpAvailableLeaves from "./empAvailableLeaves";
import EmpBasicDetails from "./empBasicDetails";
import EmpLeaveStatusTable from "./empLeaveStatusTable";

const EmpOverview: React.FC = () => {
  return (
    <main className="mb-20">
      <header>
        <h3 className="text-2xl font-semibold my-10">Welcome Arthikrishanan</h3>
      </header>
      <EmpBasicDetails />
      <EmpAvailableLeaves />
      <EmpLeaveStatusTable />
      
    </main>
  );
};
export default EmpOverview;
