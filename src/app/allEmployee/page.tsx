"use client";
import useCheckPermission from "../utils/customHooks/useCheckPermission";
import { AllEmployeeHome } from "./AllEmployeeHome";

export default function AllEmployeePages() {
  const { hasPermission } = useCheckPermission();
  return (
    <section>
      {hasPermission("Employee", "All Employee") && <AllEmployeeHome />}
    </section>
  );
}
