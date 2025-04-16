import EmpOverview from "./empOverview/page";
import Overview from "./overview/page";

type UserRole = "EMPLOYEE" | "INTERN" | "ADMIN";
const page = () => {
  const userRole =
    typeof window !== "undefined"
      ? (localStorage.getItem("userRole")?.toUpperCase() as UserRole | null)
      : null;
  return <main>{userRole === "ADMIN" ? <Overview /> : <EmpOverview />}</main>;
};
export default page;
