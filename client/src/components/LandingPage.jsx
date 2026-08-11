// client/src/components/LandingPage.jsx
import React from 'react';
import { Camera, RefreshCw, Layers, ShieldAlert, Award } from 'lucide-react';

export default function LandingPage({ setView }) {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 animate-fadeIn">
      {/* Professional Core Headline Hero Banner Area */}
      <div className="text-center mb-16">
        <span className="bg-blue-100 text-blue-900 text-[10px] font-black tracking-widest px-3 py-1 rounded-full uppercase border border-blue-200">
          MERN + Gemini AI Infrastructure Grid
        </span>
        <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mt-4 mb-6 leading-tight">
          Automated Road Pothole Detection <br />
          <span className="bg-gradient-to-r from-blue-900 to-amber-600 bg-clip-text text-transparent">
            & Repair Allocation System
          </span>
        </h2>
        <p className="text-slate-500 text-base max-w-xl mx-auto font-medium">
          Empowering citizens to capture roadway defects. Our system deploys advanced neural networks to map, categorize severity scores, and dispatch PWD engineers in real-time.
        </p>
      </div>

      {/* Main Multi-Route Interactive Gateway Cards Row */}
      <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-16">
        <button 
          onClick={() => setView('citizen-form')}
          className="group flex flex-col items-center p-8 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-xl hover:border-blue-900 transition-all text-center"
        >
          <div className="bg-blue-50 group-hover:bg-blue-900 text-blue-700 group-hover:text-white p-4 rounded-xl mb-4 transition-all">
            <Camera className="h-7 w-7" />
          </div>
          <h3 className="font-extrabold text-slate-900 text-base mb-1">File New Complaint</h3>
          <p className="text-xs text-slate-400 font-medium">Capture defects via image analysis & auto-fetch live GPS fields.</p>
        </button>

        <button 
          onClick={() => setView('status-board')}
          className="group flex flex-col items-center p-8 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-xl hover:border-amber-600 transition-all text-center"
        >
          <div className="bg-amber-50 group-hover:bg-amber-500 text-amber-700 group-hover:text-slate-950 p-4 rounded-xl mb-4 transition-all">
            <RefreshCw className="h-7 w-7" />
          </div>
          <h3 className="font-extrabold text-slate-900 text-base mb-1">Track Complaint Status</h3>
          <p className="text-xs text-slate-400 font-medium">Monitor real-time repair progress logs with zero refresh overhead.</p>
        </button>
      </div>

      {/* Bottom Architectural High-Value Highlights Features Grid Section */}
      <div className="grid sm:grid-cols-3 gap-6 pt-10 border-t border-slate-200 text-center">
        <div className="flex flex-col items-center p-4">
          <Layers className="h-5 w-5 text-blue-900 mb-2" />
          <h4 className="font-bold text-xs text-slate-900 uppercase tracking-wider">AI Classification</h4>
          <p className="text-[11px] text-slate-400 mt-1">Instant image analytics grading parameters using Gemini flash.</p>
        </div>
        <div className="flex flex-col items-center p-4">
          <ShieldAlert className="h-5 w-5 text-amber-500 mb-2" />
          <h4 className="font-bold text-xs text-slate-900 uppercase tracking-wider">Spam Shield Guard</h4>
          <p className="text-[11px] text-slate-400 mt-1">Automatically detects and blocks junk uploads or non-road images.</p>
        </div>
        <div className="flex flex-col items-center p-4">
          <Award className="h-5 w-5 text-emerald-600 mb-2" />
          <h4 className="font-bold text-xs text-slate-900 uppercase tracking-wider">Civic Accountability</h4>
          <p className="text-[11px] text-slate-400 mt-1">Bridges the gap between data tracking streams and government response systems.</p>
        </div>
      </div>
    </div>
  );
}
