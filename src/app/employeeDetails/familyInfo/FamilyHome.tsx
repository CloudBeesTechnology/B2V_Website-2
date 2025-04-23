"use client"
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
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

interface FamilyDetails {
  father: string;
  mother: string;
  siblings: string;
  fatherOcc: string;
  motherocc: string;
  homeNumber: string;
  address: string;
}

export const FamilyHome = () => {


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FamilyDetails>({
    resolver: yupResolver(familySchema),
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
      console.log("Data successfully written with ID:", docRef.id);

      localStorage.removeItem("experienceData");
      localStorage.removeItem("personalInfo");
      localStorage.removeItem("educationData");

      // router.push("/employee"); // Uncomment if you want to redirect
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
                Father Name <sup className="text-red">*</sup>
              </label>
              <div className="border border-[#D9D9D9] px-4 py-1 rounded-sm">
                <input
                  id="father"
                  {...register("father")}
                  className="outline-none py-1 w-full"
                />
              </div>
              {errors.father && (
                <p className="text-red-500 text-[14px] mt-1">
                  {errors.father.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="mother" className="text-[15px] text-gray">
                Mother Name <sup className="text-red">*</sup>
              </label>
              <div className="border border-[#D9D9D9] px-4 py-1 rounded-sm">
                <input
                  id="mother"
                  {...register("mother")}
                  className="outline-none py-1 w-full"
                />
              </div>
              {errors.mother && (
                <p className="text-red-500 text-[14px] mt-1">
                  {errors.mother.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="siblings" className="text-[15px] text-gray">
                Siblings <sup className="text-red">*</sup>
              </label>
              <div className="border border-[#D9D9D9] px-4 py-1 rounded-sm">
                <input
                  id="siblings"
                  {...register("siblings")}
                  className="outline-none py-1 w-full"
                />
              </div>
              {errors.siblings && (
                <p className="text-red-500 text-[14px] mt-1">
                  {errors.siblings.message}
                </p>
              )}
            </div>
          </div>

          <div className=" grid grid-cols-3 gap-10 mt-5">
            <div className="flex flex-col gap-2">
              <label htmlFor="fatherOcc" className="text-[15px] text-gray">
                Father Occupation <sup className="text-red">*</sup>
              </label>
              <div className="border border-[#D9D9D9] px-4 py-1 rounded-sm">
                <input
                  id="fatherOcc"
                  {...register("fatherOcc")}
                  className="outline-none py-1 w-full"
                />
              </div>
              {errors.fatherOcc && (
                <p className="text-red-500 text-[14px] mt-1">
                  {errors.fatherOcc.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="motherocc" className="text-[15px] text-gray">
                Mother Occupation <sup className="text-red">*</sup>
              </label>
              <div className="border border-[#D9D9D9] px-4 py-1 rounded-sm">
                <input
                  id="motherocc"
                  {...register("motherocc")}
                  className="outline-none py-1 w-full"
                />
              </div>
              {errors.motherocc && (
                <p className="text-red-500 text-[14px] mt-1">
                  {errors.motherocc.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="homeNumber" className="text-[15px] text-gray">
                Contact Number <sup className="text-red">*</sup>
              </label>
              <div className="border border-[#D9D9D9] px-4 py-1 rounded-sm">
                <input
                  id="homeNumber"
                  {...register("homeNumber")}
                  className="outline-none py-1 w-full"
                />
              </div>
              {errors.homeNumber && (
                <p className="text-red-500 text-[14px] mt-1">
                  {errors.homeNumber.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col mt-5 w-[73%] gap-2">
            <label htmlFor="address" className="text-[15px] text-gray">
              Address <sup className="text-red">*</sup>
            </label>
            <textarea
              id="address"
              {...register("address")}
              rows={4}
              className="border p-2 border-[#D9D9D9] outline-none rounded-sm resize-none"
            ></textarea>
            {errors.address && (
              <p className="text-red-500 text-[14px] mt-1">
                {errors.address.message}
              </p>
            )}
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
