type TotalLeaveData = {
  totalLeave: string;
};

type LeaveCalc = {
  leaveStatus: string;
};

type EmpLeaveCountsProps = {
  data: TotalLeaveData;
  leaveStatus: LeaveCalc[];
};

const EmpLeaveCounts: React.FC<EmpLeaveCountsProps> = ({
  data,
  leaveStatus,
}) => {
  return (
    <section className="center  gap-24 bg-white rounded-md w-full h-[126px] text-gray text-base border border-[#DBDBDBCC] px-2">
      <div className="center gap-10">
        <p className="text-2xl font-bold text-[#1C40AE]">{data?.totalLeave}</p>
        <p>Available leaves</p>
      </div>
      <div className="center gap-10">
        <p className="text-2xl font-bold text-[#1C40AE]">08</p>
        <p>Previous Unused leaves</p>
      </div>
      <div className="center gap-10">
        <p className="text-2xl font-bold text-[#E1982B]">02</p>
        <p>Pending leaves requests</p>
      </div>
      <div className="center gap-10">
        <p className="text-2xl font-bold text-[#BA1414]">02</p>
        <p>Rejected Leaves</p>
      </div>
    </section>
  );
};
export default EmpLeaveCounts;
