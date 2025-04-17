"use client";
import {
  AddUserFormData,
  addUserSchema,
} from "@/app/services/validations/adminPortalValidation/userValidation";
import FormField from "@/app/utils/formField";
import Searchbox from "@/app/utils/searchbox";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { IoArrowBack } from "react-icons/io5";
import SetPermissionBox from "./setPermission";
import { useState } from "react";

const AddNewUser: React.FC = () => {
  const [selectedModules, setSelectedModules] = useState<{
    [module: string]: string[];
  }>({});

  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddUserFormData>({
    resolver: yupResolver(addUserSchema),
  });

  const onSubmit = (data: AddUserFormData) => {
    let finalData = {
      ...data,
      permission: JSON.stringify(selectedModules),
    };

    console.log("finalData : ", finalData);
  };

  const router = useRouter();
  return (
    <main>
      <section className="flex justify-between items-center my-10 ">
        <IoArrowBack
          onClick={() => router.back()}
          className="text-[22px] text-gray cursor-pointer"
        />
        <h2 className="text-2xl font-semibold">ADD NEW USER</h2>
        <Searchbox />
      </section>
      <section className=" w-full center rounded-xl bg-white my-10">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full m-15 ">
          <div className="grid grid-cols-1 sm:grid-cols-2  gap-10">
            <FormField
              label="Name"
              name="name"
              type="text"
              register={register}
              errors={errors?.name?.message}
            />
            <FormField
              label="Employee Id"
              name="empId"
              type="text"
              register={register}
              errors={errors?.empId?.message}
            />
            <FormField
              label="Phone Number"
              name="phone"
              type="text"
              register={register}
              errors={errors?.phone?.message}
            />
            <FormField
              label="Email Id"
              name="email"
              type="text"
              register={register}
              errors={errors?.email?.message}
            />
            <FormField
              label="Position"
              name="position"
              type="text"
              register={register}
              errors={errors?.position?.message}
            />
            <FormField
              label="Department"
              name="department"
              type="text"
              register={register}
              errors={errors?.department?.message}
            />

            <SetPermissionBox
              selectedModules={selectedModules}
              setSelectedModules={setSelectedModules}
            />
          </div>

          <div className="center mt-10">
            <button
              type="submit"
              className="text-center text_size_3  px-8 py-2 bg-primary text-white rounded"
            >
              SAVE
            </button>
          </div>
        </form>
      </section>
    </main>
  );
};
export default AddNewUser;
