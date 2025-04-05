const HistoryOfAttend: React.FC = () => {
  return (
    <section className="rounded-xl bg-white p-5">
      <table className="table-fixed w-full">
        <thead>
          <tr className="text-center bg-primary text-white ">
            <th className="py-3 rounded-l-xl">Employee Name</th>
            <th className="py-3">Employee ID</th>
            <th className="py-3">Shift Time</th>
            <th className="py-3">Date</th>
            <th className="py-3">Check in Time</th>
            <th className="py-3 rounded-r-xl">Check Out Time </th>
          </tr>
        </thead>
        <tbody>
          <tr className="text-center text-gray font-semibold border-b border-[#D2D2D240]">
            <td className="py-4">karthik R</td>
            <td className="py-4">CBT001</td>
            <td className="py-4">09AM-06PM</td>
            <td className="py-4">28/04/2022</td>
            <td className="py-4">9:00</td>
            <td className="py-4">6:00</td>
          </tr>
          <tr className="text-center text-gray font-semibold border-b border-[#D2D2D240]">
            <td className="py-4">karthik R</td>
            <td className="py-4">CBT001</td>
            <td className="py-4">09AM-06PM</td>
            <td className="py-4">28/04/2022</td>
            <td className="py-4">9:00</td>
            <td className="py-4">6:00</td>
          </tr>
        </tbody>
      </table>
    </section>
  );
};
export default HistoryOfAttend;
