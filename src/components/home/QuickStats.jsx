const QuickStats = () => {
  return (
    <section className="py-12 bg-slate-900 text-white">
      <div className="max-w-6xl mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          {/* Stat 1 */}
          <div>
            <h4 className="text-4xl font-extrabold text-blue-400 mb-2">
              1,240+
            </h4>
            <p className="text-gray-400 uppercase tracking-widest text-sm">
              Requests Resolved
            </p>
          </div>

          {/* Stat 2 */}
          <div>
            <h4 className="text-4xl font-extrabold text-emerald-400 mb-2">
              850
            </h4>
            <p className="text-gray-400 uppercase tracking-widest text-sm">
              Active Volunteers
            </p>
          </div>

          {/* Stat 3 - Visual Progress */}
          <div className="flex flex-col items-center">
            <h4 className="text-4xl font-extrabold text-white mb-2">92%</h4>
            <p className="text-gray-400 uppercase tracking-widest text-sm mb-4">
              Resources Deployed
            </p>
            <div className="w-48 h-2 bg-gray-700 rounded-full overflow-hidden">
              <div className="bg-emerald-500 h-full w-[92%] shadow-[0_0_10px_#10b981]"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuickStats;
