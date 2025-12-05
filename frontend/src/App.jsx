import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import LandingPage from './pages/LandingPage'
import Footer from './components/Footer'
import Login from './pages/Login'


const App = () => {
  const location = useLocation();

  return (
    <div className="bg-slate-50 min-h-screen">

      {/* Navbar */}
      <Navbar />
         
      {/* Routes */}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        

      </Routes>

      {/* Footer only if NOT login page */}
      {location.pathname !== "/login" && <Footer />}
      
 z      
       


    </div>
  );
};

export default App;
