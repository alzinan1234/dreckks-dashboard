'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, FileText, Wallet, Users, Megaphone, Network,
  Dumbbell, Image, CreditCard, HelpCircle, Bell, Settings, LogOut
} from 'lucide-react';

const navItems = [
  { name: 'Dashboard', href: '/Dashboard', icon: LayoutDashboard },
  { name: 'Manage Registrations', href: '/manage-registrations', icon: FileText },
  { name: 'Earning', href: '/earning', icon: Wallet },
  { name: 'User Management', href: '/user-management', icon: Users },
  { name: 'Promotion Setup', href: '/promotion-setup', icon: Megaphone },
  { name: 'Session Management', href: '/session-management', icon: Network },
  { name: 'Trainer Management', href: '/trainer-management', icon: Dumbbell },
  { name: 'Banner Management', href: '/banner-management', icon: Image },
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
        <div className="p-4 flex items-center space-x-2 border-b border-white">
          <div className="w-8 h-8 bg-green-600 rounded-full" />
          <h1 className="text-lg font-semibold">NikoSafe</h1>
        </div>

        <nav className="mt-4 space-y-1">
          {navItems.map(({ name, href, icon: Icon }) => {
            const isActive = pathname.startsWith(href);
            return (
              <Link
                key={name}
                href={href}
                className={`flex items-center px-4 py-2 rounded-l-full transition ${
                  isActive
                    ? 'bg-cyan-400 text-black font-medium'
                    : 'hover:bg-zinc-800'
                }`}
              >
                <Icon className="w-5 h-5 mr-3" />
                <span>{name}</span>
              </Link>
            );
          })}
        </nav>

        
      <div className="p-4 border-t border-white">
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
