'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
  ArrowLeftIcon,
  MagnifyingGlassIcon,
  AdjustmentsHorizontalIcon,
  EyeIcon, // For view
  TrashIcon, // For delete
  CheckCircleIcon, // For mark as read/unread
  EnvelopeIcon // Alternative for unread
} from '@heroicons/react/24/outline'; // Outline for action icons

// Corrected import path, assuming 'lib' is at the project root level
// relative to 'app/components' or 'src/components'
import { notifications as initialNotifications } from '../../components/lib/notificationData'; // Import mock data

// NotificationPage now accepts an onBackClick prop
const NotificationPage = ({ onBackClick }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [allNotifications, setAllNotifications] = useState(initialNotifications); // Use state to manage notifications for deletion/read status

  const now = useMemo(() => new Date(), []); // Memoize current time for grouping calculations

  const getRelativeTime = (timestamp) => {
    const notificationDate = new Date(timestamp);
    const diffMinutes = Math.round((now.getTime() - notificationDate.getTime()) / (1000 * 60));
    const diffHours = Math.round(diffMinutes / 60);

    if (diffMinutes < 60) {
      return `${diffMinutes} min ago`;
    } else if (diffHours < 24) {
      return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    } else {
      // For simplicity, just return a formatted date for older items.
      // In a real app, you might differentiate days more clearly.
      return notificationDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }
  };

  // Group and filter notifications
  const groupedNotifications = useMemo(() => {
    const filtered = allNotifications.filter(notif =>
      notif.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notif.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const today = [];
    const yesterday = [];
    const older = [];

    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startOfYesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);

    filtered.forEach(notif => {
      const notifDate = new Date(notif.timestamp);
      if (notifDate >= startOfToday) {
        today.push(notif);
      } else if (notifDate >= startOfYesterday) {
        yesterday.push(notif);
      } else {
        older.push(notif); // Or discard if only showing today/yesterday
      }
    });

    return { today, yesterday, older };
  }, [allNotifications, searchTerm, now]);

  const handleDeleteNotification = (id) => {
    setAllNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const handleToggleReadStatus = (id) => {
    setAllNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, isRead: !notif.isRead } : notif
      )
    );
  };

  const NotificationItem = ({ notification }) => {
    const statusClasses = notification.isRead
      ? 'text-[#B0B0B0]' // Read notifications can be slightly faded
      : 'text-white'; // Unread notifications stand out

    return (
      <div className={`flex items-center justify-between p-4 border-b border-[#FFFFFF4D] ${notification.isRead ? '' : ''} last:border-b-0 transition-colors duration-200`}>
        <div className="flex-grow">
          <p className={`text-base font-semibold ${statusClasses}`}>{notification.title}</p>
          <p className={`text-sm ${statusClasses}`}>{notification.description}</p>
        </div>
        <div className="flex items-center space-x-4 ml-4">
          <span className="text-xs text-[#B0B0B0] whitespace-nowrap">
            {getRelativeTime(notification.timestamp)}
          </span>
          <div className="flex space-x-2">
            {/* View/Eye Icon (Placeholder for details, no modal in this design for simplicity) */}
           
            {/* Mark as Read/Unread Icon */}
            <button
              onClick={() => handleToggleReadStatus(notification.id)}
              className={`${notification.isRead ? 'text-blue-400' : 'text-purple-600'} hover:opacity-75 p-1 rounded-full transition-opacity duration-200`}
              aria-label={notification.isRead ? 'Mark as unread' : 'Mark as read'}
            >
              {notification.isRead ? (
                <CheckCircleIcon className="h-5 w-5" />
              ) : (
                <EyeIcon className="h-5 w-5" /> // Envelope for unread, check for read
              )}
            </button>
            {/* Delete Icon */}
            <button
              onClick={() => handleDeleteNotification(notification.id)}
              className="text-red-500 hover:text-red-400 p-1 rounded-full transition-colors duration-200"
              aria-label="Delete notification"
            >
              <TrashIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    );
  };


  return (
    <div className="bg-[#343434] min-h-screen text-white p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          {/* Back button now calls onBackClick prop */}
          <button
            className="text-[#B0B0B0] hover:text-white transition-colors duration-200"
            onClick={onBackClick} // Add onClick handler
            aria-label="Go back"
          >
            <ArrowLeftIcon className="h-6 w-6" />
          </button>
          <h1 className="text-2xl sm:text-3xl font-bold">Notification</h1>
        </div>
        <div className="flex items-center space-x-2 bg-[#262626] rounded-md p-2 pr-4 border border-[#FFFFFF4D]">
          <MagnifyingGlassIcon className="h-5 w-5 text-[#B0B0B0] ml-2" />
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent focus:outline-none text-white placeholder-[#B0B0B0] w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="text-[#B0B0B0] hover:text-white transition-colors duration-200">
            <AdjustmentsHorizontalIcon className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Notification List Container */}
      <div className=" rounded-lg shadow-lg overflow-hidden border border-[#FFFFFF4D]">
        {groupedNotifications.today.length > 0 && (
          <div className="py-2  border-b border-[#FFFFFF4D]">
            <h2 className="text-lg font-semibold text-white">
              Today <span className="text-[#B0B0B0] text-sm">({groupedNotifications.today.length})</span>
            </h2>
            {groupedNotifications.today.map(notif => (
              <NotificationItem key={notif.id} notification={notif} />
            ))}
          </div>
        )}

        {groupedNotifications.yesterday.length > 0 && (
          <div className="py-2 px-4 border-b border-[#FFFFFF4D]">
            <h2 className="text-lg font-semibold text-white">
              Yesterday <span className="text-[#B0B0B0] text-sm">({groupedNotifications.yesterday.length})</span>
            </h2>
            {groupedNotifications.yesterday.map(notif => (
              <NotificationItem key={notif.id} notification={notif} />
            ))}
          </div>
        )}

        {/* You can add an "Older" section if you want to display them, otherwise, they are filtered out implicitly by the grouping */}
        {groupedNotifications.older.length > 0 && (
          <div className="py-2 px-4">
            <h2 className="text-lg font-semibold text-white">
              Older <span className="text-[#B0B0B0] text-sm">({groupedNotifications.older.length})</span>
            </h2>
            {groupedNotifications.older.map(notif => (
              <NotificationItem key={notif.id} notification={notif} />
            ))}
          </div>
        )}

        {groupedNotifications.today.length === 0 &&
         groupedNotifications.yesterday.length === 0 &&
         groupedNotifications.older.length === 0 && (
          <p className="p-4 text-center text-[#B0B0B0]">No notifications found.</p>
        )}
      </div>
    </div>
  );
};

export default NotificationPage;
