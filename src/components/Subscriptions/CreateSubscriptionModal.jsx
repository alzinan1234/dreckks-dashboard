"use client"
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { Loader2, XCircle } from "lucide-react";
import React, { useState } from "react";
import axios from "axios";
import ModalWrapper from "./ModalWrapper";
import Image from "next/image";

export default function CreateSubscriptionModal({
  onClose,
}) {
  const [title, setTitle] = useState("");
  const [billingCycle, setBillingCycle] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [features, setFeatures] = useState([]); // State to hold the list of features
  const [newFeature, setNewFeature] = useState(""); // State for the new feature input
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleAddFeature = () => {
    if (newFeature.trim() !== "") {
      setFeatures([...features, newFeature.trim()]);
      setNewFeature(""); // Clear the input field
    }
  };

  const handleRemoveFeature = (indexToRemove) => {
    setFeatures(features.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const payload = {
        title,
        billingCycle: billingCycle,
        category: category,
        price: parseFloat(price),
        features,
        isActive: true
      };

      const response = await axios.post(
        "https://dreckks-backend.onrender.com/api/v1/subscription/create-subscription",
        payload
      );

      console.log("API Response:", response.data);
      setMessage({ type: "success", text: "Subscription created successfully!" });

      // Close modal after a short delay to show success message
      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (err) {
      console.error("API Error:", err.response ? err.response.data : err.message);
      setMessage({
        type: "error",
        text: `Failed to create subscription: ${err.response?.data?.message || err.message || "Unknown error"}`,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModalWrapper title="Add New Subscriptions" onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4 px-10 py-2">
        
        {/* Status Message Display */}
        {message.text && (
          <div
            className={`p-3 rounded-md mb-4 ${
              message.type === "success"
                ? "bg-green-500 text-white"
                : "bg-red-500 text-white"
            }`}
          >
            {message.text}
          </div>
        )}

        <div>
          <label htmlFor="title" className="block text-white text-sm font-bold mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="shadow appearance-none border border-[#929292] rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
            placeholder="e.g., Premium Membership"
            required
          />
        </div>

        <div className="relative">
          <label htmlFor="billingCycle" className="block text-white text-sm font-bold mb-2">
            Billing cycle
          </label>
          <div className="relative">
            <select
              id="billingCycle"
              value={billingCycle}
              onChange={(e) => setBillingCycle(e.target.value)}
              className="shadow appearance-none border border-[#929292] rounded w-full py-2 px-3 pr-10 text-white leading-tight focus:outline-none focus:shadow-outline"
              required
            >
              <option className="bg-black" value="">Select a cycle</option>
              <option className="bg-gray-500" value="monthly">Monthly</option>
              <option className="bg-gray-500" value="quarterly">Quarterly</option>
              <option className="bg-gray-500" value="yearly">Annually</option>
            </select>
            <ChevronDownIcon className="w-5 h-5 text-white absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        <div className="relative">
          <label htmlFor="category" className="block text-white text-sm font-bold mb-2">
            Category
          </label>
          <div className="relative">
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="shadow appearance-none border border-[#929292] rounded w-full py-2 px-3 pr-10 text-white leading-tight focus:outline-none focus:shadow-outline"
              required
            >
              <option className="bg-black" value="">Select a category</option>
              <option className="bg-gray-500" value="USER">User</option>
              <option className="bg-gray-500" value="HOSPITALITY_VENUE">Hospitality Venue</option>
              <option className="bg-gray-500" value="SERVICE_PROVIDER">Service Provider</option>
            </select>
            <ChevronDownIcon className="w-5 h-5 text-white absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        <div>
          <label htmlFor="features" className="block text-white text-sm font-bold mb-2">
            Features
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              id="features"
              value={newFeature}
              onChange={(e) => setNewFeature(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddFeature();
                }
              }}
              className="shadow appearance-none border border-[#929292] rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Add a new feature"
            />
            <button
              type="button"
              onClick={handleAddFeature}
              className="bg-cyan-400 hover:bg-cyan-300 text-white font-bold py-2 px-4 rounded border-b-4 border-lime-400"
            >
              Add
            </button>
          </div>
          <div className="mt-2 flex flex-wrap gap-2 p-2 border border-[#929292] rounded min-h-[40px]">
            {features.map((feature, index) => (
              <span key={index} className="bg-[#555] text-white text-sm px-3 py-1 rounded-full flex items-center gap-2">
                {feature}
                <button
                  type="button"
                  onClick={() => handleRemoveFeature(index)}
                  className="text-white hover:text-gray-200"
                >
                  &times;
                </button>
              </span>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="price" className="block text-white text-sm font-bold mb-2">
            Price
          </label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="shadow appearance-none border border-[#929292] rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
            placeholder="e.g., 2000"
            required
          />
        </div>

        <div className="col-span-full mt-[160px]">
          <button
            type="submit"
            className="w-full mx-auto flex justify-center items-center rounded-full bg-cyan-400 hover:bg-cyan-300 text-white py-2 font-medium border-b-4 border-lime-400 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="animate-spin" size={20} />
                Saving...
              </span>
            ) : (
              "Save"
            )}
          </button>
        </div>
      </form>
    </ModalWrapper>
  );
}
