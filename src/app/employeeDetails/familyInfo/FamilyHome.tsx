import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { familySchema } from "@/validation/Schema"; // Make sure this schema is defined

interface FamilyDetails {
  father: string;
  mother: string;
  siblings: string;
  fatherOcc: string;
  motherocc: string;
  contactNO: string;
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
    console.log("Family Data:", data);
    localStorage.setItem("familyData", JSON.stringify(data));
  };

  return (
    <section className="bg-white py-5 px-10 rounded-xl">
      <div>
        <h3 className="text-mediumlite_grey text-[22px]">Family Details</h3>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-between my-5">
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
                <p className="text-red-500 text-[14px] mt-1">{errors.father.message}</p>
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
                <p className="text-red-500 text-[14px] mt-1">{errors.mother.message}</p>
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
                <p className="text-red-500 text-[14px] mt-1">{errors.siblings.message}</p>
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
                <p className="text-red-500 text-[14px] mt-1">{errors.fatherOcc.message}</p>
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
                <p className="text-red-500 text-[14px] mt-1">{errors.motherocc.message}</p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="contactNO" className="text-[15px] text-gray">
                Contact Number <sup className="text-red">*</sup>
              </label>
              <div className="border border-[#D9D9D9] px-4 py-1 rounded-sm">
                <input
                  id="contactNO"
                  {...register("contactNO")}
                  className="outline-none py-1 w-full"
                />
              </div>
              {errors.contactNO && (
                <p className="text-red-500 text-[14px] mt-1">{errors.contactNO.message}</p>
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
              <p className="text-red-500 text-[14px] mt-1">{errors.address.message}</p>
            )}
          </div>

          <div className="mb-20 pt-10 center">
            <button type="submit" className="text-[15px] text-white bg-primary px-5 py-3 w-[20%] rounded-md">
              Save
            </button>
          </div>
        </section>
      </form>
    </section>
  );
};
