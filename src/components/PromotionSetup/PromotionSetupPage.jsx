// components/PromotionApproval.js
"use client"; // This is a client component, necessary for useState and event handlers

import Image from "next/image";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

// Assuming these icons are in your public/icon directory
import eye from "../../../public/icon/eye.svg";
// Assuming you have icons for approve and reject, if not,
// for demonstration, I'll use placeholders or existing ones
// as per previous components' usage. If specific icons are needed,
// they should be provided or created.
// For now, I'll use a placeholder for a green check and red X.
// Let's assume you have check.svg for approve and x-circle.svg for reject,
// or we can just use the provided right.svg and trash.svg from previous contexts.
// Given the image, the check and X are simple, so I'll try to emulate their colors.

const dummyPromotions = [
  {
    id: "promo-001",
    submittedBy: "Pizzeria Bella",
    type: "Restaurant",
    title: "20% Off Friday",
    status: "Pending", // Can be 'Pending', 'Approved', 'Rejected'
    dateSubmitted: "Aug. 15, 2025",
  },
  {
    id: "promo-002",
    submittedBy: "The Coffee Spot",
    type: "Bar/Restaurant",
    title: "Happy Hour Deals",
    status: "Approved",
    dateSubmitted: "July 20, 2025",
  },
  {
    id: "promo-003",
    submittedBy: "Burger Joint",
    type: "Restaurant",
    title: "Buy One Get One",
    status: "Rejected",
    dateSubmitted: "Aug. 01, 2025",
  },
  {
    id: "promo-004",
    submittedBy: "Brew & Bites",
    type: "Bar/Restaurant",
    title: "Live Music Saturdays",
    status: "Pending",
    dateSubmitted: "Sep. 01, 2025",
  },
];

export default function PromotionApproval() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPromotions, setFilteredPromotions] = useState(dummyPromotions);

  // Function to handle search input changes
  const handleSearchChange = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    const newFilteredPromotions = dummyPromotions.filter(
      (promo) =>
        promo.submittedBy.toLowerCase().includes(term) ||
        promo.type.toLowerCase().includes(term) ||
        promo.title.toLowerCase().includes(term) ||
        promo.status.toLowerCase().includes(term) ||
        promo.dateSubmitted.toLowerCase().includes(term)
    );
    setFilteredPromotions(newFilteredPromotions);
  };

  // Action handlers
  const handleApprove = (promoId) => {
    setFilteredPromotions(prev =>
      prev.map(promo =>
        promo.id === promoId ? { ...promo, status: "Approved" } : promo
      )
    );
    alert(`Approved promotion: ${promoId}`);
  };

  const handleReject = (promoId) => {
    setFilteredPromotions(prev =>
      prev.map(promo =>
        promo.id === promoId ? { ...promo, status: "Rejected" } : promo
      )
    );
    alert(`Rejected promotion: ${promoId}`);
  };

  const handleView = (promo) => {
    alert(`Viewing details for promotion: ${promo.title} by ${promo.submittedBy}`);
    // Implement modal or navigation to view full promotion details
  };

  const handleFilterClick = () => {
    alert("Filter button clicked! (Implement your filter modal/logic here)");
  };

  return (
    <div className="bg-[#343434] p-4 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-4">
          {/* Back arrow icon */}
          <button className="text-white hover:text-gray-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
          </button>
          <h2 className="text-[20px] font-semibold text-white">
            Promotion Approval
          </h2>
        </div>

        {/* Search Input Field and Filter Button */}
        <div className="flex items-center">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              className="pl-10 pr-4 py-2 bg-[#F3FAFA1A] rounded-tl-[7.04px] rounded-bl-[7.04px] border-[1px] border-[#0000001A] text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 text-white" // Added text-white for visibility
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

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="text-white bg-[#00C1C980] border-b border-gray-700">
              <th className="py-2 px-4 font-[700] text-[14px] text-center">
                Submitted By
              </th>
              <th className="py-2 px-4 font-[700] text-[14px] text-center">
                Type (Bar/Restaurant)
              </th>
              <th className="py-2 px-4 font-[700] text-[14px] text-center">
                Title
              </th>
              <th className="py-2 px-4 font-[700] text-[14px] text-center">
                Status
              </th>
              <th className="py-2 px-4 font-[700] text-[14px] text-center">
                Date Submitted
              </th>
              <th className="py-2 px-4 font-[700] text-[14px] text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredPromotions.length > 0 ? (
              filteredPromotions.map((promo) => (
                <tr key={promo.id} className="border-b border-gray-700 text-white">
                  <td className="py-2 px-4 text-center">{promo.submittedBy}</td>
                  <td className="py-2 px-4 text-center">{promo.type}</td>
                  <td className="py-2 px-4 text-center">{promo.title}</td>
                  <td className="py-2 px-4 text-center">
                    <span
                      className={`font-medium ${
                        promo.status === "Pending"
                          ? "text-[#FFC107]" // Yellow for Pending
                          : promo.status === "Approved"
                          ? "text-[#4CAF50]" // Green for Approved
                          : "text-[#F44336]" // Red for Rejected
                      }`}
                    >
                      {promo.status}
                    </span>
                  </td>
                  <td className="py-2 px-4 text-center">{promo.dateSubmitted}</td>
                  <td className="py-2 px-4">
                    <div className="flex items-center justify-center gap-2">
                      {/* Approve (Green Check) */}
                      <button
                        onClick={() => handleApprove(promo.id)}
                        className="p-1 rounded-full text-[#73D100] border border-[#73D100]"
                        style={{ backgroundColor: '#0053B200' }} // Green background
                        title="Approve"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                      </button>

                      {/* Reject (Red X) */}
                      <button
                        onClick={() => handleReject(promo.id)}
                        className="p-1 rounded-full text-[#FF0000] border border-[#FF0000]"
                        style={{ backgroundColor: '' }} // Red background
                        title="Reject"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>

                      {/* View (Purple Eye) */}
                      <button
                        onClick={() => handleView(promo)}
                        className="p-1 rounded-full text-white"
                        style={{ backgroundColor: '' }} // Purple background
                        title="View Details"
                      >
                         <Image
                            src={eye}
                            alt="View"
                            width={28}
                            height={30}
                            className="inline"
                        />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-400">
                  No matching promotions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}