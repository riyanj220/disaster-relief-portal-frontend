import React from "react";
import { motion } from "framer-motion";

const AdminDashboard = () => {
  const stats = [
    {
      label: "Pending Requests",
      value: "42",
      icon: "🕒",
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
    {
      label: "Active Missions",
      value: "12",
      icon: "🚀",
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "Available Volunteers",
      value: "158",
      icon: "🤝",
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      label: "Critical Stock",
      value: "3 Items",
      icon: "⚠️",
      color: "text-red-600",
      bg: "bg-red-50",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-black text-slate-800 tracking-tight">
          System Overview
        </h2>
        <p className="text-slate-500">
          Real-time status of relief operations and resources.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4"
          >
            <div
              className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-xl flex items-center justify-center text-2xl`}
            >
              {stat.icon}
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                {stat.label}
              </p>
              <h3 className="text-2xl font-black text-slate-800">
                {stat.value}
              </h3>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Priority Action Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h3 className="font-bold text-slate-800">High Priority Requests</h3>
          <button className="text-blue-600 text-sm font-bold hover:underline">
            View All
          </button>
        </div>
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 text-slate-400 text-[10px] font-black uppercase tracking-widest">
            <tr>
              <th className="px-6 py-4">Request ID</th>
              <th className="px-6 py-4">Location</th>
              <th className="px-6 py-4">Urgency</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm">
            {[1, 2, 3].map((id) => (
              <tr key={id} className="hover:bg-gray-50/50 transition">
                <td className="px-6 py-4 font-bold text-slate-700">
                  #REQ-00{id}
                </td>
                <td className="px-6 py-4 text-slate-500 font-medium">
                  District {id * 4}, Sector 7
                </td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 bg-red-100 text-red-600 rounded text-[10px] font-black uppercase">
                    Critical
                  </span>
                </td>
                <td className="px-6 py-4 text-slate-500 italic">
                  Pending Verification
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="bg-slate-900 text-white px-4 py-1.5 rounded-lg text-xs font-bold">
                    Review
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
