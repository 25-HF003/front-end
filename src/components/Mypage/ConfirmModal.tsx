type ConfirmModalProps = {
  message: string;
  buttonmessage: string;
  onConfirm: () => void;
  onCancel: () => void;
};

const ConfirmModal = ({ message, buttonmessage, onConfirm, onCancel }: ConfirmModalProps) => {
  return (
    <div className="fixed inset-0 bg-black-100 bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white-100 p-6 rounded-lg w-80 shadow-lg text-center">
        <p className="text-lg font-semibold mb-4 text-black-100">{message}</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onCancel}
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-900">
            취소
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-500 text-white-100 px-4 py-2 rounded hover:bg-red-600">
            {buttonmessage}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
