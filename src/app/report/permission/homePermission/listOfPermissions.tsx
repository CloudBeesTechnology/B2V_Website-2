interface permissionObjType {
  empID: string;
  [keys: string]: any;
}
interface TableProps {
  secondaryPermissions: permissionObjType[];
}
const ListOfPermissions: React.FC<TableProps> = ({ secondaryPermissions }) => {
  
  return (
    <section className="rounded-xl p-6 mt-5 bg-white">
      <table className="w-full table-fixed">
        <thead className="bg-[#2F91DE] text_size_4 text-white ">
          <tr className="text-center ">
            <th className="py-3">Emp ID</th>
            <th className="py-3">Name(s)</th>
            <th className="py-3">Applied Date</th>
            <th className="py-3">Duration</th>
            <th className="py-3">Reason(s)</th>
            <th className="py-3">Actions</th>
          </tr>
        </thead>
        <thead>
          {Array.isArray(secondaryPermissions) && secondaryPermissions.length > 0
            ? secondaryPermissions.map((val, index) => {
                return (
                  <tr
                    key={index}
                    className="text-center text_size_4 text-gray  border-b border-[#D2D2D240]"
                  >
                    <td className="py-4">{val?.empID}</td>
                    <td className="py-4">{val?.name || "Krishna"}</td>
                    <td className="py-4">{val?.date}</td>
                    <td className="py-4">{val?.totalHours}</td>
                    <td className="py-4">{val?.reason}</td>
                    <td className=" py-4">
                      <span
                        className={` px-2 py-1 rounded ${
                          val?.status === "Pending"
                            ? "bg-lite_orange text-medium_orange"
                            : val?.status === "Rejected"
                            ? "bg-lite_red text-medium_red"
                            : val?.status === "Approved"
                            ? "bg-lite_blue text-medium_blue"
                            : ""
                        }`}
                      >
                        {val?.status}
                      </span>
                    </td>
                  </tr>
                );
              })
            : (<tr className="text-center text-gray text_size_4">
              <td colSpan={6} className="py-4">No data available.</td>
            </tr>)}
        </thead>
      </table>
    </section>
  );
};
export default ListOfPermissions;

//  ${
//                 val?.status === "Pending"
//                   ? "bg-lite_orange text-medium_orange"
//                   : val?.status === "Rejected"
//                   ? "bg-lite_red text-medium_red"
//                   : val?.status === "Approved"
//                   ? "bg-lite_blue text-medium_blue"
//                   : ""
//               }
