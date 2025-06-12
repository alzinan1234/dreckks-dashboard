// components/TrainerManagement.jsx
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FaPlus, FaSearch, FaCog } from "react-icons/fa";
import AddNewTrainerModal from './AddNewTrainerModal';
import TrainerDetailsModal from './TrainerDetailsModal'; // Import the new modal
import { useRouter } from 'next/navigation';
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

// Mock data for trainers
const initialTrainers = [ // Renamed to initialTrainers
  {
    id: 1234,
    name: "John Smith",
    avatar: "/image/trainer-avater.png",
    email: "john.smith@gmail.com",
    perHourRate: 50,
    yearsExperience: 10,
    coachingExpertise: "Doubles Strategy",
    bio: "With over 12 years of coaching experience, Coach John specializes in doubles strategy, footwork mastery, and tournament preparation. An IPTPA-certified instructor and former national champion, he has helped players of all levels refine their technique and elevate their game. Passionate about precision and strategy, Coach John's training focuses on building confidence, smart shot selection, and court awareness. Whether you're a beginner or a competitive player, his tailored coaching approach ensures measurable improvement and on court success. 🎾🔥",
    achievements: [
      "Certified IPTPA Level II Coach – Recognized for excellence in player development",
      "Coached 100+ Players to Tournament Wins – Including state and national titles",
      "Former Professional Player – Developed in [League/Tournament Series] at an elite level",
      "Featured Speaker at Pickleball Summits – Conducted training workshops and strategy sessions",
      "Top-Ranked Doubles Player – Dominated competitive circuits",
      "Developed Training Programs for Elite Players – Customized drills and performance-based coaching",
    ],
    location: "Downtown Los Angeles, CA",
    preferredTrainingLocations: ["Downtown Los Angeles, CA"],
    availability: "Monday to Friday",
    timeSlots: ["10:40 AM - 11:00 AM", "10:40 AM - 11:00 AM"]
  },
  {
    id: 1235,
    name: "Jane Doe",
    avatar: "/image/trainer-avater.png",
    email: "jane.doe@example.com",
    perHourRate: 60,
    yearsExperience: 7,
    coachingExpertise: "Singles Tactics",
    bio: "Jane Doe is a highly experienced tennis coach specializing in singles tactics and mental game development. She has helped numerous players improve their court coverage and strategic thinking.",
    achievements: [
      "Certified USPTA Professional",
      "Coached collegiate players to national championships",
      "Developed personalized training plans for aspiring professionals"
    ],
    location: "Santa Monica, CA",
    preferredTrainingLocations: ["Santa Monica, CA", "Venice Beach, CA"],
    availability: "Tuesday, Thursday",
    timeSlots: ["09:00 AM - 10:00 AM", "01:00 PM - 02:00 PM"]
  },
  {
    id: 1236,
    name: "Michael Chen",
    avatar: "/image/userImage.png",
    email: "michael.chen@example.com",
    perHourRate: 55,
    yearsExperience: 8,
    coachingExpertise: "Serve & Return",
    bio: "Michael is passionate about helping players master their serve and return game. He focuses on technique, power, and consistency.",
    achievements: [
      "Top-ranked local player",
      "Certified PTR professional",
      "Coached multiple junior champions"
    ],
    location: "San Diego, CA",
    preferredTrainingLocations: ["San Diego, CA"],
    availability: "Wednesday, Friday, Saturday",
    timeSlots: ["08:00 AM - 09:00 AM", "05:00 PM - 06:00 PM"]
  },
];


