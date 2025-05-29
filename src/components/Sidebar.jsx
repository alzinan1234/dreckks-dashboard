'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, FileText, Wallet, Users, Megaphone, Network,
  Dumbbell, CreditCard, HelpCircle, Bell, Settings, LogOut, Image as ImageIcon
} from 'lucide-react';
import dreckks from '../../public/dreckks-logo.png';
import Image from 'next/image';

const navItems = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Manage Registrations', href: '/admin/manage-registrations', icon: FileText },
  { name: 'Earning', href: '/admin/earning', icon: Wallet },
  { name: 'User Management', href: '/user-management', icon: Users },
  { name: 'Promotion Setup', href: '/promotion-setup', icon: Megaphone },
  { name: 'Session Management', href: '/session-management', icon: Network },
  { name: 'Trainer Management', href: '/trainer-management', icon: Dumbbell },
  { name: 'Banner Management', href: '/banner-management', icon: ImageIcon }, // Fixed icon
  { name: 'Subscriptions', href: '/subscriptions', icon: CreditCard },
  { name: 'Support', href: '/support', icon: HelpCircle },
  { name: 'Notifications', href: '/notifications', icon: Bell },
  { name: 'Settings', href: '/settings', icon: Settings },
];

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-screen bg-[#343434] text-white flex flex-col justify-between border-r border-white">
      <div>
        <div className="p-4 flex items-center border-b border-[#D6D6D6]">
          <Image src={dreckks} alt="logo" width={135} height={36} />
        </div>

        <nav className="mt-4 space-y-6">
          {navItems.map(({ name, href, icon: Icon }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={name}
                href={href}
                className={`flex items-center px-4 w-[218px] mx-auto  py-2  transition-all ${
                  isActive
                    ? 'bg-[#00C1C9] text-white shadow-[1.5px_1.5px_0_0_#71F50C]'
                    : 'hover:bg-zinc-800'
                }`}
              >
                <Icon className="w-5 h-5 mr-3" />
                <span className='font-normal text-[14px]'>{name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-[#D6D6D6] mt-4 ml-4">
          <button className="flex items-center text-red-500 hover:text-red-600">
            <LogOut className="w-5 h-5 mr-2" />
            Logout
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
