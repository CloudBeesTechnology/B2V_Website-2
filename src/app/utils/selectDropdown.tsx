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
      <label className="text-[#7E7D7D] text_size_5">{label}</label>
      <select
        {...register(name)}
        className="border border-[#9D9393] text-[#202020] text_size_5  p-2 rounded outline-none"
      >
        <option value="">Select {label}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {errors && <span className="text-dark_red text-xs">{errors}</span>}
    </div>
  );
};

export default SelectDropdown;
