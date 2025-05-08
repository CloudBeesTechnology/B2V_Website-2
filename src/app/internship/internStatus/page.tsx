"use client";
import { useState, useEffect } from "react";
import { collection, doc, setDoc, updateDoc, getDocs, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";
import { useRouter } from "next/navigation";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import Link from "next/link";

// interface InternTableProps {
//   data: RequestInternData[];
// }

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

const InternStatus = () => {
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
  
  const filteredData = internData.filter((item) => item.status === filter);

  return (
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

export default InternStatus;