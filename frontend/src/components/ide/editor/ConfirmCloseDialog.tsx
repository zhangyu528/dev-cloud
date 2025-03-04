import React from 'react';

interface ConfirmCloseDialogProps {
  fileName: string;
  onSave: () => void;
  onDiscardClose: () => void;
  onCancelClose: () => void;
}

export const ConfirmCloseDialog: React.FC<ConfirmCloseDialogProps> = ({
  fileName,
  onSave,
  onDiscardClose,
  onCancelClose
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-[#252526] text-white rounded-lg shadow-2xl border border-[#3c3c3c] w-96">
        <div className="p-4 border-b border-[#3c3c3c]">
          <h2 className="text-base font-semibold">未保存的更改</h2>
        </div>
        
        <div className="p-4">
          <p className="mb-4 text-sm">是否保存对 <span className="font-bold">{fileName}</span> 的更改？</p>
          
          <div className="flex justify-end space-x-2">
            <button 
              onClick={onSave}
              className="
                px-3 py-1 
                bg-[#0e639c] 
                text-white 
                text-sm 
                rounded 
                hover:bg-[#1177bb] 
                focus:outline-none 
                focus:ring-2 
                focus:ring-[#1177bb]
              "
            >
              保存
            </button>
            
            <button 
              onClick={onDiscardClose}
              className="
                px-3 py-1 
                bg-[#4b4b4b] 
                text-white 
                text-sm 
                rounded 
                hover:bg-[#5a5a5a] 
                focus:outline-none 
                focus:ring-2 
                focus:ring-[#5a5a5a]
              "
            >
              不保存
            </button>
            
            <button 
              onClick={onCancelClose}
              className="
                px-3 py-1 
                bg-transparent 
                text-white 
                text-sm 
                rounded 
                hover:bg-[#3c3c3c] 
                focus:outline-none 
                focus:ring-2 
                focus:ring-[#3c3c3c]
              "
            >
              取消
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};