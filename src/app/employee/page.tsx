"use client";
import useCheckPermission from "../utils/customHooks/useCheckPermission";
import { EmployeeHome } from "./EmployeeHome";

export default function Employee() {
  const { hasPermission } = useCheckPermission();
  return (
    <div>
      {hasPermission("Employee", "Add Employee Info") && <EmployeeHome />}
    </div>
  );
}
