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
import { db } from "@/lib/firebaseConfig"; // update this path if needed
import { MdOutlineKeyboardBackspace } from "react-icons/md";

interface MergedUser {
  docId: string;
  empID?: string;
  intID?: string;
  email: string;
  status: string;
  role?: string;
}

const CredentialReq: React.FC = () => {
  const router = useRouter();
  const [mergedUsers, setMergedUsers] = useState<MergedUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [userType, setUserType] = useState<"Employee" | "Intern">("Employee");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Get users
        const userQuery = query(
          collection(db, "users"),
          orderBy("createdAt", "desc")
        );
        const userSnapshot = await getDocs(userQuery);
        const users = userSnapshot.docs.map((doc) => ({
          ...doc.data(),
          docId: doc.id,
        })) as any[];

        // Get accessControl
        const accessSnapshot = await getDocs(collection(db, "accessControl"));
        const accessControl = accessSnapshot.docs.map((doc) => doc.data()) as {
          email: string;
          role?: string;
        }[];

        // Merge both datasets by email
        const merged = users.map((user) => {
          const matchedAccess = accessControl.find(
            (acc) => acc.email === user.email
          );
          return {
            docId: user.docId,
            empID: user.empID,
            intID: user.intID,
            email: user.email,
            status: user.status || "Pending",
            role: matchedAccess?.role || "N/A",
          };
        });

        setMergedUsers(merged);
      } catch (error) {
        console.error("Error fetching/merging data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const updateUserStatus = async (docId: string, newStatus: string) => {
    try {
      const userRef = doc(db, "users", docId);
      await updateDoc(userRef, { status: newStatus });
      setMergedUsers((prev) =>
        prev.map((u) =>
          u.docId === docId ? { ...u, status: newStatus } : u
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const filteredUsers = mergedUsers.filter((user) =>
    userType === "Employee" ? !!user.empID : !!user.intID
  );

  if (loading)
    return (
      <div className="text-center text-gray-500 my-20 text-lg">Loading...</div>
    );

  return (
    <section>
      <header className="flex items-center gap-4 text-2xl m-10 text-gray-800">
        <MdOutlineKeyboardBackspace
          onClick={() => router.back()}
          className="text-3xl cursor-pointer hover:text-blue-600"
        />
        <h3>Credential Request</h3>
      </header>

      {/* Filter Buttons */}
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

      {/* Table */}
      {filteredUsers.length > 0 ? (
        <div className="center overflow-x-auto mb-10">
          <table className="table-fixed w-full max-w-[1500px] ">
            <thead>
              <tr className="text-center text-white bg-primary">
                <th className="py-3">S.No</th>
                <th className="py-3">Employee ID</th>
                <th className="py-3">Email</th>
                <th className="py-3">Role</th>
                <th className="py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <tr
                  key={user.docId}
              className="text-center text-gray border-b border-[#D2D2D240] bg-white"

                >
                  <td className="py-3">{index + 1}</td>
                  <td className="py-3">{user.empID || user.intID || "-"}</td>
                  <td className="py-3">{user.email}</td>
                  <td className="py-3">{user.role}</td>
                  <td className="px-4 py-2">
                    <select
                      value={user.status}
                      onChange={(e) =>
                        updateUserStatus(user.docId, e.target.value)
                      }
                      className="border rounded px-2 py-1 outline-none"
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


