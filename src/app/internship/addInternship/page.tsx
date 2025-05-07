"use client";
import {
  InternshipFormData,
  internshipSchema,
} from "@/app/services/validations/InternshipValidation/internValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import RowFirst from "../addInternFields/rowFirst";
import RowSecond from "../addInternFields/rowSecond";
import RowThree from "../addInternFields/rowThree";
import RowFour from "../addInternFields/rowFour";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs,
  doc,
  updateDoc,
  addDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";

interface AddInternModalProps {
  storedEmpData?: { intID: string }; // Optional prop to update existing intern
}

const AddInternship: React.FC<AddInternModalProps> = ({

  storedEmpData,
}) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InternshipFormData>({
    resolver: zodResolver(internshipSchema),
  });

  const onSubmit = async (data: InternshipFormData) => {
    try {
      const internshipCollection = collection(db, "Internship");

      // if (storedEmpData?.intID) {
      //   const matchQuery = query(
      //     internshipCollection,
      //     where("intID", "==", storedEmpData.intID)
      //   );
      //   const matchSnapshot = await getDocs(matchQuery);

      //   if (!matchSnapshot.empty) {
      //     const docId = matchSnapshot.docs[0].id;
      //     const updateRef = doc(db, "Internship", docId);

      //     await updateDoc(updateRef, {
      //       ...data,
      //       updatedAt: new Date().toISOString(),
      //     });

      //     console.log("Document updated with ID:", docId);
      //     router.push("/internship");
      //     return;
      //   }
      // }

      const newData = {
        ...data,
        status:"Pending",
        role:"Intern",
        createdAt: new Date().toISOString(),
      };

      await addDoc(internshipCollection, newData);
      console.log("Document created with intID:", newData);
      router.push("/internship");
    } catch (error) {
      console.error("Error writing document to Firestore:", error);
    }
  };

  return (
    <div>
      <h1 className="flex gap-2 items-center text-mediumlite_grey text_size_2 my-5">
        <Link href="/internship" className="text-3xl">
          <MdOutlineKeyboardBackspace />
        </Link>
        Internship
      </h1>

      <div className="bg-white py-10 px-10 rounded-xl">
        <header className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-[#202020]">
            Add Internship
          </h2>
        </header>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-10 mt-10">
          <RowFirst register={register} errors={errors} />
          <RowSecond register={register} errors={errors} />
          <RowThree register={register} errors={errors} />
          <RowFour register={register} errors={errors} />
          <div className="flex justify-center mt-5">
            <button
              type="submit"
              className="bg-primary text-white px-12 py-2 rounded font-bold"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddInternship;

// export default function AddInternship(){
// return (
//   <div>
//    Add Internship
//   </div>
// )
// }