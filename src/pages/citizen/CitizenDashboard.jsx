import { Link } from "react-router";

const CitizenDashboard = () => {
  const activeRequests = [
    {
      id: "RQ-441",
      type: "Medical Aid",
      status: "Verified",
      date: "Dec 20, 2025",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">
            How can we help?
          </h2>
          <p className="text-slate-500">
            Submit a new request or track your existing ones.
          </p>
        </div>
        <Link
          to="/citizen/new-request"
          className="px-6 py-3 bg-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-200 hover:bg-emerald-600 transition transform active:scale-95"
        >
          + Request New Aid
        </Link>
      </div>

      {/* Status Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">
            Request Status
          </p>
          {activeRequests.length > 0 ? (
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-800">
                  {activeRequests[0].type}
                </h3>
                <p className="text-sm text-slate-500">{activeRequests[0].id}</p>
              </div>
              <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest">
                {activeRequests[0].status}
              </span>
            </div>
          ) : (
            <p className="text-slate-400 text-sm italic">
              No active requests found.
            </p>
          )}
        </div>

        <div className="bg-blue-600 p-6 rounded-2xl text-white shadow-lg shadow-blue-200 relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="font-bold text-lg mb-1">Emergency Hotline</h3>
            <p className="text-blue-100 text-sm mb-4">
              Immediate life-threat? Call now.
            </p>
            <p className="text-2xl font-black">911-RELIEF</p>
          </div>
          <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
        </div>
      </div>
    </div>
  );
};

export default CitizenDashboard;
