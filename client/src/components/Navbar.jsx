// client/src/components/Navbar.jsx
import React from 'react';
import { Shield, LogOut, LayoutDashboard } from 'lucide-react';

export default function Navbar({ currentView, setView, token, handleLogout }) {
  return (
    <header className="bg-slate-900 text-white px-6 py-4 flex justify-between items-center shadow-lg border-b border-slate-800">
      {/* Brand Identity Accent Logo */}
      <div 
        className="flex items-center gap-2.5 cursor-pointer hover:opacity-90 transition"
        onClick={() => setView('landing')}
      >
        <div className="bg-amber-500 text-slate-950 font-black px-2.5 py-1 rounded text-sm tracking-tight shadow-md">
          PWD
        </div>
        <div>
          <h1 className="font-extrabold tracking-tight text-base leading-none">RoadSarthi</h1>
          <span className="text-[9px] text-amber-400 font-mono tracking-widest font-bold">STATE REPAIR AXIS</span>
        </div>
      </div>

      {/* Dynamic Session Route Access Controls Buttons */}
      <div className="flex items-center gap-3">
        {token ? (
          <div className="flex items-center gap-3">
            {currentView !== 'admin-board' && (
              <button 
                onClick={() => setView('admin-board')}
                className="flex items-center gap-1.5 bg-blue-700 hover:bg-blue-600 text-xs px-3 py-1.5 rounded-lg font-bold transition shadow-sm"
              >
                <LayoutDashboard className="h-3.5 w-3.5" /> Dashboard
              </button>
            )}
            <button 
              onClick={handleLogout}
              className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-xs px-3 py-1.5 rounded-lg font-bold transition shadow-sm"
            >
              <LogOut className="h-3.5 w-3.5" /> End Session
            </button>
          </div>
        ) : (
          <button 
            onClick={() => setView('admin-login')}
            className={`flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-xs px-3 py-1.5 rounded-lg font-bold transition border border-slate-700 shadow-sm ${currentView === 'admin-login' ? 'border-amber-500 text-amber-400' : ''}`}
          >
            <Shield className="h-3.5 w-3.5 text-amber-500" /> Official Login
          </button>
        )}
      </div>
    </header>
  );
}
