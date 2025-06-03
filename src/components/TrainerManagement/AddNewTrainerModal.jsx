// components/AddNewTrainerModal.jsx
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FaTimes, FaUpload } from "react-icons/fa"; // FaTimes for close, FaUpload for upload icon

const AddNewTrainerModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  // State for form fields (basic example, expand as needed)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    yearsOfExperience: "",
    bio: "",
    achievements: "",
    skillLevelExpertise: "",
    location: "",
    preferredTrainingLocations: "",
    perHourRate: "",
    profilePicture: null, // For file object
    availability: [], // Array of selected dates
    timeSlots: [{ startTime: "", endTime: "" }],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({
        ...prev,
        profilePicture: e.target.files[0],
      }));
    }
  };

  const handleDateSelect = (day) => {
    setFormData((prev) => {
      const newAvailability = prev.availability.includes(day)
        ? prev.availability.filter((d) => d !== day)
        : [...prev.availability, day];
      return { ...prev, availability: newAvailability.sort((a, b) => a - b) };
    });
  };

  const addTimeSlot = () => {
    setFormData((prev) => ({
      ...prev,
      timeSlots: [...prev.timeSlots, { startTime: "", endTime: "" }],
    }));
  };

  const removeTimeSlot = (index) => {
    setFormData((prev) => ({
      ...prev,
      timeSlots: prev.timeSlots.filter((_, i) => i !== index),
    }));
  };

  const handleTimeSlotChange = (index, field, value) => {
    setFormData((prev) => {
      const newTimeSlots = [...prev.timeSlots];
      newTimeSlots[index] = { ...newTimeSlots[index], [field]: value };
      return { ...prev, timeSlots: newTimeSlots };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Trainer Data Submitted:", formData);
    // Here you would typically send this data to your backend API
    onClose(); // Close modal after submission
  };

  // Mock calendar data for JANUARI 2025 as per screenshot
  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);
  const calendarStartOffset = 3; // Jan 1, 2025 was a Wednesday (0=Sun, 1=Mon, 2=Tue, 3=Wed)
  const availableDates = [16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="relative bg-[#343434] p-6 rounded-lg shadow-lg w-[1336px]  text-white max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-200"
          aria-label="Close"
        >
          <FaTimes className="w-6 h-6" />
        </button>

        <h2 className="text-xl font-semibold mb-6">Add Trainer</h2>

        <form onSubmit={handleSubmit} className="">
       <div className="grid grid-cols-3  w-full gap-12 ">
           {/* Full Name */}
        <div className="flex flex-col gap-5 ">
              <div className="col-span-1 md:col-span-1 lg:col-span-1">
            <label htmlFor="fullName" className="block text-sm font-medium mb-1">Full Name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full p-2 bg-[#2b2b2b] border border-[#C3C3C3]  rounded focus:outline-none focus:border-cyan-500"
              required
            />
          </div>

             {/* Email Address */}
          <div className="col-span-1 md:col-span-1 lg:col-span-1">
            <label htmlFor="email" className="block text-sm font-medium mb-1">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 bg-[#2b2b2b] border border-[#C3C3C3]  rounded focus:outline-none focus:border-cyan-500"
              required
            />
          </div>

              {/* Phone Number / If */}
          <div className="col-span-1 md:col-span-1 lg:col-span-1">
            <label htmlFor="phoneNumber" className="block text-sm font-medium mb-1">Phone Number / If</label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="w-full p-2 bg-[#2b2b2b] border border-[#C3C3C3]  rounded focus:outline-none focus:border-cyan-500"
            />
          </div>

           {/* Years of Experience */}
          <div className="col-span-1 md:col-span-1 lg:col-span-1">
            <label htmlFor="yearsOfExperience" className="block text-sm font-medium mb-1">Years of Experience</label>
            <input
              type="number"
              id="yearsOfExperience"
              name="yearsOfExperience"
              value={formData.yearsOfExperience}
              onChange={handleChange}
              className="w-full p-2 bg-[#2b2b2b] border border-[#C3C3C3]  rounded focus:outline-none focus:border-cyan-500"
              min="0"
            />
          </div>


           {/* Bio */}
          <div className="col-span-1 md:col-span-1 lg:col-span-1">
            <label htmlFor="bio" className="block text-sm font-medium mb-1">Bio</label>
            <textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows="3"
              className="w-full p-2 bg-[#2b2b2b] border border-[#C3C3C3]  rounded focus:outline-none focus:border-cyan-500"
            ></textarea>
          </div>

        </div>

         <div className="flex flex-col gap-5">
             {/* Achievements */}
          <div className="col-span-1 md:col-span-1 lg:col-span-1">
            <label htmlFor="achievements" className="block text-sm font-medium mb-1">Achievements</label>
            <textarea
              id="achievements"
              name="achievements"
              value={formData.achievements}
              onChange={handleChange}
              rows="3" // Adjust rows as needed
              className="w-full p-2 bg-[#2b2b2b] border border-[#C3C3C3]  rounded focus:outline-none focus:border-cyan-500"
            ></textarea>
          </div>

          
          {/* Skill Level Expertise */}
          <div className="col-span-1 md:col-span-1 lg:col-span-1">
            <label htmlFor="skillLevelExpertise" className="block text-sm font-medium mb-1">Skill Level Expertise (Optional)</label>
            <input
              type="text"
              id="skillLevelExpertise"
              name="skillLevelExpertise"
              value={formData.skillLevelExpertise}
              onChange={handleChange}
              className="w-full p-2 bg-[#2b2b2b] border border-[#C3C3C3]  rounded focus:outline-none focus:border-cyan-500"
              placeholder="Beginner" // Placeholder from image
            />
          </div>
      

         
          {/* Location */}
          <div className="col-span-1 md:col-span-1 lg:col-span-1">
            <label htmlFor="location" className="block text-sm font-medium mb-1">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full p-2 bg-[#2b2b2b] border border-[#C3C3C3]  rounded focus:outline-none focus:border-cyan-500"
            />
          </div>

         

          {/* Preferred Training Locations */}
          <div className="col-span-1 md:col-span-1 lg:col-span-1">
            <label htmlFor="preferredTrainingLocations" className="block text-sm font-medium mb-1">Preferred Training Locations</label>
            <div className="flex flex-col gap-2">
                <input
                    type="text"
                    id="preferredTrainingLocations"
                    name="preferredTrainingLocations"
                    value={formData.preferredTrainingLocations}
                    onChange={handleChange}
                    className="flex-grow p-2 bg-[#2b2b2b] border border-[#C3C3C3]  rounded focus:outline-none focus:border-cyan-500"
                />
                <button type="button" className="w-8 h-8 mx-auto flex items-center justify-center px- border text-white rounded hover:bg-cyan-700 transition-colors text-xl leading-none">
                    +
                </button>
            </div>
            {/* You'd typically display added locations here */}
          </div>
          
          {/* Per Hour Rate */}
          <div className="col-span-1 md:col-span-1 lg:col-span-1">
            <label htmlFor="perHourRate" className="block text-sm font-medium mb-1">Per Hour Rate</label>
            <input
              type="number"
              id="perHourRate"
              name="perHourRate"
              value={formData.perHourRate}
              onChange={handleChange}
              className="w-full p-2 bg-[#2b2b2b] border border-[#C3C3C3]  rounded focus:outline-none focus:border-cyan-500"
              min="0"
            />
          </div>

         </div>

          
         <div className="flex flex-col gap-5">
            
          {/* Profile Picture Upload */}
             <div className="col-span-1 md:col-span-1 lg:col-span-1 row-span-2">
            <label className="block text-sm font-medium mb-1">Profile Picture</label>
            <div className="flex flex-col items-center justify-center w-full h-40 border-1 border-dashed border-[#C3C3C3]  rounded-lg cursor-pointer bg-[#2b2b2b] hover:bg-gray-700 transition-colors">
              <input
                type="file"
                id="profilePicture"
                name="profilePicture"
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
              />
              <label htmlFor="profilePicture" className="text-center text-gray-400 cursor-pointer">
            <Image src="/icon/Download_light.svg" alt="Download Icon" width={93} height={93} />
                <span className="block text-sm">Upload</span>
                {formData.profilePicture && (
                  <span className="block text-xs mt-1 text-cyan-400">{formData.profilePicture.name}</span>
                )}
              </label>
            </div>
          </div>


          {/* Availability Calendar */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <label className="block text-sm font-medium mb-1 ">Availability Date</label>
            <div className="bg-[#2b2b2b]  rounded-lg border border-[#C3C3C3] ">
              <div className="flex justify-between items-center mb-2  border-b border-[#C3C3C3]  px-4 py-4">
                <span className="font-semibold">JANUARI 2025</span>
                <div className="flex items-center gap-2  justify-center">
                    <button type="button" className="text-gray-100 bg-gray-500 p-2 px-4 rounded-full hover:text-white">&#8249;</button>
                
                <button type="button" className="text-gray-100 hover:text-white bg-gray-500 p-2 px-4 rounded-full">&#8250;</button>
                </div>
              </div>
              <div className="grid grid-cols-7 gap-1 text-base text-center text-white  p-4 ">
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>
                <span>Sun</span>
              </div>
              <div className="grid grid-cols-7 gap-2 p-4">
                {/* Empty cells for leading days of the week */}
                {Array.from({ length: calendarStartOffset }).map((_, i) => (
                  <div key={`empty-${i}`} className="w-8 h-8 flex items-center justify-center"></div>
                ))}
                {daysInMonth.map((day) => (
                  <button
                    key={day}
                    type="button"
                    onClick={() => handleDateSelect(day)}
                    className={`w-8 h-8 flex items-center justify-center rounded-full text-black text-sm
                      ${availableDates.includes(day)
                        ? formData.availability.includes(day)
                          ? "bg-cyan-500" // Selected available date
                          : "bg-[#71F50C] hover:bg-green-600" // Available date
                        : "bg-gray-700 text-gray-500 cursor-not-allowed" // Unavailable date
                      }`}
                    disabled={!availableDates.includes(day)}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Time Slots */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            {formData.timeSlots.map((slot, index) => (
              <div key={index} className="flex items-center gap-2 mb-2">
                <input
                  type="time"
                  className="flex-grow p-2 bg-[#2b2b2b] border border-[#C3C3C3] rounded focus:outline-none focus:border-cyan-500"
                  value={slot.startTime}
                  onChange={(e) => handleTimeSlotChange(index, "startTime", e.target.value)}
                  placeholder="Start Time"
                />
                <input
                  type="time"
                  className="flex-grow p-2 bg-[#2b2b2b] border border-[#C3C3C3] rounded focus:outline-none focus:border-cyan-500"
                  value={slot.endTime}
                  onChange={(e) => handleTimeSlotChange(index, "endTime", e.target.value)}
                  placeholder="End Time"
                />
                {formData.timeSlots.length > 1 && (
                  <button type="button" onClick={() => removeTimeSlot(index)} className="p-2 text-red-500 hover:text-red-700">
                    <FaTimes /> {/* Trash can icon from image */}
                  </button>
                )}
              </div>
            ))}
          <div className=" mt-4 ">
              <button type="button" onClick={addTimeSlot}  className="w-8 h-8 border px-48 flex items-center justify-center mx-auto  rounded hover:bg-cyan-700 transition-colors text-xl leading-none">
                +
            </button>
          </div>
          </div>
         </div>

       </div>
          {/* Create Button */}
          <div className="col-span-full mt-4">
              <button
            type="submit"
            className="w-full mx-auto flex justify-center items-center  rounded-full bg-cyan-400 hover:bg-cyan-300 text-white py-2 font-medium  border-b-4 border-lime-400"
          >
            create
          </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewTrainerModal;