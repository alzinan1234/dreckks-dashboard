import React from "react";
import Image from "next/image";
import {  FaSearch, FaCog } from "react-icons/fa";

const users = new Array(12).fill({
  id: "1234",
  name: "Robo Gladiators",
  email: "@gmail.com",
  date: "March 15, 2024",
  avatar: "/avatar.png" // replace with actual avatar URL or image
});

const UserManagement = () => {
  return (
    <div className=" bg-[] text-white p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">User Management</h2>
        <div className="flex items-center gap-2">
          <button className="border border-teal-400 text-sm px-4 py-1 rounded-full text-teal-300 hover:bg-teal-900">
            Manage Service provider job titles
          </button>
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="bg-[#1e1e1e] text-sm pl-8 pr-4 py-2 rounded-full text-white focus:outline-none"
            />
            <FaSearch className="absolute left-2 top-2.5 text-white w-4 h-4" />
          </div>
          <button className="p-2 rounded-full hover:bg-[#1f1f1f]">
            <FaCog className="text-white w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-y-2">
          <thead className="bg-cyan-700">
            <tr className="text-left text-sm">
              <th className="py-3 px-4">User ID</th>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Registration Date</th>
              <th className="py-3 px-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index} className="bg-[#1e1e1e] text-sm">
                <td className="py-2 px-4">{user.id}</td>
                <td className="py-2 px-4 flex items-center gap-2">
                  <Image
                    src={user.avatar}
                    alt="avatar"
                    width={24}
                    height={24}
                    className="rounded-full"
                  />
                  {user.name}
                </td>
                <td className="py-2 px-4">{user.email}</td>
                <td className="py-2 px-4">{user.date}</td>
                <td className="py-2 px-4 flex gap-2">
                  <button className="px-3 py-1 text-xs border border-purple-500 text-purple-400 rounded-full hover:bg-purple-800">
                    View
                  </button>
                  <button className="px-3 py-1 text-xs border border-red-500 text-red-400 rounded-full hover:bg-red-800">
                    Block
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-6 gap-2 text-sm">
        <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#1f1f1f]">
          &#8249;
        </button>
        <button className="w-8 h-8 bg-cyan-500 text-white rounded-full">1</button>
        <button className="w-8 h-8 hover:bg-[#1f1f1f]">2</button>
        <button className="w-8 h-8 hover:bg-[#1f1f1f]">3</button>
        <button className="w-8 h-8 hover:bg-[#1f1f1f]">4</button>
        <span className="px-2">.....</span>
        <button className="w-8 h-8 hover:bg-[#1f1f1f]">30</button>
        <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#1f1f1f]">
          &#8250;
        </button>
      </div>
    </div>
  );
};

export default UserManagement;
