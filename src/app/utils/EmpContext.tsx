"use client";
import { usePathname } from "next/navigation";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

// Define the shape of your context
type EmployeeContextType = {
  storedEmpData: any | null;
  handleStoredData: (items: any) => void;
};

// Create the context with default value null
export const EmployeeList = createContext<EmployeeContextType | null>(null);

// Provider component
export const EmployeeContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [storedEmpData, setStoredEmpData] = useState<any | null>(null);
  const pathname = usePathname();
  useEffect(() => {
    if (pathname === "/employee") {
      setStoredEmpData("");
    }
  }, [pathname]);
  const handleStoredData = (items: any) => {
    console.log(items);

    setStoredEmpData(items);
  };

  return (
    <EmployeeList.Provider value={{ storedEmpData, handleStoredData }}>
      {children}
    </EmployeeList.Provider>
  );
};

// Custom hook to use context
export const UseEmployeeList = () => {
  const context = useContext(EmployeeList);
  if (!context) {
    throw new Error(
      "UseEmployeeList must be used within an EmployeeContextProvider"
    );
  }
  return context;
};
