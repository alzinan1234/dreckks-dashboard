"use client";
import { useState } from "react";
import Image from "next/image";

import { ChevronDown } from "lucide-react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

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

    const [selected, setSelected] = useState("Weekly");
  const [open, setOpen] = useState(false);
  const options = ["Weekly", "Monthly"];
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
   <>
    <div className="bg-[#343434] text-white p-6 rounded-lg shadow-lg ">
      <div className="flex justify-between items-center ">
     <div>
         <h2 className="text-xl font-bold">Earnings Overview</h2>
     </div>
    
        <div className="flex items-center gap-4">
         

          {/* search icon */}
         <div className="flex items-center ">
              <div className="relative   ">
                <MagnifyingGlassIcon
                 className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search"
                  className="pl-10 pr-4 py-2 bg-[#F3FAFA1A] rounded-tl-[7.04px] rounded-bl-[7.04px] border-[1px] border-[#0000001A]  text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                  // value={searchTerm}
                  // onChange={(e) => setSearchTerm(e.target.value)}
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
      </div>



 <div className="relative text-white flex flex-col justify-center items-center ">
      <div className="mb-1 text-sm">
        Weekly Revenue <span className="font-bold">$12,322</span>
      </div>

      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-[8.31px] w-[73px] h-[27px] pl-[6.65px] rounded-[18.28px] bg-white/10"
      >
        <span className="text-xs">{selected}</span>
        <ChevronDown size={16} className={`transform transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>

      <div
        className={` mt-1 w-[100px] rounded bg-white/20 backdrop-blur text-xs shadow-md z-10 transform transition-all duration-300 origin-top ${
          open ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0 pointer-events-none"
        }`}
      >
        {options.map((option) => (
          <div
            key={option}
            className="px-3 py-1 cursor-pointer hover:bg-white/30"
            onClick={() => {
              setSelected(option);
              setOpen(false);
            }}
          >
            {option}
          </div>
        ))}
      </div>
    </div>




      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-teal-600 text-white text-center">
              <th className="py-2 px-4">Serial</th>
              <th className="py-2 px-4">User</th>
              <th className="py-2 px-4">Subscription Type</th>
              <th className="py-2 px-4">Amount</th>
              <th className="py-2 px-4">Acc Number</th>
              <th className="py-2 px-4">Date</th>
              <th className="py-2 px-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((item, idx) => (
              <tr
                key={idx}
                className="border-b border-gray-700 hover:bg-gray-800 transition text-center"
              >
                <td className="py-2 px-4">{item.serial}</td>
                <td className="py-2 px-4 flex items-center gap-2 justify-center">
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
                <td className="py-2 px-4">
                  <button>
                    <Image
                      src="/icon/eye.svg"
                      alt="action"
                      width={24}
                      height={24}
                      className="inline"
                    />
                  </button>
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
}
