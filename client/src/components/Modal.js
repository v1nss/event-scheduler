import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
      <div className="bg-gray-200 p-6 rounded-lg w-full max-w-lg shadow-lg relative animate-fadeIn">
        <button 
          className="absolute top-2 right-2 bg-none border-none text-2xl cursor-pointer text-gray-600 hover:text-gray-800" 
          onClick={onClose}
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
