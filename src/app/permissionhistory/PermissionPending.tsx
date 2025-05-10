"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";
import { TableFormate } from "@/components/TableFormate";
import { IoArrowBack } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { EnrichedPermissionHis } from "../permission/PermissionList";

const PermissionPending = () => {
  const router = useRouter();
  const [permissionList, setPermissionList] = useState<EnrichedPermissionHis[]>(
    []
  );
  const [filterStatus, setFilterStatus] = useState<"Approved" | "Rejected">(
    "Approved"
  );
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const Heading = [
    "EmpID",
    "Name(s)",
    "Apply Date",
    "Timing",
    "Hours(s)",
    "Reason(s)",
    "Actions",
  ];

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        setLoading(true);

        const applyPerSnapshot = await getDocs(
          collection(db, "applyPermission")
        );
        const applyPermissionData: EnrichedPermissionHis[] =
          applyPerSnapshot.docs.map((doc) => ({
            docId: doc.id,
            empID: doc.data().empID,
            totalHours: doc.data().totalHours || "",
            fromTime: doc.data().fromTime || "",
            toTime: doc.data().toTime || "",
            date: doc.data().date || "",
            reason: doc.data().reason || "",
            status: doc.data().status,
            createdDate: doc.data().createdDate || "",
            remarks: doc.data().remarks || "",
            name: "", // to be added later
          }));

        const employeeSnapshot = await getDocs(
          collection(db, "employeeDetails")
        );
        const employeeDetails = employeeSnapshot.docs.map((doc) => ({
          empID: doc.id,
          ...(doc.data() as { name: string }),
        }));

        const empMap = new Map<string, string>();
        employeeDetails.forEach((emp) => {
          empMap.set(emp.empID, emp.name);
        });

        const enrichedList = applyPermissionData.map((permission) => ({
          ...permission,
          name: empMap.get(permission.empID) || "Unknown",
        }));

        setPermissionList(enrichedList);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const filteredData = permissionList.filter((item) => {
    const isStatusMatch = item.status === filterStatus;

    const itemDate = new Date(item.date);
    const isStartValid = startDate ? new Date(startDate) <= itemDate : true;
    const isEndValid = endDate ? itemDate <= new Date(endDate) : true;

    return isStatusMatch && isStartValid && isEndValid;
  });

  if (loading) {
    return (
      <div className="text-center text-gray-500 my-20 text-lg">Loading...</div>
    );
  }

  return (
    <section>
      <div className="flex justify-start items-center text-[22px] text-gray gap-10 my-10">
        <IoArrowBack onClick={() => router.back()} className="cursor-pointer" />
        <h3>Leave Management</h3>
      </div>

      <section className="flex justify-between items-center my-10">
        <div className="flex gap-5">
          <div className="flex flex-col">
            <label className="text-[#7E7D7D] mb-1">Start Date</label>
            <input
              type="date"
              className="border border-[#9D9393] text-gray rounded px-1 py-1"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-[#7E7D7D] mb-1">End Date</label>
            <input
              type="date"
              className="border border-[#9D9393] text-gray rounded px-1 py-1"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>
        {/* Optional: Add a reset button */}
        <button
          onClick={() => {
            setStartDate("");
            setEndDate("");
          }}
          className="px-4 py-2 border border-gray-400 rounded text-sm"
        >
          Reset Filter
        </button>
      </section>

      <section className="py-7 bg-white rounded-xl px-10 space-y-7 my-10 overflow-x-auto">
        <div className="flex gap-4 mb-4 text-gray">
          <button
            onClick={() => setFilterStatus("Approved")}
            className={`px-2 py-2 rounded ${
              filterStatus === "Approved" ? "bg-lite_blue" : ""
            }`}
          >
            Approved List
          </button>
          <button
            onClick={() => setFilterStatus("Rejected")}
            className={`px-2 py-2 rounded ${
              filterStatus === "Rejected" ? "bg-lite_blue" : ""
            }`}
          >
            Rejected List
          </button>
        </div>

        <div className="my-10">
          {(startDate || endDate
            ? filteredData
            : permissionList.filter((item) => item.status === filterStatus)
          ).length > 0 ? (
            <TableFormate
              heading={Heading}
              list="permissionList"
              permissionList={
                startDate || endDate
                  ? filteredData
                  : permissionList.filter(
                      (item) => item.status === filterStatus
                    )
              }
              filterStatus={filterStatus}
            />
          ) : (
            <p className="text-center py-4 text-gray-400">Data not found</p>
          )}
        </div>
      </section>
    </section>
  );
};

export default PermissionPending;

// "use client";

// import { useEffect, useState } from "react";
// import { collection, getDocs } from "firebase/firestore";
// import { db } from "@/lib/firebaseConfig";
// import { TableFormate } from "@/components/TableFormate";
// import { IoArrowBack } from "react-icons/io5";
// import { useRouter } from "next/navigation";

// type ApplyPermission = {
//     empID: string;
//     hours: string;
//     createdDate: string;
//     remarks?: string;
//     reason: string;
//     status: string;
//   };

//   type EnrichedApplyPermission = ApplyPermission & {
//     name: string;
//     docId: string;
//     date: string;
//   };

// const PermissionPending = () => {
//   const router = useRouter();
//   const [permissionList, setPermissionList] = useState<EnrichedApplyPermission[]>([]);
//   const [filterStatus, setFilterStatus] = useState<"Approved" | "Rejected">("Approved");
//   const [loading, setLoading] = useState(true);

//   const Heading = [
//     "EmpID",
//     "Name(s)",
//     "Apply Date",
//     "Hours(s)",
//     "Reason(s)",
//     "Actions",
//     // ...(filterStatus === "Rejected" ? ["Remarks"] : []),
//   ];

//   useEffect(() => {
//     const fetchEmployees = async () => {
//       try {
//         setLoading(true);

//         const applyPerSnapshot = await getDocs(collection(db, "applyPermission"));
//         const applyPermissionData: EnrichedApplyPermission[] = applyPerSnapshot.docs.map((doc) => ({
//             docId: doc.id,
//             empID: doc.data().empID,
//             hours: doc.data().hours || "",
//             date: doc.data().date || "",
//             reason: doc.data().reason || "",
//             status: doc.data().status,
//             createdDate: doc.data().createdDate || "",
//             remarks: doc.data().remarks || "", // ✅ ensure it's always a string
//             name: "", // will be set later
//           }));

//         const employeeSnapshot = await getDocs(collection(db, "employeeDetails"));
//         const employeeDetails = employeeSnapshot.docs.map((doc) => ({
//           empID: doc.id,
//           ...(doc.data() as { name: string }),
//         }));

//         const empMap = new Map<string, string>();
//         employeeDetails.forEach((emp) => {
//           empMap.set(emp.empID, emp.name);
//         });

//         const enrichedList = applyPermissionData.map((permission) => ({
//           ...permission,
//           name: empMap.get(permission.empID) || "Unknown",
//         }));

//         setPermissionList(enrichedList);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchEmployees();
//   }, []);

//   const filteredData = permissionList.filter(
//     (item) => item.status === filterStatus
//   );

//   if (loading) {
//     return (
//       <div className="text-center text-gray-500 my-20 text-lg">Loading...</div>
//     );
//   }

//   return (
//     <section>
//       <div className="flex justify-start items-center text-[22px] text-gray gap-10 my-10">
//         <IoArrowBack onClick={() => router.back()} className="cursor-pointer" />
//         <h3>Permission History</h3>
//       </div>

//       <section className="flex justify-between items-center my-10">
//         <div className="flex gap-5">
//           <div className="flex flex-col">
//             <label className="text-[#7E7D7D] mb-1">Start Date</label>
//             <input
//               type="date"
//               className="border border-[#9D9393] text-gray rounded px-3 py-2"
//             />
//           </div>
//           <div className="flex flex-col">
//             <label className="text-[#7E7D7D] mb-1">End Date</label>
//             <input
//               type="date"
//               className="border border-[#9D9393] text-gray rounded px-3 py-2"
//             />
//           </div>
//         </div>
//         {/* Placeholder for future search box */}
//         <div />
//       </section>

//       <section className="py-7 bg-white rounded-xl px-10 space-y-7 my-10 overflow-x-auto">
//         <div className="flex gap-4 mb-4 text-gray">
//           <button
//             onClick={() => setFilterStatus("Approved")}
//             className={`px-4 py-2 rounded ${filterStatus === "Approved" ? "bg-lite_blue" : ""}`}
//           >
//             Approved List
//           </button>
//           <button
//             onClick={() => setFilterStatus("Rejected")}
//             className={`px-4 py-2 rounded ${filterStatus === "Rejected" ? "bg-lite_blue" : ""}`}
//           >
//             Rejected List
//           </button>
//         </div>

//         <div className="my-10">
//           {filteredData.length > 0 ? (
//             <TableFormate
//               heading={Heading}
//               list="permissionList"
//               permissionList={filteredData}
//               filterStatus={filterStatus}
//             />
//           ) : (
//             <p className="text-center py-4 text-gray-400">Data not found</p>
//           )}
//         </div>
//       </section>
//     </section>
//   );
// };

// export default PermissionPending;
