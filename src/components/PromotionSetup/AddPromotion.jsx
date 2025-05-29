import React from "react";

export default function AddPromotion() {
  return (
    <div className="  text-white p-6  ">
      <div className="w-full max-w-7xl bg-zinc-800 rounded-lg shadow-lg p-6 mx-auto">
        {/* Header */}
        <div className="flex items-center mb-6">
          <button className="text-teal-400 hover:text-teal-300 bg-[#00C1C91A] rounded-full p-2 transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="ml-4 text-[20px] font-semibold">Add New Promotion</h1>
        </div>

        {/* Form Fields */}
        <form className="space-y-6">
          <div>
            <label className="block mb-1 text-sm">Title</label>
            <input
              type="text"
              placeholder="Enter title"
              className="w-full rounded border border-gray-500 bg-zinc-700 px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm">Description</label>
            <input
              type="text"
              placeholder="Enter description"
              className="w-full rounded border border-gray-500 bg-zinc-700 px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm">Date Range</label>
            <input
              type="text"
              placeholder="Enter date range"
              className="w-full rounded border border-gray-500 bg-zinc-700 px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* Done Button */}
          <button
            type="submit"
            className="w-full mt-[207px] rounded-full bg-cyan-400 hover:bg-cyan-300 text-white py-2 font-medium  border-b-4 border-lime-400"
          >
            Done
          </button>
        </form>
      </div>
    </div>
  );
}
