// client/src/components/OfficerLogin.jsx
import React, { useState } from 'react';
import { Shield, Lock, User, AlertCircle } from 'lucide-react';

export default function OfficerLogin({ setToken, setView }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const executeSecurityHandshake = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('https://road-sarthi.onrender.com/api/v1/auth/officer-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (data.success) {
        localStorage.setItem('officerToken', data.token);
        setToken(data.token);
        setView('admin-board');
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Network refusal error state from secure system gateways.");
    }
  };

  return (
    <div className="max-w-xs mx-auto bg-white border border-slate-200 rounded-2xl p-6 shadow-xl mt-12 animate-fadeIn">
      {/* Header Accent Logo Branding */}
      <div className="text-center mb-5">
        <div className="inline-block bg-amber-100 p-2.5 rounded-xl text-amber-700 mb-2">
          <Shield className="h-6 w-6" />
        </div>
        <h3 className="font-black text-slate-900 text-base leading-tight">PWD Internal Login</h3>
        <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">Administrative Clearance Layer</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-[10px] font-bold p-2.5 rounded-lg mb-4 flex items-center gap-1.5 animate-shake">
          <AlertCircle className="h-3.5 w-3.5 shrink-0" /> {error}
        </div>
      )}

      <form onSubmit={executeSecurityHandshake} className="space-y-3">
        <div className="relative">
          <User className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
          <input type="text" required placeholder="Officer Username" value={username} onChange={e => setUsername(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3 py-2 text-xs focus:outline-none focus:border-blue-900 transition" />
        </div>
        <div className="relative">
          <Lock className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
          <input type="password" required placeholder="Security Password Token" value={password} onChange={e => setPassword(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3 py-2 text-xs focus:outline-none focus:border-blue-900 transition" />
        </div>
        <button type="submit" className="w-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-black py-2.5 rounded-lg tracking-wider uppercase transition shadow-md">
          Validate Credentials
         </button>
      </form>
    </div>
  );
}
