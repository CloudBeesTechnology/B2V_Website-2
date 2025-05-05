import { IoMdCloseCircle } from "react-icons/io";
import { DateFormat } from "./DateFormate";
import clsx from "clsx";
import { useState } from "react";
import { RejectedPopup } from "@/app/leaveapproval/RejectedPopup";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";
import { EnrichedLeaveStatus } from "../app/leaveapproval/LeaveApproval";
import { useRouter } from "next/navigation";

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
  setLeaveApproval?: React.Dispatch<
    React.SetStateAction<EnrichedLeaveStatus[]>
  >;
  hiddenBtn?:boolean;
}

export const ViewLeaveStatus = ({
  leaveData,
  close,
  userAcess,
  setLeaveApproval, hiddenBtn
}: TableProps) => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedDocId, setSelectedDocId] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string>("Pending");
  const router = useRouter();
  const [remarks, setRemarks] = useState("");
  const handleClose = () => {
    setShowPopup(!showPopup);
  };
  const handleSharedData = () => {
    setShowPopup(!showPopup);
    setRemarks("");
    setSelectedDocId(null);
  };
  const handleStatusChange = (docId: string, newStatus: string) => {
    if (!docId) {
      return;
    }
    if (newStatus === "Rejected") {
      setSelectedDocId(docId);
      setSelectedStatus(newStatus);
      handleClose();
    } else {
      // console.log(newStatus);
      updateLeaveStatus(docId, newStatus);
    }
  };

  const updateLeaveStatus = async (
    docId: string,
    status: string,
    remarksText: string = ""
  ) => {
    try {
      const leaveDocRef = doc(db, "leaveStatus", docId);
      const dateStatus = new Date().toISOString().split("T")[0];

      // Create update data dynamically based on role
      let updateData: any = {};

      if (userAcess?.userAcess === "LEAD") {
        updateData = {
          ...updateData,
          leadDate: dateStatus,
          leadStatus: status,
          ...(status === "Rejected" && { leadRemarks: remarksText }),
        };
      } else if (userAcess?.userAcess === "MANAGER") {
        updateData = {
          ...updateData,
          managerDate: dateStatus,
          managerStatus: status,
          ...(status === "Rejected" && { manageRemarks: remarksText }),
        };
      }
      // console.log(updateData, "mnjuyyt");

      await updateDoc(leaveDocRef, updateData);
      setLeaveApproval?.((prev) =>
        prev.map((leave) =>
          leave.docId === docId
            ? { ...leave, leaveStatus: status, remarks: remarksText }
            : leave
        )
      );

      setRemarks("");
      setSelectedDocId(null);
      // setShowPopup(false);
       window.location.href="/leaveapproval"
     
    } catch (err) {
      console.error("Failed to update leave status:", err);
    }
  };
  return (
    <section className="fixed inset-0 w-full bg-[#07060788] z-[99999] flex items-center justify-center">
      {" "}
      <div className="relative max-w-xl w-full max-h-[90vh] overflow-hidden bg-white rounded-lg shadow-lg">
        {/* Close Button */}

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-6 max-h-[85vh]">
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
                {leaveData?.duration || "N/A"}
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
                {leaveData?.leadEmpID && (
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
                )}
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
          {
            hiddenBtn && 
            
          <div className="center gap-10 text_size_4">
            <button
              className="border border-approved_blue px-4 py-1 text-gray"
              onClick={() => {
                handleStatusChange?.(leaveData?.docId, "Rejected");
              }}
            >
              Reject
            </button>
            <button
              className="text-white bg-approved_blue px-4 py-1"
              onClick={() => {
                handleStatusChange?.(leaveData?.docId, "Approved");
                console.log("784512");
              }}
            >
              Approve
            </button>
          </div>
          }
        </div>
      </div>
      {showPopup && (
        <RejectedPopup
          handleSharedData={handleSharedData}
          remarks={remarks}
          setRemarks={setRemarks}
          updateLeaveStatus={updateLeaveStatus}
          selectedDocId={selectedDocId}
          selectedStatus={selectedStatus}
        />
      )}
    </section>
  );
};
