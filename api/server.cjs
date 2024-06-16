const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json()); 

// In-memory data store (replace with a database for real applications)
let residents = [];
let visitors = [];
let otp = null; 

app.get('/api/residents', (req, res) => {
  res.json(residents);
});

app.post('/api/residents', (req, res) => {
  const { name, phone } = req.body;
  const newResident = { id: residents.length + 1, name, phone }; 
  residents.push(newResident);
  res.status(201).json(newResident);
});

app.get('/api/visitors', (req, res) => {
  res.json(visitors);
});

app.post('/api/visitors', (req, res) => {
  const { name, phone, purpose } = req.body;
  const newVisitor = { id: visitors.length + 1, name, phone, purpose };
  visitors.push(newVisitor);
  res.status(201).json(newVisitor);
});

app.post('/api/otp/:residentId', (req, res) => {
  const residentId = parseInt(req.params.residentId);
  const resident = residents.find((r) => r.id === residentId);
  if (resident) {
    // Generate OTP (replace with a better OTP generator in production)
    otp = Math.floor(100000 + Math.random() * 900000);
    res.json({ otp });
  } else {
    res.status(404).send('Resident not found.');
  }
});

app.post('/api/verify/:visitorId', (req, res) => {
  const visitorId = parseInt(req.params.visitorId);
  const enteredOtp = req.body.otp;
  if (otp === enteredOtp) {
    res.json({ message: 'OTP verified successfully' });
  } else {
    res.status(401).send('Invalid OTP.');
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});