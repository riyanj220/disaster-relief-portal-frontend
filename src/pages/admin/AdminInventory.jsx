import { useState, useEffect } from "react";
import api from "@/lib/api";
import {
  PackagePlus,
  Search,
  AlertTriangle,
  Warehouse,
  History,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";

const TableSkeleton = () => (
  <>
    {[1, 2, 3, 4, 5].map((i) => (
      <tr key={i} className="animate-pulse border-b border-slate-100">
        <td className="px-8 py-5">
          <div className="h-4 bg-slate-200 rounded w-32 mb-2"></div>
          <div className="h-3 bg-slate-100 rounded w-20"></div>
        </td>
        <td className="px-8 py-5">
          <div className="h-4 bg-slate-100 rounded w-16"></div>
        </td>
        <td className="px-8 py-5">
          <div className="h-6 bg-slate-100 rounded-md w-20 mx-auto"></div>
        </td>
        <td className="px-8 py-5 text-center">
          <div className="h-5 bg-slate-200 rounded w-12 mx-auto"></div>
        </td>
        <td className="px-8 py-5">
          <div className="h-4 bg-slate-100 rounded w-28"></div>
        </td>
        <td className="px-8 py-5 text-right">
          <div className="h-6 bg-slate-100 rounded-full w-20 ml-auto"></div>
        </td>
      </tr>
    ))}
  </>
);

const AdminInventory = () => {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newItem, setNewItem] = useState({
    name: "",
    category: "",
    quantity: 0,
    unit: "",
    location: "",
  });

  // --- API Calls ---

  // Fetch all inventory from Backend
  const fetchInventory = async () => {
    setLoading(true);
    try {
      const response = await api.get("/admin/inventory");
      setInventory(response.data);
    } catch (error) {
      console.error("Failed to fetch inventory", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  // Submit new item to Backend
  const handleAddInventory = async () => {
    try {
      await api.post("/admin/inventory", newItem);
      setIsDialogOpen(false); // Close modal on success
      setNewItem({
        name: "",
        category: "",
        quantity: 0,
        unit: "",
        location: "",
      }); // Reset form
      fetchInventory(); // Refresh list
    } catch (error) {
      console.error("Error adding inventory", error);
    }
  };

  // --- Helper Logic ---
  const filteredInventory = inventory.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatus = (quantity) => {
    if (quantity <= 10) return "Critical";
    if (quantity <= 50) return "Low";
    return "Healthy";
  };

  // Filter items that have a quantity of 10 or less
  const criticalItems = inventory.filter((item) => item.quantity <= 10);

  return (
    <div className="space-y-8 w-full max-w-full overflow-x-hidden pb-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
            Resource Inventory
          </h2>
          <p className="text-slate-500 font-medium text-sm">
            Monitor stock levels across distribution centers.
          </p>
        </div>

        {/* Add Inventory Modal */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700 cursor-pointer font-bold gap-2 rounded-xl h-11 px-6 shadow-lg shadow-blue-100">
              <PackagePlus size={20} /> Add Inventory
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-106.25 rounded-4xl">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-slate-900">
                New Inventory Entry
              </DialogTitle>
              <DialogDescription className="font-medium text-slate-500 text-xs uppercase tracking-wider mt-1">
                Enter details to restock or add new items.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">
                  Item Name
                </label>
                <Input
                  value={newItem.name}
                  onChange={(e) =>
                    setNewItem({ ...newItem, name: e.target.value })
                  }
                  placeholder="e.g. Blankets"
                  className="rounded-xl bg-slate-50 border-none h-11"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">
                    Category
                  </label>
                  <Input
                    value={newItem.category}
                    onChange={(e) =>
                      setNewItem({ ...newItem, category: e.target.value })
                    }
                    placeholder="e.g. Food"
                    className="rounded-xl bg-slate-50 border-none h-11"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">
                    Quantity
                  </label>
                  <Input
                    type="number"
                    value={newItem.quantity}
                    onChange={(e) =>
                      setNewItem({
                        ...newItem,
                        quantity: parseInt(e.target.value),
                      })
                    }
                    className="rounded-xl bg-slate-50 border-none h-11"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">
                    Unit
                  </label>
                  <Input
                    value={newItem.unit}
                    onChange={(e) =>
                      setNewItem({ ...newItem, unit: e.target.value })
                    }
                    placeholder="e.g. kg"
                    className="rounded-xl bg-slate-50 border-none h-11"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">
                    Location
                  </label>
                  <Input
                    value={newItem.location}
                    onChange={(e) =>
                      setNewItem({ ...newItem, location: e.target.value })
                    }
                    placeholder="e.g. Warehouse A"
                    className="rounded-xl bg-slate-50 border-none h-11"
                  />
                </div>
              </div>
            </div>
            <Button
              onClick={handleAddInventory}
              className="w-full h-12 bg-slate-900 cursor-pointer rounded-xl font-bold uppercase tracking-widest mt-2"
            >
              Confirm Entry
            </Button>
          </DialogContent>
        </Dialog>
      </div>

      {/* Analytics Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-red-100 bg-red-50/50 shadow-sm rounded-2xl">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="p-3 bg-red-100 text-red-600 rounded-xl">
              <AlertTriangle size={24} />
            </div>
            <div className="flex-1">
              <p className="text-[10px] font-bold text-red-600 uppercase tracking-widest">
                Critical Stock
              </p>
              <h4 className="text-lg font-bold text-red-900 leading-tight">
                {criticalItems.length}{" "}
                {criticalItems.length === 1 ? "Item" : "Items"}
              </h4>
              <p className="text-xs text-red-700/70 font-medium">
                {criticalItems.length > 0
                  ? `Action required: ${criticalItems
                      .map((i) => i.name)
                      .join(", ")}`
                  : "All stock levels healthy"}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Total Items */}
        <Card className="border-slate-100 shadow-sm rounded-2xl">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
              <Warehouse size={24} />
            </div>
            <div className="flex-1">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Total SKU's
              </p>
              <h4 className="text-xl font-bold text-slate-900 leading-tight">
                {inventory.length}{" "}
                <span className="text-[10px] text-slate-400">Categories</span>
              </h4>
            </div>
          </CardContent>
        </Card>

        <div className="relative h-full flex items-center">
          <Search className="absolute left-3 text-slate-400" size={18} />
          <Input
            placeholder="Search items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 h-full min-h-16 bg-white border-slate-200 rounded-2xl shadow-sm focus-visible:ring-blue-500"
          />
        </div>
      </div>

      <Card className="border-slate-200 shadow-md rounded-4xl overflow-hidden">
        <div className="p-6 border-b border-slate-100 bg-white flex justify-between items-center">
          <h3 className="font-bold text-slate-800 tracking-tight">
            Current Stock
          </h3>
          <Button
            onClick={fetchInventory}
            variant="ghost"
            size="sm"
            className="text-xs font-bold text-slate-500 gap-2 cursor-pointer"
          >
            <History size={14} /> Refresh
          </Button>
        </div>
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-200">
            <thead className="bg-slate-50/50 text-slate-400 text-[11px] font-bold uppercase tracking-widest">
              <tr>
                <th className="px-8 py-4 border-b">Item Details</th>
                <th className="px-8 py-4 border-b">Unit</th>
                <th className="px-8 py-4 border-b">Category</th>
                <th className="px-8 py-4 border-b text-center">In-Stock</th>
                <th className="px-8 py-4 border-b">Location</th>
                <th className="px-8 py-4 border-b text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm bg-white font-medium">
              {loading ? (
                <TableSkeleton />
              ) : filteredInventory.length > 0 ? (
                filteredInventory.map((item) => (
                  <tr
                    key={item.itemId}
                    className="hover:bg-slate-50/30 transition-colors group"
                  >
                    <td className="px-8 py-5 font-bold text-slate-800">
                      <div className="flex flex-col">
                        {item.name}
                        {/* <span className="text-[10px] text-slate-400 uppercase tracking-tighter mt-0.5">
                        {item.itemId}
                      </span> */}
                      </div>
                    </td>
                    <td className="px-8 py-5  text-slate-800">
                      <div className="flex flex-col">{item.unit}</div>
                    </td>
                    <td className="px-8 py-5">
                      <Badge
                        variant="outline"
                        className="rounded-md border-slate-200 text-slate-500 font-bold"
                      >
                        {item.category}
                      </Badge>
                    </td>
                    <td className="px-8 py-5 text-center">
                      <span
                        className={`text-base font-bold ${
                          item.quantity < 20 ? "text-red-600" : "text-slate-900"
                        }`}
                      >
                        {item.quantity}
                      </span>
                      <span className="text-[10px] text-slate-400 uppercase ml-1">
                        {item.unit}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-slate-500">
                      <div className="flex items-center gap-1.5">
                        <Warehouse size={14} /> {item.location}
                      </div>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <Badge
                        className={`font-bold text-[10px] px-2.5 py-0.5 rounded-full border-none ${
                          getStatus(item.quantity) === "Critical"
                            ? "bg-red-50 text-red-600"
                            : getStatus(item.quantity) === "Low"
                            ? "bg-amber-50 text-amber-600"
                            : "bg-emerald-50 text-emerald-600"
                        }`}
                      >
                        {getStatus(item.quantity)}
                      </Badge>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-10 text-slate-400">
                    No items found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

const cn = (...classes) => classes.filter(Boolean).join(" ");
export default AdminInventory;
