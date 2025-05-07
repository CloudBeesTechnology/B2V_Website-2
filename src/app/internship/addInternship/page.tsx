"use client";
import {
  InternshipFormData,
  internshipSchema,
} from "@/app/services/validations/InternshipValidation/internValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { MdOutlineCancel } from "react-icons/md";
import RowFirst from "../addInternFields/rowFirst";
import RowSecond from "../addInternFields/rowSecond";
import RowFour from "../addInternFields/rowFour";
import RowThree from "../addInternFields/rowThree";
import { FaArrowLeft } from "react-icons/fa6";
import { useRouter } from "next/navigation";

interface AddInternModalProps {
  onClose: () => void;
}
const AddInternship: React.FC<AddInternModalProps> = ({ onClose }) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InternshipFormData>({
    resolver: zodResolver(internshipSchema),
  });

  const onSubmit = (data: InternshipFormData) => {
    console.log("Form Data:", data);
  };
  return (
    <div className=" flex items-center justify-center">
      <button
        className="text-[#202020] cursor-pointer mb-auto"
        onClick={() => {
          router.back();
        }}
      >
        <FaArrowLeft size={28} />
      </button>
      <div className="bg-white p-20 rounded-xl w-fit">
        <header className="flex justify-between items-center pb-4 ">
          <h2 className="text-xl font-semibold text-[#202020]">
            Add Internship
          </h2>
          <button onClick={onClose} className="text-[#202020] cursor-pointer">
            <MdOutlineCancel size={28} />
          </button>
        </header>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-10  mt-4">
          <RowFirst register={register} errors={errors} />
          <RowSecond register={register} errors={errors} />
          <RowThree register={register} errors={errors} />
          <RowFour register={register} errors={errors} />
          <div className="flex justify-center mt-5">
            <button
              type="submit"
              className="bg-primary text-white px-12 py-2 rounded font-bold"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default AddInternship;
