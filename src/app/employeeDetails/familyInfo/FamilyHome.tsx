"use client";
import { useForm } from "react-hook-form";
import { familySchema } from "@/validation/Schema"; // Make sure this schema is defined
import { db } from "@/lib/firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  limit,
} from "firebase/firestore";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";


interface FamilyDetails {
  father?: string;
  mother?: string;
  siblings?: string;
  fatherOcc?: string;
  motherOcc?: string;
  familyPNo?: string;
  address?: string;
}

export const FamilyHome = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FamilyDetails>({
    resolver:  zodResolver(familySchema),
  });

  const onSubmit = async (data: FamilyDetails) => {
    try {
      const isBrowser = typeof window !== "undefined";

      const experienceData = isBrowser
        ? localStorage.getItem("experienceData")
        : null;
      const personalInfo = isBrowser
        ? localStorage.getItem("personalInfo")
        : null;
      const educationInfo = isBrowser
        ? localStorage.getItem("educationData")
        : null;

      const parsedExperienceData = experienceData
        ? JSON.parse(experienceData)
        : {};
      const parsedPersonalInfo = personalInfo ? JSON.parse(personalInfo) : {};
      const parsedEducationInfo = educationInfo
        ? JSON.parse(educationInfo)
        : {};

      const empQuery = query(
        collection(db, "employeeDetails"),
        orderBy("empID", "desc"),
        limit(1)
      );

      const querySnapshot = await getDocs(empQuery);

      let newEmpID = "CBT0001";
      if (!querySnapshot.empty) {
        const lastEmpID = querySnapshot.docs[0].data().empID;
        const lastNumber = parseInt(lastEmpID.replace("CBT", ""), 10);
        const nextNumber = lastNumber + 1;
        newEmpID = `CBT${String(nextNumber).padStart(4, "0")}`;
      }

      const combinedData = {
        ...parsedExperienceData,
        ...parsedPersonalInfo,
        ...parsedEducationInfo,
        ...data,
        empID: newEmpID,
        createdAt: new Date().toISOString(),
      };

      const docRef = await addDoc(
        collection(db, "employeeDetails"),
        combinedData
      );
      // console.log("Data successfully written with ID:", docRef.id);

      localStorage.removeItem("experienceData");
      localStorage.removeItem("personalInfo");
      localStorage.removeItem("educationData");

      router.push("/employee");
    } catch (error) {
      console.error("Error writing document to Firestore:", error);
    }
  };
  return (
    <section className="bg-white py-5 px-10 rounded-xl">
      <div>
        <h3 className="text-mediumlite_grey text-[22px]">Family Details</h3>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-between my-5"
      >
        <section className="flex flex-col gap-4">
          <div className=" grid grid-cols-3 gap-10">
            <div className="flex flex-col gap-2">
              <label htmlFor="father" className="text-[15px] text-gray">
                Father Name 
              </label>
              <div className="border border-[#D9D9D9] px-4 py-1 rounded-sm">
                <input
                  id="father"
                  {...register("father")}
                  className="outline-none py-1 w-full"
                />
              </div>
       
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="mother" className="text-[15px] text-gray">
                Mother Name 
              </label>
              <div className="border border-[#D9D9D9] px-4 py-1 rounded-sm">
                <input
                  id="mother"
                  {...register("mother")}
                  className="outline-none py-1 w-full"
                />
              </div>
       
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="siblings" className="text-[15px] text-gray">
                Siblings 
              </label>
              <div className="border border-[#D9D9D9] px-4 py-1 rounded-sm">
                <input
                  id="siblings"
                  {...register("siblings")}
                  className="outline-none py-1 w-full"
                />
              </div>
              
            </div>
          </div>

          <div className=" grid grid-cols-3 gap-10 mt-5">
            <div className="flex flex-col gap-2">
              <label htmlFor="fatherOcc" className="text-[15px] text-gray">
                Father Occupation 
              </label>
              <div className="border border-[#D9D9D9] px-4 py-1 rounded-sm">
                <input
                  id="fatherOcc"
                  {...register("fatherOcc")}
                  className="outline-none py-1 w-full"
                />
              </div>
            
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="motherOcc" className="text-[15px] text-gray">
                Mother Occupation 
              </label>
              <div className="border border-[#D9D9D9] px-4 py-1 rounded-sm">
                <input
                  id="motherocc"
                  {...register("motherOcc")}
                  className="outline-none py-1 w-full"
                />
              </div>
        
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="familyPNo" className="text-[15px] text-gray">
                Family Contact Number
              </label>
              <div className="border border-[#D9D9D9] px-4 py-1 rounded-sm">
                <input
                  id="familyPNo"
                  {...register("familyPNo")}
                  className="outline-none py-1 w-full"
                />
              </div>
           
            </div>
          </div>

          <div className="flex flex-col mt-5 gap-2">
            <label htmlFor="address" className="text-[15px] text-gray">
              Address 
            </label>
            <textarea
              id="address"
              {...register("address")}
              rows={4}
              className="border p-2 border-[#D9D9D9] outline-none rounded-sm resize-none"
            ></textarea>
      
          </div>

          <div className="mb-20 pt-10 center">
            <button
              type="submit"
              className="text-[15px] text-white bg-primary px-5 py-3 w-[20%] rounded-md"
            >
              Save
            </button>
          </div>
        </section>
      </form>
    </section>
  );
};
