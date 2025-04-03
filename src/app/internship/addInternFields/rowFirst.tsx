import React from "react";
import { useForm } from "react-hook-form";

import { MdOutlineCancel } from "react-icons/md";

import FormField from "@/app/utils/formField";
import SelectDropdown from "@/app/utils/selectDropdown";

interface FormProps {
  register: ReturnType<typeof useForm>["register"] | any;
  errors: Record<string, any>;
}

const inputFields = [
  { name: "firstName", label: "First Name" },
  { name: "lastName", label: "Last Name" },
  { name: "dateOfBirth", label: "Date of Birth" },
  { name: "email", label: "Email" },
  { name: "contact", label: "Contact" },
  { name: "intId", label: "INT ID" },
  { name: "gender", label: "Gender" },
  { name: "role", label: "Role" },
  { name: "courseContent", label: "Course Content" },
  { name: "dateOfJoining", label: "Date of Joining" },
  { name: "durationStart", label: "Duration Start" },
  { name: "durationEnd", label: "Duration End" },
  { name: "mentor", label: "Mentor" },
];

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
