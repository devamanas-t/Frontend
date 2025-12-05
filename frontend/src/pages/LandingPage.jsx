import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ScrollText, ArrowRight, LayoutDashboard, Megaphone } from 'lucide-react';

// --- Sub-Component: Floating Gradient Blob (Background Animation) ---
const GradientBlob = ({ className, delay = 0 }) => (
  <motion.div
    className={`absolute rounded-full mix-blend-multiply filter blur-3xl opacity-60 ${className}`}
    animate={{
      scale: [1, 1.1, 0.9, 1],
      rotate: [0, 45, -45, 0],
      x: [0, 50, -50, 0],
      y: [0, -30, 30, 0],
    }}
    transition={{
      duration: 15,
      delay: delay,
      repeat: Infinity,
      ease: "easeInOut"
    }}
  />
);

// --- Sub-Component: Glass Feature Card ---
const GlassCard = ({ icon: Icon, title, description, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.6, delay, ease: "easeOut" }}
    whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(79, 70, 229, 0.15)" }}
    className="bg-white/30 backdrop-blur-md border border-white/40 p-8 rounded-3xl shadow-lg relative overflow-hidden group"
  >
    {/* Hover Gradient Overlay */}
    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    
    <div className="relative z-10">
      <div className="w-14 h-14 bg-white/60 rounded-2xl flex items-center justify-center mb-6 text-indigo-600 shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
        <Icon size={28} />
      </div>
      <h3 className="text-xl font-bold text-slate-800 mb-3 tracking-tight">{title}</h3>
      <p className="text-slate-600 leading-relaxed text-sm font-medium">{description}</p>
    </div>
  </motion.div>
);

// --- Main Landing Page Component ---
const LandingPage = () => {
  const navigate = useNavigate(); // This line caused the error, now fixed by main.jsx
  const containerRef = useRef(null);
  
  // Parallax Hooks
  const { scrollY } = useScroll();
  const yText = useTransform(scrollY, [0, 500], [0, 100]); 
  const yBlobs = useTransform(scrollY, [0, 500], [0, -150]); 

  const handleDashboardClick = () => {
    // Logic: Redirect to Login if user is not authenticated
    const isAuthenticated = false; 
    if (isAuthenticated) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  };

  return (
    <div ref={containerRef} className="relative w-full overflow-hidden bg-slate-50 selection:bg-indigo-200 selection:text-indigo-900">
      
      {/* 1. Dynamic Aurora Background */}
      <motion.div style={{ y: yBlobs }} className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <GradientBlob className="top-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-purple-300" />
        <GradientBlob className="top-[10%] right-[-5%] w-[35rem] h-[35rem] bg-indigo-300" delay={2} />
        <GradientBlob className="bottom-[-10%] left-[20%] w-[50rem] h-[50rem] bg-cyan-300" delay={4} />
      </motion.div>

      {/* 2. Hero Section */}
      <section className="relative z-10 pt-32 pb-20 px-6 max-w-7xl mx-auto flex flex-col items-center text-center">
        
        {/* Badge */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/50 border border-white/60 backdrop-blur-md text-indigo-700 text-sm font-semibold shadow-sm mb-8"
        >
          <Sparkles size={14} className="animate-pulse" />
          <span>AI Personalized Assistant for Teachers</span>
        </motion.div>

        {/* Hero Text */}
        <motion.div style={{ y: yText }} className="max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter text-slate-900 mb-6 leading-[1.1]">
            Teaching made <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 animate-gradient-x">
              Effortless & Smart
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Create exams, lesson plans, and announcements in seconds with our advanced AI. 
            Focus on teaching, we handle the paperwork.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center w-full">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleDashboardClick}
              className="group relative bg-slate-900 text-white px-10 py-4 rounded-full font-bold text-lg shadow-2xl hover:shadow-indigo-500/25 transition-all flex items-center gap-3"
            >
              Go to Dashboard
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 rounded-full font-bold text-slate-700 bg-white/80 backdrop-blur-sm border border-white/50 hover:bg-white transition-all shadow-lg"
            >
              How it Works
            </motion.button>
          </div>
        </motion.div>
      </section>

      {/* 3. Features Section */}
      <section className="relative z-10 py-24 px-6 max-w-7xl mx-auto">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight mb-4">Powerful Features</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <GlassCard 
            icon={ScrollText}
            title="AI Exam Generator"
            description="Create comprehensive exams with MCQs and theory questions in seconds using AI based on your topic."
            delay={0.1}
          />
          <GlassCard 
            icon={LayoutDashboard}
            title="Lesson Plan Creator"
            description="Generate structured lesson plans tailored to specific grades and topics instantly with a single click."
            delay={0.2}
          />
          <GlassCard 
            icon={Megaphone}
            title="Announcement Maker"
            description="Convert informal raw thoughts into formal announcements and send them via WhatsApp instantly."
            delay={0.3}
          />
        </div>
      </section>

      {/* Spacer */}
      <div className="h-20 w-full" /> 
    </div>
  );
};

export default LandingPage;