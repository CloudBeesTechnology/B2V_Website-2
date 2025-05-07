"use client";
import { collection, query, orderBy, limit, getDocs, doc, updateDoc, where } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig"; // Update the path to match your project
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { useRouter } from "next/navigation";

interface InternTableProps {
  data: RequestInternData[];
}

interface RequestInternData {
  intID?: string;
  firstName: string;
  role: string;
  category: string;
  courseContent: string;
  email: string;
  status: string;
}

interface InternshipFormData {
  firstName: string;
  role: string;
  category: string;
  courseContent: string;
  email: string;
  status: string;
}

const InternStatus: React.FC<InternTableProps> = ({ data }) => {
  const router = useRouter();

  const onSubmit = async (formData: InternshipFormData) => {
    try {
      const internshipCollection = collection(db, "Internship");

      // Find document by email
      const matchQuery = query(
        internshipCollection,
        where("email", "==", formData.email)
      );
      const matchSnapshot = await getDocs(matchQuery);

      if (matchSnapshot.empty) {
        console.error("No matching document found.");
        return;
      }

      const docId = matchSnapshot.docs[0].id;
      const updateRef = doc(db, "Internship", docId);

      // Prepare update object
      let updatePayload: any = {
        status: formData.status,
        updatedAt: new Date().toISOString(),
      };

      if (formData.status === "Approved") {
        // Get latest intID and increment
        const latestEmpQuery = query(
          internshipCollection,
          orderBy("intID", "desc"),
          limit(1)
        );
        const latestSnapshot = await getDocs(latestEmpQuery);

        let newIntID = "INT0001";
        if (!latestSnapshot.empty) {
          const lastIntID = latestSnapshot.docs[0].data().intID;
          const lastNumber = parseInt(lastIntID.replace("INT", ""), 10);
          const nextNumber = lastNumber + 1;
          newIntID = `INT${String(nextNumber).padStart(4, "0")}`;
        }

        updatePayload.intID = newIntID;
      }

      await updateDoc(updateRef, updatePayload);
      console.log("Document updated:", docId);

      router.push("/internship");

    } catch (error) {
      console.error("Error updating intern:", error);
    }
  };

  return (
    <section className="bg-white rounded-md my-3">
      <table className="table-fixed w-full">
        <thead>
          <tr className="font-semibold text-gray text-center border-b border-[#D2D2D240]">
            <th className="py-5">Name</th>
            <th className="py-5">Role</th>
            <th className="py-5">Category</th>
            <th className="py-5">Course Content</th>
            <th className="py-5">Email ID</th>
            <th className="py-5">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((intern, index) => (
            <tr
              key={index}
              className="text-center text-sm border-b border-[#D2D2D240]"
            >
              <td className="py-5">{intern.firstName}</td>
              <td className="py-5">{intern.role}</td>
              <td className="py-5">{intern.category}</td>
              <td className="py-5">{intern.courseContent}</td>
              <td className="py-5">{intern.email}</td>
              <td className="center py-5">
                <select
                  className="text-sm px-2 py-1 rounded border bg-white text-gray-700"
                  defaultValue=""
                  onChange={(e) => {
                    const selectedStatus = e.target.value;
                    if (selectedStatus) {
                      onSubmit({
                        firstName: intern.firstName,
                        role: intern.role,
                        category: intern.category,
                        courseContent: intern.courseContent,
                        email: intern.email,
                        status: selectedStatus,
                      });
                    }
                  }}
                >
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default InternStatus;


