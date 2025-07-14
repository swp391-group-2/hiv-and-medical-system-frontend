import React from "react";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  maxWidth?: string; // Cho phép tùy chỉnh width
};

const BasicModal: React.FC<ModalProps> = ({ 
  open, 
  onClose, 
  children, 
  maxWidth = "max-w-6xl" 
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
      <div className={`relative bg-white rounded-xl shadow-lg p-6 w-full ${maxWidth} max-h-[90vh] overflow-y-auto`}>
        {/* Nút đóng */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black text-lg z-10"
        >
          ✕
        </button>

        {children}
      </div>
    </div>
  );
};

export default BasicModal;
