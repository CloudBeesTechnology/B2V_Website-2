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
    </section>
  );
};

export default RowFour;
