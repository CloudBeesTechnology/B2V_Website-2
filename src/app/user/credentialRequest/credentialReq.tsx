"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  getDocs,
  collection,
  updateDoc,
  doc,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "@/lib/firebaseConfig"; // adjust path as needed
import { MdOutlineKeyboardBackspace } from "react-icons/md";

const CredentialReq: React.FC = () => {
  const router = useRouter();
  const [credentials, setCredentials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [userType, setUserType] = useState<"Employee" | "Intern">("Employee");

useEffect(() => {
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const userQuery = query(
        collection(db, "users"),
        orderBy("createdAt", "desc") // Firebase handles ordering
      );
      const userSnapshot = await getDocs(userQuery);
      const users = userSnapshot.docs.map((doc) => ({
        ...doc.data(),
        docId: doc.id,
      }));
      setCredentials(users);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchUsers();
}, []);


  const updateUserStatus = async (docId: string, newStatus: string) => {
    try {
      const userRef = doc(db, "users", docId);
      await updateDoc(userRef, { status: newStatus });
      setCredentials((prev) =>
        prev.map((cred) =>
          cred.docId === docId ? { ...cred, status: newStatus } : cred
        )
      );
    } catch (error) {
      console.error("Error updating user status:", error);
    }
  };

  const handleStatusChange = (docId: string, newStatus: string) => {
    updateUserStatus(docId, newStatus);
  };

  // 🔍 Filter credentials based on selected user type
  const filteredCredentials = credentials.filter((cred) => {
    if (userType === "Employee") return !!cred.empID;
    if (userType === "Intern") return !!cred.intID;
    return true; // For "All"
  });

  if (loading)
    return (
      <div className="text-center text-gray-500 my-20 text-lg">Loading...</div>
    );

  return (
    <section>
      <header className="flex justify-start items-center text-[22px] text-gray gap-5 m-10">
        <MdOutlineKeyboardBackspace onClick={() => router.back()} className="text-3xl cursor-pointer hover:text-blue-600 transition-colors" />
        <h3>Credential Request</h3>
      </header>

      {/* 🔘 Filter Buttons */}
      <div className="flex gap-4 mb-6 ml-10">
        <button
          onClick={() => setUserType("Employee")}
          className={`px-4 py-2 border rounded ${
            userType === "Employee" ? "bg-primary text-white" : "bg-white"
          }`}
        >
          Employee
        </button>
        <button
          onClick={() => setUserType("Intern")}
          className={`px-4 py-2 border rounded ${
            userType === "Intern" ? "bg-primary text-white" : "bg-white"
          }`}
        >
          Intern
        </button>
      </div>

      {/* 🧾 User Table */}
      {filteredCredentials.length > 0 ? (
        <div className="center overflow-x-auto mb-10">
          <table className="table-fixed w-full max-w-[1500px]">
            <thead>
              <tr className="text-center text-white bg-primary">
                <th className="rounded-tl-md py-3">S.No</th>
                <th className="py-3">Employee ID</th>
                <th className="py-3">Email ID</th>
                <th className="py-3">Roles</th>
                <th className="py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredCredentials.map((cred, index) => (
                <tr
                  key={cred.docId}
                  className="text-center text-gray border-b border-[#D2D2D240] bg-white"
                >
                  <td className="py-3">{index + 1}</td>
                  <td className="py-3">{cred.empID || cred.intID || "-"}</td>
                  <td className="py-3">{cred.email}</td>
                  <td className="py-3">{cred.role}</td>
                  <td className="px-4 py-2">
                    <select
                      value={cred.status}
                      onChange={(e) =>
                        handleStatusChange(cred.docId, e.target.value)
                      }
                      className="border border-gray-300 rounded px-2 py-1 outline-none"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Active">Active</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center py-4 text-gray-400">User not found</p>
      )}
    </section>
  );
};

export default CredentialReq;




// "use client";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { IoArrowBack } from "react-icons/io5";
// import { getDocs, collection, updateDoc, doc } from "firebase/firestore";
// import { db } from "@/lib/firebaseConfig"; // adjust path as needed

// const CredentialReq: React.FC = () => {
//   const router = useRouter();
//   const [credentials, setCredentials] = useState<any[]>([]);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const userSnapshot = await getDocs(collection(db, "users"));
//         const users = userSnapshot.docs.map((doc) => ({
//           ...doc.data(),
//           docId: doc.id,
//         }));
//         setCredentials(users);
//       } catch (error) {
//         console.error("Error fetching users:", error);
//       }
//     };

//     fetchUsers();
//   }, []);

//   const updateUserStatus = async (docId: string, newStatus: string) => {
//     try {
//       const userRef = doc(db, "users", docId);
//       await updateDoc(userRef, { status: newStatus });
//       setCredentials((prev) =>
//         prev.map((cred) =>
//           cred.docId === docId ? { ...cred, status: newStatus } : cred
//         )
//       );
//     } catch (error) {
//       console.error("Error updating user status:", error);
//     }
//   };

//   const handleStatusChange = (docId: string, newStatus: string) => {
//     updateUserStatus(docId, newStatus);
//   };

//   return (
//     <section>
//       <header className="flex justify-start items-center text-[22px] text-gray gap-10 m-10">
//         <IoArrowBack onClick={() => router.back()} className="cursor-pointer" />
//         <h3>Credential Request</h3>
//       </header>

//       <div className="center">
//         <table className="table-fixed w-full max-w-[1500px]">
//           <thead>
//             <tr className="text-center text-white bg-primary">
//               <th className="rounded-tl-md py-3">S.No</th>
//               <th className="py-3">Email Id</th>
//               <th className="py-3">Roles</th>
//               <th className="py-3">Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {credentials.map((cred, index) => (
//               <tr
//                 key={cred.docId}
//                 className="text-center text-gray border-b border-[#D2D2D240] bg-white"
//               >
//                 <td className="py-3">{index + 1}</td>
//                 <td className="py-3">{cred.email}</td>
//                 <td className="py-3">{cred.role}</td>
//                 <td className="px-4 py-2">
//                   <select
//                     value={cred.status}
//                     onChange={(e) =>
//                       handleStatusChange(cred.docId, e.target.value)
//                     }
//                     className="border border-gray-300 rounded px-2 py-1 outline-none"
//                   >
//                     <option value="Pending">Pending</option>
//                     <option value="Active">Active</option>
//                     <option value="Rejected">Rejected</option>
//                   </select>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </section>
//   );
// };

// export default CredentialReq;


