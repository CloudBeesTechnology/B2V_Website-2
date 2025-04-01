interface Employee {
  empID: string;
  name: string;
  position: string;
  role: string;
  contactNo: string;
  email: string;
}
interface TableProps {
  heading: string[]; // Correctly type props
  body: Employee[];
}
export const TableFormate = ({ heading, body }: TableProps) => {
  return (
    <table className="w-full">
      <thead className="text-mediumlite_grey text-sm font-bold text-start flex w-full border">
        <tr  className="border w-full">
        {heading.map((val, index) => {
          return (
              <th key={index} className="text-start py-3">{val}</th>
          );
        })}
            </tr>
        {/* <th className="text-start py-3" >Application type</th>
          <th className="text-start py-3" >Duration </th>
          <th className="text-start py-3" >Status </th> */}
      </thead>
      <tbody className="border">
        {body.map((val,index) => {
          return (
            <tr key={index} className="text-sm text-medium_gray">
              <td className="text-start py-3">{val.empID}</td>
              <td className="text-start py-3">{val.name}</td>
              <td className="text-start py-3">{val.position}</td>
              <td className="text-start py-3">{val.role}</td>
              <td className="text-start py-3">{val.email}</td>
              {/* <td className="text-start py-3">Casual leave</td>
              <td className="text-start py-3">02 (05-06 Jul)</td>
              <td className="text-start py-3">Pending</td> */}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
