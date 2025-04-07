"use client"
import Searchbox from "@/app/utils/searchbox";

const LeaveData: React.FC = () => {
  return (
    <main>
      <header className="center text-2xl font-medium text-gray my-10">
      <header>Reports</header>
      </header>
      <section className="flex justify-between mt-10 ">
        <div className="flex gap-5">
          <div className="flex flex-col">
            <label className="text-[#7E7D7D] mb-1">Start Date</label>
            <input
              type="date"
              className="border border-[#9D9393]   text-gray rounded px-3 py-2"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-[#7E7D7D] mb-1">End Date</label>
            <input
              type="date"
              className="border border-[#9D9393] text-gray rounded px-3 py-2"
            />
          </div>
        </div>
        <div className="mt-auto">
          <Searchbox />
        </div>
      </section>
      <section className="bg-white rounded-xl p-5 my-7  ">
        <table className="table-fixed w-full ">
          <thead>
            <tr className="text-center bg-primary text-white text_size_4">
              <th className="py-3">Name</th>
              <th className="py-3">Role</th>
              <th className="py-3">Month</th>
              <th className="py-3">Leave Type</th>
              <th className="py-3">Days</th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-center border-b border-[#D2D2D240] text_size_4 text-gray">
              <td className="py-4">Sriram</td>
              <td className="py-4">Web Developer</td>
              <td className="py-4">05/01/2024</td>
              <td className="py-4">Sick leave</td>
              <td className="py-4">1</td>
            </tr>
            <tr className="text-center border-b border-[#D2D2D240] text_size_4 text-gray">
              <td className="py-4">Hariharan</td>
              <td className="py-4">Web Developer</td>
              <td className="py-4">08/01/2024</td>
              <td className="py-4">Sick leave</td>
              <td className="py-4">2</td>
            </tr>
          </tbody>
        </table>
      </section>
    </main>
  );
};
export default LeaveData;
