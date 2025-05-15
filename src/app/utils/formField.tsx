import React from "react";
import { useForm, UseFormRegister } from "react-hook-form";

interface FormFieldProps {
  label: string;
  name: string;
  type?: string;
  module?: string;
  register: ReturnType<typeof useForm>["register"] | any;
  errors?: string | any;
  placeholder?: string;
  options?: string[]; // for radio/select inputs
  value?: string;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  type = "text",
  module,
  register,
  errors,
  placeholder,
  options = [],
  value,
  
}) => {
  
  return (
    <div className="flex flex-col">
      <label className="text-[#303030] text_size_4 pb-1">{label}</label>


      {/* Radio buttons */}
      {type === "radio" && options.length > 0 ? (
        <div className="flex flex-col gap-2  p-2   ">
          {options.map((option) => {
            console.log(option,name,"role");
            
            return(
            <label
              key={option}
              className="flex items-center justify-between px-2"
            >
              {option}
              <input
                type="radio"   
                value={option}    
                checked={value === option}    
                {...register(name)}
                className="ml-2"
              />
            </label>
          )
          })}
        </div>
      ) : (
        // Default input
        <input
          type={type}
          {...register(name)}
          className="border border-[#E2E2E2] text-[#202020] bg-[#f5f7fb] text_size_4 p-2 rounded outline-none"
          readOnly={module === "user"}
          placeholder={placeholder || `Enter ${label.toLowerCase()}`}
        />
      )}

      {errors && <span className="text-dark_red text-sm pt-1">{errors}</span>}
    </div>
  );
};

export default FormField;
