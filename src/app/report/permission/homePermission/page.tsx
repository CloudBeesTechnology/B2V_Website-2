"use client";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";

import HeaderPermission from "./headerPermission";
import ListOfPermissions from "./listOfPermissions";
interface permissionObj {
  empID?: string;
  [key: string]: any;
}
interface AccessControl {
  id: string;
  empID: string;
  [key: string]: any;
}

interface EmployeeDetails {
  id: string;
  empID: string;
  [key: string]: any;
}

interface MergedData extends AccessControl, EmployeeDetails {}
const HomePermission: React.FC = () => {
  const [allPermissions, setAllPermissions] = useState<MergedData[]>([]);
  const [secondaryPermissions, setSecondaryPermissions] = useState<
    MergedData[]
  >([]);
  const [storeFilteredData, setStoreFilteredData] = useState<MergedData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAndMergeData = async () => {
      setLoading(true);
      try {
        // Fetch all from accessControl
        const accessControlSnapshot = await getDocs(
          collection(db, "applyPermission")
        );
        const accessControlData: AccessControl[] =
          accessControlSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as AccessControl[];

        // Fetch all from employeeDetails
        const employeeSnapshot = await getDocs(
          collection(db, "employeeDetails")
        );
        const employeeData: EmployeeDetails[] = employeeSnapshot.docs.map(
          (doc) => ({
            id: doc.id,
            ...doc.data(),
          })
        ) as EmployeeDetails[];

        // Merge by empID
        const merged: MergedData[] = accessControlData.map((access) => {
          const match = employeeData.find((emp) => emp.empID === access.empID);
          return {
            ...access,
            ...(match || {}),
          };
        });

        // Show only current year and month matched permission data
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth(); // 0 = January, 11 = December

        const filteredData = merged.filter((item) => {
          const itemDate = new Date(item.date);
          const itemYear = itemDate.getFullYear();
          const itemMonth = itemDate.getMonth();
          return itemYear === currentYear && itemMonth === currentMonth;
        });

        setAllPermissions(merged);
        setSecondaryPermissions(filteredData);
        setStoreFilteredData(filteredData);
      } catch (error) {
        console.error("Error merging data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAndMergeData();
  }, []);

  const handleFilter = (filteredData: permissionObj | any) => {
    if (Array.isArray(filteredData) && filteredData.length > 0) {
      setSecondaryPermissions(filteredData);
    } else {
<<<<<<< HEAD
      setSecondaryPermissions(storeFilteredData);
=======
      // storeFilteredData
      setSecondaryPermissions([]);
>>>>>>> bded8305d73f0c4ded7062702277b3f558255238
    }
  };

  const handleDateFilter = (filterByDate: permissionObj | any) => {
    if (Array.isArray(filterByDate) && filterByDate.length > 0) {
      setSecondaryPermissions(filterByDate);
    } else {
      setSecondaryPermissions(storeFilteredData);
    }
  };

  if (loading)
    return (
      <div className="text-center text_size_4 text-gray my-20 text-lg">
        Loading...
      </div>
    );
  return (
    <div>
      <HeaderPermission
        allPermissions={allPermissions}
        storeFilteredData={storeFilteredData}
        handleFilter={handleFilter}
        handleDateFilter={handleDateFilter}
      />
      <ListOfPermissions secondaryPermissions={secondaryPermissions} />
    </div>
  );
};
export default HomePermission;
