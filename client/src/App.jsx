import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Admin from './Pages/Admin';
import Resident from './Pages/Resident';
import Visitor from './Pages/Visitor';
import NotFound from './Pages/NotFound';
import Header from './Components/Header';
import { ToastContainer } from 'react-toastify';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <ToastContainer /> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/resident" element={<Resident />} />
        <Route path="/visitor" element={<Visitor />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;