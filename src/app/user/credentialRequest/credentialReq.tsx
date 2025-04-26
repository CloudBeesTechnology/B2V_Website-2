"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { IoArrowBack } from "react-icons/io5";
import {
  getDocs,
  collection,
  updateDoc,
  doc,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "@/lib/firebaseConfig"; // adjust path as needed

const CredentialReq: React.FC = () => {
  const router = useRouter();
  const [credentials, setCredentials] = useState<any[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userQuery = query(
          collection(db, "users"),
          orderBy("createdAt", "desc") // Sort by newest first
        );
        const userSnapshot = await getDocs(userQuery);
        const users = userSnapshot.docs.map((doc) => ({
          ...doc.data(),
          docId: doc.id,
        }));
        setCredentials(users);
      } catch (error) {
        console.error("Error fetching users:", error);
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

  return (
    <section>
      <header className="flex justify-start items-center text-[22px] text-gray gap-10 m-10">
        <IoArrowBack onClick={() => router.back()} className="cursor-pointer" />
        <h3>Credential Request</h3>
      </header>

      <div className="center overflow-x-auto">
        <table className="table-fixed w-full max-w-[1500px]">
          <thead>
            <tr className="text-center text-white bg-primary">
              <th className="rounded-tl-md py-3">S.No</th>
              <th className="py-3">Email Id</th>
              <th className="py-3">Roles</th>
              <th className="py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {credentials.map((cred, index) => (
              <tr
                key={cred.docId}
                className="text-center text-gray border-b border-[#D2D2D240] bg-white"
              >
                <td className="py-3">{index + 1}</td>
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


