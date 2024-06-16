import React, { useState } from 'react';
import { toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';

const VisitorForm = () => {
  const [visitorName, setVisitorName] = useState('');
  const [visitorPhone, setVisitorPhone] = useState('');
  const [visitorPurpose, setVisitorPurpose] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    // 1. Send visitor details to the backend (using 'axios' or fetch)
    try {
      const response = await fetch('/api/visitors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: visitorName,
          phone: visitorPhone,
          purpose: visitorPurpose,
        }),
      });

      if (response.ok) {
        toast.success('Visitor details submitted successfully!');
        // 2. Clear the form fields
        setVisitorName('');
        setVisitorPhone('');
        setVisitorPurpose('');
      } else {
        toast.error('Error submitting visitor details. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Visitor Information</h2>
      <div>
        <label htmlFor="visitorName">Name:</label>
        <input
          type="text"
          id="visitorName"
          value={visitorName}
          onChange={(e) => setVisitorName(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="visitorPhone">Phone:</label>
        <input
          type="tel"
          id="visitorPhone"
          value={visitorPhone}
          onChange={(e) => setVisitorPhone(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="visitorPurpose">Purpose:</label>
        <input
          type="text"
          id="visitorPurpose"
          value={visitorPurpose}
          onChange={(e) => setVisitorPurpose(e.target.value)}
          required
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default VisitorForm;