const TrainerManagement = () => {
  const [isAddNewTrainerModalOpen, setIsAddNewTrainerModalOpen] = useState(false);
  const [isTrainerDetailsModalOpen, setIsTrainerDetailsModalOpen] = useState(false); // New state for details modal
  const [selectedTrainer, setSelectedTrainer] = useState(null); // New state to hold selected trainer data
  const [searchTerm, setSearchTerm] = useState('');
  const [currentTrainers, setCurrentTrainers] = useState(initialTrainers); // State to manage trainers (for delete)
  const router = useRouter();

  const filteredTrainers = currentTrainers.filter(trainer => // Filter from currentTrainers
    trainer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    trainer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    trainer.id.toString().includes(searchTerm.toLowerCase())
  );

  // Function to add a new trainer (passed to AddNewTrainerModal)
  const addNewTrainer = (newTrainerData) => {
    // In a real application, you'd send this to your backend and then refetch or update state
    setCurrentTrainers(prevTrainers => [
      ...prevTrainers,
      { ...newTrainerData, id: Date.now(), avatar: "/images/default-trainer-avatar.png" } // Assign a temporary ID and default avatar
    ]);
    setIsAddNewTrainerModalOpen(false);
  };


  const handleViewDetails = (trainerId) => {
    // In a real application, you might fetch details from an API here
    const trainer = currentTrainers.find(t => t.id === trainerId);
    if (trainer) {
      setSelectedTrainer(trainer);
      setIsTrainerDetailsModalOpen(true);
      // Removed router.push, as we're now opening a modal for details
    }
  };

  const handleEditTrainer = (trainerId) => {
    console.log(`Edit trainer with ID: ${trainerId}`);
    // Implement edit logic here
    // You might open the AddNewTrainerModal in 'edit' mode and pre-fill its form
    // For example:
    // const trainerToEdit = currentTrainers.find(t => t.id === trainerId);
    // if (trainerToEdit) {
    //   setSelectedTrainer(trainerToEdit); // Pass trainer data to a generic "Add/Edit" modal
    //   setIsAddNewTrainerModalOpen(true); // Assuming AddNewTrainerModal can handle editing
    // }
  };

  const handleDeleteTrainer = (trainerId) => {
    if (window.confirm(`Are you sure you want to delete trainer with ID: ${trainerId}?`)) {
      // In a real application, you'd send a DELETE request to your backend
      setCurrentTrainers(prevTrainers => prevTrainers.filter(trainer => trainer.id !== trainerId));
      console.log(`Trainer with ID ${trainerId} deleted.`);
    }
  };


  return (
    <>
      <div className="bg-[#343434] p-6 rounded-lg text-white">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Trainer Management</h2>
          <div className="flex items-center gap-2">
            {/* Add New Trainer Button */}
            <button
              onClick={() => setIsAddNewTrainerModalOpen(true)}
              className="bg-white text-black text-sm px-4 py-2 rounded-full flex items-center gap-2 hover:bg-gray-200 transition-colors"
            >
              <FaPlus /> Add New Trainer
            </button>

            {/* Search Input and Button Group */}
            <div className="flex items-center ">
              <div className="relative   ">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search"
                  className="pl-10 pr-4 py-2 bg-[#F3FAFA1A] rounded-tl-[7.04px] rounded-bl-[7.04px] border-[1px] border-[#0000001A]   text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <button className=" hover:bg-gray-700 transition-colors bg-[#2A2A2A] p-[5px]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="25"
                  viewBox="0 0 24 25"
                  fill="none"
                >
                  <path
                    d="M11 8.5L20 8.5"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                  />
                  <path
                    d="M4 16.5L14 16.5"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                  />
                  <ellipse
                    cx="7"
                    cy="8.5"
                    rx="3"
                    ry="3"
                    transform="rotate(90 7 8.5)"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                  />
                  <ellipse
                    cx="17"
                    cy="16.5"
                    rx="3"
                    ry="3"
                    transform="rotate(90 17 16.5)"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                  />
                </svg>
              </button>
            </div>


          </div>
        </div>

        {/* Table Section */}
        <div className="overflow-x-auto">
          <table className="min-w-full border-separate border-spacing-y-4">
            <thead className="bg-[#17787C]">
              <tr className="text-sm text-white">
                <th className="py-3 px-4 text-center">Trainer ID</th>
                <th className="py-3 px-4 text-center">Name</th>
                <th className="py-3 px-4 text-center">Email</th>
                <th className="py-3 px-4 text-center">Per Hour Rate</th>
                <th className="py-3 px-4 text-center">Years experience</th>
                <th className="py-3 px-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="border-b border-gray-600 ">
              {filteredTrainers.map((trainer, index) => (
                <tr key={trainer.id} className="border-b border-gray-600 text-sm text-white py-10">
                  <td className="py- px-4 text-center border-b border-gray-600">{trainer.id}</td>
                  <td className="py-5 px-4 text-center flex items-center justify-center gap-2 border-b border-gray-600">
                    <Image
                      src={trainer.avatar}
                      alt="Trainer Avatar"
                      width={24}
                      height={24}
                      className="rounded-full"
                    />
                    {trainer.name}
                  </td>
                  <td className="py-2 px-4 text-center border-b border-gray-600">{trainer.email}</td>
                  <td className="py-2 px-4 text-center border-b border-gray-600">${trainer.perHourRate}</td>
                  <td className="py-2 px-4 text-center border-b border-gray-600">{trainer.yearsExperience}</td>
                  <td className="py-2 px-4 text-center border-b border-gray-600">
                    <div className="flex justify-center gap-2 ">
                      {/* View Button (eye icon) */}
                      <button
                        onClick={() => handleViewDetails(trainer.id)}
                        className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                      >
                        <Image src="/icon/eye.svg" alt="View" width={25} height={25} />
                      </button>
                      {/* Edit Button (pencil icon) */}
                      <button
                        onClick={() => handleEditTrainer(trainer.id)}
                        className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                      >
                        <Image src="/icon/edit.png" alt="Edit" width={25} height={25} />
                      </button>
                      {/* Delete Button (trash icon) */}
                      <button
                        onClick={() => handleDeleteTrainer(trainer.id)}
                        className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                      >
                        <Image src="/icon/trash.svg" alt="Delete" width={25} height={25} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* AddNewTrainerModal Component */}
        <AddNewTrainerModal
          isOpen={isAddNewTrainerModalOpen}
          onClose={() => setIsAddNewTrainerModalOpen(false)}
          onAddTrainer={addNewTrainer} // Pass the add function
        />

        {/* TrainerDetailsModal Component */}
        <TrainerDetailsModal
          isOpen={isTrainerDetailsModalOpen}
          onClose={() => setIsTrainerDetailsModalOpen(false)}
          trainer={selectedTrainer}
        />
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
    </>
  );
};

export default TrainerManagement;