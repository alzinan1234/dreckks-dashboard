// components/SessionManagement.jsx (or wherever your main component is)
"use client";
import React, { useState } from "react";
import Image from "next/image";
import { FaSearch, FaPlus, FaCog, FaFileAlt } from "react-icons/fa";
import AddNewSessionModal from './AddNewSessionModal'; // Import the modal component

const sessions = Array.from({ length: 13 }, (_, index) => ({
  id: `session-${index + 1}`, // Generate unique IDs for each session
  name: "Find Balance & Clarity",
  time: "4:00 PM - 5:00 PM",
  therapist: "John Smith",
  status: "Active",
}));

const SessionManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(''); // Added for search functionality

  const filteredSessions = sessions.filter(session =>
    session.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    session.therapist.toLowerCase().includes(searchTerm.toLowerCase()) ||
    session.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-[#343434] p-6 rounded-lg text-white">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Session Management</h2>
        <div className="flex items-center gap-2">
          {/* Add New Session Button */}
          <button
            onClick={() => setIsModalOpen(true)} // Open modal on click
            className="bg-white text-black text-sm px-4 py-2 rounded-full flex items-center gap-2 hover:bg-gray-200"
          >
            <FaPlus /> Add New Session
          </button>
          <div className="flex items-center bg-[#0000001A] rounded-full overflow-hidden p-1 shadow-inner ">
            {/* Search Icon (Magnifying Glass) */}
            <div className="flex items-center justify-center w-10 h-10 text-[#DBDBDB]">
              <FaSearch className="h-5 w-5" />
            </div>

            {/* Search Input Field */}
            <input
              type="text"
              className="flex-grow bg-transparent outline-none text-[#DBDBDB] placeholder-gray-200 px-2 py-2 text-lg w-[197.76px] h-[32px]"
              placeholder="Search"
              aria-label="Search input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            {/* Filter Button */}
            <button
              className="flex-shrink-0 bg-black text-white rounded-full w-10 h-10 flex items-center justify-center transition duration-300 ease-in-out hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
              aria-label="Filter search results"
            >
              {/* Using FaSearch here, but you might want FaFilter */}
              <FaSearch className="h-5 w-5" />
            </button>
          </div>
          <button className="p-2 rounded-full hover:bg-[#2d2d2d]">
            <FaCog className="text-white w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-y-4 ">
          <thead className="bg-cyan-700">
            <tr className="text-sm text-white">
              <th className="py-3 px-4 text-center">Session ID</th>
              <th className="py-3 px-4 text-center">Session Name</th>
              <th className="py-3 px-4 text-center">Thumbnail</th>
              <th className="py-3 px-4 text-center">Time</th>
              <th className="py-3 px-4 text-center">Therapist</th>
              <th className="py-3 px-4 text-center">Sessions</th>
              <th className="py-3 px-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredSessions.map((session) => (
              <tr key={session.id} className="bg-[#2b2b2b] text-sm text-white py-5">
                <td className="py-2 px-4 text-center">{session.id}</td>
                <td className="py-2 px-4 text-center">{session.name}</td>
                <td className="py-2 px-4 text-center">
                  <FaFileAlt className="mx-auto text-white text-lg" />
                </td>
                <td className="py-2 px-4 text-center">{session.time}</td>
                <td className="py-2 px-4 text-center">{session.therapist}</td>
                <td className="py-2 px-4 text-center text-green-400">{session.status}</td>
                <td className="py-2 px-4 text-center">
                  <div className="flex justify-center gap-3">
                    <Image src="/icon/eye.svg" alt="View" width={20} height={20} />
                    <Image src="/icon/edit.png" alt="Edit" width={20} height={20} />
                    <Image src="/icon/trash.svg" alt="Delete" width={20} height={20} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-end items-center mt-6 gap-2 text-sm">
        <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-[#2d2d2d]">
          &#8249;
        </button>
        <button className="w-8 h-8 bg-cyan-500 text-white rounded">1</button>
        <button className="w-8 h-8 hover:bg-[#2d2d2d]">2</button>
        <button className="w-8 h-8 hover:bg-[#2d2d2d]">3</button>
        <button className="w-8 h-8 hover:bg-[#2d2d2d]">4</button>
        <span className="px-2 text-gray-400">...</span>
        <button className="w-8 h-8 hover:bg-[#2d2d2d]">30</button>
        <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-[#2d2d2d]">
          &#8250;
        </button>
      </div>

      {/* AddNewSessionModal Component */}
      <AddNewSessionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default SessionManagement;