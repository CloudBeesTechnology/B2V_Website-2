type Itemvalue = {
  totalLeave: string;
};

type TotalLeaveData = {
  data: Itemvalue;
};

const EmpAvailableLeaves: React.FC<TotalLeaveData> = ({ data }) => {
  return (
    <article className="flex  w-2/3 justify-around p-5 gap-5 border h-48 border-[#E4E4E4] bg-white rounded-md">
      <div className="center flex-col gap-2 border border-[#D4EBDC] w-full rounded-md">
        <p className="text-gray text_size_4">Total Leave</p>
        <p className="text-2xl font-medium text-[#01C441]">
          {data?.totalLeave || "0"}
        </p>
        <p className="text-12px font-medium text-medium_gray">Available</p>
      </div>
      <div className="center flex-col gap-2 border border-[#E3CFD4] w-full rounded-md">
        <p className="text-gray text_size_4">Sick Leave</p>
        <p className="text-2xl font-medium text-[#E83265]">09</p>
        <p className="text-12px font-medium text-medium_gray">Available</p>
      </div>
      <div className="center flex-col gap-2 border border-[#D1DEE7] w-full rounded-md">
        <p className="text-gray text_size_4">Casual Leave</p>
        <p className="text-2xl font-medium text-[#0186E3]">09</p>
        <p className="text-12px font-medium text-medium_gray">Available</p>
      </div>
    </article>
  );
};
export default EmpAvailableLeaves;
