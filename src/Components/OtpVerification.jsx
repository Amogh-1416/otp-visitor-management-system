import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const OtpVerification = () => {
  const [otp, setOtp] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Send the OTP to the backend for verification
    try {
      const response = await fetch('/api/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ otp }),
      });

      if (response.ok) {
        toast.success('OTP verified successfully!');
        // Perform actions like granting access
      } else {
        toast.error('Invalid OTP.');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>OTP Verification</h2>
      <div>
        <label htmlFor="otp">Enter OTP:</label>
        <input
          type="text"
          id="otp"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
        />
      </div>
      <button type="submit">Verify</button>
    </form>
  );
};

export default OtpVerification;