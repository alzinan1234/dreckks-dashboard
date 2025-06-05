// components/SupportTable.js
'use client';

import React, { useState, useEffect } from 'react';
import { supportTickets } from '../lib/data'; // Import your mock data
import { getTicketById } from '../lib/data'; // To fetch single ticket for modal
import SupportDetailsModal from './SupportDetailsModal'; // Import the modal component
import { MagnifyingGlassIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline'; // For search and filter icons
import { EyeIcon } from '@heroicons/react/24/solid'; // For the view icon

const ITEMS_PER_PAGE = 10; // Number of rows per page

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
        return 'bg-yellow-500 text-yellow-900';
      case 'Resolved':
        return 'bg-green-600 text-green-900';
      case 'Open':
        return 'bg-blue-500 text-blue-900';
      default:
        return 'bg-gray-500 text-gray-900';
    }
  };

  // --- NEW LOGIC FOR PAGINATION NUMBERS ---
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5; // Maximum number of page buttons to show (excluding ellipses)
    const delta = 2; // Number of pages to show on each side of the current page

    let startPage = Math.max(1, currentPage - delta);
    let endPage = Math.min(totalPages, currentPage + delta);

    if (currentPage - delta < 1) {
      endPage = Math.min(totalPages, maxPagesToShow);
    }
    if (currentPage + delta > totalPages) {
      startPage = Math.max(1, totalPages - maxPagesToShow + 1);
    }

    // Always add the first page
    if (startPage > 1) {
      pageNumbers.push(1);
      if (startPage > 2) { // Add ellipsis if there's a gap after the first page
        pageNumbers.push('...');
      }
    }

    // Add pages around the current page
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    // Always add the last page
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) { // Add ellipsis if there's a gap before the last page
        pageNumbers.push('...');
      }
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };
  // --- END NEW LOGIC ---

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white p-4 sm:p-6 lg:p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold">Support</h1>
        <div className="flex items-center space-x-2 bg-[#262626] rounded-full p-2 pr-4 border border-[#404040]">
          <MagnifyingGlassIcon className="h-5 w-5 text-[#B0B0B0] ml-2" />
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent focus:outline-none text-white placeholder-[#B0B0B0]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="text-[#B0B0B0] hover:text-white transition-colors duration-200">
            <AdjustmentsHorizontalIcon className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-[#262626] border border-[#404040] rounded-lg overflow-hidden shadow-lg">
        <table className="min-w-full divide-y divide-[#404040]">
          <thead className="bg-[#17787C]">
            <tr>
              <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-[#FFFFFF] tracking-wider">
                ID
              </th>
              <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-[#FFFFFF] tracking-wider">
                Submitted By
              </th>
              <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-[#FFFFFF] tracking-wider">
                Title
              </th>
              <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-[#FFFFFF] tracking-wider">
                Date Submitted
              </th>
              <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-[#FFFFFF] tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-[#FFFFFF] tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#404040]">
            {displayedTickets.length > 0 ? (
              displayedTickets.map((ticket) => (
                <tr key={ticket.id} className="hover:bg-[#1a1a1a]">
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
                      <button className="text-green-500 hover:text-green-700 p-2 rounded-full bg-[#0D0D0D] hover:bg-green-900 transition-colors duration-200">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                        </svg>
                      </button>
                      <button className="text-red-500 hover:text-red-700 p-2 rounded-full bg-[#0D0D0D] hover:bg-red-900 transition-colors duration-200">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                      </button>
                      <button
                        onClick={() => openDetailsModal(ticket.id)}
                        className="text-[#9155F7] hover:text-[#b377ff] p-2 rounded-full bg-[#0D0D0D] hover:bg-purple-900 transition-colors duration-200"
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

        {getPageNumbers().map((pageNumber, index) => (
          pageNumber === '...' ? (
            <span key={index} className="px-4 py-2 text-white">...</span>
          ) : (
            <button
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
              className={`px-4 py-2 rounded ${
                currentPage === pageNumber ? 'bg-[#21F6FF] text-white' : ' text-white hover:bg-[#404040]'
              } transition-colors duration-200`}
            >
              {pageNumber}
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

      {/* Support Details Modal */}
      <SupportDetailsModal
        isOpen={isModalOpen}
        onClose={closeDetailsModal}
        ticket={selectedTicket}
      />
    </div>
  );
};

export default SupportTable;