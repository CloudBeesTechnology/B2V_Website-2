"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig"; // adjust based on your project
import { TableFormate } from "@/components/TableFormate";

export const AllEmployeeHome = () => {
  const Heading = ["EmpID", "Name", "Position", "Department", "Contact", "Email ID"];
  const [allEmp, setAllEmp] = useState<Array<any> | null>([]);
  const [loading,setLoading]=useState(true)

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        setLoading(true)
        const querySnapshot = await getDocs(collection(db, "employeeDetails"));
        const employeeList = querySnapshot.docs.map((doc) => ({
          empID: doc.id, 
          ...doc.data(),
        }));
        console.log(employeeList,"hhhh");
        
        setAllEmp(employeeList);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }finally{
        setLoading(false)
      }
    };

    fetchEmployees();
  }, []);

  if (loading) return <div className="text-center text-gray-500 my-20 text-lg">Loading...</div>;

  return (
    <section>
      <div className="text-mediumlite_grey text_size_2 mt-5">Employee</div>
      <h4 className="text-primary border-b-2 border-primary pb-2 px-2 w-9 mt-3 mb-7 text_size_3">All</h4>
      <div className="bg-white px-10 py-5 rounded-lg">
       {
        allEmp&& allEmp.length>0 ?
        <TableFormate
        heading={Heading}
        allEmp={allEmp ?? []}
        list="AllEmp"
        ovla={[]}
        leaveApproval={[]}
        empLeave={[]}
      />:<p className="text-center py-4 text-gray-400">Data not found</p>
       }
      </div>
    </section>
  );
};

