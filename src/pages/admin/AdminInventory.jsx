const AdminInventory = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-black text-slate-800 tracking-tight">
        Resource Inventory
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Low Stock Alert Card */}
        <div className="bg-red-50 border border-red-100 p-6 rounded-2xl">
          <p className="text-red-600 font-black text-xs uppercase tracking-widest mb-1">
            Low Stock Alert
          </p>
          <h4 className="text-xl font-bold text-red-900">Medical Kits</h4>
          <p className="text-red-700 text-sm mt-2">
            Only 12 kits remaining in Warehouse A.
          </p>
        </div>
      </div>

      <div className="w-full h-64 bg-white border border-gray-100 rounded-2xl flex items-center justify-center text-gray-400 font-medium shadow-sm">
        Stock Level Management Table Placeholder
      </div>
    </div>
  );
};

export default AdminInventory;
