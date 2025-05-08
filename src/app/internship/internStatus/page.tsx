<<<<<<< HEAD
// "use client";
// import { collection, query, orderBy, limit, getDocs, doc, updateDoc, where } from "firebase/firestore";
// import { db } from "@/lib/firebaseConfig"; // Update the path to match your project
// import { IoIosArrowDropdownCircle } from "react-icons/io";
// import { useRouter } from "next/navigation";
=======
"use client";
import { useState, useEffect } from "react";
import { collection, doc, setDoc, updateDoc, getDocs, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";
import { useRouter } from "next/navigation";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import Link from "next/link";
>>>>>>> b65651e867c3b5ee9f4353f2d2c5f18e80f0a449

// interface InternTableProps {
//   data: RequestInternData[];
// }

<<<<<<< HEAD
// interface RequestInternData {
//   intID?: string;
//   firstName: string;
//   role: string;
//   category: string;
//   courseContent: string;
//   email: string;
//   status: string;
// }

// interface InternshipFormData {
//   firstName: string;
//   role: string;
//   category: string;
//   courseContent: string;
//   email: string;
//   status: string;
// }

// const InternStatus: React.FC<InternTableProps> = ({ data }) => {
//   const router = useRouter();

//   const onSubmit = async (formData: InternshipFormData) => {
//     try {
//       const internshipCollection = collection(db, "Internship");

//       // Find document by email
//       const matchQuery = query(
//         internshipCollection,
//         where("email", "==", formData.email)
//       );
//       const matchSnapshot = await getDocs(matchQuery);

//       if (matchSnapshot.empty) {
//         console.error("No matching document found.");
//         return;
//       }

//       const docId = matchSnapshot.docs[0].id;
//       const updateRef = doc(db, "Internship", docId);

//       // Prepare update object
//       let updatePayload: any = {
//         status: formData.status,
//         updatedAt: new Date().toISOString(),
//       };

//       if (formData.status === "Approved") {
//         // Get latest intID and increment
//         const latestEmpQuery = query(
//           internshipCollection,
//           orderBy("intID", "desc"),
//           limit(1)
//         );
//         const latestSnapshot = await getDocs(latestEmpQuery);

//         let newIntID = "INT0001";
//         if (!latestSnapshot.empty) {
//           const lastIntID = latestSnapshot.docs[0].data().intID;
//           const lastNumber = parseInt(lastIntID.replace("INT", ""), 10);
//           const nextNumber = lastNumber + 1;
//           newIntID = `INT${String(nextNumber).padStart(4, "0")}`;
//         }

//         updatePayload.intID = newIntID;
//       }

//       await updateDoc(updateRef, updatePayload);
//       console.log("Document updated:", docId);

//       router.push("/internship");

//     } catch (error) {
//       console.error("Error updating intern:", error);
//     }
//   };
=======
interface RequestInternData {
  intID: string;
  firstName: string;
  role: string;
  category: string;
  courseContent: string;
  email: string;
  status: string;
}

interface StatusUpdateData {
  intID: string;
  status: string;
}

const InternStatus: React.FC<InternTableProps> = ({ data = [] }) => {
  const router = useRouter();
  const [filter, setFilter] = useState<"Pending" | "Completed" | "Processing" | "Droped">("Pending");
  const [internData, setInternData] = useState<RequestInternData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Internship"));
        const fetchedData: RequestInternData[] = [];
        querySnapshot.forEach((doc) => {
          fetchedData.push(doc.data() as RequestInternData);
        });
        setInternData(fetchedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const onSubmit = async ({ intID, status }: StatusUpdateData) => {
    try {
      // Query the 'Internship' collection to find the document with the matching intID
      const querySnapshot = await getDocs(collection(db, "Internship"));
      
      let docRefToUpdate = null;
  
      // Iterate over the documents to find the one with the matching intID
      querySnapshot.forEach((docSnapshot) => {
        const data = docSnapshot.data();
        if (data.intID === intID) {
          docRefToUpdate = docSnapshot.id; // Store the document ID
        }
      });
  
      // If no document is found with the provided intID, log an error and return
      if (!docRefToUpdate) {
        console.error("Document does not exist for intID:", intID);
        return; // Prevent update if no matching document is found
      }
  
      // Reference to the document that needs to be updated
      const docRef = doc(db, "Internship", docRefToUpdate);
  
      // Update the 'status' field and the 'updatedAt' field
      await updateDoc(docRef, {
        status,           // Update the status
        updatedAt: new Date().toISOString(), // Add a timestamp for the update
      });
  
      // Log success
      console.log("status updated for intID:", intID);
  
      // Update the internData state to reflect the new status
      setInternData((prevData) =>
        prevData.map((intern) =>
          intern.intID === intID ? { ...intern, status } : intern
        )
      );
  
      // Optionally refresh the page or perform additional actions
      router.refresh(); // Or use your own method to update UI
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };
  
<<<<<<< HEAD
  const filteredData = internData.filter((item) => item.approvedStatus === filter);
>>>>>>> b65651e867c3b5ee9f4353f2d2c5f18e80f0a449
=======
  const filteredData = internData.filter((item) => item.status === filter);
>>>>>>> 126b526a61b46580462b81f700f6e43e06df2632

//   return (
//     <section className="bg-white rounded-md my-3">
//       <table className="table-fixed w-full">
//         <thead>
//           <tr className="font-semibold text-gray text-center border-b border-[#D2D2D240]">
//             <th className="py-5">Name</th>
//             <th className="py-5">Role</th>
//             <th className="py-5">Category</th>
//             <th className="py-5">Course Content</th>
//             <th className="py-5">Email ID</th>
//             <th className="py-5">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data.map((intern, index) => (
//             <tr
//               key={index}
//               className="text-center text-sm border-b border-[#D2D2D240]"
//             >
//               <td className="py-5">{intern.firstName}</td>
//               <td className="py-5">{intern.role}</td>
//               <td className="py-5">{intern.category}</td>
//               <td className="py-5">{intern.courseContent}</td>
//               <td className="py-5">{intern.email}</td>
//               <td className="center py-5">
//                 <select
//                   className="text-sm px-2 py-1 rounded border bg-white text-gray-700"
//                   defaultValue=""
//                   onChange={(e) => {
//                     const selectedStatus = e.target.value;
//                     if (selectedStatus) {
//                       onSubmit({
//                         firstName: intern.firstName,
//                         role: intern.role,
//                         category: intern.category,
//                         courseContent: intern.courseContent,
//                         email: intern.email,
//                         status: selectedStatus,
//                       });
//                     }
//                   }}
//                 >
//                   <option value="Pending">Pending</option>
//                   <option value="Approved">Approved</option>
//                   <option value="Rejected">Rejected</option>
//                 </select>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </section>
//   );
// };

// export default InternStatus;


export default function InternStatus ()  {
  return (
<<<<<<< HEAD
    <div>page</div>
  )
}
=======
    <section className=" my-3 p-4">
      <h1 className="flex gap-2 items-center text-mediumlite_grey text_size_2 my-5">
        <Link href="/internship" className="text-3xl">
          <MdOutlineKeyboardBackspace />
        </Link>
        Internship Enrollment
      </h1>
      <div className="bg-white rounded-md my-3 p-4">
      <div className="flex justify-between items-center mt-5 mb-4">
        <div className="space-x-2">
          <button
            onClick={() => setFilter("Pending")}
            className={`px-4 py-2 rounded ${filter === "Pending" ? "bg-[#146ADC] text-white" : "bg-gray-200"}`}
          >
            Pending Candidate
          </button>
          <button
            onClick={() => setFilter("Completed")}
            className={`px-4 py-2 rounded ${filter === "Completed" ? "bg-[#146ADC] text-white" : "bg-gray-200"}`}
          >
            Completed
          </button>
          <button
            onClick={() => setFilter("Processing")}
            className={`px-4 py-2 rounded ${filter === "Processing" ? "bg-[#146ADC] text-white" : "bg-gray-200"}`}
          >
            Processing
          </button>
          <button
            onClick={() => setFilter("Droped")}
            className={`px-4 py-2 rounded ${filter === "Droped" ? "bg-[#146ADC] text-white" : "bg-gray-200"}`}
          >
            Dropped
          </button>
        </div>
      </div>

      {filteredData.length === 0 ? (
        <p className="text-center text-gray-500 py-4">No data available for the selected filter.</p>
      ) : (
        <table className="table-fixed w-full">
          <thead>
            <tr className="font-semibold text-gray text-center border-b border-[#D2D2D240]">
              <th className="py-5">Int ID</th>
              <th className="py-5">Name</th>
              <th className="py-5">Category</th>
              <th className="py-5">Course Content</th>
              <th className="py-5">Email ID</th>
              <th className="py-5">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((intern) => (
              <tr key={intern.intID} className="text-center text-sm border-b border-[#D2D2D240]">
                <td className="py-5">{intern.intID}</td>
                <td className="py-5">{intern.firstName}</td>
                <td className="py-5">{intern.category}</td>
                <td className="py-5">{intern.courseContent}</td>
                <td className="py-5">{intern.email}</td>
                <td className="center py-5">
                  <select
                    className="text-sm px-2 py-1 rounded border bg-white text-gray-700"
                    value={intern.status}
                    onChange={(e) => {
                      const selectedStatus = e.target.value;
                      if (selectedStatus !== intern.status) {
                        onSubmit({
                          intID: intern.intID,
                          status: selectedStatus,
                        });
                      }
                    }}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                    <option value="Processing">Processing</option>
                    <option value="Droped">Dropped</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      </div>
    </section>
  );
};

<<<<<<< HEAD

export default InternStatus;
>>>>>>> b65651e867c3b5ee9f4353f2d2c5f18e80f0a449
=======
export default InternStatus;
>>>>>>> 126b526a61b46580462b81f700f6e43e06df2632
