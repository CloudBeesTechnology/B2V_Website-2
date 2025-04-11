import React from "react";
import { useForm } from "react-hook-form";

import FormField from "@/app/utils/formField";

interface FormProps {
  register: ReturnType<typeof useForm>["register"] | any;
  errors: Record<string, any>;
}

const RowFirst: React.FC<FormProps> = ({ register, errors }) => {
  return (
    <section>
      {/* Dynamic Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
        <FormField
          label="First Name"
          name="firstName"
          type="text"
          register={register}
          errors={errors?.firstName?.message}
        />

        <FormField
          label="Last Name"
          name="lastName"
          type="text"
          register={register}
          errors={errors?.lastName?.message}
        />

        <FormField
          label="Date of Birth"
          name="dateOfBirth"
          type="date"
          register={register}
          errors={errors?.dateOfBirth?.message}
        />
      </div>
    </section>
  );
};

export default RowFirst;
