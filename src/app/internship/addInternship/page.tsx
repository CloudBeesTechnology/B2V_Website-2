"use client";

import {
  InternshipFormData,
  internshipSchema,
} from "@/app/services/validations/InternshipValidation/internValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import RowFirst from "../addInternFields/rowFirst";
import RowSecond from "../addInternFields/rowSecond";
import RowThree from "../addInternFields/rowThree";
import RowFour from "../addInternFields/rowFour";
import { useIntern } from "@/app/utils/InternContext";
import Link from "next/link";
import { MdOutlineKeyboardBackspace } from "react-icons/md";

const AddInternship = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { editIntern, setEditIntern } = useIntern();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InternshipFormData>({
    resolver: zodResolver(internshipSchema),
    defaultValues: editIntern || {},
  });

  useEffect(() => {
    if (editIntern) reset(editIntern);
  }, [editIntern, reset]);

  // const updateUserRole = async (email: string, role: string) => {
  //   try {
  //     const usersRef = collection(db, "users");
  //     const q = query(usersRef, where("email", "==", email));
  //     const querySnapshot = await getDocs(q);

  //     if (!querySnapshot.empty) {
  //       const updatePromises = querySnapshot.docs.map(async (docSnapshot) => {
  //         await updateDoc(docSnapshot.ref, {
  //           role: role
  //         });
  //       });
  //       await Promise.all(updatePromises);
  //     } else {
  //       console.warn(`No user found with email: ${email}`);
  //     }
  //   } catch (error) {
  //     console.error("Error updating user role:", error);
  //     throw error;
  //   }
  // };

  const onSubmit = async (data: InternshipFormData) => {
    setIsSubmitting(true);
    try {
      const internshipCollection = collection(db, "Internship");

      // Update existing intern
      if (editIntern?.intID) {
        const matchQuery = query(
          internshipCollection,
          where("intID", "==", editIntern.intID)
        );
        const matchSnapshot = await getDocs(matchQuery);

        if (!matchSnapshot.empty) {
          const docId = matchSnapshot.docs[0].id;
          const updateRef = doc(db, "Internship", docId);
          await updateDoc(updateRef, {
            ...data,
            updatedAt: new Date().toISOString(),
          });
          
          // // Update user role if email changed
          // if (data.email !== editIntern.email) {
          //   await updateUserRole(data.email, data.role);
          // }
          
          // console.log("Intern updated:", docId);

          // //Users role update in register Table 
          //   await updateUserRole(data.email, data.role);

          setEditIntern(null);
          router.push("/internship");
          return;
        }
      }

      // Create new intern
      let newIntID = "INT0001";
      const latestQuery = query(
        internshipCollection,
        orderBy("intID", "desc"),
        limit(1)
      );
      const latestSnapshot = await getDocs(latestQuery);
      
      if (!latestSnapshot.empty) {
        const lastID = latestSnapshot.docs[0].data().intID;
        const nextNumber = parseInt(lastID.replace("INT", ""), 10) + 1;
        newIntID = `INT${String(nextNumber).padStart(4, "0")}`;
      }

      const newData = {
        ...data,
        intID: newIntID,
        status: "Pending",
        courceStatus: "Pending",
        createdAt: new Date().toISOString(),
      };

      await addDoc(internshipCollection, newData);
      console.log("Intern created:", newIntID);
      
      router.push("/internship");
    } catch (error) {
      console.error("Error saving intern:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="flex gap-2 items-center text-mediumlite_grey text-2xl my-5">
        <Link href="/internship" className="text-3xl hover:text-blue-600 transition-colors">
          <MdOutlineKeyboardBackspace />
        </Link>
        Internship
      </h1>

      <div className="bg-white py-10 px-8 rounded-xl shadow-md">
        <header className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-semibold text-gray-800">
            {editIntern ? "Edit Internship" : "Add Internship"}
          </h2>
        </header>
        
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
          <RowFirst register={register} errors={errors} />
          <RowSecond register={register} errors={errors} />
          <RowThree register={register} errors={errors} />
          <RowFour register={register} errors={errors} />
          
          {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label htmlFor="role" className="block text-gray-700 text-sm font-medium mb-1">
                Role
              </label>
              <select
                {...register("role")}
                className="w-full border border-gray-300 bg-[#f5f7fb] text-gray-800 rounded-md px-3 py-2.5 outline-none "
              >
                <option value="">Select Role</option>
                <option value="Admin">Admin</option>
                <option value="Employee">Employee</option>
                <option value="Lead">Lead</option>
                <option value="Manager">Manager</option>
                <option value="Intern">Intern</option>
              </select>
              {errors.role && (
                <span className="text-red-500 text-xs mt-1">{errors.role.message}</span>
              )}
            </div>
          </div> */}

          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className={`px-6 py-2.5 rounded-md text-white font-medium ${
                isSubmitting 
                  ? "bg-blue-400 cursor-not-allowed" 
                  : "bg-blue-600 hover:bg-blue-700 transition-colors"
              }`}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submiting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddInternship;