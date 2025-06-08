"use client"; // This directive is required for client-side functionality in App Router components

import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    setLoading(true); // Indicate loading state

    // --- Client-side validation ---
    if (!email || !password) {
      setError("Please enter both email and password.");
      setLoading(false);
      return;
    }

    // Basic email format validation (can be more robust)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      setLoading(false);
      return;
    }

    // --- Simulate API Call (Replace with your actual backend call) ---
    console.log("Attempting to log in with:", { email, password, rememberMe });

    try {
      // In a real application, you would send this data to your backend:
      // const response = await fetch('/api/login', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ email, password }),
      // });

      // const data = await response.json();

      // if (response.ok) {
      //   console.log('Login successful!', data);
      //   // Redirect to dashboard or home page
      //   // router.push('/dashboard');
      // } else {
      //   setError(data.message || 'Login failed. Please check your credentials.');
      // }

      // --- Simulation of a successful/failed login ---
      await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate network delay

      if (email === "user@example.com" && password === "password123") {
        console.log("Login successful!");
        alert("Login Successful! (Simulated)"); // For demonstration
        // In a real app, you'd handle session/token storage and redirection here
      } else {
        setError("Invalid email or password. (Simulated)");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false); // End loading state
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div  className="  backdrop-blur-custom p-[40px] rounded-2xl  w-[554px]  border border-[#FFFFFF4D]">
        <div className="w-[312px] mx-auto">
          <h2 className="text-white text-[24px] font-bold text-center mb-[18px]">
            Login to Account
          </h2>
          <p className="text-[#DBDBDB] font-[400px] text-center mb-8">
            Please enter your email and password to continue
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-[#ffffff] text-sm font-normal mb-2"
            >
              Email address
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-3  text-white rounded-lg border border-[#DBDBDB] focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-[#ffffff] text-sm font-normal mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full p-3  text-white rounded-[6px] border border-[#DBDBDB] focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="rememberMe"
                className="h-4 w-4 text-teal-500 rounded border-[#DBDBDB] focus:ring-teal-500"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label
                htmlFor="rememberMe"
                className="ml-2 block text-[#FFFFFF] text-sm"
              >
                Remember Password
              </label>
            </div>
            <Link
              href="#"
              className="text-[#FF0000] text-[12px] hover:underline"
              onClick={(e) => e.preventDefault()}
            >
              Forgot Password?
            </Link>
          </div>
          {error && <p className="text-red-400 text-sm text-center">{error}</p>}

          <button
            type="submit"
            style={{
              width: "112px",
              height: "40px",
              boxShadow: "1.5px 1.5px 0px 0px #71F50C",
              background: "#00C1C9",
              borderRadius: "4px",
              padding: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            className={`text-white flex items-center justify-center mx-auto font-semibold transition duration-300 ease-in-out
    ${loading ? "bg-gray-600 cursor-not-allowed" : ""}
  `}
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
