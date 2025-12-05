import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, LayoutDashboard, Megaphone, BookOpen, GraduationCap, Users, CheckCircle2 } from 'lucide-react';

// --- 1. The "Academic" Background ---
const ProfessionalBackground = () => (
  <div className="absolute inset-0 -z-10 h-full w-full bg-slate-50 overflow-hidden">
    
    {/* A. Large Professional Graph Grid (60px) */}
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:60px_60px]" />

    {/* B. Subtle "Flowing" Beam (Modern & Professional) */}
    <motion.div 
      animate={{ 
        backgroundPosition: ["0% 0%", "100% 100%"] 
      }}
      transition={{ 
        duration: 20, 
        repeat: Infinity, 
        ease: "linear" 
      }}
      className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_800px_at_50%_50%,#818cf8_0%,transparent_100%)]"
    />

    {/* C. Top Glow (The "Teacher's Desk" Light) */}
    <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-white via-white/80 to-transparent" />
  </div>
);

// --- 2. Modern "Shine" Button ---
const ModernButton = ({ children, onClick, variant = 'primary' }) => {
  const isPrimary = variant === 'primary';
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={`relative overflow-hidden rounded-xl px-8 py-4 text-base font-bold transition-all duration-300 shadow-lg ${
        isPrimary 
          ? "bg-slate-900 text-white hover:shadow-indigo-500/25 ring-1 ring-slate-900" 
          : "bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50"
      }`}
    >
      {isPrimary && (
        <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      )}
      <div className="flex items-center gap-2">{children}</div>
    </motion.button>
  );
};

// --- 3. Feature Card (Clean Glass) ---
const FeatureCard = ({ icon: Icon, title, description, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5, delay, ease: "easeOut" }}
    className="group relative flex flex-col items-start rounded-3xl border border-slate-200 bg-white/70 p-8 shadow-sm backdrop-blur-xl transition-all hover:border-indigo-300 hover:shadow-xl hover:shadow-indigo-500/10"
  >
    <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 ring-1 ring-indigo-100 transition-transform group-hover:scale-110 group-hover:rotate-6">
      <Icon size={24} />
    </div>
    <h3 className="mb-3 text-xl font-bold text-slate-900">{title}</h3>
    <p className="leading-relaxed text-slate-600">{description}</p>
  </motion.div>
);

// --- MAIN PAGE ---
const LandingPage = () => {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const { scrollY } = useScroll();
  const yText = useTransform(scrollY, [0, 300], [0, 50]);

  const handleDashboardClick = () => {
    // Auth Check Logic
    const isAuthenticated = false; 
    if (isAuthenticated) navigate('/dashboard');
    else navigate('/login');
  };

  return (
    <div ref={containerRef} className="relative min-h-screen w-full overflow-hidden font-sans selection:bg-indigo-100 selection:text-indigo-900">
      
      {/* Background */}
      <ProfessionalBackground />

      {/* --- HERO SECTION --- */}
      <section className="relative z-10 flex flex-col items-center px-6 pt-32 pb-24 text-center md:pt-40 lg:pb-32">
        
   

        {/* Main Headline */}
        <motion.div style={{ y: yText }} className="max-w-4xl">
          <h1 className="mb-6 text-5xl font-extrabold tracking-tight text-slate-900 md:text-7xl lg:text-8xl leading-[1.1]">
            Teaching, <br />
            <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-600 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
              Reimagined by AI.
            </span>
          </h1>
          
          <p className="mx-auto mb-10 max-w-2xl text-lg text-slate-600 md:text-xl leading-relaxed">
            Automate the busywork. Generate structured <span className="font-semibold text-slate-900">Lesson Plans</span>, grade <span className="font-semibold text-slate-900">Exams</span> instantly, and communicate with ease. 
            Focus on what matters—your students.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col items-center gap-4 sm:flex-row justify-center w-full">
            <ModernButton onClick={handleDashboardClick} variant="primary">
              Launch Dashboard
              <ArrowRight size={18} />
            </ModernButton>
            
            <ModernButton variant="secondary">
              Watch Demo Video
            </ModernButton>
          </div>

          {/* Trust/Social Proof */}
          <div className="mt-16 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm font-medium text-slate-500">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-emerald-500" />
              <span>Used by 10,000+ Teachers</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-emerald-500" />
              <span>Save 15hrs / week</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-emerald-500" />
              <span>Works with Google Classroom</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* --- FEATURES GRID --- */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="mb-16 md:text-center max-w-3xl mx-auto">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">Power Tools</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Everything you need to run a smarter classroom.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3 lg:gap-12">
          
          <FeatureCard 
            icon={GraduationCap}
            title="AI Exam Generator"
            description="Input any topic or paste syllabus text. Our AI generates perfectly formatted MCQs, Short Answers, and Essay questions with answer keys in seconds."
            delay={0.1}
          />

          <FeatureCard 
            icon={BookOpen}
            title="Lesson Plan Architect"
            description="Create detailed, curriculum-aligned lesson plans for any grade level. Includes learning objectives, activity timings, and resource lists."
            delay={0.2}
          />

          <FeatureCard 
            icon={Megaphone}
            title="Smart Announcements"
            description="Turn rough notes into professional letters for parents or updates for students. Formatted instantly for WhatsApp or Email."
            delay={0.3}
          />
          
        </div>
      </section>

      {/* --- BOTTOM STATS SECTION (The "Helping Tool" Vibe) --- */}
      <section className="relative z-10 border-t border-slate-200 bg-white/50 px-6 py-24 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl text-center">
           <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="flex flex-col items-center">
                 <div className="text-4xl font-black text-slate-900 mb-2">500k+</div>
                 <div className="text-slate-600 font-medium">Questions Generated</div>
              </div>
              <div className="flex flex-col items-center">
                 <div className="text-4xl font-black text-slate-900 mb-2">98%</div>
                 <div className="text-slate-600 font-medium">Teacher Satisfaction</div>
              </div>
              <div className="flex flex-col items-center">
                 <div className="text-4xl font-black text-slate-900 mb-2">24/7</div>
                 <div className="text-slate-600 font-medium">AI Availability</div>
              </div>
           </div>
        </div>
      </section>

    </div>
  );
};

export default LandingPage;