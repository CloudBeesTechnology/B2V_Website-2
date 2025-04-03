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

const RowSecond: React.FC<FormProps> = ({ register, errors }) => {
  return (
    <section>
      {/* Dynamic Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-7">
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

        <FormField
          label="INT ID"
          name="intId"
          type="text"
          register={register}
          errors={errors?.intId?.message}
        />

        <SelectDropdown
          label="Gender"
          name="gender"
          register={register}
          errors={errors?.gender?.message}
          options={["Male", "Female", "Other"]}
        />
      </div>
    </section>
  );
};

export default RowSecond;
