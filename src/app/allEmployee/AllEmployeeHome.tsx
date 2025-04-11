import { TableFormate } from "@/components/TableFormate";

export const AllEmployeeHome = () => {
  const Heading = ["EmpID", "Name", "Position", "Role", "Contact", "Email ID"];
  const allEmp = [
    {
      empID: "batch001",
      profile:"",
      name: "Hema",
      position: "ui",
      role: "ui",
      contactNo: "123456789",
      email: "hema@gmail.com",
    },
    {
      empID: "batch001",
      profile:"",
      name: "Hema",
      position: "ui",
      role: "ui",
      contactNo: "123456789",
      email: "hema@gmail.com",
    },
    {
      empID: "batch001",
      profile:"",
      name: "Hema",
      position: "ui",
      role: "ui",
      contactNo: "123456789",
      email: "hema@gmail.com",
    },
    {
      empID: "batch001",
      profile:"",
      name: "Hema",
      position: "ui",
      role: "ui",
      contactNo: "123456789",
      email: "hema@gmail.com",
    },
    {
      empID: "batch001",
      profile:"",
      name: "Hema",
      position: "ui",
      role: "ui",
      contactNo: "123456789",
      email: "hema@gmail.com",
    },
  ];
  return (
    <section>
      <div className="text-mediumlite_grey text_size_2 mt-5">Employee</div>
      <h4 className="text-primary border-b-2 border-primary pb-2 px-2 w-9 mt-3 mb-7 text_size_3">All</h4>
      <div className="bg-white px-10 py-5 rounded-lg">
        <TableFormate heading={Heading} allEmp={allEmp} list="AllEmp" ovla={[]} leaveApproval={[]} />
      </div>
    </section>
  );
};
