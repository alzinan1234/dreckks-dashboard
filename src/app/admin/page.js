import StatCard from "@/components/StatCard";
import RegistrationTable from "@/components/RegistrationTable";
import ChartCard from "@/components/ChartCard";
import { Area, ResponsiveContainer } from "recharts";

const Admin = () => {
  return (
    <>
      <div className="">
        <div className=" p-6  grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3  w-full">
          <StatCard
            title="Total User"
            value="2,500"
            change="4%"
            period="From last month"
          />
          <StatCard
            title="Total Service provider"
            value="200"
            change="4%"
            period="From last month"
          />
        </div>

        <div className="p-6 grid grid-cols-1 xl:grid-cols-2 gap-6">
          <ChartCard title="Earning Summary" />
          <ChartCard title="Alcohol Consumption Trend Line Chart" />
        </div>

        <div className="p-6">
          <RegistrationTable />
        </div>
      </div>
    </>
  );
};
export default Admin;
