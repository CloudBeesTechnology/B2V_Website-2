import { Children } from "react";
import { EmpNav } from "./EmpNav";

export default function EmployeeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="text-mediumlite_grey text_size_2 mt-5">Employee</div>
      <EmpNav />

      {children}
    </section>
  );
}
