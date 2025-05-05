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
  getDoc,
  updateDoc,
  doc,
  where,
} from "firebase/firestore";
import { zodResolver } from "@hookform/resolvers/zod";
import { SuccessPopUp } from "@/components/SuccessPopUp";
import { useEffect, useState } from "react";
import { UseEmployeeList } from "@/app/utils/EmpContext";

interface FamilyDetails {
  father?: string;
  mother?: string;
  siblings?: string;
  personalStatus?: string;
  husbandName?: string;
  wifeName?: string;
  child?: string;
  familyPNo?: string;
  familyAddress?: string;
}

export const FamilyHome = () => {
  const [popup, setPopup] = useState(false);
  const { storedEmpData, handleStoredData } = UseEmployeeList();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FamilyDetails>({
    resolver: zodResolver(familySchema),
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
      if (storedEmpData?.empID) {
        const allEmpData = query(
          collection(db, "employeeDetails"),
          where("empID", "==", storedEmpData.empID)
        );

        const allQuerySnapShot = await getDocs(allEmpData);

        if (!allQuerySnapShot.empty) {
          const combinedData = {
            ...parsedExperienceData,
            ...parsedPersonalInfo,
            ...parsedEducationInfo,
            ...data,
          };
          // console.log(allQuerySnapShot.docs[0].id);

          const updatedocRef = doc(
            db,
            "employeeDetails",
            allQuerySnapShot.docs[0].id
          );
          const finalResult = await updateDoc(updatedocRef, combinedData);
        }
      } else {
        // console.log("not match");

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
        // console.log(combinedData);

        const docRef = await addDoc(
          collection(db, "employeeDetails"),
          combinedData
        );
        // // console.log("Data successfully written with ID:", docRef.id);
      }

      handleStoredData("");
      localStorage.removeItem("experienceData");
      localStorage.removeItem("personalInfo");
      localStorage.removeItem("educationData");
      setPopup(true);
    } catch (error) {
      console.error("Error writing document to Firestore:", error);
    }
  };
  useEffect(() => {
    if (storedEmpData) {
      reset({
        father: storedEmpData.father || "",
        mother: storedEmpData.mother || "",
        siblings: storedEmpData.siblings || "",
        personalStatus: storedEmpData.personalStatus || "",
        husbandName: storedEmpData.husbandName || "",
        wifeName: storedEmpData.wifeName || "",
        child: storedEmpData.child || "",
        familyPNo: storedEmpData.familyPNo || "",
        familyAddress: storedEmpData.familyAddress || "",
      });
    }
  }, [storedEmpData, reset]);
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
              <label htmlFor="status" className="text-[15px] text-gray">
                Status
              </label>
              <div className="border border-[#D9D9D9] px-4 py-1 rounded-sm">
                <select
                  className="w-full outline-none"
                  {...register("personalStatus")}
                >
                  <option></option>
                  <option>Single</option>
                  <option>Married</option>
                  <option>Divorce</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="husbandName" className="text-[15px] text-gray">
                Husband Name
              </label>
              <div className="border border-[#D9D9D9] px-4 py-1 rounded-sm">
                <input
                  id=" husbandName"
                  {...register("husbandName")}
                  className="outline-none py-1 w-full"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="wifeName" className="text-[15px] text-gray">
                Wife Name
              </label>
              <div className="border border-[#D9D9D9] px-4 py-1 rounded-sm">
                <input
                  id="wifeName"
                  {...register("wifeName")}
                  className="outline-none py-1 w-full"
                />
              </div>
            </div>
          </div>

          <div className=" grid grid-cols-3 gap-10 mt-5">
            <div className="flex flex-col gap-2">
              <label htmlFor="child" className="text-[15px] text-gray">
                Children
              </label>
              <div className="border border-[#D9D9D9] px-4 py-1 rounded-sm">
                <input
                  id="child"
                  {...register("child")}
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
              {...register("familyAddress")}
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
      {popup && <SuccessPopUp />}
    </section>
  );
};
