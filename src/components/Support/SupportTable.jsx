// components/SupportTable.js
'use client';

import React, { useState, useEffect, useMemo } from 'react'; // Import useMemo
import { supportTickets } from '../lib/data'; // Import your mock data
import { getTicketById } from '../lib/data'; // To fetch single ticket for modal
import SupportDetailsModal from './SupportDetailsModal'; // Import the modal component
import { MagnifyingGlassIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline'; // For search and filter icons
import { EyeIcon } from '@heroicons/react/24/solid'; // For the view icon
import Image from 'next/image';

const ITEMS_PER_PAGE = 10; // Number of rows per page
const PAGE_RANGE = 2; // Number of pages to show around the current page (e.g., if current is 5, shows 3,4,5,6,7)

const SupportTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [displayedTickets, setDisplayedTickets] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Calculate total pages
  const totalPages = Math.ceil(supportTickets.length / ITEMS_PER_PAGE);

  // Update displayed tickets based on current page and search term
  useEffect(() => {
    const filteredTickets = supportTickets.filter(ticket =>
      ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.submittedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    setDisplayedTickets(filteredTickets.slice(startIndex, endIndex));
  }, [currentPage, searchTerm]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const openDetailsModal = (ticketId) => {
    const ticket = getTicketById(ticketId); // Fetch the full ticket data
    setSelectedTicket(ticket);
    setIsModalOpen(true);
  };

  const closeDetailsModal = () => {
    setIsModalOpen(false);
    setSelectedTicket(null);
  };

  const getStatusClasses = (status) => {
    switch (status) {
      case 'Pending':
        return 'text-yellow-500 ';
      case 'Resolved':
        return ' text-green-500';
      case 'Open':
        return ' text-blue-500';
      default:
        return ' text-gray-500';
    }
  };

  // Memoize the page numbers calculation for performance
  const pageNumbers = useMemo(() => {
    const pages = [];
    const maxPageButtons = (PAGE_RANGE * 2) + 1; // e.g., for PAGE_RANGE=2, this means 5 visible page numbers

    if (totalPages <= maxPageButtons + 2) { // If total pages are few enough to show all + first/last
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const leftBound = Math.max(1, currentPage - PAGE_RANGE);
      const rightBound = Math.min(totalPages, currentPage + PAGE_RANGE);

      // Add first page
      pages.push(1);

      // Add left ellipsis
      if (leftBound > 2) {
        pages.push('...');
      }

      // Add pages around current page
      for (let i = leftBound; i <= rightBound; i++) {
        if (i !== 1 && i !== totalPages) { // Avoid duplicating 1 and totalPages if they are already added or will be
          pages.push(i);
        }
      }

      // Add right ellipsis
      if (rightBound < totalPages - 1) {
        pages.push('...');
      }

      // Add last page (only if not the same as the first page or already added)
      if (totalPages !== 1 && !pages.includes(totalPages)) {
        pages.push(totalPages);
      }
    }
    // Remove duplicates that might occur if PAGE_RANGE overlaps with 1 or totalPages
    return [...new Set(pages)];
  }, [currentPage, totalPages]);


  return (
    <>
      <div className=" bg-[#343434] text-white p-6 sm:p-6 lg:p-8 rounded shadow">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-[20px] sm:text-3xl font-semibold">Support</h1>
          <div className="flex items-center space-x-2 bg-[#262626] rounded-l-xl p-2  border border-[#404040] ">
            <MagnifyingGlassIcon className="h-5 w-5 text-[#B0B0B0] ml-2" />
            <input
              type="text"
              placeholder="Search"
              className="bg-transparent focus:outline-none text-white placeholder-[#B0B0B0]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="text-[#B0B0B0] bg-[#000] p-1 hover:text-white transition-colors duration-200">
           <Image  src="/icon/search-icon.svg" alt="Elements Icon" width={24} height={24} />
            </button>
          </div>
        </div>

        {/* Table Container */}
        <div className=" border-b border-[#D0D0D0CC] rounded-lg overflow-hidden ">
          <table className="min-w-full divide-y divide-[#404040]">
            <thead className="bg-[#17787C]">
              <tr>
                <th scope="col" className="px-6 py-3 text-center text-xs font-semibold text-[#FFFFFF] tracking-wider">
                  ID
                </th>
                <th scope="col" className="px-6 py-3 text-center text-xs font-semibold text-[#FFFFFF] tracking-wider">
                  Submitted By
                </th>
                <th scope="col" className="px-6 py-3 text-center text-xs font-semibold text-[#FFFFFF] tracking-wider">
                  Title
                </th>
                <th scope="col" className="px-6 py-3 text-center text-xs font-semibold text-[#FFFFFF] tracking-wider">
                  Date Submitted
                </th>
                <th scope="col" className="px-6 py-3 text-center text-xs font-semibold text-[#FFFFFF] tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-center text-xs font-semibold text-[#FFFFFF] tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#D0D0D0CC]">
              {displayedTickets.length > 0 ? (
                displayedTickets.map((ticket) => (
                  <tr key={ticket.id} className="">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white text-center">
                      {ticket.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white text-center">
                      <div className="flex items-center justify-center">
                        <div className="flex-shrink-0 h-8 w-8 rounded-full overflow-hidden border border-[#404040]">
                          <img className="h-full w-full object-cover" src={ticket.avatar} alt="User Avatar" />
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-white">{ticket.submittedBy}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white text-center">
                      {ticket.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#B0B0B0] text-center">
                      {ticket.dateSubmitted}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClasses(ticket.status)}`}>
                        {ticket.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-center">
                      <div className="flex justify-center space-x-2">
                        <button className="text-green-500 border bg-[#4BB54B1A] hover:text-green-700 p-2 rounded-full hover:bg-green-900 transition-colors duration-200">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                          </svg>
                        </button>
                        <button className="text-[#FF0000] hover:text-red-700 p-2 rounded-full border hover:bg-red-900 transition-colors duration-200">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                          </svg>
                        </button>
                        <button
                          onClick={() => openDetailsModal(ticket.id)}
                          className="text-[#9900FF] border hover:text-[#b377ff] p-2 rounded-full hover:bg-purple-900 transition-colors duration-200"
                          aria-label="View details"
                        >
                          <EyeIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-sm text-[#B0B0B0]">
                    No support tickets found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Support Details Modal */}
        <SupportDetailsModal
          isOpen={isModalOpen}
          onClose={closeDetailsModal}
          ticket={selectedTicket}
        />
      </div>

      {/* Pagination */}
      <div className="flex justify-end items-center mt-8 space-x-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 rounded-full bg-[#262626] border border-[#404040] text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#404040] transition-colors duration-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
        </button>

        {pageNumbers.map((page, index) => (
          page === '...' ? (
            <span key={`ellipsis-${index}`} className="px-4 py-2 text-white">...</span>
          ) : (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-4 py-2 rounded ${
                currentPage === page ? 'bg-[#21F6FF] text-black' : 'text-white hover:bg-[#404040]'
              } transition-colors duration-200`}
            >
              {page}
            </button>
          )
        ))}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 rounded-full bg-[#262626] border border-[#404040] text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#404040] transition-colors duration-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5 15.75 12l-7.5 7.5" />
          </svg>
        </button>
      </div>
    </>
  );
};

export default SupportTable;