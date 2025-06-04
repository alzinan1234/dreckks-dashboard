"use client";
import { useState } from "react";
import CreateSubscriptionModal from "./CreateSubscriptionModal";
import ViewCategoryModal from "./ViewCategoryModal";
import CreateCategoryModal from "./CreateCategoryModal";

export default function SubscriptionsPage() {
  const [showCreateSubscriptionModal, setShowCreateSubscriptionModal] =
    useState(false);
  const [showViewCategoryModal, setShowViewCategoryModal] = useState(false);
  const [showCreateCategoryModal, setShowCreateCategoryModal] = useState(false);

  const openCreateSubscriptionModal = () =>
    setShowCreateSubscriptionModal(true);
  const closeCreateSubscriptionModal = () =>
    setShowCreateSubscriptionModal(false);

  const openViewCategoryModal = () => setShowViewCategoryModal(true);
  const closeViewCategoryModal = () => setShowViewCategoryModal(false);

  const openCreateCategoryModal = () => setShowCreateCategoryModal(true);
  const closeCreateCategoryModal = () => setShowCreateCategoryModal(false);

  // Sample subscription data
  const subscriptions = [
    {
      id: 1,
      title: "Premium Membership",
      frequency: "Monthly",
      price: "₦2,000",
      features: [
        "Get Unlimited Dear Diary Entries",
        "Get Full Check-In",
        "Exclusive Discounts on Safety Store Products",
        "20% off all therapy session",
        "Can add up to 5 contact",
      ],
    },
    {
      id: 2,
      title: "Pro Plan",
      frequency: "Annually",
      price: "₦20,000",
      features: [
        "All Premium Membership features",
        "Priority Support",
        "Early access to new features",
        "Customizable reports",
        "Can add up to 10 contacts",
      ],
    },
    {
      id: 3,
      title: "Basic Plan",
      frequency: "Quarterly",
      price: "₦5,000",
      features: [
        "Limited Dear Diary Entries (10 per month)",
        "Basic Check-In",
        "10% off selected Safety Store Products",
        "10% off all therapy session",
        "Can add up to 2 contacts",
      ],
    },
  ];

  return (
    <div>
      <div className=" bg-[#2E2E2E] text-white p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-[20px] font-semibold">Subscriptions</h1>
          <button
            onClick={openCreateSubscriptionModal}
            className="bg-white hover:bg-blue-700 text-black font-medium text-[12px] py-2 px-4 rounded-full flex items-center"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              ></path>
            </svg>
            Create Subscriptions
          </button>
        </div>

        <div className=" md:flex gap-[26px] ">
          {subscriptions.map((subscription) => (
            <div
              key={subscription.id}
              className="border border-[#E4E4E4] rounded-lg p-6 shadow-lg w-[338px] h-auto"
            >
              <h2 className="text-[24px] text-[#BBBBBB] font-semibold mb-2">
                {subscription.title}
              </h2>
              <p className="text-[30px] font-semibold mb-4 bg-gradient-to-b from-[#FFFFFF] to-[#686868] text-transparent bg-clip-text">
                {subscription.frequency}
              </p>
              <p className="text-5xl font-semibold mb-6 bg-gradient-to-b from-[#FFFFFF] to-[#686868] text-transparent bg-clip-text">
                {subscription.price}
              </p>

              <ul className="space-y-3 mb-6 text-[#595959]">
                {subscription.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <svg
                      className="w-7 h-5 text-[#595959] mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="flex space-x-2">
                <button className="text-gray-400 hover:text-white border p-[10px] border-[#FFFFFF1A] rounded-full">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    ></path>
                  </svg>
                </button>
                <button className="text-red-500 hover:text-red-400 border rounded-full border-[#FF000033] p-[10px]">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {showCreateSubscriptionModal && (
          <CreateSubscriptionModal
            onClose={closeCreateSubscriptionModal}
            onViewCategory={openViewCategoryModal}
            onCreateCategory={openCreateCategoryModal}
          />
        )}
        {showViewCategoryModal && (
          <ViewCategoryModal onClose={closeViewCategoryModal} />
        )}
        {showCreateCategoryModal && (
          <CreateCategoryModal onClose={closeCreateCategoryModal} />
        )}
      </div>

      
      {/* Pagination Section */}
      <div className="flex justify-end items-center mt-6 gap-2 text-sm">
        <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-[#2d2d2d] text-gray-400">
          &#8249; {/* Left arrow */}
        </button>
        <button className="w-8 h-8 bg-cyan-500 text-white rounded">1</button>
        <button className="w-8 h-8 hover:bg-[#2d2d2d] text-gray-400">2</button>
        <button className="w-8 h-8 hover:bg-[#2d2d2d] text-gray-400">3</button>
        <button className="w-8 h-8 hover:bg-[#2d2d2d] text-gray-400">4</button>
        <span className="px-2 text-gray-400">...</span>
        <button className="w-8 h-8 hover:bg-[#2d2d2d] text-gray-400">30</button>
        <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-[#2d2d2d] text-gray-400">
          &#8250; {/* Right arrow */}
        </button>
      </div>
    </div>
  );
}