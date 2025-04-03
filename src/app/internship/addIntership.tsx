import { useForm } from "react-hook-form";
import {
  InternshipFormData,
  internshipSchema,
} from "../services/validations/InternshipValidation/internValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import RowFirst from "./addInternFields/rowFirst";
import { MdOutlineCancel } from "react-icons/md";
import RowSecond from "./addInternFields/rowSecond";
import RowThree from "./addInternFields/rowThree";
import RowFour from "./addInternFields/rowFour";

interface AddInternModalProps {
  onClose: () => void;
}
const AddInternship: React.FC<AddInternModalProps> = ({ onClose }) => {
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
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 ">
      <div className="bg-white p-20 rounded-xl w-full max-w-6xl ">
        <header className="flex justify-between items-center pb-4 ">
          <h2 className="text-xl font-semibold text-[#202020]">
            Add Internship
          </h2>
          <button onClick={onClose} className="text-[#202020] cursor-pointer">
            <MdOutlineCancel size={28} />
          </button>
        </header>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-15  mt-4">
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
