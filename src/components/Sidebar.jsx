'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, FileText, Wallet, Users, Megaphone, Network,
  Dumbbell, CreditCard, HelpCircle, Bell, Settings, LogOut, Image as ImageIcon,
} from 'lucide-react';
import Image from 'next/image';
import dreckks from '../../public/dreckks-logo.png';
import barss from '../../public/icon/bars.png';

const navItems = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Manage Registrations', href: '/admin/manage-registrations', icon: FileText },
  { name: 'Earning', href: '/admin/earning', icon: Wallet },
  { name: 'User Management', href: '/admin/user-management', icon: Users },
  { name: 'Promotion Setup', href: '/admin/promotion-setup', icon: Megaphone },
  { name: 'Session Management', href: '/admin/session-management', icon: Network },
  { name: 'Trainer Management', href: '/trainer-management', icon: Dumbbell },
  { name: 'Banner Management', href: '/banner-management', icon: ImageIcon },
  { name: 'Subscriptions', href: '/subscriptions', icon: CreditCard },
  { name: 'Support', href: '/support', icon: HelpCircle },
  { name: 'Notifications', href: '/notifications', icon: Bell },
  { name: 'Settings', href: '/settings', icon: Settings },
];

const Sidebar = ({ isOpen, setIsOpen }) => {
  const pathname = usePathname();

  return (
    <>
      <aside
        className={`fixed top-0 left-0 h-full bg-[#343434] text-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0 w-64' : '-translate-x-full w-64'
        }`}
      >
        <div className="flex flex-col h-full justify-between border-r border-[#D6D6D6]">
          {/* Logo & Close Button */}
          <div className="flex items-center justify-between border-b border-[#D6D6D6] pb-4 p-4">
            <Image className='' src={dreckks} alt="logo" width={135} height={36} />
            <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-[#444] rounded">
              <Image src={barss} alt="close" width={20} height={20} />
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="mt-4 space-y-6 flex-grow overflow-y-auto">
            {navItems.map(({ name, href, icon: Icon }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={name}
                  href={href}
                  className={`flex items-center px-4 w-[218px] mx-auto py-2 transition-all rounded ${
                    isActive
                      ? 'bg-[#00C1C9] text-white shadow-[1.5px_1.5px_0_0_#71F50C]'
                      : 'hover:bg-zinc-800'
                  }`}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  <span className="font-normal text-[14px]">{name}</span>
                </Link>
              );
            })}

              {/* Logout Button */}
          <div className="border-t border-[#D6D6D6] pt-4 ">
            <button className="flex ml-5 items-center text-red-500 hover:text-red-600">
              <LogOut className="w-5 h-5 mr-2" />
              Logout
            </button>
          </div>


          </nav>

        
        </div>
      </aside>

      {/* Open Button (When Sidebar is Closed) */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed top-4 left-4 z-50 bg-[#343434] p-2 rounded-md shadow-lg flex items-center justify-center hover:bg-[#444] transition"
        >
          <Image src={barss} alt="menu" width={24} height={24} />
        </button>
      )}
    </>
  );
};

export default Sidebar;
