import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { Mail, Lock, ArrowRight, Eye, EyeOff } from "lucide-react"; 
import { Link } from "react-router-dom";

// Self-contained Google Icon to avoid external dependency issues
const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M23.52 12.273c0-.851-.076-1.67-.218-2.455H12v4.637h6.455c-.279 1.504-1.127 2.778-2.4 3.633v3.018h3.887c2.274-2.094 3.585-5.176 3.585-8.833z" fill="#4285F4"/>
    <path d="M12 24c3.24 0 5.957-1.074 7.942-2.909l-3.887-3.018c-1.075.72-2.451 1.145-4.055 1.145-3.127 0-5.773-2.112-6.72-4.953H1.29v3.115C3.266 21.291 7.334 24 12 24z" fill="#34A853"/>
    <path d="M5.28 14.265c-.24-.72-.375-1.491-.375-2.265s.135-1.545.375-2.265V6.62H1.29C.466 8.265 0 10.083 0 12c0 1.917.466 3.735 1.29 5.38l3.99-3.115z" fill="#FBBC05"/>
    <path d="M12 4.773c1.763 0 3.345.606 4.59 1.794l3.44-3.44C17.953 1.188 15.236 0 12 0 7.334 0 3.266 2.709 1.29 6.62l3.99 3.115c.947-2.841 3.593-4.962 6.72-4.962z" fill="#EA4335"/>
  </svg>
);

const Login = () => {
  // --- 1. State Management ---
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // --- 2. Parallax Mouse Effect ---
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      
      animate(mouseX, (clientX - centerX) / 50, { type: "spring", damping: 20 });
      animate(mouseY, (clientY - centerY) / 50, { type: "spring", damping: 20 });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const blobX = useTransform(mouseX, (value) => value * -1);
  const blobY = useTransform(mouseY, (value) => value * -1);

  // --- 3. Form Handler ---
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API Call
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <>
      {/* Injecting the Animation Styles directly here. 
        No tailwind.config.js changes needed! 
      */}
      <style>{`
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }
      `}</style>

      <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-slate-50 font-sans text-slate-600">
        
        {/* --- BACKGROUND PARALLAX BLOBS (Teal & Blue Theme) --- */}
        <motion.div style={{ x: blobX, y: blobY }} className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-teal-500/30 rounded-full blur-[100px] mix-blend-multiply animate-pulse" />
          <div className="absolute top-[20%] right-[-10%] w-96 h-96 bg-cyan-500/30 rounded-full blur-[100px] mix-blend-multiply animate-pulse delay-700" />
          <div className="absolute bottom-[-20%] left-[20%] w-96 h-96 bg-emerald-500/20 rounded-full blur-[100px] mix-blend-multiply animate-pulse delay-1000" />
        </motion.div>

        {/* --- MAIN GLASS CARD --- */}
        <motion.div 
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative z-10 w-full max-w-md p-8 rounded-3xl mx-4 border border-white/40 shadow-[0_8px_30px_rgb(0,0,0,0.12)] bg-white/60 backdrop-blur-xl"
        >
          
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
              Welcome Back
            </h1>
            <p className="text-slate-500 mt-2 text-sm">
              Enter your details to access your workspace.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Email Input */}
            <div className="relative group">
              <Mail className="absolute left-4 top-3.5 text-slate-400 group-focus-within:text-teal-600 transition-colors w-5 h-5" />
              <input 
                type="email" 
                placeholder="Email Address"
                className="w-full bg-white/50 border border-slate-200 rounded-xl py-3 pl-12 pr-4 text-slate-800 outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all placeholder:text-slate-400"
                required
              />
            </div>

            {/* Password Input */}
            <div className="relative group">
              <Lock className="absolute left-4 top-3.5 text-slate-400 group-focus-within:text-teal-600 transition-colors w-5 h-5" />
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="Password"
                className="w-full bg-white/50 border border-slate-200 rounded-xl py-3 pl-12 pr-12 text-slate-800 outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all placeholder:text-slate-400"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-3.5 text-slate-400 hover:text-teal-600 transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* Forgot Password Link */}
            <div className="flex justify-end">
              <a href="#" className="text-sm font-medium text-teal-600 hover:text-teal-700 transition-colors">
                Forgot Password?
              </a>
            </div>

            {/* 👇 TEAL NEON BUTTON 👇 */}
            <motion.button
              whileHover={{ scale: 1.02, filter: "brightness(1.1)" }}
              whileTap={{ scale: 0.98 }}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-teal-400 via-cyan-500 to-emerald-500 animate-gradient-x text-white py-3.5 rounded-xl font-bold shadow-lg shadow-teal-500/40 flex items-center justify-center gap-2 hover:shadow-teal-500/60 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>Sign In</span> <ArrowRight size={20} />
                </>
              )}
            </motion.button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200/60"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white/80 px-2 text-slate-400 backdrop-blur-sm rounded">Or continue with</span>
            </div>
          </div>

          {/* Google Button */}
          <motion.button
            whileHover={{ scale: 1.02, backgroundColor: "#ffffff" }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-white/60 border border-slate-200 text-slate-700 py-3 rounded-xl font-semibold flex items-center justify-center gap-3 hover:shadow-md transition-all"
          >
            <GoogleIcon />
            <span>Google</span>
          </motion.button>

          {/* Footer */}
          <p className="text-center mt-8 text-sm text-slate-500">
            Don't have an account?{" "}
            <Link to="/signup" className="font-bold text-teal-600 hover:underline">
              Create Free Account
            </Link>
          </p>
        </motion.div>
      </div>
    </>
  );
};

export default Login;