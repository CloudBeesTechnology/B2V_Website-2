import React from "react";

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

const InternPopup: React.FC<ModalProps> = ({ children, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#00000031] bg-opacity-40">
      <div className="bg-white p-6 rounded-md shadow-lg relative max-w-lg w-[90%]">
        <button
          onClick={onClose}
          className="absolute top-4 right-5 text-gray-500 text-4xl hover:text-red-500"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default InternPopup;
