"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";
import { TableFormate } from "@/components/TableFormate";
import { useRouter } from "next/navigation";
import { ViewEmpData } from "@/components/ViewEmpData";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { CiSearch } from "react-icons/ci";

export const AllEmployeeHome = () => {
  const router = useRouter();
  const Heading = [
    "EmpID",
    "Name",
    "Position",
    "Department",
    "Contact",
    "Email ID",
    "ViewForm",
    "Edit",
  ];

  const [allEmp, setAllEmp] = useState<Array<any>>([]);
  const [filteredEmp, setFilteredEmp] = useState<Array<any>>([]);
  const [empPopupData, setEmpPopupData] = useState<any | null>(null);
  const [showingPopUp, setShowingPopUp] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        setLoading(true);
        const querySnapshot = await getDocs(collection(db, "employeeDetails"));
        const employeeList = querySnapshot.docs.map((doc) => ({
          empID: doc.id,
          ...doc.data(),
        }));
        setAllEmp(employeeList);
        setFilteredEmp(employeeList);
      } catch (error) {
        console.error("Error fetching employees:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  useEffect(() => {
    const lowerQuery = searchQuery.toLowerCase();
    const filtered = allEmp.filter((emp) => {
      return (
        emp.empID?.toLowerCase().includes(lowerQuery) ||
        emp.name?.toLowerCase().includes(lowerQuery)
      );
    });
    setFilteredEmp(filtered);
  }, [searchQuery, allEmp]);

  const handleClose = () => {
    setShowingPopUp(!showingPopUp);
  };

  const handleViewData = (data: any) => {
    setEmpPopupData(data);
    handleClose();
  };

  if (loading)
    return (
      <div className="text-center text-gray-500 my-20 text-lg">Loading...</div>
    );

  return (
    <section>
      <div className="flex justify-start items-center text-[22px] text-mediumlite_grey gap-5 my-10">
        <MdOutlineKeyboardBackspace
          onClick={() => router.back()}
          className="cursor-pointer text-3xl hover:text-blue-600 transition-colors"
        />
        <h1 className="text_size_2">Employee</h1>
      </div>

      <div className="w-full flex justify-between items-center">
      
      <h2 className=" text-primary border-b-2 border-primary pb-2 px-2  text_size_3">
        All</h2>
        <div className="mb-5 px-2 flex justify-end items-end relative w-full">
         <input
          type="text"
          placeholder="Search"
          className=" p-2 border border-gray-300 rounded-md shadow-sm text-gray outline-none  w-[15%] "
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
       <div className=" absolute top-3.5 right-5"> <CiSearch/></div>
      </div>
      </div>

      

      <div className="bg-white py-5 rounded-lg">
        {filteredEmp && filteredEmp.length > 0 ? (
          <TableFormate
            heading={Heading}
            allEmp={filteredEmp}
            list="AllEmp"
            ovla={[]}
            leaveApproval={[]}
            viewData={handleViewData}
          />
        ) : (
          <p className="text-center py-4 text-gray-400">No matching records found.</p>
        )}
      </div>

      {showingPopUp && (
        <ViewEmpData allEmp={empPopupData ?? []} close={handleClose} />
      )}
    </section>
  );
};



// "use client";

// import { useEffect, useState } from "react";
// import { collection, getDocs } from "firebase/firestore";
// import { db } from "@/lib/firebaseConfig"; // adjust based on your project
// import { TableFormate } from "@/components/TableFormate";
// import { useRouter } from "next/navigation";
// import { ViewEmpData } from "@/components/ViewEmpData";
// import { MdOutlineKeyboardBackspace } from "react-icons/md";

// export const AllEmployeeHome = () => {
//   const router = useRouter();
//   const Heading = [
//     "EmpID",
//     "Name",
//     "Position",
//     "Department",
//     "Contact",
//     "Email ID",
//     "ViewForm",
//     "Edit",
//   ];
//   const [allEmp, setAllEmp] = useState<Array<any> | null>([]);
//   const [empPopupData, setEmpPopupData] = useState<any | null>(null);
//   const [showingPopUp, setShowingPopUp] = useState(false);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchEmployees = async () => {
//       try {
//         setLoading(true);
//         const querySnapshot = await getDocs(collection(db, "employeeDetails"));
//         const employeeList = querySnapshot.docs.map((doc) => ({
//           empID: doc.id,
//           ...doc.data(),
//         }));

//         setAllEmp(employeeList);
//       } catch (error) {
//         console.error("Error fetching employees:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchEmployees();
//   }, []);
//   const handleClose = () => {
//     setShowingPopUp(!showingPopUp);
//   };
//   const handleViewData = (data: any) => {
//     // console.log(data);
//     setEmpPopupData(data);
//     handleClose();
//   };
//   if (loading)
//     return (
//       <div className="text-center text-gray-500 my-20 text-lg">Loading...</div>
//     );

//   return (
//     <section>
//       <div className="flex justify-start items-center text-[22px] text-mediumlite_grey gap-5 my-10">
//         <MdOutlineKeyboardBackspace onClick={() => router.back()} className="cursor-pointer text-3xl hover:text-blue-600 transition-colors" />
//         <h1 className="text_size_2">Employee</h1>
//       </div>
//       <h4 className="text-primary border-b-2 border-primary pb-2 px-2 w-9 mt-3 mb-7 text_size_3">
//         All
//       </h4>
//       <div className="bg-white py-5 rounded-lg">
//         {allEmp && allEmp.length > 0 ? (
//           <TableFormate
//             heading={Heading}
//             allEmp={allEmp ?? []}
//             list="AllEmp"
//             ovla={[]}
//             leaveApproval={[]}
//             viewData={handleViewData}
//           />
//         ) : (
//           <p className="text-center py-4 text-gray-400">Data not found</p>
//         )}
//       </div>
//       {showingPopUp && (
//         <ViewEmpData allEmp={empPopupData ?? []} close={handleClose} />
//       )}
//     </section>
//   );
// };
