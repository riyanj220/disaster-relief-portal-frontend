const VolunteerTasks = () => {
  const taskHistory = [
    {
      id: "T-882",
      type: "Rescue Ops",
      date: "Oct 24, 2025",
      status: "Completed",
    },
    {
      id: "T-890",
      type: "Food Dist.",
      date: "Oct 26, 2025",
      status: "Pending",
    },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-black text-slate-800 tracking-tight">
        Task History
      </h2>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {taskHistory.map((task, i) => (
          <div
            key={i}
            className="flex items-center justify-between p-6 border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center font-bold text-xs">
                {task.id}
              </div>
              <div>
                <p className="font-bold text-slate-800">{task.type}</p>
                <p className="text-xs text-slate-400 font-medium">
                  {task.date}
                </p>
              </div>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                task.status === "Completed"
                  ? "bg-emerald-100 text-emerald-600"
                  : "bg-amber-100 text-amber-600"
              }`}
            >
              {task.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VolunteerTasks;
