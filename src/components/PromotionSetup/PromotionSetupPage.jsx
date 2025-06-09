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
          <button className=" rounded-full bg-[#FFFFFF1A] p-[10px] py-[12px] transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="13"
              viewBox="0 0 18 13"
              fill="none"
            >
              <path
                d="M0.999861 6.50024L16.9999 6.50024"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M5.99975 1.5C5.99975 1.5 0.999797 5.18244 0.999786 6.50004C0.999775 7.81763 5.99979 11.5 5.99979 11.5"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
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

        {/* edit svg */}
        <button className="p-1 rounded-full hover:bg-gray-700 transition-colors">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M12.5 7.5L5.92819 14.0718C5.71566 14.2843 5.60939 14.3906 5.53953 14.5212C5.46966 14.6517 5.44019 14.7991 5.38124 15.0938L4.64709 18.7646C4.58057 19.0972 4.5473 19.2635 4.64191 19.3581C4.73652 19.4527 4.90283 19.4194 5.23544 19.3529L8.90621 18.6188C9.20093 18.5598 9.3483 18.5303 9.47885 18.4605C9.60939 18.3906 9.71566 18.2843 9.92819 18.0718L16.5 11.5L12.5 7.5Z"
              fill="#7E869E"
              fill-opacity="0.25"
            />
            <path
              d="M15 5.81445C15.391 5.81445 15.7047 5.98011 15.9766 6.1875C16.2345 6.38432 16.5176 6.669 16.8389 6.99023L17.0098 7.16113L17.458 7.61621C17.5939 7.75927 17.7141 7.89449 17.8125 8.02344C18.0199 8.29525 18.1855 8.60896 18.1855 9C18.1855 9.39104 18.0199 9.70475 17.8125 9.97656C17.7141 10.1055 17.5939 10.2407 17.458 10.3838L17.0098 10.8389L9.81641 18.0322C9.68725 18.1614 9.56404 18.289 9.42383 18.3936L9.27734 18.4893C9.17462 18.5474 9.06608 18.5892 8.9541 18.624L8.6084 18.7168L5.9541 19.3799C5.79316 19.4201 5.60594 19.4689 5.44824 19.4844C5.30368 19.4985 5.05623 19.4989 4.83496 19.3369L4.74219 19.2578C4.5009 19.0165 4.49947 18.7169 4.51562 18.5518C4.53105 18.3941 4.57988 18.2068 4.62012 18.0459L5.2832 15.3916L5.37598 15.0459C5.41081 14.9339 5.45258 14.8254 5.51074 14.7227L5.60645 14.5762C5.71097 14.436 5.83862 14.3127 5.96777 14.1836L13.1611 6.99023L13.6162 6.54199C13.7593 6.40612 13.8945 6.2859 14.0234 6.1875C14.2953 5.98011 14.609 5.81445 15 5.81445Z"
              stroke="white"
              stroke-width="1.2"
            />
            <path d="M12.5 7.5L16.5 11.5" stroke="white" stroke-width="1.2" />
          </svg>
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
