import React from "react";
import Image from "next/image";

const users = new Array(12).fill({
  id: "1234",
  name: "Robo Gladiators",
  email: "@gmail.com",
  date: "March 15, 2024",
  avatar: "/avatar.png", // Replace with actual avatar URL
});

const UserManagement = () => {
  return (
    <>
      <div className="bg-[#343434] rounded-lg text-white p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">User Management</h2>
          <div className="flex items-center gap-2">
            <button className="border border-teal-400 text-sm px-4 py-1 rounded-full text-teal-300 hover:bg-teal-900">
              Manage Service provider job titles
            </button>
            <div className="flex items-center bg-[#0000001A] rounded overflow-hidden  shadow-inner">
              {/* Search Icon */}
              <div className="flex items-center justify-center w-10 h-10 text-[#DBDBDB]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>

              {/* Search Input */}
              <input
                type="text"
                className="flex-grow bg-transparent outline-none text-[#DBDBDB] placeholder-gray-400 px-2 py-2 text-sm w-[197.76px] h-[32px]"
                placeholder="Search"
                aria-label="Search input"
              />

              {/* Filter Button */}
              <button
                className="flex-shrink-0 bg-black text-white rounded-full w-10 h-10 flex items-center justify-center transition duration-300 ease-in-out hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
                aria-label="Filter search results"
              >
                <Image
                  src="/icon/search-icon.svg"
                  alt="Search Icon"
                  width={20}
                  height={20}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead className="bg-cyan-700">
              <tr className="text-sm text-white">
                <th className="py-3 px-4 text-center">User ID</th>
                <th className="py-3 px-4 text-center">Name</th>
                <th className="py-3 px-4 text-center">Email</th>
                <th className="py-3 px-4 text-center">Registration Date</th>
                <th className="py-3 px-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index} className="text-sm text-white">
                  <td className="py-2 px-4 text-center border-b border-gray-600">
                    {user.id}
                  </td>
                  <td className="py-2 px-4 text-center border-b border-gray-600">
                    <div className="flex justify-center items-center gap-2">
                      <Image
                        src={user.avatar}
                        alt="avatar"
                        width={24}
                        height={24}
                        className="rounded-full"
                      />
                      {user.name}
                    </div>
                  </td>
                  <td className="py-2 px-4 text-center border-b border-gray-600">
                    {user.email}
                  </td>
                  <td className="py-2 px-4 text-center border-b border-gray-600">
                    {user.date}
                  </td>
                  <td className="py-2 px-4 text-center border-b border-gray-600">
                    <div className="flex justify-center gap-2">
                      <button className="px-3 py-1 text-xs border border-purple-500 text-purple-400 rounded-full hover:bg-purple-800">
                        View
                      </button>
                      <button className="px-3 py-1 text-xs border border-red-500 text-red-400 rounded-full hover:bg-red-800">
                        Block
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-end items-center mt-6 gap-2 text-sm">
        <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-[#1f1f1f]">
          &#8249;
        </button>
        <button className="w-8 h-8 bg-cyan-500 text-white rounded">1</button>
        <button className="w-8 h-8 hover:bg-[#1f1f1f]">2</button>
        <button className="w-8 h-8 hover:bg-[#1f1f1f]">3</button>
        <button className="w-8 h-8 hover:bg-[#1f1f1f]">4</button>
        <span className="px-2">.....</span>
        <button className="w-8 h-8 hover:bg-[#1f1f1f]">30</button>
        <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#1f1f1f]">
          &#8250;
        </button>
      </div>
    </>
  );
};

export default UserManagement;
