import React from "react";
import { UseFormRegister } from "react-hook-form";

interface SelectDropdownProps {
  label: string;
  name: string;
  options: string[];
  register: UseFormRegister<any>;
  errors?: string;
}

const SelectDropdown: React.FC<SelectDropdownProps> = ({
  label,
  name,
  options,
  register,
  errors,
}) => {
  return (
    <div className="flex flex-col ">
      <label className="text-[#303030] text_size_4">{label}</label>
      <select
        {...register(name)}
        className="border border-[#E2E2E2] bg-[#f5f7fb] text-[#202020] text_size_5 mt-auto px-2 py-2.5  rounded-md outline-none"
      >
        <option value="">Select {label}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {errors && <span className="text-dark_red text-xs pt-1">{errors}</span>}
    </div>
  );
};

export default SelectDropdown;
