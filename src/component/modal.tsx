import React from 'react';

interface ModalProps {
  message: string;
  onOkay: () => void;
}

const Modal: React.FC<ModalProps> = ({ message, onOkay }) => {
  return (
    <div className={`fixed inset-0 flex items-center justify-center z-50 `}>
      <div className="bg-black opacity-50 fixed inset-0"></div>
      <div className="bg-white p-8 rounded shadow-lg z-10 flex flex-col items-center">
        <div className="mt-4">
          <p className='text-black text-center'>{message}</p>
        </div>
        <div className="mt-6">
          <button
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            onClick={onOkay}
          >
            Okay
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
