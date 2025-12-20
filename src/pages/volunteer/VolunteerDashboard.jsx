import { motion } from "framer-motion";

const VolunteerDashboard = () => {
  const myStats = [
    {
      label: "Completed Tasks",
      value: "24",
      icon: "✅",
      color: "text-emerald-600",
    },
    {
      label: "Hours Contributed",
      value: "120",
      icon: "⏱️",
      color: "text-blue-600",
    },
    {
      label: "Current Rank",
      value: "Lead",
      icon: "⭐",
      color: "text-amber-600",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">
            Volunteer Portal
          </h2>
          <p className="text-slate-500">Ready to make an impact today?</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-600 rounded-full border border-emerald-100">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </span>
          <span className="text-xs font-black uppercase">
            Active & Available
          </span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {myStats.map((stat, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
          >
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">
              {stat.label}
            </p>
            <div className="flex items-center gap-3">
              <span className="text-2xl">{stat.icon}</span>
              <h3 className={`text-2xl font-black ${stat.color}`}>
                {stat.value}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* Active Assignment Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden"
      >
        <div className="relative z-10">
          <span className="px-3 py-1 bg-blue-500 text-[10px] font-black uppercase rounded-lg mb-4 inline-block">
            Current Assignment
          </span>
          <h3 className="text-3xl font-bold mb-2">Medical Supply Drop-off</h3>
          <p className="text-slate-400 mb-6 flex items-center gap-2">
            📍 Community Center, Sector 4
          </p>

          <div className="flex gap-4">
            <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold transition shadow-lg shadow-emerald-900/20">
              Mark as Completed
            </button>
            <button className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-bold transition border border-white/10">
              View Details
            </button>
          </div>
        </div>
        {/* Background Decorative Graphic */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 rounded-full blur-[100px]"></div>
      </motion.div>
    </div>
  );
};

export default VolunteerDashboard;
