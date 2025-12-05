import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  FileText, 
  Megaphone, 
  BookOpen, 
  Users, 
  Search,
  Bell,
  LogOut,
  Calendar,
  CheckCircle2,
  X 
} from 'lucide-react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';

// --- Mock Data for Timeline ---
const recentExams = [
  { id: 1, title: 'Physics Final: Thermodynamics', class: 'Class 10-A', date: 'Oct 10, 2025', status: 'Completed', time: '10:00 AM' },
  { id: 2, title: 'Chemistry: Organic Compounds', class: 'Class 12-B', date: 'Oct 15, 2025', status: 'Scheduled', time: '02:00 PM' },
  { id: 3, title: 'Biology: Plant Systems', class: 'Class 9-C', date: 'Oct 20, 2025', status: 'Draft', time: '11:30 AM' },
  { id: 4, title: 'Mathematics: Calculus I', class: 'Class 11-A', date: 'Oct 22, 2025', status: 'Draft', time: '09:00 AM' },
  { id: 5, title: 'English Literature: Shakespeare', class: 'Class 10-B', date: 'Oct 25, 2025', status: 'Scheduled', time: '01:00 PM' },
];

// --- Updated Dock Item Component (Labels Underneath) ---
const DockItem = ({ icon: Icon, label, isActive, onClick, color }) => {
    return (
        <button 
            onClick={onClick}
            className="group flex flex-col items-center justify-end gap-1.5 min-w-[72px] pb-1 relative"
        >
            <motion.div
                whileHover={{ y: -6, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`
                    w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center text-white shadow-lg transition-all duration-300
                    ${isActive ? 'ring-4 ring-white ring-offset-2 ring-offset-indigo-50 shadow-xl' : 'opacity-90 hover:opacity-100'}
                    ${color}
                `}
            >
                <Icon size={24} strokeWidth={1.5} />
            </motion.div>
            
            {/* Permanent Label: Always visible underneath */}
            <span className={`
                text-[10px] md:text-[11px] font-medium tracking-tight leading-none text-center transition-colors duration-200
                ${isActive ? 'text-indigo-600 font-bold' : 'text-slate-500 group-hover:text-slate-700'}
            `}>
                {label}
            </span>

            {/* Active Indicator Dot */}
            {isActive && (
                <motion.div 
                    layoutId="activeDot"
                    className="absolute -bottom-1 w-1 h-1 bg-indigo-500 rounded-full" 
                />
            )}
        </button>
    );
};

// --- Glass Modal Component (The Popup) ---
const GlassModal = ({ children, onClose }) => {
    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 flex items-center justify-center bg-slate-900/20 backdrop-blur-sm p-4 md:p-8 pb-36" 
        >
            <motion.div 
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="bg-white/90 backdrop-blur-xl w-full max-w-5xl h-full max-h-[85vh] rounded-3xl shadow-2xl border border-white/50 overflow-hidden flex flex-col relative"
            >
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200/60 bg-white/40">
                    <div className="flex gap-2">
                        <button onClick={onClose} className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors flex items-center justify-center group">
                            <X size={8} className="text-red-900 opacity-0 group-hover:opacity-100" />
                        </button>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    
                    <button 
                        onClick={onClose}
                        className="p-2 hover:bg-slate-200/50 rounded-full transition-colors"
                    >
                        <X size={20} className="text-slate-500" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
                    {children}
                </div>
            </motion.div>
        </motion.div>
    );
};

