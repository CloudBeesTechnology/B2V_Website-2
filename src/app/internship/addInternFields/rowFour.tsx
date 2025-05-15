import React from "react";
import { useForm } from "react-hook-form";



import FormField from "@/app/utils/formField";
import SelectDropdown from "@/app/utils/selectDropdown";

interface FormProps {
  register: ReturnType<typeof useForm>["register"] | any;
  errors: Record<string, any>;
}



const RowFour: React.FC<FormProps> = ({ register, errors }) => {
  return (
    <section>
      {/* Dynamic Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
        <FormField
          label="Duration Start"
          name="durationStart"
          type="date"
          register={register}
          errors={errors?.durationStart?.message}
        />

        <FormField
          label="Duration End"
          name="durationEnd"
          type="date"
          register={register}
          errors={errors?.durationEnd?.message}
        />

        <SelectDropdown
          label="Mentor"
          name="mentor"
          register={register}
          errors={errors?.mentor?.message}
          options={["Mentor 1", "Mentor 2", "Mentor 3"]}
        />
      </div>
      <div className="flex flex-col gap-2 mt-7 ">
                <label htmlFor="address" className="text-[#303030] text_size_4 pb-1">
                  Address 
                </label>
                <div className="border border-[#E2E2E2] text-[#202020] bg-[#f5f7fb] text_size_4 p-2 rounded outline-none">
                  <textarea
                    id="address"
                   {...register("address")}
                   rows={2}
                     className="outline-none py-1 w-full"
                  />
                </div>
             
              </div>
    </section>
  );
};

export default RowFour;
