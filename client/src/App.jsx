// client/src/App.jsx
import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { AlertCircle } from 'lucide-react';

// Core Sub-Pages Components Matrix Imports
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import ComplaintForm from './components/ComplaintForm';
import StatusTracker from './components/StatusTracker';
import OfficerLogin from './components/OfficerLogin';
import AdminBoard from './components/AdminBoard';

const socket = io('http://localhost:5000');

export default function App() {
  // Global State View Configurations
  const [view, setView] = useState('landing');
  const [token, setToken] = useState(localStorage.getItem('officerToken') || '');
  const [complaints, setComplaints] = useState([]);
  const [toast, setToast] = useState('');

  // Dashboard Filters Mapping Track Profile
  const [filters, setFilters] = useState({ severity: '', status: '', locationSearch: '' });

  // 📡 Activate Real-Time Communication Synchronizer Streams on Mount
  useEffect(() => {
    socket.on('statusUpdate', (payload) => {
      setToast(payload.message);
      synchronizePlatformData();
      setTimeout(() => setToast(''), 5000); // Expiry flash notification window limit
    });
    synchronizePlatformData();
    return () => socket.off('statusUpdate');
  }, [view, filters, token]);

  const synchronizePlatformData = async () => {
    try {
      let API_ENDPOINT = 'http://localhost:5000/api/v1/admin/complaints';
      
      // Inject query parameters when an active official sorts fields on the board array
      if (view === 'admin-board' && token) {
        const urlParams = new URLSearchParams({
          severity: filters.severity,
          status: filters.status,
          searchLocation: filters.locationSearch
        }).toString();
        API_ENDPOINT += `?${urlParams}`;
      }

      const headers = token ? { 'Authorization': `Bearer ${token}` } : {};
      const response = await fetch(API_ENDPOINT, { headers });
      const payload = await response.json();
      if (payload.success) setComplaints(payload.data);
    } catch (err) {
      console.error("Central Sync pipeline error exception", err);
    }
  };

  const handleGlobalLogoutAction = () => {
    localStorage.removeItem('officerToken');
    setToken('');
    setView('landing');
  };

  const handleStatusUpdateModification = async (id, statusOption, commentText) => {
    try {
      await fetch(`http://localhost:5000/api/v1/admin/complaints/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: statusOption, officerComment: commentText })
      });
      synchronizePlatformData();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans antialiased">
      
      {/* 🔔 FLOATING REAL-TIME SYSTEM FLUID NOTIFICATION ALERTS TOAST */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 border border-slate-700 px-5 py-3 rounded-xl shadow-2xl animate-bounce flex items-center gap-3 text-white">
          <AlertCircle className="text-amber-500 h-5 w-5" />
          <span className="text-xs font-black uppercase font-mono tracking-tight">{toast}</span>
        </div>
      )}

      {/* Global Application Nav Header */}
      <Navbar currentView={view} setView={setView} token={token} handleLogout={handleGlobalLogoutAction} />

      {/* 🛣️ SYSTEM STATE INTERACTIVE MULTI-PAGE ROUTER GRID VIEW WINDOW */}
      <main className="flex-1 p-4 md:p-8 max-w-6xl w-full mx-auto">
        {view === 'landing' && <LandingPage setView={setView} />}
        {view === 'citizen-form' && <ComplaintForm setView={setView} />}
        {view === 'status-board' && <StatusTracker complaints={complaints} setView={setView} />}
        {view === 'admin-login' && <OfficerLogin setToken={setToken} setView={setView} />}
        {view === 'admin-board' && <AdminBoard complaints={complaints} filters={filters} setFilters={setFilters} executeStatusModifier={handleStatusUpdateModification} />}
      </main>

      {/* Regulatory Institutional Quality Seal Accent Base */}
      <footer className="bg-slate-900 border-t border-slate-800 text-slate-500 py-3.5 text-center text-[9px] font-black font-mono tracking-wider uppercase">
        © 2026 ROADWAY INTEGRITY SYSTEM CHANNELS • PUBLIC WORKS SECTOR CONTROL OVERLAYS MODULES PANEL
      </footer>
    </div>
  );
}
