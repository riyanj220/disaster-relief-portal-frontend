import { useState } from "react";

const CitizenNewRequest = () => {
  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div>
        <h2 className="text-2xl font-black text-slate-800 tracking-tight">
          Submit Relief Request
        </h2>
        <p className="text-slate-500 font-medium">
          Please provide accurate details for the priority engine.
        </p>
      </div>

      <form className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl space-y-6">
        <div className="space-y-4">
          <label className="block text-xs font-black uppercase tracking-widest text-slate-400">
            Type of Assistance
          </label>
          <div className="grid grid-cols-2 gap-3">
            {["Food", "Medical", "Shelter", "Rescue"].map((type) => (
              <button
                key={type}
                type="button"
                className="py-3 rounded-xl border-2 border-gray-100 font-bold text-slate-600 hover:border-blue-500 hover:text-blue-600 transition"
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-slate-400">
              Urgency Level
            </label>
            <select className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition font-bold text-slate-700">
              <option>Low (General Need)</option>
              <option>Medium (Urgent)</option>
              <option>High (Critical)</option>
              <option>Emergency (Life Threat)</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-slate-400">
              Family Size
            </label>
            <input
              type="number"
              placeholder="1"
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition font-bold"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-widest text-slate-400">
            Current Location / Address
          </label>
          <textarea
            rows="3"
            placeholder="Street, Sector, or landmarks nearby..."
            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition font-bold resize-none"
          ></textarea>
        </div>

        <button className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest shadow-lg hover:bg-slate-800 transition transform active:scale-95">
          Submit Request
        </button>
      </form>
    </div>
  );
};

export default CitizenNewRequest;
