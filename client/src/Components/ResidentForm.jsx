import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ResidentForm = () => {
  const [residentName, setResidentName] = useState('');
  const [residentPhone, setResidentPhone] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Send resident details to the backend
    try {
      const response = await fetch('/api/residents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: residentName,
          phone: residentPhone,
        }),
      });

      if (response.ok) {
        toast.success('Resident details submitted successfully!');
        setResidentName('');
        setResidentPhone('');
      } else {
        toast.error('Error submitting resident details. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Resident Information</h2>
      <div>
        <label htmlFor="residentName">Name:</label>
        <input
          type="text"
          id="residentName"
          value={residentName}
          onChange={(e) => setResidentName(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="residentPhone">Phone:</label>
        <input
          type="tel"
          id="residentPhone"
          value={residentPhone}
          onChange={(e) => setResidentPhone(e.target.value)}
          required
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default ResidentForm;