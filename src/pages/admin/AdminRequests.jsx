const AdminRequests = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">
            Relief Requests
          </h2>
          <p className="text-slate-500">
            Verify and prioritize incoming aid submissions.
          </p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-bold shadow-sm">
            Filter
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold shadow-md">
            Export PDF
          </button>
        </div>
      </div>

      {/* Search & Bulk Actions Bar */}
      <div className="w-full h-32 bg-gray-100 border-2 border-dashed border-gray-300 rounded-2xl flex items-center justify-center text-gray-400 font-medium">
        Search & Data Filter UI Placeholder
      </div>
    </div>
  );
};

export default AdminRequests;
