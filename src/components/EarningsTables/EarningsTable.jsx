"use client";
import { useState } from "react";
import Image from "next/image";

import { ChevronDown } from "lucide-react";

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
          <div className="flex items-center bg-[#0000001A] rounded overflow-hidden p-1 shadow-inner ">
                   {/* Search Icon (Magnifying Glass) */}
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
         
                   {/* Search Input Field */}
                   <input
                     type="text"
                     className="flex-grow bg-transparent outline-none text-[#DBDBDB] placeholder-gray-200 px-2 py-2 text-lg w-[197.76px] h-[32px]"
                     placeholder="Search"
                     aria-label="Search input"
                   />
         
                   {/* Filter Button */}
                   <button
                     className="flex-shrink-0 bg-black text-white rounded-full w-10 h-10 flex items-center justify-center transition duration-300 ease-in-out hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
                     aria-label="Filter search results"
                   >
                     <Image src="/icon/search-icon.svg" alt="Search Icon" width={20} height={20} />
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
