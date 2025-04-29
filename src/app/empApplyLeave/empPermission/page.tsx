import EmpHistoryOfPermission from "./empHistoryOfPermission";
import EmpPermissionTable from "./empPermissionTable";

const EmpPermission: React.FC = () => {
  return (
    <section>
      <EmpPermissionTable />
      <EmpHistoryOfPermission />
    </section>
  );
};
export default EmpPermission;
