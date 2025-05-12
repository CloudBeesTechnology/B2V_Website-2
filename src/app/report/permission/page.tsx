import HeaderPermission from "./homePermission/headerPermission";
import ListOfPermissions from "./homePermission/listOfPermissions";

const Permission: React.FC = () => {
  return (
    <main>
      <HeaderPermission />
      <ListOfPermissions />
    </main>
  );
};
export default Permission;
