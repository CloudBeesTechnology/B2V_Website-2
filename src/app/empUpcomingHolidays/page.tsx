const EmpUpcommingHolidays: React.FC = () => {
  return (
    <main className="my-20 center ">
      <div className="border border-lite_gray px-4 py-2 rounded-xl bg-white">
        <table className="w-full  rounded-lg max-w-7xl  table-fixed border-separate border-spacing-y-3">
          <thead>
            <tr className="text-center text-base font-semibold text-[#6A6A6A]">
              <th className="py-3 border-b border-lite_gray">HOLIDAY</th>
              <th className="py-3 border-b border-lite_gray">DAY</th>
              <th className="py-3 border-b border-lite_gray">DATE</th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-center bg-[#319CE526] rounded-lg mt-5">
              <td className="py-3 "> Eid al-Adha</td>
              <td className="py-3 ">Monday</td>
              <td className="py-3 ">June 17</td>
            </tr>
            <tr className="text-center bg-[#1C40AE26] rounded-lg mt-5">
              <td className="py-3">Monday</td>
              <td className="py-3 ">Indian Independence Day</td>
              <td className="py-3 ">August 15</td>
            </tr>
            <tr className="text-center bg-[#319CE526] rounded-lg">
              <td className="py-3 ">Mawlid</td>
              <td className="py-3 ">Monday</td>
              <td className="py-3 ">September 16</td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  );
};
export default EmpUpcommingHolidays;
