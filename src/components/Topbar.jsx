import { Bell, Circle } from "lucide-react";

export default function Topbar() {
  return (
    <header className="flex items-center justify-end bg-[#343434] px-6 py-4 border-b border-white">
      <div className="flex items-center gap-6">
        <div className="relative cursor-pointer">
          <Bell className="text-white" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full"></span>
        </div>
        <div className="relative w-8 h-8 rounded-full bg-gray-600">
          <Circle className="absolute bottom-0 right-0 text-green-500 w-3 h-3" fill="green" />
        </div>
      </div>
    </header>
  );
}