import React from "react";

export const TableFormate = () => {
  return (
    <table className="w-full">
      <thead className="text-mediumlite_grey text-xs font-bold text-start">
        <tr >
          <th className="text-start py-3" >Date of Application</th>
          <th className="text-start py-3" >Application type</th>
          <th className="text-start py-3" >Duration </th>
          <th className="text-start py-3" >Status </th>
        </tr>
      </thead>
      <tbody>
        <tr className="text-sm text-medium_gray">
          <td className="text-start py-3">03/07/2021</td>
          <td className="text-start py-3">Casual leave</td>
          <td className="text-start py-3">02 (05-06 Jul)</td>
          <td className="text-start py-3">Pending</td>
        </tr>
      </tbody>
    </table>
  );
};
