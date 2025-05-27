import { Eye, Trash2 } from "lucide-react";

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
        <h2 className="text-lg font-semibold text-white">Manage Registrations</h2>
        <input
          type="text"
          placeholder="Search..."
          className="px-3 py-1 rounded bg-gray-700 text-white text-sm"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="text-gray-400 border-b border-gray-700">
              <th className="py-2">Membership ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {dummyRows.map((row, i) => (
              <tr key={i} className="border-b border-gray-700 text-white">
                <td className="py-2">{row.id}</td>
                <td>{row.name}</td>
                <td>{row.email}</td>
                <td>{row.date}</td>
                <td className="flex gap-2">
                  <Eye className="w-4 h-4 cursor-pointer text-blue-400" />
                  <Trash2 className="w-4 h-4 cursor-pointer text-red-400" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
