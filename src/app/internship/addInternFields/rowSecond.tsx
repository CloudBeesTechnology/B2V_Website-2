import React from "react";
import { useForm } from "react-hook-form";

import FormField from "@/app/utils/formField";
import SelectDropdown from "@/app/utils/selectDropdown";

interface FormProps {
  register: ReturnType<typeof useForm>["register"] | any;
  errors: Record<string, any>;
}

const RowSecond: React.FC<FormProps> = ({ register, errors }) => {
  return (
    <section>
      {/* Dynamic Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-7">
        <FormField
          label="Email"
          name="email"
          type="email"
          register={register}
          errors={errors?.email?.message}
        />

        <FormField
          label="Contact"
          name="contact"
          type="number"
          register={register}
          errors={errors?.contact?.message}
        />
        {/* <div className="center gap-3"> */}
          {/* <FormField
            label="INT ID"
            name="intId"
            type="text"
            register={register}
            errors={errors?.intId?.message}
          /> */}

          <SelectDropdown
            label="Gender"
            name="gender"
            register={register}
            errors={errors?.gender?.message}
            options={["Male", "Female", "Other"]}
          />
        {/* </div> */}
      </div>
    </section>
  );
};

export default RowSecond;
