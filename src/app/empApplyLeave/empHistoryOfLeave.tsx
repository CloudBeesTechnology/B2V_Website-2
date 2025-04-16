const EmpHistoryOfLeave: React.FC = () => {
  return (
    <section className="p-7 bg-white rounded-xl my-10">
      <h3 className="text-gray text-xl font-semibold pb-5">History of leave</h3>
      <table className="table-fixed  w-full">
        <thead>
          <tr className="text-center text-gray font-semibold border-b border-[#D2D2D240]">
            <th className="py-4">Emp id</th>
            <th className="py-4">Duration</th>
            <th className="py-4">Start Date</th>
            <th className="py-4">End Date</th>
            <th className="py-4">Type</th>
            <th className="py-4">Reason</th>
          </tr>
        </thead>
        <tbody>
          <tr className="text-center text-gray text_size_6 border-b border-[#D2D2D240]">
            <td className="py-4">C2562</td>
            <td className="py-4">1</td>
            <td className="py-4">22/04/2024</td>
            <td className="py-4">28/06/2025</td>
            <td className="py-4">Maternity</td>
            <td className="py-4">Child Care</td>
          </tr>
          <tr className="text-center text-gray text_size_6 border-b border-[#D2D2D240]">
            <td className="py-4">B2562</td>
            <td className="py-4">2</td>
            <td className="py-4">22/04/2024</td>
            <td className="py-4">28/06/2025</td>
            <td className="py-4">Maternity</td>
            <td className="py-4">Child Care</td>
          </tr>
        </tbody>
      </table>
    </section>
  );
};
export default EmpHistoryOfLeave;
