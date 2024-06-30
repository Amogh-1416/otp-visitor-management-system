import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminDashboard = () => {
  const [residents, setResidents] = useState([]);
  const [visitors, setVisitors] = useState([]);
  const [otp, setOtp] = useState('');

  useEffect(() => {
    // Fetch resident data when the component mounts
    fetch('/api/residents')
      .then((response) => response.json())
      .then((data) => setResidents(data))
      .catch((error) => {
        console.error('Error fetching resident data:', error);
        toast.error('Error fetching residents. Please try again.');
      });

    // Fetch visitor data
    fetch('/api/visitors')
      .then((response) => response.json())
      .then((data) => setVisitors(data))
      .catch((error) => {
        console.error('Error fetching visitor data:', error);
        toast.error('Error fetching visitors. Please try again.');
      });
  }, []);

  const handleGenerateOtp = async (residentId) => {
    // Send a request to generate an OTP for the resident
    try {
      const response = await fetch(`/api/otp/${residentId}`, {
        method: 'POST',
      });

      if (response.ok) {
        const data = await response.json();
        setOtp(data.otp);
        toast.success('OTP generated successfully!');
      } else {
        toast.error('Error generating OTP. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred. Please try again.');
    }
  };

  const handleVerifyOtp = async (visitorId, enteredOtp) => {
    // Send a request to verify the OTP
    try {
      const response = await fetch(`/api/verify/${visitorId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ otp: enteredOtp }),
      });

      if (response.ok) {
        toast.success('OTP verified successfully!');
        // You can perform actions here, like updating the visitor status
      } else {
        toast.error('Invalid OTP.');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred. Please try again.');
    }
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <h3>Residents</h3>
      <ul>
        {residents.map((resident) => (
          <li key={resident.id}>
            {resident.name}
            <button onClick={() => handleGenerateOtp(resident.id)}>
              Generate OTP
            </button>
          </li>
        ))}
      </ul>
      <h3>Visitors</h3>
      <ul>
        {visitors.map((visitor) => (
          <li key={visitor.id}>
            {visitor.name} - {visitor.phone}
            <input type="text" placeholder="Enter OTP" value={otp} />
            <button onClick={() => handleVerifyOtp(visitor.id, otp)}>
              Verify
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;