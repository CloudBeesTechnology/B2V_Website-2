"use client";

import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MdOutlineAddBox } from "react-icons/md";
import { educationSchema } from "@/validation/Schema";
import { useRouter } from "next/navigation";

interface Course {
  course: string;
  academic: string;
}

interface EducationDetails {
  degree: string;
  study: string;
  school: string;
  master: string;
  field: string;
  highSchool: string;
  courses: Course[];
}

export const EducHome = () => {
    const router = useRouter();
  
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<EducationDetails>({
    resolver: zodResolver(educationSchema),
    defaultValues: {
      degree: "",
      study: "",
      school: "",
      master: "",
      field: "",
      highSchool: "",
      courses: [{ course: "", academic: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "courses",
  });

  const onSubmit = (data: EducationDetails) => {
    console.log("Education Data:", data);

    // const personalInfo = localStorage.getItem("personalInfo");
    // const parsedPersonalInfo = personalInfo ? JSON.parse(personalInfo) : {};

    const combinedData = {
      // personalInfo: parsedPersonalInfo,
      ...data,
    };
      localStorage.setItem("educationData", JSON.stringify(combinedData));
      router.push('/employeeDetails?tab=experience');
  };
  

  return (
    <section className="bg-white py-5 px-10 rounded-xl ">
      <div>
        <h3 className="text-gray-700 text-[22px] font-semibold">Education info</h3>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-between my-5">
        <section className="flex flex-col gap-4">
          <div className="flex gap-10 flex-wrap">

            <div className="flex flex-col gap-2 w-[30%]">
              <label htmlFor="degree" className="text-[15px] text-gray-600">
                Bachelor’s degree<sup className="text-red-500">*</sup>
              </label>
              <input
                id="degree"
                {...register("degree")}
                className="border border-[#D9D9D9] px-4 py-1 rounded-sm outline-none"
              />
              {errors.degree && (
                <p className="text-red-500 text-[14px]">{errors.degree.message}</p>
              )}
            </div>

            <div className="flex flex-col gap-2 w-[30%]">
              <label htmlFor="study" className="text-[15px] text-gray-600">
                Field of study<sup className="text-red-500">*</sup>
              </label>
              <input
                id="study"
                {...register("study")}
                className="border border-[#D9D9D9] px-4 py-1 rounded-sm outline-none"
              />
              {errors.study && (
                <p className="text-red-500 text-[14px]">{errors.study.message}</p>
              )}
            </div>

            {/* School */}
            <div className="flex flex-col gap-2 w-[30%]">
              <label htmlFor="school" className="text-[15px] text-gray-600">
                School<sup className="text-red-500">*</sup>
              </label>
              <input
                id="school"
                {...register("school")}
                className="border border-[#D9D9D9] px-4 py-1 rounded-sm outline-none"
              />
              {errors.school && (
                <p className="text-red-500 text-[14px]">{errors.school.message}</p>
              )}
            </div>
          </div>

          {/* Master's and High School */}
          <div className="flex gap-10 flex-wrap mt-5">
            {/* Master’s Degree */}
            <div className="flex flex-col gap-2 w-[30%]">
              <label htmlFor="master" className="text-[15px] text-gray-600">
                Master’s degree<sup className="text-red-500">*</sup>
              </label>
              <input
                id="master"
                {...register("master")}
                className="border border-[#D9D9D9] px-4 py-1 rounded-sm outline-none"
              />
              {errors.master && (
                <p className="text-red-500 text-[14px]">{errors.master.message}</p>
              )}
            </div>

            {/* Master's Field */}
            <div className="flex flex-col gap-2 w-[30%]">
              <label htmlFor="field" className="text-[15px] text-gray-600">
                Field of study<sup className="text-red-500">*</sup>
              </label>
              <input
                id="field"
                {...register("field")}
                className="border border-[#D9D9D9] px-4 py-1 rounded-sm outline-none"
              />
              {errors.field && (
                <p className="text-red-500 text-[14px]">{errors.field.message}</p>
              )}
            </div>

            {/* High School */}
            <div className="flex flex-col gap-2 w-[30%]">
              <label htmlFor="highSchool" className="text-[15px] text-gray-600">
                High School<sup className="text-red-500">*</sup>
              </label>
              <input
                id="highSchool"
                {...register("highSchool")}
                className="border border-[#D9D9D9] px-4 py-1 rounded-sm outline-none"
              />
              {errors.highSchool && (
                <p className="text-red-500 text-[14px]">{errors.highSchool.message}</p>
              )}
            </div>
          </div>
        </section>

        {/* Courses Section */}
        <section className="flex flex-col gap-4 my-10">
          <div className="flex justify-between items-center">
            <h3 className="text-gray-700 text-[22px] font-semibold">Courses</h3>
            <button
              type="button"
              onClick={() => append({ course: "", academic: "" })}
              className="text-lg"
              // title="Add Course"
            >
              <MdOutlineAddBox />
            </button>
          </div>

          {fields.map((field, index) => (
            <div key={field.id} className="flex gap-5 items-start">
              {/* Course Name */}
              <div className="flex flex-col gap-2 w-[30%]">
                <label className="text-[15px] text-gray-600">
                  Course certificate<sup className="text-red-500">*</sup>
                </label>
                <input
                  {...register(`courses.${index}.course` as const)}
                  className="border border-[#D9D9D9] px-4 py-1 rounded-sm outline-none"
                />
                {errors.courses?.[index]?.course && (
                  <p className="text-red-500 text-[14px]">
                    {errors.courses[index]?.course?.message}
                  </p>
                )}
              </div>

              {/* Academic Name */}
              <div className="flex flex-col gap-2 w-[40%]">
                <label className="text-[15px] text-gray-600">
                  Academic name<sup className="text-red-500">*</sup>
                </label>
                <input
                  {...register(`courses.${index}.academic` as const)}
                  className="border border-[#D9D9D9] px-4 py-1 rounded-sm outline-none"
                />
                {errors.courses?.[index]?.academic && (
                  <p className="text-red-500 text-[14px]">
                    {errors.courses[index]?.academic?.message}
                  </p>
                )}
              </div>

              {/* Remove Button */}
              {fields.length > 1 && (
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="text-red-500 text-xl mt-7"
                  // title="Remove Course"
                >
                  ×
                </button>
              )}
            </div>
          ))}

          {/* Submit Button */}
          <div className="mt-10 center">
            <button
              type="submit"
              className="text-[15px] text-white bg-blue-600 hover:bg-blue-700 px-5 py-3 w-[20%] rounded-md"
            >
              Next
            </button>
          </div>
        </section>
      </form>
    </section>
  );
};
