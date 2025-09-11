import React from "react";

interface ModalProps {
  isOpen: boolean;
  message: string;
  onClose: () => void;
}
//확인버튼만
const SignupModal: React.FC<ModalProps> = ({ isOpen, message, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black-100 bg-opacity-50">
      <div className="bg-white-100 rounded-lg shadow-lg p-6 w-full max-w-sm text-center">
        <p className="text-lg mb-4 whitespace-pre-line">{(message ?? '').replace(/\\n/g, '\n')}</p>
        <button
          className="bg-green-200 text-white-100 px-4 py-2 rounded"
          onClick={onClose}>
          확인
        </button>
      </div>
    </div>
  );
};

export default SignupModal;
