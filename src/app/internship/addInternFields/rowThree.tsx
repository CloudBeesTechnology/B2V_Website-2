import React from "react";
import { useForm } from "react-hook-form";

import FormField from "@/app/utils/formField";
import SelectDropdown from "@/app/utils/selectDropdown";

interface FormProps {
  register: ReturnType<typeof useForm>["register"] | any;
  errors: Record<string, any>;
}

const RowThree: React.FC<FormProps> = ({ register, errors }) => {
  return (
    <section>
      {/* Dynamic Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
        
        <SelectDropdown
          label="Category"
          name="category"
          register={register}
          errors={errors?.category?.message}
          options={[
             "Mobile Developer",
             "Web Developer",
             "Digital Marketing",
             "UI/UX",
             "Flutter",
             "Cloud",
             "Backend Develope",
             "Data Scientist",
          ]}
        />

        <SelectDropdown
          label="Course Content"
          name="courseContent"
          register={register}
          errors={errors?.courseContent?.message}
          options={["Basic", "intermediate", "Advance"]}
        />

        <FormField
          label="Date of Joining"
          name="doj"
          type="date"
          register={register}
          errors={errors?.doj?.message}
        />
      </div>
    </section>
  );
};

export default RowThree;
