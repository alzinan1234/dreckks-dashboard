// components/RegistrationTable.js
"use client"; // This is a client component, necessary for useState and event handlers

import Image from "next/image";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

// Assuming these icons are in your public/icon directory
// and match the colors in the screenshot (green check, red cross, purple eye)
// If you don't have these exact colored SVGs, you might need to use Heroicons
// and apply specific text colors to them (e.g., <CheckCircleIcon className="h-6 w-6 text-[#71F50C]" />)
// For now, I'll assume you have the colored SVGs as per your existing eye.svg usage.
import checkIcon from "../../../public/icon/right.svg"; // Placeholder for green check
import crossIcon from "../../../public/icon/trash.svg"; // Placeholder for red cross
import eyeIcon from "../../../public/icon/eye.svg";     // Your existing eye icon

const dummyRows = [
  {
    id: "NK-01",
    name: "Mason Brooks", // Changed to match screenshot
    email: "mason@gmail.com", // Changed to match screenshot
    date: "2024-01-21",
    userImage: "/image/userImage.png", // Added user image path
  },
  {
    id: "NK-02",
    name: "Alice Johnson",
    email: "alice@email.com",
    date: "2024-02-11",
    userImage: "/image/userImage.png",
  },
  {
    id: "NK-03",
    name: "Bob Smith",
    email: "bob@email.com",
    date: "2024-03-05",
    userImage: "/image/userImage.png",
  },
  {
    id: "NK-04",
    name: "Charlie Brown",
    email: "charlie@email.com",
    date: "2024-04-15",
    userImage: "/image/userImage.png",
  },
];

export default function RegistrationTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredRows, setFilteredRows] = useState(dummyRows);

  // Function to handle search input changes
  const handleSearchChange = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    const newFilteredRows = dummyRows.filter(
      (row) =>
        row.id.toLowerCase().includes(term) ||
        row.name.toLowerCase().includes(term) ||
        row.email.toLowerCase().includes(term)
    );
    setFilteredRows(newFilteredRows);
  };

  // Action handlers (placeholder functions)
  const handleAccept = (rowId) => {
    alert(`Accepted: ${rowId}`);
    // Implement logic for accepting registration
  };

  const handleReject = (rowId) => {
    alert(`Rejected: ${rowId}`);
    // Implement logic for rejecting registration
  };

  const handleView = (rowId) => {
    alert(`Viewing details for: ${rowId}`);
    // Implement navigation or modal display logic here
  };

  const handleFilterClick = () => {
    alert("Filter button clicked! (Implement your filter modal/logic here)");
  };

  return (
    <div className="bg-[#343434] p-4 rounded-lg shadow-lg text-white"> {/* Added text-white here */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-[20px] font-semibold">
          Manage Registrations
        </h2>

        {/* Search Input Field and Filter Button */}
        <div className="flex items-center">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              className="pl-10 pr-4 py-2 bg-[#F3FAFA1A] rounded-tl-[7.04px] rounded-bl-[7.04px] border-[1px] border-[#0000001A] text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 text-white" // Added text-white
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>

          <button
            onClick={handleFilterClick}
            className="hover:bg-gray-700 transition-colors bg-[#2A2A2A] p-[5px] rounded-tr-[7.04px] rounded-br-[7.04px]"
          >
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
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M4 16.5L14 16.5"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <ellipse
                cx="7"
                cy="8.5"
                rx="3"
                ry="3"
                transform="rotate(90 7 8.5)"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <ellipse
                cx="17"
                cy="16.5"
                rx="3"
                ry="3"
                transform="rotate(90 17 16.5)"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </div>
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="bg-[#1A5B64]"> {/* Changed to match the teal-like header color */}
              <th className="py-3 px-4 font-normal text-[14px] text-left"> {/* Aligned left */}
                Name
              </th>
              <th className="py-3 px-4 font-normal text-[14px] text-left"> {/* Aligned left */}
                Email
              </th>
              <th className="py-3 px-4 font-normal text-[14px] text-center"> {/* Aligned center */}
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredRows.length > 0 ? (
              filteredRows.map((row) => (
                <tr key={row.id} className="border-b border-[#FFFFFF1A] last:border-b-0"> {/* Adjusted border color */}
                  <td className="py-2 px-4">
                    <div className="flex items-center gap-2">
                      <Image
                        src={row.userImage}
                        alt={row.name}
                        width={24} // Adjusted size for the user image
                        height={24}
                        className="rounded-full"
                      />
                      <span>{row.name}</span>
                    </div>
                  </td>
                  <td className="py-2 px-4">{row.email}</td>
                  <td className="py-2">
                    <div className="flex items-center justify-center gap-2">
                      {/* Accept Icon (Green Circle Check) */}
                      <button
                        onClick={() => handleAccept(row.id)}
                        className="p-1 rounded-full bg-[#0000001A]  transition-colors group" // Green border, subtle background
                        aria-label="Accept Registration"
                      >
                         {/* If you have an SVG that changes color on hover, use it here.
                             Otherwise, if using Heroicons, you'd apply text-green-500.
                             Assuming checkIcon is a green SVG. */}
                        <Image src={checkIcon} alt="Accept" width={25} height={25} className="group-hover:filter group-hover:brightness-0 group-hover:invert"/>
                        {/* For Heroicon alternative: <CheckCircleIcon className="h-5 w-5 text-[#71F50C] group-hover:text-black" /> */}
                      </button>

                      {/* Reject Icon (Red Circle Cross) */}
                      <button
                        onClick={() => handleReject(row.id)}
                        className="p-1 rounded-full bg-[#0000001A]  transition-colors group" // Red border
                        aria-label="Reject Registration"
                      >
                         {/* Assuming crossIcon is a red SVG */}
                        <Image src={crossIcon} alt="Reject" width={25} height={25} className="group-hover:filter group-hover:brightness-0 group-hover:invert"/>
                        {/* For Heroicon alternative: <XCircleIcon className="h-5 w-5 text-[#FF0000] group-hover:text-black" /> */}
                      </button>

                      {/* View Icon (Purple Circle Eye) */}
                      <button
                        onClick={() => handleView(row.id)}
                        className="p-1 rounded-full bg-[#0000001A]  transition-colors group" // Purple border
                        aria-label="View Details"
                      >
                        {/* Assuming eyeIcon is a purple SVG */}
                        <Image src={eyeIcon} alt="View" width={25} height={25} className="group-hover:filter group-hover:brightness-0 group-hover:invert"/>
                        {/* For Heroicon alternative: <EyeIcon className="h-5 w-5 text-[#A460F9] group-hover:text-black" /> */}
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center py-4 text-gray-400"> {/* Adjusted colSpan */}
                  No matching registrations found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}