export default function StatCard({ title, value, change, period }) {
  return (
    <div className="bg-[#343434] p-10 rounded-lg shadow-lg  rounded-[12px] w-[575px] border borders-red-5
    00 w-full">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm text-gray-400">{title}</h3>
        <select className="bg-gray-700 text-white text-sm rounded px-2 py-1">
          <option>January</option>
        </select>
      </div>
      <h2 className="text-2xl font-bold">{value}</h2>
      <p className="text-sm text-green-400 mt-1">{change} <span className="text-gray-400">{period}</span></p>
    </div>
  );
}
