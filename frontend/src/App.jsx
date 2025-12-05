import React from 'react'
import { Routes, Route } from 'react-router-dom' // Import Routes for navigation
import Navbar from './components/Navbar'        // 1. Import the Navbar
import LandingPage from './pages/LandingPage'
import Footer from './components/Footer'

const App = () => {
  return (
    <div className="bg-slate-50 min-h-screen">
      
      {/* 2. Add Navbar at the very top */}
      <Navbar /> 

      {/* 3. Define Routes so buttons work (e.g. /login, /dashboard) */}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        {/* You will add other routes here later, like: */}
        {/* <Route path="/login" element={<Login />} /> */}
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
      </Routes>
      <Footer />

    </div>
  )
}

export default App