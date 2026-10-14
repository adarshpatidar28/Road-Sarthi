// client/src/components/StatusTracker.jsx
import React from 'react';
import { ArrowLeft, MessageSquare, AlertCircle } from 'lucide-react';

export default function StatusTracker({ complaints, setView }) {
  return (
    <div className="animate-fadeIn">
      {/* Section Dashboard Header Sub Navigation Bar */}
      <div className="flex justify-between items-center mb-8 border-b border-slate-200 pb-3">
        <div>
          <h3 className="text-xl font-black text-slate-900 tracking-tight">Public Damage Track Records</h3>
          <p className="text-[11px] text-slate-400 font-medium">Real-time verified listings powered via synchronization networks.</p>
        </div>
        <button 
          onClick={() => setView('landing')}
          className="flex items-center gap-1 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold px-3 py-1.5 rounded-lg transition"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to Portal
        </button>
      </div>

      {/* Grid Display Card Profiles Loop Engine */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {complaints.length === 0 ? (
          <div className="text-center py-12 col-span-full border border-dashed border-slate-200 rounded-xl bg-white p-6">
            <AlertCircle className="h-6 w-6 text-slate-300 mx-auto mb-2" />
            <p className="text-slate-400 text-xs font-medium">No recorded complaints data files located inside indices.</p>
          </div>
        ) : (
          complaints.map(item => (
            <div key={item._id} className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between">
              <div>
                {/* Image Link Canvas Display Profile Frame */}
                <div className="relative">
                  <img src={`https://road-sarthi.onrender.com${item.imageUrl}`} alt="Defect Visual Canvas" className="h-40 w-full object-cover bg-slate-100" />
                  <div className="absolute top-2 left-2 flex gap-1.5">
                    <span className={`text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm ${
                      item.aiAnalysis?.severity === 'Severe' ? 'bg-red-600 text-white' :
                      item.aiAnalysis?.severity === 'Moderate' ? 'bg-amber-500 text-slate-950' : 'bg-green-600 text-white'
                    }`}>
                      AI: {item.aiAnalysis?.severity || 'Scanning'}
                    </span>
                    <span className={`text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm ${
                      item.pwdAction?.status === 'Done' ? 'bg-emerald-600 text-white' :
                      item.pwdAction?.status === 'Work in Progress' ? 'bg-blue-600 text-white' : 'bg-slate-700 text-white'
                    }`}>
                      PWD: {item.pwdAction?.status}
                    </span>
                  </div>
                </div>

                {/* Internal Card Text Content Parameters Container Block */}
                <div className="p-4">
                  <h4 className="font-extrabold text-slate-900 text-sm mb-1 truncate">{item.location?.manualAddress}</h4>
                  <span className="text-[9px] font-mono font-bold text-slate-400 block mb-2">
                    LNG: {item.location?.coordinates?.[0]?.toFixed(4)} | LAT: {item.location?.coordinates?.[1]?.toFixed(4)}
                  </span>
                  <p className="text-slate-500 text-xs leading-relaxed line-clamp-2">{item.issueDescription}</p>
                </div>
              </div>

              {/* Administrative Government Official Directives Comment Layer Footer */}
              {item.pwdAction?.officerComment && (
                <div className="p-4 pt-0">
                  <div className="bg-slate-50 border border-slate-100 rounded-lg p-2.5 flex gap-2 items-start">
                    <MessageSquare className="h-3.5 w-3.5 text-blue-900 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[8px] font-black uppercase text-blue-950 tracking-wide block mb-0.5">PWD Update Directive</span>
                      <p className="text-[11px] text-slate-600 font-medium italic leading-snug">"{item.pwdAction.officerComment}"</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
