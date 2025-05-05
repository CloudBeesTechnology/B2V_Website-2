import { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";
import useCheckPermission from "@/app/utils/customHooks/useCheckPermission";
import { useEffect } from "react";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { storedPermissions } = useCheckPermission();
  useEffect(() => {
    console.log("storedPermissions : ", storedPermissions);
  }, [storedPermissions]);
  console.log("storedPermissions : ", storedPermissions);
  const userPermissions = getUserPermissions(); // Replace with actual permissions logic

  const serialized = serialize(
    "user-permissions",
    JSON.stringify(userPermissions),
    {
      path: "/",
      httpOnly: false, // Can be accessed by middleware
      maxAge: 60 * 60 * 24, // 1 day
    }
  );

  res.setHeader("Set-Cookie", serialized);
  res.status(200).json({ success: true });
}

// Replace this with real logic
function getUserPermissions() {
  return [
    {
      submodule: "Overview",
      sections: ["Entry Time", "Total Employee", "Active Employee"],
    },
    {
      submodule: "Employee",
      sections: ["All Employee", "Add Employee Info"],
    },
  ];
}
