import { useEffect, useState } from "react";

interface AgreementModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string;
  onConfirm: () => void;
}

function AgreementModal({ isOpen, onClose, title, content, onConfirm }: AgreementModalProps) {
  const [checked, setChecked] = useState(false);
  const [showError, setShowError] = useState(false);

  // 모달이 열릴 때마다 체크 상태 초기화
  useEffect(() => {
    if (isOpen) 
      setChecked(false);
      setShowError(false);
  }, [isOpen]);

  const handleConfirm = () => {
    if (checked) {
      onConfirm();
      onClose();
    } else {
      setShowError(true); // 에러 표시
    }
  };


  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black-100 bg-opacity-50">
      <div className="bg-white-100 p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <div className="h-64 overflow-y-auto border p-2 mb-4 whitespace-pre-wrap text-sm">
          {content}
        </div>
         {/* 동의 체크박스 */}
        <label className="flex items-center space-x-2 mb-4">
          <input 
            type="checkbox" 
            checked={checked} 
            onChange={(e) => {
              setChecked(e.target.checked)
              if (e.target.checked) setShowError(false)
            }} className="accent-green-100"/>
          <span>동의합니다</span>
        </label>
        {/* 오류 메시지 */}
        {showError && <p className="text-rose-500 text-sm mb-2">※동의해야 계속할 수 있습니다.</p>}

         {/* 버튼 */}
        <div className="text-right space-x-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">취소</button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 bg-green-200 text-white-100 rounded">
            확인
          </button>
        </div>
      </div>
    </div>
  );
}
export default AgreementModal;
