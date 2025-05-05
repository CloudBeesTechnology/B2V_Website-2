import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";

const useCheckPermission = () => {
  const [storedPermissions, setStoredPermissions] = useState<
    Record<string, string[]>
  >({});

  const userID =
    typeof window !== "undefined"
      ? localStorage.getItem("empID")?.toString()?.toUpperCase()
      : null;

  useEffect(() => {
    const getUserAndPermissions = async (empID: string) => {
      try {
        const userQuery = query(
          collection(db, "accessControl"),
          where("empID", "==", empID)
        );
        const snapshot = await getDocs(userQuery);
        const userData = snapshot.docs[0]?.data();
        if (userData?.setPermission) {
          setStoredPermissions(userData.setPermission); // ✅ Set it in state
        }
      } catch (error) {
        console.error("Error fetching permissions:", error);
      }
    };

    if (userID) {
      getUserAndPermissions(userID);
    }
  }, [userID]);

  const hasPermission = (module: string, feature: string) => {
    return storedPermissions?.[module]?.includes(feature);
  };

  return { storedPermissions, hasPermission };
};

export default useCheckPermission;
