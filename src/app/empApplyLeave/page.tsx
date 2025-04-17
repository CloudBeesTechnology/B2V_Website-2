"use client";
import EmpApplyLeaveTable from "./empApplyLeaveTable";
import EmpLeaveCounts from "./empLeaveCounts";
import EmpHistoryOfLeave from "./empHistoryOfLeave";

const EmpApplyLeave: React.FC = () => {
 
  return (
    <main>
      <header className="center  py-14 px-6">
        <h2 className="text-2xl font-medium text-[#303030]">Apply Leave</h2>
      </header>
      <EmpLeaveCounts />
      <EmpApplyLeaveTable/>
      <EmpHistoryOfLeave />
    </main>
  );
};
export default EmpApplyLeave;
