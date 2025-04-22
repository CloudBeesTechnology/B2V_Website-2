import React from "react";
import { useForm, UseFormRegister } from "react-hook-form";

interface FormFieldProps {
  label: string;
  name: string;
  type?: string;
  register: ReturnType<typeof useForm>["register"] | any;
  errors?: string | any;
  placeholder?: string;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  type,
  register,
  errors,
}) => {
  return (
    <div className="flex flex-col ">
      <label className="text-[#303030] text_size_4 pb-1">{label}</label>
      <input
        type={type}
        {...register(name)}
        className="border border-[#E2E2E2] text-[#202020] bg-[#f5f7fb] text_size_4 p-2 rounded outline-none "
        readOnly
        // placeholder={`Enter ${label.toLowerCase()}`}
      />
      {errors && <span className="text-dark_red text-sm pt-1">{errors}</span>}
    </div>
  );
};

export default FormField;
