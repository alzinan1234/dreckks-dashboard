export default function StatCard({ title, value, change, period }) {
  return (
    <div className="bg-[#343434] p-10  shadow-lg  rounded-[12px]  ">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm text-white">{title}</h3>
        <select className=" text-white text-sm  px-2 py-1 rounded-[18px] bg-[#0000001A]">
          <option>January</option>
        </select>
      </div>
      <h2 className="text-2xl font-bold">{value}</h2>
      <div className="flex items-center gap-2 mt-2">
        <div className="flex items-center gap-2  bg-[#4BB54B1A] rounded-[19px] py-[2px] px-[5px] w-[45px]">
         <span><img src="./icon/auto-conversations.png" alt="" /></span>
        <p className="text-sm text-green-400 mt-1">{change} </p>
       
      </div>
    <div>
        <span className="text-gray-400">{period}</span>
    </div>
      </div>
    </div>
  );
}
