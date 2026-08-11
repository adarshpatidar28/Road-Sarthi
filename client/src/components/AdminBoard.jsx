// client/src/components/AdminBoard.jsx
import React, { useState } from 'react';
import { Filter, Eye, CheckCircle2, AlertTriangle } from 'lucide-react';

export default function AdminBoard({ complaints, filters, setFilters, executeStatusModifier }) {
  return (
    <div className="animate-fadeIn">
      {/* Main Board Description Accent */}
      <div className="mb-6">
        <h3 className="text-xl font-black text-slate-900">PWD Administrative Workspace</h3>
        <p className="text-slate-400 text-xs font-semibold mt-0.5">Government Infrastructure Verification Logistical Grid Sheet Module</p>
      </div>

      {/* Advanced Matrix Sorting Filters Control Deck Component Panel */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm mb-6 grid sm:grid-cols-3 gap-3 items-center">
        <select value={filters.severity} onChange={e => setFilters({...filters, severity: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs font-bold text-slate-700 focus:outline-none">
          <option value="">All AI Severity Levels</option>
          <option value="Severe">Severe</option>
          <option value="Moderate">Moderate</option>
          <option value="Less">Less</option>
          <option value="Spam">Spam</option>
        </select>
        <select value={filters.status} onChange={e => setFilters({...filters, status: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs font-bold text-slate-700 focus:outline-none">
          <option value="">All Field Progress States</option>
          <option value="Reported">Reported</option>
          <option value="Seen">Seen</option>
          <option value="Work in Progress">Work in Progress</option>
          <option value="Done">Done</option>
        </select>
        <input type="text" placeholder="Search specific Village/Landmark name..." value={filters.locationSearch} onChange={e => setFilters({...filters, locationSearch: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs focus:outline-none" />
      </div>

      {/* Main Administrative Structured Log Table Content Core Matrix */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900 text-white text-[9px] uppercase font-black tracking-widest border-b border-slate-800">
                <th className="px-4 py-3">Photo Canvas Link</th>
                <th className="px-4 py-3">Village Location Details</th>
                <th className="px-4 py-3">AI Vision Inference Rating</th>
                <th className="px-4 py-3">Executive Status Allocations</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs font-semibold text-slate-600">
              {complaints.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-4 py-10 text-center text-slate-400 font-bold">No registered documents matching sorting variables.</td>
                </tr>
              ) : (
                complaints.map(item => (
                  <tr key={item._id} className="hover:bg-slate-50/80 transition">
                    <td className="px-4 py-3">
                      <img src={`http://localhost:5000${item.imageUrl}`} alt="Crater Media" className="h-11 w-18 object-cover rounded-lg border border-slate-200 shadow-sm bg-slate-50" />
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-extrabold text-slate-900">{item.location?.manualAddress || 'Not Registered'}</p>
                      <p className="text-[9px] text-slate-400 font-mono mt-0.5">LNG: {item.location?.coordinates?.[0]} | LAT: {item.location?.coordinates?.[1]}</p>
                      <p className="text-[9px] text-slate-400 italic font-semibold mt-0.5">Filer: {item.citizenName}</p>
                    </td>
                    <td className="px-4 py-3 max-w-[200px]">
                      <span className={`text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider ${
                        item.aiAnalysis?.severity === 'Severe' ? 'bg-red-100 text-red-700 border border-red-200' :
                        item.aiAnalysis?.severity === 'Moderate' ? 'bg-amber-100 text-amber-800 border border-amber-200' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {item.aiAnalysis?.severity}
                      </span>
                      <p className="text-[10px] text-slate-400 mt-1 font-medium font-sans leading-tight line-clamp-2">
                        {item.aiAnalysis?.analysisDetail || 'No detailed analysis summary mapped.'}
                      </p>
                    </td>
                    <td className="px-4 py-3 min-w-[200px] space-y-1.5">
                      <select 
                        value={item.pwdAction?.status || 'Reported'} 
                        onChange={e => executeStatusModifier(item._id, e.target.value, item.pwdAction?.officerComment)} 
                        className="w-full bg-slate-100 border border-slate-200 text-[10px] font-black rounded p-1.5 focus:outline-none"
                      >
                        <option value="Reported">Reported</option>
                        <option value="Seen">Seen</option>
                        <option value="Work in Progress">Work in Progress</option>
                        <option value="Done">Done</option>
                      </select>
                      <input 
                        type="text" placeholder="Inscribe engineering directive commentary text..." 
                        defaultValue={item.pwdAction?.officerComment} 
                        onBlur={e => executeStatusModifier(item._id, item.pwdAction?.status, e.target.value)} 
                        className="w-full bg-slate-50 border border-slate-200 text-[10px] rounded p-1.5 focus:outline-none font-medium" 
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
