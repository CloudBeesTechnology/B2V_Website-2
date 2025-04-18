'use client';

import { useForm, useFieldArray } from "react-hook-form";
import { MdOutlineAddBox } from "react-icons/md";
import { experienceSchema } from "@/validation/Schema"
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

interface Experience {
  year: string;
  company: string;
  work: string;
  manager: string;
  dept: string;
  location: string;
}
interface ExperienceDetails {
  experiences: Experience[];
}

export const ExperienceHome = () => {
      const router = useRouter();
  
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ExperienceDetails>({
    resolver: zodResolver(experienceSchema),
    defaultValues: {
      experiences: [{  
        year:"", 
        company: "",
        work: "",
        manager: "",
        dept: "",
        location: "", }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "experiences",
  });
  
  const onSubmit = (data: ExperienceDetails) => {
    console.log("Experience Data:", data);
    // const educationInfo = localStorage.getItem("educationData");
    // const parsedEducationInfo = educationInfo ? JSON.parse(educationInfo) : {};

    const combinedData = {
      // educationInfo: parsedEducationInfo,
      ...data,
    };
      localStorage.setItem("experienceData", JSON.stringify(combinedData));
      router.push('/employeeDetails?tab=educationInfo');

  }; 
  
  return (
    <section className="bg-white py-5 px-10 rounded-xl">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col  w-full justify-between ">
      <div className="flex justify-between items-center my-5">
        <h3 className="text-mediumlite_grey text-[22px]">Experience</h3>
             <button
                      type="button"
                      onClick={() => append({ 
                        year:"", 
                        company: "",
                        work: "",
                        manager: "",
                        dept: "",
                        location: "", })}
                      className="text-lg"
                      // title="Add Experiences"
                    >
                      <MdOutlineAddBox />
                    </button>
      </div>
      {fields.map((field, index) => (
        <section key={field.id} className="flex w-full flex-col gap-4 my-5 relative ">
          <div className="grid grid-cols-3 gap-10  ">
            <div className="flex flex-col gap-2">
              <label htmlFor="year" className="text-[15px] text-gray ">
                No of years experience<sup className="text-red">*</sup>
              </label>
              <div className="border border-[#D9D9D9] px-4 py-1 rounded-sm">
                <input id="year" {...register(`experiences.${index}.year` as const)} className="outline-none py-1 w-full" />
              </div>
              {errors.experiences?.[index]?.year && (
                <p className="text-red-500 text-[14px] mt-1">{errors.experiences?.[index]?.year?.message}</p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="company" className="text-[15px] text-gray ">
                Company Name <sup className="text-red">*</sup>
              </label>
              <div className="border border-[#D9D9D9] px-4 py-1 rounded-sm">
                <input id="company" {...register(`experiences.${index}.company` as const)} className="outline-none py-1 w-full" />
              </div>
              {errors.experiences?.[index]?.company && (
                <p className="text-red-500 text-[14px] mt-1">{errors.experiences?.[index]?.company?.message}</p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="work" className="text-[15px] text-gray ">
                Work type<sup className="text-red">*</sup>
              </label>
              <div className="border border-[#D9D9D9] px-4 py-1 rounded-sm">
                <input id="work" {...register(`experiences.${index}.work` as const)} className="outline-none py-1 w-full" />
              </div>
              {errors.experiences?.[index]?.work && (
                <p className="text-red-500 text-[14px] mt-1">{errors.experiences?.[index]?.work?.message}</p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-10 mt-5 pr-20">
            <div className="flex flex-col gap-2 ">
              <label htmlFor="manager" className="text-[15px] text-gray ">
                Manager <sup className="text-red">*</sup>
              </label>
              <div className="border border-[#D9D9D9] px-4 py-1 rounded-sm">
                <input id="manager" {...register(`experiences.${index}.manager` as const)} className="outline-none py-1 w-full" />
              </div>
              {errors.experiences?.[index]?.manager && (
                <p className="text-red-500 text-[14px] mt-1">{errors.experiences?.[index]?.manager?.message}</p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="dept" className="text-[15px] text-gray ">
                Department<sup className="text-red">*</sup>
              </label>
              <div className="border border-[#D9D9D9] px-4 py-1 rounded-sm">
                <input id="dept" {...register(`experiences.${index}.dept` as const)} className="outline-none py-1 w-full" />
              </div>
              {errors.experiences?.[index]?.dept && (
                <p className="text-red-500 text-[14px] mt-1">{errors.experiences?.[index]?.dept?.message}</p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="location" className="text-[15px] text-gray ">
                Work location<sup className="text-red">*</sup>
              </label>
              <div className="border border-[#D9D9D9] px-4 py-1 rounded-sm">
                <input id="location" {...register(`experiences.${index}.location` as const)} className="outline-none py-1 w-full" />
              </div>
              {errors.experiences?.[index]?.location && (
                <p className="text-red-500 text-[14px] mt-1">{errors.experiences?.[index]?.location?.message}</p>
              )}
            </div>
          </div>
          {/* Remove Button */}
          {fields.length > 1 && (
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="text-red-500 text-[30px] font-medium  mt-7 absolute right-5  bottom-1 "
                  // title="Remove Experiences"
                >
                  ×
                </button>
              )}
        </section>
        ))}
         <div className="mb-20 pt-10 center">
            <button type="submit" className="text-[15px] text-white bg-primary px-5 py-3 w-[20%] rounded-md">
              Next
            </button>
          </div>
      </form>
    </section>
  );
};
