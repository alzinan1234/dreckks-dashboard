"use client";

import React, { useState, useEffect } from "react";
import AddBannerModal from "./AddBannerModal";
import Pagination from "./Pagination";
import BannerCard from "./BannerCard";
import Image from "next/image";
import { FaSearch } from "react-icons/fa";

export default function BannerManagement() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [banners, setBanners] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const bannersPerPage = 8; // Adjust as needed based on your layout

  // Dummy data for demonstration
  const dummyBanners = [
    {
      id: 1,
      title: "Celebrate Taco Tuesday!",
      description: "Details: 'Buy 1 Get 1 Free on Tacos from 5-9 PM'",
      imageUrl: "/bannerImage/tacos.jpg", // Make sure this path exists or use a placeholder
      startDate: "2025-05-10",
      startTime: "8:00 PM",
      endDate: "2025-05-10",
      endTime: "1:00 AM",
      link: "#",
      location: "Luna Lounge, Downtown LA",
    },
    {
      id: 2,
      title: "Summer Music Fest",
      description: "Enjoy live music and great food all weekend!",
      imageUrl: "/bannerImage/Summer-Music-Fest.jpg", // Make sure this path exists or use a placeholder
      startDate: "2025-07-15",
      startTime: "10:00 AM",
      endDate: "2025-07-17",
      endTime: "11:00 PM",
      link: "#",
      location: "Central Park",
    },
    {
      id: 3,
      title: "Art Exhibition",
      description: "Explore contemporary art from local artists.",
      imageUrl: "/bannerImage/Art-Exhibition.jpg", // Make sure this path exists or use a placeholder
      startDate: "2025-06-20",
      startTime: "09:00 AM",
      endDate: "2025-06-30",
      endTime: "06:00 PM",
      link: "#",
      location: "City Gallery",
    },
    {
      id: 4,
      title: "Tech Conference 2025",
      description: "Innovate and network with industry leaders.",
      imageUrl: "/BannerImage/TechConference.jpg", // Make sure this path exists or use a placeholder
      startDate: "2025-09-01",
      startTime: "09:00 AM",
      endDate: "2025-09-03",
      endTime: "05:00 PM",
      link: "#",
      location: "Convention Center",
    },
    {
      id: 5,
      title: "Food Truck Rally",
      description: "A culinary adventure with various food trucks.",
      imageUrl: "/bannerImage/Food-Truck.jpg", // Make sure this path exists or use a placeholder
      startDate: "2025-08-05",
      startTime: "11:00 AM",
      endDate: "2025-08-05",
      endTime: "09:00 PM",
      link: "#",
      location: "Park Square",
    },
    {
      id: 6,
      title: "Community Cleanup Day",
      description: "Help make our community cleaner and greener.",
      imageUrl: "/BannerImage/TechConference.jpg", // Make sure this path exists or use a placeholder
      startDate: "2025-07-10",
      startTime: "09:00 AM",
      endDate: "2025-07-10",
      endTime: "01:00 PM",
      link: "#",
      location: "Riverside Park",
    },
    {
      id: 7,
      title: "Photography Workshop",
      description: "Learn the art of photography from experts.",
      imageUrl: "/bannerImage/Photography.jpg", // Make sure this path exists or use a placeholder
      startDate: "2025-10-20",
      startTime: "09:00 AM",
      endDate: "2025-10-22",
      endTime: "05:00 PM",
      link: "#",
      location: "Creative Hub",
    },
   
  ];

  useEffect(() => {
    // In a real app, you'd fetch banners from your API here
    // For now, use dummy data
    setBanners(dummyBanners);
  }, []);

  const handleAddBanner = (newBannerData) => {
    // In a real application, you would send this data to your backend API
    // Example: await fetch('/api/banners', { method: 'POST', body: JSON.stringify(newBannerData) });
    // Then, refetch banners or update state locally.
    console.log("Saving new banner:", newBannerData);
    setBanners((prev) => [
      ...prev,
      { ...newBannerData, id: prev.length + 1 }, // Assign a simple ID for dummy data
    ]);
    setIsModalOpen(false);
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    if (searchTerm === "") {
      setBanners(dummyBanners); // Reset to all banners if search is cleared
    } else {
      const filteredBanners = dummyBanners.filter(
        (banner) =>
          banner.title.toLowerCase().includes(searchTerm) ||
          banner.description.toLowerCase().includes(searchTerm) ||
          banner.location.toLowerCase().includes(searchTerm)
      );
      setBanners(filteredBanners);
    }
    setCurrentPage(1); // Reset to first page on search
  };

  // Pagination logic
  const indexOfLastBanner = currentPage * bannersPerPage;
  const indexOfFirstBanner = indexOfLastBanner - bannersPerPage;
  const currentBanners = banners.slice(indexOfFirstBanner, indexOfLastBanner);
  const totalPages = Math.ceil(banners.length / bannersPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className=" bg-[#2E2E2E] rounded p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-xl font-bold text-white">Banner Management</h1>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center px-4  py-2 bg-teal rounded-full text-black font-medium text-[12px] hover:bg-opacity-90 transition-colors duration-200 bg-[#ffffff]  shadow"
          >
            <div className="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </div>
            Add New Banner
          </button>

           <div className="flex items-center bg-[#0000001A] rounded overflow-hidden  shadow-inner">
                        {/* Search Icon */}
                        <div className="flex items-center justify-center w-10 h-10 text-[#B0B0B0]">
                          <FaSearch className="h-4 w-4" />
                        </div>
          
                        {/* Search Input Field */}
                        <input
                          type="text"
                          className="flex-grow bg-transparent outline-none text-[#dfdada] placeholder-gray-500 px-2 py-2 text-lg w-[197.76px] h-[32px]"
                          placeholder="Search"
                          aria-label="Search input"
                         
                          onChange={handleSearch}
                        />
          
                        {/* Filter/Search Button (right side of search input) */}
                        <button
                          className="flex-shrink-0 bg-black text-white rounded w-10 h-10 flex items-center justify-center transition duration-300 ease-in-out hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
                          aria-label="Filter search results"
                        >
                          <Image src="/icon/search-icon.svg" alt="Search" width={25} height={25} />
                        </button>
                      </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {currentBanners.map((banner) => (
          <BannerCard key={banner.id} banner={banner} />
        ))}
      </div>

      {banners.length > bannersPerPage && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}

      <AddBannerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleAddBanner}
      />
    </div>
  );
}
