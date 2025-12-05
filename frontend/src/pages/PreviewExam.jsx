import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Download, Monitor, ArrowLeft, ArrowRight,
  Printer, CheckCircle, Globe, Clock, Users
} from 'lucide-react';

const PreviewExam = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get data passed from CreateExam page
  const examData = location.state?.examData;

  // Handle case where user comes here directly without generating
  if (!examData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <h2 className="text-xl font-bold text-slate-800">No Exam Generated</h2>
        <button onClick={() => navigate('/create-exam')} className="mt-4 text-indigo-600 underline">Go to Create Exam</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8 font-sans text-slate-800">
      
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px]" />

      <div className="max-w-7xl mx-auto">
        
        {/* Header Action Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <button 
            onClick={() => navigate('/create-exam')}
            className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors font-medium self-start md:self-auto"
          >
            <div className="p-2 bg-white rounded-full border border-slate-200 shadow-sm">
                <ArrowLeft size={18} /> 
            </div>
            Back to Edit
          </button>
          
          <div className="px-4 py-1.5 bg-green-100 text-green-700 rounded-full text-sm font-bold flex items-center gap-2 border border-green-200 shadow-sm">
             <CheckCircle size={14} /> AI Generated Successfully
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* --- LEFT COLUMN: THE EXAM PAPER PREVIEW --- */}
          <div className="lg:col-span-8 w-full">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white shadow-xl rounded-xl border border-slate-200 overflow-hidden flex flex-col relative"
              // Responsive Height: 600px on mobile, 850px on desktop
              style={{ height: '850px', maxHeight: '85vh' }} 
            >
              
              {/* 1. Paper Header (Fixed at top) */}
              <div className="flex-none border-b border-slate-100 p-8 bg-slate-50/30 text-center">
                  <h1 className="text-3xl font-black text-slate-900 uppercase tracking-wide mb-3">
                    {examData.title}
                  </h1>
                  
                  {/* Meta Data Row */}
                  <div className="flex flex-wrap justify-center gap-6 text-sm font-semibold text-slate-500">
                    <span className="flex items-center gap-1.5 bg-slate-100 px-3 py-1 rounded-md border border-slate-200">
                        <CheckCircle size={14}/> Marks: {examData.totalMarks}
                    </span>
                    <span className="flex items-center gap-1.5 bg-slate-100 px-3 py-1 rounded-md border border-slate-200">
                        <Clock size={14}/> Time: 60 Min
                    </span>
                    <span className="flex items-center gap-1.5 bg-slate-100 px-3 py-1 rounded-md border border-slate-200">
                        <Users size={14}/> {examData.questions.length} Qs
                    </span>
                  </div>
              </div>

              {/* 2. Scrollable Questions Area */}
              <div className="flex-1 overflow-y-auto p-8 sm:p-10 space-y-8 bg-white scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
                {examData.questions.map((q, idx) => (
                  <div key={idx} className="relative group">
                    <div className="flex gap-4">
                      {/* Question Number */}
                      <span className="flex-none font-bold text-slate-300 text-xl select-none w-8 text-right pt-0.5">
                        {idx + 1}.
                      </span>
                      
                      <div className="flex-1">
                        <div className="flex justify-between items-start gap-4">
                          <p className="text-lg text-slate-800 font-medium leading-relaxed">
                            {q.question}
                          </p>
                          <span className="flex-none text-xs font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded border border-slate-100 whitespace-nowrap">
                            [{q.marks}]
                          </span>
                        </div>

                        {/* Options for MCQ */}
                        {q.type === 'MCQ' && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                            {q.options.map((opt, i) => (
                              <div key={i} className="text-sm font-medium text-slate-600 flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer border border-transparent hover:border-slate-200 group/opt">
                                <span className="font-bold text-slate-400 bg-slate-100 group-hover/opt:bg-white group-hover/opt:text-indigo-600 w-6 h-6 flex items-center justify-center rounded-full text-xs transition-colors border border-slate-200">
                                  {String.fromCharCode(65+i)}
                                </span> 
                                {opt}
                              </div>
                            ))}
                          </div>
                        )}
                        
                        {/* Writing Space for Theory (Visual only) */}
                        {q.type !== 'MCQ' && (
                           <div className="mt-4 border-l-2 border-slate-100 pl-4 space-y-3 opacity-50">
                              <div className="h-px bg-slate-100 w-full" />
                              <div className="h-px bg-slate-100 w-full" />
                              {q.marks > 3 && <div className="h-px bg-slate-100 w-full" />}
                           </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* 3. Paper Footer (Fixed at bottom) */}
              <div className="flex-none p-4 border-t border-slate-100 bg-slate-50/50 text-center z-10">
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                  Generated by AI Teacher Assistant • {new Date().getFullYear()}
                </p>
              </div>

            </motion.div>
          </div>

          {/* --- RIGHT COLUMN: ACTIONS --- */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* 1. Conduct Exam Card */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xl relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
              
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
                  <Globe size={24} />
                </div>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                   <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" /> Ready
                </span>
              </div>

              <h3 className="font-bold text-xl text-slate-900 mb-2">Conduct Live Exam</h3>
              <p className="text-sm text-slate-500 mb-6 leading-relaxed">
                Create a secure, real-time exam session for your students instantly.
              </p>

              <div className="grid grid-cols-2 gap-3 mb-6">
                 <div className="bg-slate-50 p-2 rounded-lg border border-slate-100 text-center">
                    <span className="block text-xs text-slate-400 font-bold uppercase">Format</span>
                    <span className="font-semibold text-slate-700 text-sm">Web-Based</span>
                 </div>
                 <div className="bg-slate-50 p-2 rounded-lg border border-slate-100 text-center">
                    <span className="block text-xs text-slate-400 font-bold uppercase">Students</span>
                    <span className="font-semibold text-slate-700 text-sm">Unlimited</span>
                 </div>
              </div>
              
              <button 
                onClick={() => navigate('/conduct-exam')}
                className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white py-4 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 active:translate-y-0.5 text-base"
              >
                Start Session <ArrowRight size={18} />
              </button>
            </motion.div>

            {/* 2. Download Card */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 bg-slate-100 text-slate-600 rounded-lg">
                    <Printer size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">Export Paper</h3>
                    <p className="text-xs text-slate-500">PDF Format • A4 Size</p>
                  </div>
              </div>
              
              <button 
                onClick={() => alert("Downloading PDF...")}
                className="w-full flex items-center justify-center gap-2 bg-white border-2 border-slate-200 text-slate-700 py-3 rounded-xl font-bold hover:bg-slate-50 hover:border-slate-300 transition-all active:scale-95"
              >
                <Download size={18} /> 
                Download PDF
              </button>
            </motion.div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default PreviewExam;