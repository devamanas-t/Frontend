import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import LandingPage from './pages/LandingPage'
import Footer from './components/Footer'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import CreateExam from './pages/CreateExam'
import ConductExam from './pages/ConductExam'
import PreviewExam from './pages/PreviewExam'
import ResultExam from './pages/ResultExam'
import Announcement from './pages/Announcments'
import StudentExam from './pages/StudentExam'
import StudentLogin from './pages/StudentLogin'
import LessonPlan from './pages/LessonPlan'
import LessonPreview from './pages/LessonPreview'

const App = () => {
  const location = useLocation();

  // Navbar and Footer ONLY on home page ("/")
  const showLayout = location.pathname === "/";

  return (
    <div className="bg-slate-50 min-h-screen">

      {/* Show Navbar only on home page */}
      {/* {showLayout && <Navbar />} */}

      {/* Routes */}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/create-exam" element={<CreateExam />} />
        <Route path="/conduct-exam" element={<ConductExam />} />
        <Route path="/preview-exam" element={<PreviewExam />} />
        <Route path="/result-exam" element={<ResultExam />} />
        <Route path="/dashboard/announcements" element={<Announcement />} />
        <Route path="/student-exam" element={<StudentExam />} />
        <Route path="/student-login" element={<StudentLogin />} />
        <Route path="/dashboard/lesson-plan" element={<LessonPlan />} />
        <Route path="/lesson-preview" element={<LessonPreview />} />
      </Routes>

      {/* Show Footer only on home page */}
      {/* {showLayout && <Footer />} */}

    </div>
  );
};

export default App;
