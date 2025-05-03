import { IoMdCloseCircle } from "react-icons/io";
import { DateFormat } from "./DateFormate";
import clsx from "clsx";

interface leaveStatus {
  empID: string;
  name: string;
  department: string;
  [key: string]: any;
}
interface UserAcess {
  userAcess: string | null;
}
interface TableProps {
  leaveData?: leaveStatus;
  close?: () => void;
  userAcess?: UserAcess;
}

export const ViewLeaveStatus = ({
  leaveData,
  close,
  userAcess,
}: TableProps) => {
  return (
    <section className="fixed inset-0 w-full bg-[#07060788] z-[99999] flex items-center justify-center">
      {" "}
      <div className="relative max-w-xl w-full max-h-[90vh] overflow-hidden bg-white rounded-lg shadow-lg">
        {/* Close Button */}

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-6 max-h-[85vh]  border">
          <div className="relative">
            <h1 className="text_size_2 text-center text-gray my-5">
              Leave Application Form
            </h1>
            <button
              onClick={close}
              className="absolute right-0 top-0 text-gray hover:text-black"
            >
              <IoMdCloseCircle className="text-3xl" />
            </button>
          </div>

          <div className="center flex-col gap-3 text-gray">
            <p className="flex w-[90%]">
              <span className="font-semibold flex-1">Name</span> :{" "}
              <span className="flex-1 pl-2">{leaveData?.name || "N/A"}</span>
            </p>
            <p className="flex w-[90%]">
              <span className="font-semibold flex-1">EmpID</span> :{" "}
              <span className="flex-1 pl-2">{leaveData?.empID || "N/A"}</span>
            </p>
            <p className="flex w-[90%]">
              <span className="font-semibold flex-1">Department</span> :{" "}
              <span className="flex-1 pl-2">
                {leaveData?.department || "N/A"}
              </span>
            </p>
            <p className="flex w-[90%]">
              <span className="font-semibold flex-1">Leave Type</span> :{" "}
              <span className="flex-1 pl-2">
                {leaveData?.leaveType || "N/A"}
              </span>
            </p>
            <p className="flex w-[90%]">
              <span className="font-semibold flex-1">Applied Dates</span> :{" "}
              <span className="flex-1 pl-2">
                {DateFormat(leaveData?.startDate) || "N/A"} to{" "}
                {DateFormat(leaveData?.endDate) || "N/A"}
              </span>
            </p>
            <p className="flex w-[90%]">
              <span className="font-semibold flex-1">Durations</span> :{" "}
              <span className="flex-1 pl-2">
                {leaveData?.takenDay || "N/A"}
              </span>
            </p>
            <p className="flex w-[90%]">
              <span className="font-semibold flex-1">Reason</span> :{" "}
              <span className="flex-1 pl-2">
                {leaveData?.leaveReason || "N/A"}
              </span>
            </p>
          </div>
          <div className="my-5">
            <table className=" w-full text-gray">
              <thead>
                <tr className="bg-[#F5FCFF]">
                  <th className="py-1 px-3">Role</th>
                  <th className="py-1 px-3">Status</th>
                  <th className="py-1 px-3">Remarks</th>
                </tr>
              </thead>
              <tbody className=" text-center ">
                <tr>
                  <td className="px-3 py-1">Lead</td>
                  <td
                    className={clsx(
                      "px-3 py-1",
                      leaveData?.leadStatus === "Approved"
                        ? "text-approved_blue"
                        : leaveData?.leadStatus === "Rejected"
                        ? "text-red"
                        : "text-gray"
                    )}
                  >
                    {leaveData?.leadStatus}
                  </td>
                  <td className="px-3 py-1">
                    {leaveData?.leadRemarks || "No Remaks"}
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-1">Manager</td>
                  <td
                    className={clsx(
                      "px-3 py-1",
                      leaveData?.managerStatus === "Approved"
                        ? "text-approved_blue"
                        : leaveData?.managerStatus === "Rejected"
                        ? "text-red"
                        : "text-gray"
                    )}
                  >
                    {leaveData?.managerStatus}
                  </td>
                  <td className="px-3 py-1">
                    {leaveData?.managerRemarks || "No Remaks"}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          {userAcess?.userAcess === "MANAGER" && (
            <div className="center gap-10 text_size_4">
              <button className="border border-approved_blue px-4 py-1 text-gray">
                Reject
              </button>
              <button className="text-white bg-approved_blue px-4 py-1">
                Approve
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
