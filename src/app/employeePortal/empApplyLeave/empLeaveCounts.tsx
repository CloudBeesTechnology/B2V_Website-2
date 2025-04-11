const EmpLeaveCounts: React.FC = () => {
  return (
    <section className="center  gap-24 bg-white rounded-md w-full h-[126px] text-gray text-base border border-[#DBDBDBCC]">
      <div className="center gap-10">
        <p className="text-2xl font-bold text-[#1C40AE]">16</p>
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
