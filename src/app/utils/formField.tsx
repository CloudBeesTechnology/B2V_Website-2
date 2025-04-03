import React from "react";
import { useForm, UseFormRegister } from "react-hook-form";

interface FormFieldProps {
  label: string;
  name: string;
  type?: string;
  register: ReturnType<typeof useForm>["register"];
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
      <label className="text-[#7E7D7D] text_size_5">{label}</label>
      <input
        type={type}
        {...register(name)}
        className="border border-[#9D9393] text-[#202020]  text_size_5 p-2 rounded outline-none"
        placeholder={`Enter ${label.toLowerCase()}`}
      />
      {errors && <span className="text-dark_red text-xs">{errors}</span>}
    </div>
  );
};

export default FormField;
