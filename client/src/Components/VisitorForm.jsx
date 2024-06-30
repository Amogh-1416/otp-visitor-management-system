import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const VisitorForm = () => {
  const [visitorName, setVisitorName] = useState("");
  const [visitorPhone, setVisitorPhone] = useState("");
  const [visitorPurpose, setVisitorPurpose] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [showNewInput, setShowNewInput] = useState(false);
  const [backendData, setBackendData] = useState("");
  const [showOldInput, setShowOldInput] = useState(true);
  const [otp, setOtp] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    // 1. Send visitor details to the backend (using 'axios' or fetch)
    try {
      const response = await fetch("/api/visitorinfo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: visitorName,
          phone: visitorPhone,
          purpose: visitorPurpose,
          house_number: houseNumber,
        }),
        // mode: "cors"
      });

      

      if (response.ok) {
        const data = await response.json()
        console.log(data[1].otp);
        if(data[1].otp){
          setShowNewInput(true);
          setShowOldInput(false)
          setBackendData(data[1].otp);
        }
        toast.success("Visitor details submitted successfully!");
        // 2. Clear the form fields
        setVisitorName("");
        setVisitorPhone("");
        setVisitorPurpose("");
        setHouseNumber("");
        
      } else {
        toast.error("Error submitting visitor details. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  const otpCheck = () => {
    if(otp==backendData) {
      toast.success("OTP matched. The Visitor can be allowed!");
      setShowNewInput(false);
      setShowOldInput(true);
      setOtp("");

    }
    else {
      toast.error("OTP did not match. Visitor cannot be sent in!")
    }
    
  }

  return (
    <form onSubmit={handleSubmit}>
      {showOldInput && (
        <>

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
          <label htmlFor="houseNumber">House Number:</label>
          <input
            type="text"
            id="houseNumber"
            value={houseNumber}
            onChange={(e) => setHouseNumber(e.target.value)}
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
        </>
      )}
        {showNewInput && (
          <>
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
          <button type="button" onClick={otpCheck}>Check</button>
          </>
        )}
        </form>
    )
  }


export default VisitorForm;
