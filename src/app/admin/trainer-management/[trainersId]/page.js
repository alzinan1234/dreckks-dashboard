// app/trainers/[id]/page.jsx
"use client"; // This component will be client-side rendered

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation'; // For going back

// Mock data (This would typically come from an API call in a real app)
const trainers = [
  {
    id: 1234,
    name: "John Smith",
    avatar: "/images/john-smith-trainer-avatar.png",
    email: "john.smith@gmail.com",
    perHourRate: 50,
    yearsExperience: 10,
    coachingExpertise: "Doubles Strategy",
    bio: "With over 12 years of coaching experience, Coach John specializes in doubles strategy, footwork mastery, and tournament preparation. An IPTPA-certified instructor and former national champion, he has helped players of all levels refine their technique and elevate their game. Passionate about precision and strategy, Coach John's training focuses on building confidence, smart shot selection, and court awareness. Whether you're a beginner or a competitive player, his tailored coaching approach ensures measurable improvement and on court success. 🎾🔥",
    achievements: [
      "Certified IPTPA Level II Coach – Recognized for excellence in player development",
      "Coached 100+ Players to Tournament Wins – Including state and national titles",
      "Former Professional Player – Developed in [League/Tournament Series] at an elite level",
    ],
    location: "Downtown Los Angeles, CA",
    preferredTrainingLocations: ["Downtown Los Angeles, CA"],
    availability: "Monday to Friday",
    timeSlots: ["10:40 AM - 11:00 AM", "10:40 AM - 11:00 AM"]
  },
  {
    id: 1235,
    name: "Jane Doe",
    avatar: "/images/jane-doe-trainer-avatar.png",
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
    avatar: "/images/michael-chen-trainer-avatar.png",
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


const TrainerDetailsPage = ({ params }) => {
  const router = useRouter();
  const { id } = params; // Get the dynamic 'id' from the URL parameters
  const [trainer, setTrainer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real application, you would fetch data from an API here
    // Example: fetch(`/api/trainers/${id}`).then(res => res.json()).then(data => setTrainer(data));

    // For this mock data example:
    const foundTrainer = trainers.find(t => t.id === parseInt(id)); // Convert id to integer for comparison
    setTrainer(foundTrainer);
    setLoading(false);
  }, [id]); // Re-run effect if ID changes

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#242424] text-white">
        Loading trainer details...
      </div>
    );
  }

  if (!trainer) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-[#242424] text-white">
        <h1 className="text-2xl font-semibold mb-4">Trainer Not Found</h1>
        <button
          onClick={() => router.back()}
          className="bg-cyan-500 text-white px-6 py-2 rounded-md hover:bg-cyan-600 transition-colors"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="bg-[#343434] p-6 rounded-lg text-white min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => router.back()} // Go back to the previous page
            className="bg-[#2d2d2d] text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-[#4a4a4a] transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Trainer Management
          </button>
          <h2 className="text-2xl font-semibold">Trainer Details</h2>
          <div></div> {/* Spacer for alignment */}
        </div>

        <div className="flex flex-col items-center mb-8">
          <Image
            src={trainer.avatar || "/images/placeholder-avatar.png"}
            alt="Trainer Avatar"
            width={150}
            height={150}
            className="rounded-full object-cover border-4 border-cyan-500"
          />
          <h3 className="text-3xl font-bold mt-4">{trainer.name}</h3>
          <p className="text-gray-400">{trainer.email}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-[#2d2d2d] p-4 rounded-lg shadow-md">
            <p className="text-gray-400 text-sm">Trainer ID:</p>
            <p className="text-xl font-medium">{trainer.id}</p>
          </div>
          <div className="bg-[#2d2d2d] p-4 rounded-lg shadow-md">
            <p className="text-gray-400 text-sm">Per Hour Rate:</p>
            <p className="text-xl font-medium">${trainer.perHourRate}</p>
          </div>
          <div className="bg-[#2d2d2d] p-4 rounded-lg shadow-md">
            <p className="text-gray-400 text-sm">Years of Experience:</p>
            <p className="text-xl font-medium">{trainer.yearsExperience} years</p>
          </div>
          {trainer.coachingExpertise && (
            <div className="bg-[#2d2d2d] p-4 rounded-lg shadow-md">
              <p className="text-gray-400 text-sm">Coaching Expertise:</p>
              <p className="text-xl font-medium">{trainer.coachingExpertise}</p>
            </div>
          )}
        </div>

        {trainer.bio && (
          <div className="mb-8 bg-[#2d2d2d] p-4 rounded-lg shadow-md">
            <p className="text-gray-400 text-sm mb-2">Bio:</p>
            <p className="text-base leading-relaxed">{trainer.bio}</p>
          </div>
        )}

        {trainer.achievements && trainer.achievements.length > 0 && (
          <div className="mb-8 bg-[#2d2d2d] p-4 rounded-lg shadow-md">
            <p className="text-gray-400 text-sm mb-2">Achievements:</p>
            <ul className="list-disc list-inside text-base pl-4">
              {trainer.achievements.map((achievement, i) => (
                <li key={i} className="mb-1">{achievement}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {trainer.location && (
            <div className="bg-[#2d2d2d] p-4 rounded-lg shadow-md">
              <p className="text-gray-400 text-sm">Location:</p>
              <p className="text-lg">{trainer.location}</p>
            </div>
          )}
          {trainer.preferredTrainingLocations && trainer.preferredTrainingLocations.length > 0 && (
            <div className="bg-[#2d2d2d] p-4 rounded-lg shadow-md">
              <p className="text-gray-400 text-sm">Preferred Training Locations:</p>
              <p className="text-lg">{trainer.preferredTrainingLocations.join(', ')}</p>
            </div>
          )}
        </div>

        {trainer.availability && (
          <div className="mb-8 bg-[#2d2d2d] p-4 rounded-lg shadow-md">
            <p className="text-gray-400 text-sm mb-2">Availability:</p>
            <p className="text-lg">{trainer.availability}</p>
          </div>
        )}

        {trainer.timeSlots && trainer.timeSlots.length > 0 && (
          <div className="bg-[#2d2d2d] p-4 rounded-lg shadow-md">
            <p className="text-gray-400 text-sm mb-2">Available Time Slots:</p>
            <ul className="list-disc list-inside text-base pl-4">
              {trainer.timeSlots.map((slot, i) => (
                <li key={i} className="mb-1">{slot}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrainerDetailsPage;