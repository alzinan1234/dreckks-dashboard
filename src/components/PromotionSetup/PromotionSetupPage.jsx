"use client";
// pages/promotion-setup.js
import Head from "next/head";
import { useState } from "react";

// Assuming you have these icons or similar ones from a library like Heroicons
import {
  ArrowLeftIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  AdjustmentsHorizontalIcon,
  PencilIcon,
  CalendarDaysIcon,
  EyeIcon,
} from "@heroicons/react/24/outline";
import PromotionSetupModal from "./PromotionSetupModal";

// Import the PromotionSetupModal component

const PromotionSetupPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

  // Dummy promotion data for demonstration
  const promotions = [
    {
      id: 1,
      title: "Free Mocktail with Any Meal",
      description:
        "Located in the heart of the city, The Oak Barrel Bistro offers a cozy, elegant atmosphere and a curated menu of handcrafted dishes and signature cocktails.",
      schedule: "Monday to Friday",
      views: 3000,
    },
    // You would fetch real promotion data here
  ];

  const filteredPromotions = promotions.filter(
    (promotion) =>
      promotion.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      promotion.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#343434] text-gray-100 p-6 rounded-lg">
      <Head>
        <title>Promotion Setup</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header */}
      <header className="flex items-center justify-between pb-6  mb-6">
        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-full hover:bg-gray-700 transition-colors">
            <ArrowLeftIcon className="h-6 w-6 text-gray-400" />
          </button>
          <h1 className="text-2xl font-semibold text-white">Promotion Setup</h1>
        </div>

        <div className="flex items-center space-x-4  ">
          <button
            onClick={handleOpenModal} // Add onClick handler to open the modal
            className="flex items-center space-x-2 pt-0 pr-[13px] pb-0 pl-[2px]   bg-[#FFFFFF1A] hover:bg-gray-700 rounded-full transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="27"
              viewBox="0 0 28 27"
              fill="none"
            >
              <rect x="0.23999" width="27" height="27" rx="13.5" fill="white" />
              <path
                d="M13.74 6.75L13.74 20.25"
                stroke="#6A6A6A"
                stroke-width="1.5"
                stroke-linecap="round"
              />
              <path
                d="M20.49 13.5L6.98999 13.5"
                stroke="#6A6A6A"
                stroke-width="1.5"
                stroke-linecap="round"
              />
            </svg>
            <span className="text-[12px] font-normal text-white">
              Add New Promotion
            </span>
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

          <button className=" hover:bg-gray-700 transition-colors bg-[#000] p-[5px]">
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
      </header>

      {/* Main Content Area */}
      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredPromotions.length > 0 ? (
          filteredPromotions.map((promotion) => (
            <PromotionCard key={promotion.id} promotion={promotion} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-400">
            No promotions found.
          </p>
        )}
      </main>

      {/* Promotion Setup Modal - conditionally rendered */}
      {isModalOpen && <PromotionSetupModal onClose={handleCloseModal} />}
    </div>
  );
};

// Promotion Card Component (remains unchanged from your provided code)
const PromotionCard = ({ promotion }) => {
  return (
    <div className="bg-[#FFFFFF1A] rounded-lg shadow-lg p-6 flex flex-col space-y-4">
      <div className="flex items-start justify-between">
        <h2 className="text-lg font-semibold text-white">{promotion.title}</h2>
        <button className="p-1 rounded-full hover:bg-gray-700 transition-colors">
          <PencilIcon className="h-5 w-5 text-gray-400" />
        </button>
      </div>
      <p className="text-sm text-[#C2C2C2] leading-relaxed">
        {promotion.description}
      </p>
      <div className="flex items-center space-x-2 text-[#FFFFFF] text-xs">
        <CalendarDaysIcon className="h-4 w-4" />
        <span>{promotion.schedule}</span>
      </div>
      <div className="flex items-center space-x-2 text-[#FFFFFF] text-xs font-bold">
        <EyeIcon className="h-4 w-4" />
        <span>Views: {promotion.views.toLocaleString()}</span>
      </div>
    </div>
  );
};

export default PromotionSetupPage;
