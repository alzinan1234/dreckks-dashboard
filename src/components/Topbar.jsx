'use client';

import React from 'react';
import { Bell, Circle } from "lucide-react";
import Image from 'next/image';

// Topbar component now accepts an onBellClick prop
export default function Topbar({ onBellClick }) {
  return (
    <header className="flex items-center justify-end bg-[#343434] p-3.5 border-b border-[#D6D6D6]">
      <div className="flex items-center gap-6">
        {/* Notification Bell with onClick handler */}
        <div className="relative cursor-pointer flex items-center gap-2 bg-[#0000001A] rounded-[38px] py-[5px] px-[8px]" onClick={onBellClick}>
           <Image  src="/icon/notification-02.svg" alt="Elements Icon" width={32} height={32} />
          <span className=" text-[#4BB54B] bg-[#000] rounded-full  px-3 py-1">8</span>
        </div>
        <div className="relative rounded-full">
           <Image src="/image/userImage.png" alt="Elements Icon" width={40} height={40} />
        </div>
      </div>
    </header>
  );
}
