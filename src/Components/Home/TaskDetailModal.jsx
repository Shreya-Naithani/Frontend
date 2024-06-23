import React from 'react';
import { RxCross2 } from "react-icons/rx";

const TaskDetailsModal = ({ showModal, setShowModal, task }) => {
  if (!showModal) return null;

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-screen bg-gray-800 opacity-50 z-40"></div>
      <div className="fixed top-0 left-0 w-full h-screen flex items-center justify-center z-50">
        <div className="w-2/6 bg-gray-900 p-4 rounded">
          <div className="flex justify-end">
            <button onClick={() => setShowModal(false)} className="text-2xl mb-4">
              <RxCross2 />
            </button>
          </div>
          <h2 className="text-2xl font-semibold mb-4">{task.title}</h2>
          <p className="text-gray-400 mb-2">Due date: {task.dueDate}</p>
          <p className="text-gray-300 break-words">{task.description}</p>
        </div>
      </div>
    </>
  );
};

export default TaskDetailsModal;