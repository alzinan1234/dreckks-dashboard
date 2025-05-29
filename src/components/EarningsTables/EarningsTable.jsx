"use client";
import { useState } from "react";
import Image from "next/image";

const dummyData = Array.from({ length: 90 }).map((_, i) => ({
  serial: `INV093${i}`,
  user: "Nothing Studio",
  subscription: "Annual Fee",
  amount: "$50",
  accNumber: "454848464846",
  date: "Aug. 15, 2023 02:29 PM",
}));

const itemsPerPage = 10;

export default function EarningsTable() {
  const [search, setSearch] = useState("");
  const [viewType, setViewType] = useState("Monthly");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredData = dummyData.filter((item) =>
    item.user.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="bg-[#1e1e1e] text-white p-6 rounded-lg shadow-lg min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Earnings Overview</h2>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-300">Weekly Revenue</span>
            <span className="font-semibold text-white">$12,322</span>
            <select
              className="bg-gray-700 px-2 py-1 text-sm rounded"
              value={viewType}
              onChange={(e) => setViewType(e.target.value)}
            >
              <option value="Weekly">Weekly</option>
              <option value="Monthly">Monthly</option>
            </select>
          </div>
          <input
            type="text"
            placeholder="Search"
            className="px-3 py-1 rounded bg-gray-800 text-sm text-white border border-gray-600"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-teal-600 text-white">
              <th className="py-2 px-4 text-left">Serial</th>
              <th className="py-2 px-4 text-left">User</th>
              <th className="py-2 px-4 text-left">Subscription Type</th>
              <th className="py-2 px-4 text-left">Amount</th>
              <th className="py-2 px-4 text-left">Acc Number</th>
              <th className="py-2 px-4 text-left">Date</th>
              <th className="py-2 px-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((item, idx) => (
              <tr
                key={idx}
                className="border-b border-gray-700 hover:bg-gray-800 transition"
              >
                <td className="py-2 px-4">{item.serial}</td>
                <td className="py-2 px-4 flex items-center gap-2">
                  <Image
                    src="/user-icon.png"
                    alt="User"
                    width={24}
                    height={24}
                    className="rounded-full"
                  />
                  {item.user}
                </td>
                <td className="py-2 px-4">{item.subscription}</td>
                <td className="py-2 px-4">{item.amount}</td>
                <td className="py-2 px-4">{item.accNumber}</td>
                <td className="py-2 px-4">{item.date}</td>
                <td className="py-2 px-4 text-center">
                  <button>
                    <Image
                      src="/action-icon.svg"
                      alt="action"
                      width={20}
                      height={20}
                      className="inline"
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          className="px-3 py-1 rounded bg-gray-700 text-white"
          disabled={currentPage === 1}
        >
          &lt;
        </button>
        <div className="flex gap-2 items-center">
          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={idx}
              className={`px-3 py-1 rounded ${
                currentPage === idx + 1
                  ? "bg-cyan-500 text-black font-bold"
                  : "bg-gray-700 text-white"
              }`}
              onClick={() => setCurrentPage(idx + 1)}
            >
              {idx + 1}
            </button>
          ))}
        </div>
        <button
          onClick={() =>
            setCurrentPage((p) => Math.min(p + 1, totalPages))
          }
          className="px-3 py-1 rounded bg-gray-700 text-white"
          disabled={currentPage === totalPages}
        >
          &gt;
        </button>
      </div>
    </div>
  );
}
