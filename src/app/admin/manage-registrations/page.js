const dummyRows = [
  { id: "NK-01", name: "Alice Johnson", email: "alice@email.com", date: "2024-01-21" },
  { id: "NK-02", name: "Bob Smith", email: "bob@email.com", date: "2024-02-11" },
  { id: "NK-03", name: "Charlie Brown", email: "zinan@gmail.com", date: "2024-03-05" },
  { id: "NK-04", name: "Diana Prince", email: "fuad@gmai.com", date: "2024-04-15" },
];

export default function RegistrationTable() {
  return (
    <div className="bg-[#343434] p-4 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-[20px] font-semibold text-white">Manage Registrations</h2>
         <div className="flex items-center bg-[#0000001A] rounded-full overflow-hidden p-1 shadow-inner ">
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
            <img src="./icon/search-icon.svg" alt="" />
          </button>
        </div>
      </div>

      {/* Info row before table */}
     

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="text-white bg-[#00C1C980] border-b border-gray-700 ">
              <th className="py-2  font-[700] text-[14px] text-center">Membership ID</th>
              <th className="text-center">Name</th>
              <th className="text-center">Email</th>
              <th className="text-center">Date</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {dummyRows.map((row, i) => (
              <tr key={i} className="border-b border-gray-700 text-white">
                <td className="py-2 text-center">{row.id}</td>
                <td className="text-center">{row.name}</td>
                <td className="text-center">{row.email}</td>
                <td className="text-center">{row.date}</td>
                <td className="py-2">
                  <div className="flex items-center justify-center gap-2">
                    <img className=" cursor-pointer" src="./icon/right.svg" alt="Right" />
                    <img className=" cursor-pointer" src="./icon/trash.svg" alt="Trash" />
                    <img className=" cursor-pointer" src="./icon/eye.svg" alt="Eye" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
