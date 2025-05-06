import React from 'react'

interface TableProps {
  handleSharedData?: () => void;
  remarks:string;
  selectedDocId:string | null;
  selectedStatus:string;
  setRemarks:React.Dispatch<React.SetStateAction<string>>;
  updateLeaveStatus:(selectedDocId:string, selectedStatus:string, remarks:string)=>void
}


export const RejectedPopup = ({handleSharedData,remarks,setRemarks,updateLeaveStatus,selectedDocId,selectedStatus}: TableProps) => {
  return (
    <div className="fixed inset-0 bg-transparent flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-[400px] shadow-lg">
            <h3 className="text-lg font-semibold mb-4">
              Add Rejection Remarks
            </h3>
            <textarea
              className="w-full border border-gray-300 rounded p-2 outline-none"
              rows={4}
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              placeholder="Enter remarks for rejection..."
            />
            <div className="mt-4 flex justify-end gap-2">
              <button
                className="bg-gray-300 text-black px-4 py-2 rounded"
                onClick={() => 
                    handleSharedData?.()
                }
              >
                Cancel
              </button>
              <button
                className="bg-primary text-white px-4 py-2 rounded"
                onClick={() => {
                  if (selectedDocId) {
                    updateLeaveStatus(selectedDocId, selectedStatus, remarks);
                  }
                }}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
  )
}
