import { LeaveFormData } from "@/app/services/validations/empPortalValidation/applyLeaveValitaion";
import {
  UseFormRegister,
  FieldErrors,
  UseFormHandleSubmit,
} from "react-hook-form";


// ✅ Define Props Type
interface Props {
  register: UseFormRegister<LeaveFormData>;
  handleSubmit: UseFormHandleSubmit<LeaveFormData>;
  errors: FieldErrors<LeaveFormData>;
  onSubmit: (data: LeaveFormData) => void;
}

const EmpApplyLeaveTable: React.FC<Props> = ({
  register,
  handleSubmit,
  errors,
  onSubmit,
}) => {
  return (
    <section className="mt-10">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-white border-[#D7D5D5] rounded-md border">
          <table className="w-full py-2">
            <thead className="border-b border-[#D7D5D5]">
              <tr className="text_size_4 text-gray">
                <th className="py-3 rounded-tl-md">Leave Type</th>
                <th className="py-3">Start Date</th>
                <th className="py-3">End Date</th>
                <th className="py-3 rounded-tr-md">Leave Reason</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="align-text-top text-center py-3 ">
                  <select
                    {...register("leaveType")}
                    className="rounded-md px-2 py-2 border border-lite_gray shadow-md outline-none "
                  >
                    <option value="">Select Leave</option>
                    <option value="casual">Casual Leave</option>
                    <option value="sick">Sick Leave</option>
                    <option value="maternity">Maternity Leave</option>
                    <option value="other">Other</option>
                  </select>

                  {errors.leaveType && (
                    <p className="text-dark_red text-sm py-1">
                      {errors.leaveType.message}
                    </p>
                  )}
                </td>
                <td className="align-text-top text-center py-3 ">
                  <input
                    type="date"
                    {...register("startDate")}
                    className="border border-lite_gray rounded-md px-2 py-2 shadow-md outline-none"
                  />
                  {errors.startDate && (
                    <p className="text-dark_red text-sm py-1">
                      {errors.startDate.message}
                    </p>
                  )}
                </td>
                <td className="align-text-top text-center py-3">
                  <input
                    type="date"
                    {...register("endDate")}
                    className="border border-lite_gray rounded-md px-2 py-2 shadow-md outline-none"
                  />
                  {errors.endDate && (
                    <p className="text-dark_red text-sm py-1">
                      {errors.endDate.message}
                    </p>
                  )}
                </td>
                <td className=" align-text-top  text-center py-3">
                  <input
                    type="text"
                    {...register("leaveReason")}
                    placeholder="Reason"
                    className="border border-lite_gray rounded-md px-2 py-2 shadow-md outline-none"
                  />
                  {errors.leaveReason && (
                    <p className="text-medium_red text-sm py-1">
                      {errors.leaveReason.message}
                    </p>
                  )}
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={4} className="text-end">
                  <div className="flex justify-end p-5">
                    <button
                      type="submit"
                      className="rounded-xl border-2 px-4 py-2 border-[#1C40AE] text-[#1C40AE] cursor-pointer"
                    >
                      Submit
                    </button>
                  </div>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </form>
    </section>
  );
};

export default EmpApplyLeaveTable;
