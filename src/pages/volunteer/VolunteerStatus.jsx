const VolunteerStatus = () => {
  return (
    <div className="max-w-2xl space-y-8">
      <h2 className="text-2xl font-black text-slate-800 tracking-tight">
        Availability & Skills
      </h2>

      <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
        <div>
          <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-3">
            Shift Status
          </label>
          <div className="flex gap-4">
            <button className="flex-1 py-3 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-200">
              On Duty
            </button>
            <button className="flex-1 py-3 bg-gray-100 text-slate-500 rounded-xl font-bold">
              Off Duty
            </button>
          </div>
        </div>

        <div>
          <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-3">
            Verified Skills
          </label>
          <div className="flex flex-wrap gap-2">
            {["First Aid", "HGV Driving", "Search & Rescue"].map((skill) => (
              <span
                key={skill}
                className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full font-bold text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolunteerStatus;
