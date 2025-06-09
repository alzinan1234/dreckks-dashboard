// components/SessionManagement.jsx
"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link"; // Import Link for navigation
import { FaSearch, FaPlus, FaCog, FaFileAlt } from "react-icons/fa";
import AddNewSessionModal from './AddNewSessionModal';
import { getAllSessions } from "../lib/sessions";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

 // Import data directly (or fetch if this were a separate page)

const SessionManagement = () => {
  const [isAddNewModalOpen, setIsAddNewModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // For simplicity, we'll fetch all sessions here. In a real app,
  // this data might come from a prop passed from a parent Server Component
  // or be fetched using SWR/React Query if this were a page itself.
  // For now, let's use the mock data directly.
  const sessions = getAllSessions().then(data => data); // This is a simplified async call for client component mock

  const filteredSessions = React.useMemo(() => {
    // This is a common pattern for client-side filtering of data already available
    // In a real app, 'sessions' would probably be a state initialized with data
    // fetched higher up or via a client-side hook.
    // For this example, we'll assume `sessions` is synchronously available after the mock `getAllSessions` resolves.
    // In a real application, you might use React Query or SWR for client-side data fetching here.
    if (sessions && typeof sessions.then === 'function') {
        // If sessions is a Promise, return an empty array until it resolves
        return [];
    }
    return sessions.filter(session =>
      session.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      session.therapist.toLowerCase().includes(searchTerm.toLowerCase()) ||
      session.id.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [sessions, searchTerm]);


  // IMPORTANT: For `sessions` in a 'use client' component that needs immediate data,
  // you would typically fetch it client-side with `useState` and `useEffect`
  // or pass it down from a Server Component.
  // The `getAllSessions().then(data => data)` above is a hack for demonstration.
  // A more robust client-side fetch would look like this:
  const [currentSessions, setCurrentSessions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  React.useEffect(() => {
    const fetchSessions = async () => {
      setIsLoading(true);
      const data = await getAllSessions(); // This now properly awaits the promise
      setCurrentSessions(data);
      setIsLoading(false);
    };
    fetchSessions();
  }, []);

  const displayedSessions = currentSessions.filter(session =>
    session.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    session.therapist.toLowerCase().includes(searchTerm.toLowerCase()) ||
    session.id.toLowerCase().includes(searchTerm.toLowerCase())
  );


  return (
    <div>
      <div className="bg-[#343434] p-6 rounded-lg text-white">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Session Management</h2>
        <div className="flex items-center gap-2">
          {/* Add New Session Button */}
          <button
            onClick={() => setIsAddNewModalOpen(true)}
            className="bg-white text-black text-sm px-4 py-2 rounded-full flex items-center gap-2 hover:bg-gray-200"
          >
            <FaPlus /> Add New Session
          </button>
          <div className="flex items-center ">
            <div className="relative   ">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search"
                className="pl-10 pr-4 py-2 bg-[#F3FAFA1A] rounded-tl-[7.04px] rounded-bl-[7.04px] border-[1px] border-[#0000001A]  text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <button className=" hover:bg-gray-700 transition-colors bg-[#2A2A2A] p-[5px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
              >
                <path
                  d="M11 8.5L20 8.5"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
                <path
                  d="M4 16.5L14 16.5"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
                <ellipse
                  cx="7"
                  cy="8.5"
                  rx="3"
                  ry="3"
                  transform="rotate(90 7 8.5)"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
                <ellipse
                  cx="17"
                  cy="16.5"
                  rx="3"
                  ry="3"
                  transform="rotate(90 17 16.5)"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
              </svg>
            </button>
          </div>
         
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
            {isLoading ? (
                <tr>
                    <td colSpan="7" className="text-center py-4">Loading sessions...</td>
                </tr>
            ) : (
                displayedSessions.map((session) => (
                    <tr key={session.id} className="text-sm  border-b border-gray-600 text-white py-5">
                        <td className="py-2 px-4 text-center  border-b border-gray-600">{session.id}</td>
                        <td className="py-2 px-4 text-center  border-b border-gray-600">{session.name}</td>
                        <td className="py-2 px-4 text-center  border-b border-gray-600">
                            {session.thumbnail ? (
                                <Image src={session.thumbnail} alt="Thumbnail" width={40} height={40} className="mx-auto rounded" />
                            ) : (
                                <FaFileAlt className="mx-auto text-white text-lg" />
                            )}
                        </td>
                        <td className="py-2 px-4 text-center  border-b border-gray-600">{session.time}</td>
                        <td className="py-2 px-4 text-center  border-b border-gray-600">{session.therapist}</td>
                        <td className="py-2 px-4 text-center text-green-400  border-b border-gray-600">{session.status}</td>
                        <td className="py-2 px-4 text-center  border-b border-gray-600">
                            <div className="flex items-center justify-center gap-3 ">
                                {/* Use Link to navigate to the dynamic details page */}
                                <Link href={`/admin/session-management/${session.id}`} passHref>
                                    <button className="focus:outline-none">
                                        <Image src="/icon/eye.svg" alt="View" width={25} height={25} />
                                    </button>
                                </Link>
                                <Image src="/icon/edit.png" alt="Edit" width={25} height={25} />
                                <Image src="/icon/trash.svg" alt="Delete" width={25} height={25} />
                            </div>
                        </td>
                    </tr>
                ))
            )}
          </tbody>
        </table>
      </div>

      

      {/* AddNewSessionModal Component */}
      <AddNewSessionModal
        isOpen={isAddNewModalOpen}
        onClose={() => setIsAddNewModalOpen(false)}
      />
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
    </div>
  );
};

export default SessionManagement;