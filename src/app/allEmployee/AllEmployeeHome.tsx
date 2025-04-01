import { TableFormate } from "@/components/TableFormate";

export const AllEmployeeHome = () => {
  const Heading = ["EmpID", "Name", "Position", "Role", "Contact", "Email ID"];
  const Body = [
    {
      empID: "batch001",
      name: "Hema",
      position: "ui",
      role: "ui",
      contactNo: "123456789",
      email: "hema@gmail.com",
    },
    {
      empID: "batch001",
      name: "Hema",
      position: "ui",
      role: "ui",
      contactNo: "123456789",
      email: "hema@gmail.com",
    },
    {
      empID: "batch001",
      name: "Hema",
      position: "ui",
      role: "ui",
      contactNo: "123456789",
      email: "hema@gmail.com",
    },
    {
      empID: "batch001",
      name: "Hema",
      position: "ui",
      role: "ui",
      contactNo: "123456789",
      email: "hema@gmail.com",
    },
    {
      empID: "batch001",
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
      <div>
        <TableFormate heading={Heading} body={Body} />
      </div>
      allEmployee
    </section>
  );
};
