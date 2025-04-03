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
        <FormField
          label="Role"
          name="role"
          type="text"
          register={register}
          errors={errors?.role?.message}
        />

        <SelectDropdown
          label="Course Content"
          name="courseContent"
          register={register}
          errors={errors?.courseContent?.message}
          options={["Javascript", "React js", "Node js", "Express js"]}
        />

        <FormField
          label="Date of Joining"
          name="dateOfJoining"
          type="date"
          register={register}
          errors={errors?.dateOfJoining?.message}
        />
      </div>
    </section>
  );
};

export default RowThree;
