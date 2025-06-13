"use client"; // This directive is required for client-side functionality in App Router components

import Link from "next/link";
import { useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

// No need to import Image or specific SVG files directly if using inline SVG
// import Image from "next/image";
// import eye from "../public/icon/eye.svg";
// import eyeSlash from "../public/icon/eye-slash.svg";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // New state for password visibility
  const router = useRouter();

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    setLoading(true); // Indicate loading state

    // --- Client-side validation ---
    if (!email || !password) {
      setError("Please enter both email and password.");
      toast.error("Please enter both email and password.");
      setLoading(false);
      return;
    }

    // Basic email format validation (can be more robust)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      toast.error("Please enter a valid email address.");
      setLoading(false);
      return;
    }

    // --- Simulate API Call (Replace with your actual backend call) ---
    console.log("Attempting to log in with:", { email, password, rememberMe });

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate network delay

      let success = false;
      let redirectPath = '/';
      let token = ''; // To store the token for setting in cookie

      // --- Simulated Admin Login ---
      if (email === "admin@example.com" && password === "admin123") {
        console.log("Admin Login successful!");
        toast.success("Admin Login Successful! (Simulated)");
        token = 'ADMIN_TOKEN_SECRET'; // Set admin token
        redirectPath = '/admin'; // Redirect admin to /admin
        success = true;
      }
      // --- Simulated Regular User Login ---
      else if (email === "user@example.com" && password === "password123") {
        console.log("User Login successful!");
        toast.success("User Login Successful! (Simulated)");
        token = 'USER_TOKEN_SECRET'; // Set regular user token
        redirectPath = '/admin'; // Redirect regular user to home
        success = true;
      }
      // --- Simulated Failed Login ---
      else {
        setError("Invalid email or password. (Simulated)");
        toast.error("Invalid email or password. (Simulated)");
      }

      if (success) {
        document.cookie = `token=${token}; path=/; max-age=${rememberMe ? 60 * 60 * 24 * 30 : 60 * 30}; SameSite=Lax`;
        router.push(redirectPath);
      }

    } catch (err) {
      console.error("Login error:", err);
      setError("An unexpected error occurred. Please try again.");
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false); // End loading state
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="backdrop-blur-custom p-[40px] rounded-2xl w-[554px] border border-[#FFFFFF4D]">
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
              className="w-full p-3 text-white rounded-lg border border-[#DBDBDB] focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            {/* Password input with show/hide toggle */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="w-full p-3 pr-10 text-white rounded-[6px] border border-[#DBDBDB] focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={handleTogglePassword}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {/* Inline SVG for eye icon */}
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 text-[#DBDBDB] cursor-pointer" // Adjusted color for better visibility
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.173.18.54.18.54 0 1.08C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.173z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"
                    />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M10.1416 11.2627C10.051 11.491 10 11.7394 10 12C10 13.1046 10.8954 14 12 14C12.2604 14 12.5082 13.9479 12.7363 13.8574L14.2109 15.332C13.5774 15.7532 12.8178 16 12 16C9.79086 16 8 14.2091 8 12C8 11.1821 8.24569 10.4217 8.66699 9.78809L10.1416 11.2627ZM12 8C14.2091 8 16 9.79086 16 12C16 12.2736 15.9722 12.5407 15.9199 12.7988L11.2002 8.0791C11.4586 8.02668 11.7262 8 12 8Z" fill="#B0B0B0"/>
  <path d="M7.57446 8.69531C6.45786 9.51286 5.52051 10.4768 4.85767 11.2461L4.58423 11.5703C4.48455 11.6913 4.40959 11.7817 4.3479 11.8613C4.29944 11.9239 4.26958 11.9686 4.24927 12C4.26958 12.0314 4.29944 12.0761 4.3479 12.1387C4.40959 12.2183 4.48455 12.3087 4.58423 12.4297L4.85767 12.7539C5.5373 13.5427 6.50526 14.5368 7.65942 15.3672C8.9864 16.3219 10.4745 17 12.0002 17C13.0478 17 14.077 16.6793 15.0491 16.1699L16.5178 17.6387C15.2048 18.4171 13.6701 18.9999 12.0002 19C9.89043 19 7.99446 18.0725 6.49146 16.9912C5.16931 16.04 4.08515 14.922 3.33911 14.0557L3.04028 13.7012C2.74418 13.3417 2.29093 12.8546 2.2356 12.1445L2.22974 12L2.2356 11.8555C2.29093 11.1454 2.74418 10.6583 3.04028 10.2988L3.33911 9.94434C4.01896 9.15488 4.98013 8.15738 6.14575 7.2666L7.57446 8.69531ZM12.0002 5C14.11 5.00007 16.0061 5.92749 17.509 7.00879C19.0199 8.09582 20.2204 9.40058 20.9602 10.2988L21.22 10.6152C21.4922 10.9626 21.7708 11.408 21.7708 12L21.7649 12.1445C21.7243 12.6653 21.4696 13.0662 21.22 13.3848L20.9602 13.7012C20.4735 14.2921 19.7851 15.0563 18.9426 15.8213L17.5266 14.4053C18.3066 13.7056 18.954 12.991 19.4163 12.4297L19.6526 12.1387C19.7008 12.0764 19.7299 12.0314 19.7502 12C19.7299 11.9686 19.7008 11.9236 19.6526 11.8613L19.4163 11.5703C18.7361 10.7445 17.66 9.58182 16.3411 8.63281C15.0141 7.67813 13.526 7.00007 12.0002 7C11.4494 7 10.9036 7.08922 10.3684 7.24707L8.80688 5.68555C9.79067 5.26876 10.8646 5 12.0002 5Z" fill="#B0B0B0"/>
  <path d="M5 2L21 18" stroke="#B0B0B0" stroke-width="2"/>
</svg>
                )}
              </button>
            </div>
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
              href="/Forgot-Password"
              className="text-[#FF0000] text-[12px] hover:underline"
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