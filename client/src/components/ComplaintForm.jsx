// client/src/components/ComplaintForm.jsx
import React, { useState } from 'react';
import { Camera, MapPin, ArrowLeft, Loader2 } from 'lucide-react';

export default function ComplaintForm({ setView }) {
  const [citizenName, setCitizenName] = useState('');
  const [description, setDescription] = useState('');
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [address, setAddress] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  // 📍 HTML5 Smartphone Geolocation Tracking API Core Code Handler
  const grabLiveGPSCoordinates = () => {
    if (!navigator.geolocation) return alert("Your current web browser does not support tracking mechanics.");
    navigator.geolocation.getCurrentPosition((position) => {
      setLat(position.coords.latitude.toFixed(6));
      setLng(position.coords.longitude.toFixed(6));
    }, () => alert("GPS coordinates transmission rejected. Please verify system level access rules."));
  };

  const handleFormSubmitExecute = async (e) => {
    e.preventDefault();
    if (!lat || !lng) return alert("Please map the coordinates values first using the GPS button tool.");
    setLoading(true);

    const formPayload = new FormData();
    formPayload.append('citizenName', citizenName);
    formPayload.append('issueDescription', description);
    formPayload.append('latitude', lat);
    formPayload.append('longitude', lng);
    formPayload.append('manualAddress', address);
    formPayload.append('image', imageFile);

    try {
      const res = await fetch('http://localhost:5000/api/v1/complaints/raise', {
        method: 'POST',
        body: formPayload
      });
      const data = await res.json();
      if (data.success) {
        alert("Report captured successfully! Scheduled for immediate asynchronous AI validation scans.");
        setView('landing');
      } else {
        alert(`Rejected: ${data.message}`);
      }
    } catch (err) {
      alert("Server link connection error state. Check terminal paths logs.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white border border-slate-200 rounded-2xl p-6 shadow-md animate-fadeIn">
      {/* Form Action Section Header Navigation */}
      <div className="flex items-center gap-3 mb-6 pb-2 border-b border-slate-100">
        <button onClick={() => setView('landing')} className="p-1 hover:bg-slate-100 rounded-lg transition text-slate-500">
          <ArrowLeft className="h-4 w-4" />
        </button>
        <div>
          <h3 className="text-base font-black text-slate-900">File New Complaint</h3>
          <p className="text-[10px] text-slate-400 font-medium">Fields undergo immediate validation protocols.</p>
        </div>
      </div>

      <form onSubmit={handleFormSubmitExecute} className="space-y-4">
        <div>
          <label className="block text-[10px] font-black uppercase text-slate-500 mb-1">Your Full Name</label>
          <input type="text" required placeholder="Ex: Adarsh Sharma" value={citizenName} onChange={e => setCitizenName(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-blue-900 transition" />
        </div>

        <div>
          <label className="block text-[10px] font-black uppercase text-slate-500 mb-1">Issue Details Description</label>
          <textarea required rows="2" placeholder="State observations regarding pothole depth, surface fractures, or layout scales..." value={description} onChange={e => setDescription(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-blue-900 transition" />
        </div>

        {/* GPS Coordinates Layout Block Component */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-[9px] font-black uppercase text-slate-400 mb-0.5">Latitude</label>
            <input type="text" placeholder="0.000000" readOnly value={lat} className="w-full bg-slate-100 border border-slate-200 text-slate-500 text-xs rounded-lg px-3 py-2 focus:outline-none" />
          </div>
          <div>
            <label className="block text-[9px] font-black uppercase text-slate-400 mb-0.5">Longitude</label>
            <input type="text" placeholder="0.000000" readOnly value={lng} className="w-full bg-slate-100 border border-slate-200 text-slate-500 text-xs rounded-lg px-3 py-2 focus:outline-none" />
          </div>
        </div>

        <button 
          type="button" onClick={grabLiveGPSCoordinates}
          className="w-full flex items-center justify-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-white text-[10px] font-black uppercase py-2 rounded-lg transition shadow-sm"
        >
          <MapPin className="h-3 w-3 text-amber-400" /> Fetch Live Smartphone Geolocation Fields
        </button>

        <div>
          <label className="block text-[10px] font-black uppercase text-slate-500 mb-1">Manual Area Landmark / Village Name</label>
          <input type="text" required placeholder="Ex: Near Crossing Road Line, Pipariya Village Area" value={address} onChange={e => setAddress(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-blue-900 transition" />
        </div>

        <div>
          <label className="block text-[10px] font-black uppercase text-slate-500 mb-1">Select Damage Photo File Asset</label>
          <input type="file" required accept="image/*" onChange={e => setImageFile(e.target.files[0])} className="w-full text-xs text-slate-400 file:bg-blue-50 file:border-0 file:text-blue-900 file:font-bold file:px-3 file:py-1.5 file:rounded-lg file:mr-2 hover:file:bg-blue-100 cursor-pointer" />
        </div>

        <button 
          type="submit" disabled={loading}
          className="w-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-black py-2.5 rounded-lg tracking-wider uppercase transition shadow-md flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="h-3.5 w-3.5 animate-spin text-amber-400" /> Transmitting Data Streams...
            </>
          ) : "Submit Report Document"}
        </button>
      </form>
    </div>
  );
}
