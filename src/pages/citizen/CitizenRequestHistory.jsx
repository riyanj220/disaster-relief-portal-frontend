const CitizenRequestHistory = () => {
  const history = [
    {
      id: "RQ-441",
      type: "Medical Aid",
      date: "Dec 18, 2025",
      status: "Completed",
      note: "Supplies delivered by Sarah J.",
    },
    {
      id: "RQ-430",
      type: "Food Kits",
      date: "Dec 15, 2025",
      status: "Closed",
      note: "Case resolved",
    },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-black text-slate-800 tracking-tight">
        Your History
      </h2>
      <div className="space-y-4">
        {history.map((req, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:row justify-between gap-4"
          >
            <div>
              <div className="flex items-center gap-3 mb-1">
                <span className="font-bold text-slate-800">{req.type}</span>
                <span className="text-[10px] text-slate-400 font-bold">
                  {req.id}
                </span>
              </div>
              <p className="text-xs text-slate-500">{req.note}</p>
            </div>
            <div className="text-right flex flex-row md:flex-col justify-between items-center md:items-end gap-2">
              <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-[10px] font-black uppercase tracking-widest">
                {req.status}
              </span>
              <p className="text-[10px] font-bold text-slate-300">{req.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CitizenRequestHistory;
