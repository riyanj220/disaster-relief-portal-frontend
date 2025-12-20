const AdminVolunteers = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-black text-slate-800 tracking-tight">
        Volunteer Network
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Volunteer Status Cards */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
            <div>
              <p className="font-bold text-slate-800">Sarah Jenkins</p>
              <p className="text-xs font-bold text-blue-600 uppercase tracking-widest">
                Medical Professional
              </p>
            </div>
          </div>
          <span className="px-3 py-1 bg-emerald-100 text-emerald-600 rounded-full text-[10px] font-black uppercase tracking-widest">
            Available
          </span>
        </div>
      </div>
    </div>
  );
};

export default AdminVolunteers;
