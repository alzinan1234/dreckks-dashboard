// components/AddNewTrainerModal.jsx
import React, { useState } from 'react';
import Image from 'next/image';

const AddNewTrainerModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    id: '',
    name: '',
    email: '',
    perHourRate: '',
    yearsExperience: '',
    coachingExpertise: '',
    bio: '',
    achievements: '',
    location: '',
    preferredTrainingLocations: '',
    availability: '',
    timeSlots: '',
    avatar: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('New Trainer Data:', formData);
    // Here you would typically send this data to your backend API
    onClose(); // Close modal after submission
    // Optionally reset form: setFormData({ ...initialState });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-[#343434] p-6 rounded-lg text-white w-full max-w-2xl relative max-h-[90vh] overflow-y-auto custom-scrollbar">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
          aria-label="Close"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <h2 className="text-2xl font-semibold mb-6 text-center">Add New Trainer</h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="col-span-full mb-4 flex justify-center">
            {/* Placeholder for avatar upload or selection */}
            <Image
              src={formData.avatar || "/images/placeholder-avatar.png"}
              alt="Trainer Avatar"
              width={100}
              height={100}
              className="rounded-full object-cover border-2 border-cyan-500"
            />
          </div>

          {/* Form fields */}
          <div>
            <label htmlFor="name" className="block text-gray-400 text-sm mb-1">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 rounded bg-[#2d2d2d] border border-gray-600 focus:outline-none focus:border-cyan-500"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-gray-400 text-sm mb-1">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 rounded bg-[#2d2d2d] border border-gray-600 focus:outline-none focus:border-cyan-500"
              required
            />
          </div>
          <div>
            <label htmlFor="perHourRate" className="block text-gray-400 text-sm mb-1">Per Hour Rate ($)</label>
            <input
              type="number"
              id="perHourRate"
              name="perHourRate"
              value={formData.perHourRate}
              onChange={handleChange}
              className="w-full p-2 rounded bg-[#2d2d2d] border border-gray-600 focus:outline-none focus:border-cyan-500"
              required
            />
          </div>
          <div>
            <label htmlFor="yearsExperience" className="block text-gray-400 text-sm mb-1">Years of Experience</label>
            <input
              type="number"
              id="yearsExperience"
              name="yearsExperience"
              value={formData.yearsExperience}
              onChange={handleChange}
              className="w-full p-2 rounded bg-[#2d2d2d] border border-gray-600 focus:outline-none focus:border-cyan-500"
              required
            />
          </div>
          <div className="col-span-full">
            <label htmlFor="coachingExpertise" className="block text-gray-400 text-sm mb-1">Coaching Expertise</label>
            <input
              type="text"
              id="coachingExpertise"
              name="coachingExpertise"
              value={formData.coachingExpertise}
              onChange={handleChange}
              className="w-full p-2 rounded bg-[#2d2d2d] border border-gray-600 focus:outline-none focus:border-cyan-500"
            />
          </div>
          <div className="col-span-full">
            <label htmlFor="bio" className="block text-gray-400 text-sm mb-1">Bio</label>
            <textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows="3"
              className="w-full p-2 rounded bg-[#2d2d2d] border border-gray-600 focus:outline-none focus:border-cyan-500"
            ></textarea>
          </div>
          <div className="col-span-full">
            <label htmlFor="achievements" className="block text-gray-400 text-sm mb-1">Achievements (comma-separated)</label>
            <input
              type="text"
              id="achievements"
              name="achievements"
              value={formData.achievements}
              onChange={handleChange}
              placeholder="e.g., Certified IPTPA Level II Coach, Coached 100+ Players"
              className="w-full p-2 rounded bg-[#2d2d2d] border border-gray-600 focus:outline-none focus:border-cyan-500"
            />
          </div>
          <div>
            <label htmlFor="location" className="block text-gray-400 text-sm mb-1">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full p-2 rounded bg-[#2d2d2d] border border-gray-600 focus:outline-none focus:border-cyan-500"
            />
          </div>
          <div>
            <label htmlFor="preferredTrainingLocations" className="block text-gray-400 text-sm mb-1">Preferred Training Locations (comma-separated)</label>
            <input
              type="text"
              id="preferredTrainingLocations"
              name="preferredTrainingLocations"
              value={formData.preferredTrainingLocations}
              onChange={handleChange}
              className="w-full p-2 rounded bg-[#2d2d2d] border border-gray-600 focus:outline-none focus:border-cyan-500"
            />
          </div>
          <div>
            <label htmlFor="availability" className="block text-gray-400 text-sm mb-1">Availability</label>
            <input
              type="text"
              id="availability"
              name="availability"
              value={formData.availability}
              onChange={handleChange}
              placeholder="e.g., Monday to Friday"
              className="w-full p-2 rounded bg-[#2d2d2d] border border-gray-600 focus:outline-none focus:border-cyan-500"
            />
          </div>
          <div>
            <label htmlFor="timeSlots" className="block text-gray-400 text-sm mb-1">Time Slots (comma-separated)</label>
            <input
              type="text"
              id="timeSlots"
              name="timeSlots"
              value={formData.timeSlots}
              onChange={handleChange}
              placeholder="e.g., 09:00 AM - 10:00 AM, 01:00 PM - 02:00 PM"
              className="w-full p-2 rounded bg-[#2d2d2d] border border-gray-600 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="col-span-full flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-600 text-white px-5 py-2 rounded-md hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-cyan-500 text-white px-5 py-2 rounded-md hover:bg-cyan-600 transition-colors"
            >
              Add Trainer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewTrainerModal;