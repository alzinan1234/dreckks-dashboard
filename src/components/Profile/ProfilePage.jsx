"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import ChangePasswordForm from "./ChangePasswordForm"; // Import the ChangePasswordForm

export default function ProfilePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("changePassword"); // Set initial tab to 'changePassword'

  const handleBackClick = () => {
    router.back(); // Go back to the previous page
  };

  return (
    <div className="min-h-screen bg-[#343434] text-white flex justify-center items-start pt-8 pb-8 rounded-lg">
      <div
        className="flex items-center gap-4  cursor-pointer ml-5 "
        onClick={handleBackClick}
      >
       <div className="">
         <ArrowLeft className="text-white bg-[#FFFFFF1A] rounded-full p-2 " size={40} />
       </div>
        <h1 className="text-2xl font-bold">Profile</h1>
      </div>{" "}
      {/* Added flex, justify-center, items-start, pt-8, pb-8 */}
      <div className="w-full max-w-6xl mx-auto px-4">
        {" "}
        {/* Removed redundant mx-auto from here if parent centers */}
        <div className="  p-6">
          {" "}
          {/* This is the inner card, not the entire page bg */}
          <div className="flex justify-center gap-[18px] items-center mb-6">
            <div className="relative rounded-full border-4 border-gray-600">
              <Image
                src="/image/userImage.png"
                alt="User Profile"
                width={80}
                height={80}
                className="rounded-full"
              />
              <span className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-1 border-2 border-[#343434]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-white"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M13.586 3.586a2 2 0 112.828 2.828l-7.793 7.793a.5.5 0 01-.128.093l-3 1a.5.5 0 01-.611-.611l1-3a.5.5 0 01.093-.128l7.793-7.793zM10.707 6.293a1 1 0 00-1.414 1.414L12 9.414l1.293-1.293a1 1 0 00-1.414-1.414L10.707 6.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </div>
         <div className="flex flex-col gap-[12px]">
              <h2 className="text-[24px] font-bold mt-3 text-white">Lukas Wagner</h2>
            <p className="text-white font-[400] text-xl">Admin</p>
         </div>
          </div>
          <div className="flex justify-center mb-6  ">
            <button
              className={`py-2 px-6 text-[16px] font-semibold ${
                activeTab === "editProfile"
                  ? "border-b-2 border-[#17787C] text-[#17787C]"
                  : "text-white hover:text-gray-300"
              }`}
              onClick={() => setActiveTab("editProfile")}
            >
              Edit Profile
            </button>
            <button
              className={`py-2 px-6 text-[16px] font-semibold ${
                activeTab === "changePassword"
                  ? "border-b-2 border-[#17787C] text-[#17787C]"
                  : "text-white hover:text-gray-300"
              }`}
              onClick={() => setActiveTab("changePassword")}
            >
              Change Password
            </button>
          </div>
          {/* Content based on active tab */}
          {activeTab === "editProfile" && (
            <div className="p-6 flex flex-col items-center">
              {" "}
              {/* Added flex-col and items-center to center form fields */}
             
              <form className="w-full max-w-[982px] ">
                {" "}
                {/* Constrain form width */}
                <div className="mb-4">
                  <label
                    htmlFor="fullName"
                    className="block text-white text-sm font-bold mb-2"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    className="shadow appearance-none rounded w-full h-[50px] py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline  border border-[#C3C3C3] text-white" // Applied styles
                    defaultValue="Lukas Wagner"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-white text-sm font-bold mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="shadow appearance-none rounded w-full h-[50px] py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline  border border-[#C3C3C3] text-white" // Applied styles
                    defaultValue="lukas.wagner@example.com"
                  />
                </div>
                <div className="mb-4">
                  {" "}
                  {/* New Contact No field */}
                  <label
                    htmlFor="contactNo"
                    className="block text-[white ]text-sm font-bold mb-2"
                  >
                    Contact No
                  </label>
                  <input
                    type="tel" // Use type="tel" for phone numbers
                    id="contactNo"
                    className="shadow appearance-none rounded w-full h-[50px] py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline  border border-[#C3C3C3] text-white" // Applied styles
                    defaultValue="+1234567890" // Example default value
                  />
                </div>
                <div className="flex items-center justify-center mt-6">
                  <button
                    type="submit"
                    className="bg-[#00C1C9] hover:bg-opacity-80 text-white font-bold w-full py-3 px-4 rounded-[4px] focus:outline-none focus:shadow-outline "
                    style={{
                      boxShadow: "3px 3px 0px 0px #71F50C",
                    }}
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          )}
          {activeTab === "changePassword" && <ChangePasswordForm />}
        </div>
      </div>
    </div>
  );
}
