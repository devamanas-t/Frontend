import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { FcGoogle } from "react-icons/fc"; // Google Icon
import { FiMail, FiLock, FiArrowRight, FiEye, FiEyeOff } from "react-icons/fi"; // UI Icons
import { Link } from "react-router-dom";

const Login = () => {
  // --- 1. State Management ---
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);

  // --- 2. Parallax Mouse Effect Logic ---
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Calculate mouse position relative to center of screen
      const { clientX, clientY } = e;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      
      // Smoothly animate the values
      animate(mouseX, (clientX - centerX) / 50, { type: "spring", damping: 20 });
      animate(mouseY, (clientY - centerY) / 50, { type: "spring", damping: 20 });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Transform for background blobs (Move opposite to mouse)
  const blobX = useTransform(mouseX, (value) => value * -1);
  const blobY = useTransform(mouseY, (value) => value * -1);


  // --- 3. Form Handlers ---
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API Call
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-background">
      
      {/* --- BACKGROUND PARALLAX BLOBS --- */}
      <motion.div style={{ x: blobX, y: blobY }} className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-primary/30 rounded-full blur-[100px] mix-blend-multiply filter" />
        <div className="absolute top-[20%] right-[-10%] w-96 h-96 bg-secondary/30 rounded-full blur-[100px] mix-blend-multiply filter" />
        <div className="absolute bottom-[-20%] left-[20%] w-96 h-96 bg-accent/20 rounded-full blur-[100px] mix-blend-multiply filter" />
      </motion.div>

      {/* --- MAIN GLASS CARD --- */}
      <motion.div 
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="glass-panel relative z-10 w-full max-w-md p-8 rounded-3xl mx-4"
      >
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-display text-3xl font-bold text-textMain tracking-tight">
            Welcome Back
          </h1>
          <p className="text-textSub mt-2 text-sm">
            Enter your details to access your workspace.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Email Input */}
          <div className="relative group">
            <FiMail className="absolute left-4 top-3.5 text-textSub group-focus-within:text-primary transition-colors" />
            <input 
              type="email" 
              placeholder="Email Address"
              className="w-full bg-white/50 border border-slate-200 rounded-xl py-3 pl-12 pr-4 text-textMain focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-slate-400"
              required
            />
          </div>

          {/* Password Input */}
          <div className="relative group">
            <FiLock className="absolute left-4 top-3.5 text-textSub group-focus-within:text-primary transition-colors" />
            <input 
              type={showPassword ? "text" : "password"} 
              placeholder="Password"
              className="w-full bg-white/50 border border-slate-200 rounded-xl py-3 pl-12 pr-12 text-textMain focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-slate-400"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-3.5 text-slate-400 hover:text-textMain transition-colors"
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>

          {/* Forgot Password Link */}
          <div className="flex justify-end">
            <a href="#" className="text-sm font-medium text-primary hover:text-primary-hover transition-colors">
              Forgot Password?
            </a>
          </div>

          {/* Liquid Button (Submit) */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isLoading}
            className="w-full bg-primary text-white py-3.5 rounded-xl font-bold shadow-lg shadow-indigo-500/30 flex items-center justify-center gap-2 hover:bg-primary-hover transition-all disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                Sign In <FiArrowRight />
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
          className="w-full bg-white/60 border border-slate-200 text-textMain py-3 rounded-xl font-semibold flex items-center justify-center gap-3 hover:shadow-md transition-all"
        >
          <FcGoogle className="text-xl" />
          <span>Google</span>
        </motion.button>

        {/* Footer */}
        <p className="text-center mt-8 text-sm text-textSub">
          Don't have an account?{" "}
          <Link to="/signup" className="font-bold text-primary hover:underline">
            Create Free Account
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;