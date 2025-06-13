'use client';

import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation'; // CORRECTED: Import useRouter from 'next/navigation'
// import { Router } from 'next/router'; // REMOVED: Incorrect import for App Router
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

export default function OtpVerificationPage() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  const router = useRouter(); // ADDED: Initialize useRouter hook

  const [otp, setOtp] = useState('');
  const [verificationError, setVerificationError] = useState('');
  const [verificationLoading, setVerificationLoading] = useState(false);

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setVerificationError(''); // Clear previous internal error message
    setVerificationLoading(true);

    if (!otp) {
      setVerificationError('Please enter the OTP.');
      toast.error('Please enter the OTP.'); // Show toast for this validation
      setVerificationLoading(false);
      return;
    }

    console.log(`Verifying OTP: ${otp} for email: ${email}`);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      if (otp === '123456') {
        toast.success('OTP Verified! Redirecting to password reset...'); // Changed toast message for clarity
        // CORRECTED: Use router.push for navigation
        router.push(`/set-new-password?email=${encodeURIComponent(email)}`);
        // In a real app, you'd navigate to a password reset form, e.g.:
        // router.push('/reset-password');
      } else {
        setVerificationError('Invalid OTP. Please try again. (Simulated)');
        toast.error('Invalid OTP. Please try again.'); // Error toast
      }
    } catch (err) {
      console.error('OTP verification error:', err);
      setVerificationError('An error occurred during OTP verification.');
      toast.error('An unexpected error occurred. Please try again.'); // Catch-all error toast
    } finally {
      setVerificationLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      // Added back the background style for consistency with previous components, as it was commented out in your provided code
   
    >
      <Toaster position="top-center" reverseOrder={false} /> {/* Toaster component */}

      <div className="p-8 rounded-2xl backdrop-blur-custom w-full max-w-md border border-gray-700 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">OTP Verification</h2>
        <p className="text-gray-300 mb-6">
          An OTP has been sent to <span className="font-semibold">{email || 'your email'}</span>.
          Please enter it below to proceed.
        </p>

        <form onSubmit={handleOtpSubmit} className="space-y-6">
          <div>
            <label htmlFor="otp" className="block text-gray-400 text-sm font-medium mb-2">
              Enter OTP
            </label>
            <input
              type="text"
              id="otp"
              className="w-full p-3 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-center tracking-widest text-xl"
              placeholder="______"
              maxLength="6"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          </div>

          {verificationError && (
            <p className="text-red-400 text-sm text-center">
              {verificationError}
            </p>
          )}

          <button
            style={{
              width: "112px",
              height: "40px",
              boxShadow: "1.5px 1.5px 0px 0px #71F50C",
              border: "1px solid #00C1C9",
              borderRadius: "4px",
              padding: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              // The button background style is kept as per your provided code
              background: verificationLoading ? '#4B5563' : 'linear-gradient(to right, #10B981, #2563EB)', // Example gradient for consistency
            }}
            type="submit"
            className={`py-3 mx-auto text-white font-semibold transition duration-300 ease-in-out
              ${verificationLoading ? 'cursor-not-allowed' : 'hover:opacity-90'}
            `}
            disabled={verificationLoading}
          >
            {verificationLoading ? 'Verifying...' : 'Verify OTP'}
          </button>
        </form>

        <p className="mt-6 text-gray-400 text-sm">
          Didn't receive the OTP? <Link href="#" className="text-blue-400 hover:underline">Resend OTP</Link>
        </p>
      </div>
    </div>
  );
}


