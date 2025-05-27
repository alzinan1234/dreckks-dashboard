"use client";

import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import StatCard from "@/components/StatCard";
import ChartCard from "@/components/ChartCard";
import RegistrationTable from "@/components/RegistrationTable";

export default function DashboardPage() {
  return (
    <div className="flex bg-black text-white min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar />            
        <div className="py-[24px] p-6 px-[12px] grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3 border border-red-500 w-full">
          <StatCard title="Total User" value="2,500" change="+4%" period="From last month" />
          <StatCard title="Total Service provider" value="200" change="+4%" period="From last month" />
        </div>

        <div className="p-6 grid grid-cols-1 xl:grid-cols-2 gap-6">
          <ChartCard title="Earning Summary" />
          <ChartCard title="Alcohol Consumption Trend Line Chart" />
        </div>

        <div className="p-6">
          <RegistrationTable />
        </div>
      </div>
    </div>
  );
}