// --- Main Layout Component ---
const MacOsDashboard = () => {
    const [currentTime, setCurrentTime] = useState(new Date());
    const navigate = useNavigate();
    const location = useLocation();

    const isDashboardHome = location.pathname === '/dashboard' || location.pathname === '/dashboard/';

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 60000);
        return () => clearInterval(timer);
    }, []);

    const getGreeting = () => {
        const hour = currentTime.getHours();
        if (hour < 12) return "Good Morning";
        if (hour < 18) return "Good Afternoon";
        return "Good Evening";
    };

    const handleNavigation = (path) => {
        navigate(path);
    };

    const closeModal = () => {
        navigate('/dashboard');
    };

    return (
        <div className="h-screen w-full bg-[#f6f8fc] relative overflow-hidden flex flex-col font-sans">
            
            {/* --- Top Bar --- */}
            <header className="h-16 px-6 md:px-10 flex items-center justify-between z-10 sticky top-0">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">E</div>
                    <span className="font-bold text-slate-700 tracking-tight">EduGenius AI</span>
                </div>
                
                <div className="hidden md:flex items-center bg-white/60 backdrop-blur-md border border-white/50 shadow-sm rounded-full px-4 py-2 w-96 transition-all focus-within:ring-2 focus-within:ring-indigo-100 focus-within:bg-white">
                    <Search size={16} className="text-slate-400" />
                    <input 
                        type="text" 
                        placeholder="Ask Vynx anything..." 
                        className="bg-transparent border-none outline-none text-sm text-slate-700 ml-2 w-full placeholder:text-slate-400"
                    />
                </div>

                <div className="flex items-center gap-4">
                    <span className="text-sm font-medium text-slate-500 hidden sm:block">
                        {currentTime.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
                    </span>
                    <button className="relative p-2 rounded-full hover:bg-white/50 transition-colors">
                        <Bell size={20} className="text-slate-600" />
                        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                    </button>
                    <div className="w-9 h-9 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-bold border-2 border-white shadow-sm">
                        T
                    </div>
                </div>
            </header>

            {/* --- Main Content Area --- */}
            <main className="flex-1 relative z-0 overflow-y-auto p-4 md:p-6 pb-44 scrollbar-hide">
                <div className="max-w-7xl mx-auto h-full flex flex-col justify-center">
                    
                    {/* --- Introduction Page: Recent Exams --- */}
                    <div className="flex flex-col items-center w-full">
                        <div className="text-center mb-8">
                            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight mb-2">
                                {getGreeting()}, <span className="text-indigo-600">Vynx.</span>
                            </h1>
                        </div>

                        {/* Recent Exams List */}
                        <div className="w-full max-w-2xl bg-white/50 backdrop-blur-sm rounded-3xl p-6 border border-white/60 shadow-xl shadow-indigo-100/50">
                            <div className="flex items-center justify-between mb-6 px-2">
                                <h3 className="text-base font-bold text-slate-700 flex items-center gap-2">
                                    <Calendar size={18} className="text-indigo-500" />
                                    Recent Exams
                                </h3>
                            </div>
                            
                            <div className="space-y-3 relative">
                                <div className="absolute left-6 top-4 bottom-4 w-0.5 bg-slate-200/80"></div>

                                {recentExams.slice(0, 3).map((item, idx) => (
                                    <motion.div 
                                        key={item.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                        className="relative bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-center gap-4 ml-2 hover:scale-[1.02] transition-transform cursor-pointer group hover:shadow-md"
                                    >
                                        <div className={`
                                            relative z-10 w-9 h-9 rounded-full flex items-center justify-center border-4 border-white shadow-sm shrink-0
                                            ${item.status === 'Completed' ? 'bg-emerald-100 text-emerald-600' : 'bg-indigo-100 text-indigo-600'}
                                        `}>
                                            {item.status === 'Completed' ? <CheckCircle2 size={16}/> : <FileText size={16}/>}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between items-center mb-1">
                                                <h4 className="font-semibold text-slate-700 truncate pr-2 group-hover:text-indigo-600 transition-colors">{item.title}</h4>
                                                <span className="text-xs font-bold text-slate-400 whitespace-nowrap bg-slate-50 px-2 py-1 rounded-md">{item.time}</span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <p className="text-xs text-slate-500 font-medium">{item.class}</p>
                                                <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                                                    item.status === 'Completed' ? 'bg-emerald-50 text-emerald-600' : 'bg-indigo-50 text-indigo-600'
                                                }`}>
                                                    {item.status}
                                                </span>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* --- The Popup / Modal Layer --- */}
            <AnimatePresence>
                {!isDashboardHome && (
                    <GlassModal onClose={closeModal}>
                        <Outlet />
                    </GlassModal>
                )}
            </AnimatePresence>

            {/* --- The Dock (Fixed Bottom with Labels) --- */}
            <div className="fixed bottom-6 left-0 right-0 flex justify-center z-50 pointer-events-none">
                <motion.div 
                    initial={{ y: 100 }}
                    animate={{ y: 0 }}
                    className="bg-white/90 backdrop-blur-2xl border border-white/50 shadow-2xl shadow-indigo-900/10 px-4 md:px-8 py-3 pb-4 rounded-[2rem] flex items-end gap-2 md:gap-4 pointer-events-auto"
                >
                    <DockItem 
                        icon={LayoutDashboard} 
                        label="Dashboard" 
                        path="/dashboard"
                        isActive={isDashboardHome} 
                        onClick={() => handleNavigation('/dashboard')} 
                        color="bg-slate-700"
                    />
                    <div className="w-px h-12 bg-slate-300/40 mx-1 mb-2"></div>
                    
                    <DockItem 
                        icon={FileText} 
                        label="Exams" 
                        path="/dashboard/create-exam"
                        isActive={location.pathname.includes('exams')} 
                        onClick={() => handleNavigation('/dashboard/create-exam')} 
                        color="bg-indigo-500"
                    />
                    <DockItem 
                        icon={BookOpen} 
                        label="Lesson Plans" 
                        path="/dashboard/lesson-plan"
                        isActive={location.pathname.includes('lesson-plan')} 
                        onClick={() => handleNavigation('/dashboard/lesson-plan')} 
                        color="bg-emerald-500"
                    />
                    <DockItem 
                        icon={Megaphone} 
                        label="Notice" 
                        path="/dashboard/announcements"
                        isActive={location.pathname.includes('announcements')} 
                        onClick={() => handleNavigation('/dashboard/announcements')} 
                        color="bg-sky-500"
                    />
                    <DockItem 
                        icon={Users} 
                        label="Students" 
                        path="/dashboard/students"
                        isActive={location.pathname.includes('students')} 
                        onClick={() => handleNavigation('/dashboard/students')} 
                        color="bg-violet-500"
                    />
                    
                    <div className="w-px h-12 bg-slate-300/40 mx-1 mb-2"></div>

                    <DockItem 
                        icon={LogOut} 
                        label="Logout" 
                        isActive={false} 
                        onClick={() => navigate('/')} 
                        color="bg-red-500"
                    />
                </motion.div>
            </div>
        </div>
    );
};

export default MacOsDashboard;