// components/SupportDetailsModal.js
import React from "react";
import { XMarkIcon } from "@heroicons/react/24/outline"; // For the close button

const SupportDetailsModal = ({ isOpen, onClose, ticket }) => {
  if (!isOpen || !ticket) return null;

  return (
    <div className="fixed inset-0  bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-[#343434] border border-[#404040] rounded-lg shadow-xl w-full max-w-2xl mx-auto p-6 relative">
        {/* Header with Close Button */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-white">Support Details</h2>
          <button
            onClick={onClose}
            className="text-[#B0B0B0] hover:text-white transition-colors duration-200"
            aria-label="Close"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {/* User Info (from second screenshot) */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border border-[#404040]">
            <img
              src={ticket.avatar || "/avatars/user-avatar.png"} // Fallback avatar
              alt={ticket.submittedBy}
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-white text-lg font-medium mb-1">
            Submitted By: {ticket.submittedBy}
          </p>
          <p className="text-[#B0B0B0] text-sm">
            Date Submitted: {ticket.dateSubmitted}
          </p>
          {/* Action icons below avatar in details page */}
          <div className="flex space-x-2 mt-4">
            <button className="p-2 rounded-full bg-green-600 text-white flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m4.5 12.75 6 6 9-13.5"
                />
              </svg>
            </button>
            <button className="p-2 rounded-full bg-red-600 text-white flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
            <button className="p-2 rounded-full bg-yellow-500 text-white flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.023 9.348h4.923v.006l-2.457 2.457m-1.742-1.742V4.77m0 7.55v6.561M16.023 9.348l-2.457 2.457m-1.742-1.742V4.77m0 7.55v6.561M16.023 9.348l-2.457 2.457m-1.742-1.742V4.77m0 7.55v6.561M16.023 9.348l-2.457 2.457M16.023 9.348h4.923v.006l-2.457 2.457m-1.742-1.742V4.77m0 7.55v6.561m0 0H16.023c.758 0 1.343.498 1.574 1.157L17.48 18.2A2.25 2.25 0 0 1 15.15 20.25H9.75v-4.875c0-.621-.504-1.125-1.125-1.125H4.77"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Issue Title */}
        <div className="mb-6">
          <label className="block text-[#B0B0B0] text-sm mb-2">
            Issue Title
          </label>
          <input
            type="text"
            className="w-full p-3 bg-[#0D0D0D] border border-[#404040] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#9155F7]"
            value={ticket.title}
            readOnly
          />
        </div>

        {/* User Description */}
        <div className="mb-6">
          <label className="block text-[#B0B0B0] text-sm mb-2">
            User Description
          </label>
          <textarea
            className="w-full p-3 bg-[#0D0D0D] border border-[#404040] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#9155F7] min-h-[120px]"
            value={ticket.issueDescription}
            readOnly
          ></textarea>
        </div>

        {/* You can add more details here if needed */}
      </div>
    </div>
  );
};

export default SupportDetailsModal;