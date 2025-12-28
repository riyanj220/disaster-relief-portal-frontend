import React, { useState } from "react";
import {
  PackagePlus,
  Search,
  AlertTriangle,
  Warehouse,
  ArrowUpRight,
  MoreVertical,
  History,
  TrendingDown,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

const AdminInventory = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const stockItems = [
    {
      id: "SKU-001",
      name: "Medical Kits",
      category: "Medical",
      quantity: 12,
      unit: "units",
      warehouse: "Warehouse A",
      status: "Critical",
    },
    {
      id: "SKU-002",
      name: "Food Ration Packs",
      category: "Food",
      quantity: 850,
      unit: "packs",
      warehouse: "Warehouse B",
      status: "Healthy",
    },
    {
      id: "SKU-003",
      name: "Water Gallons",
      category: "Water",
      quantity: 120,
      unit: "gallons",
      warehouse: "Warehouse A",
      status: "Low",
    },
  ];

  return (
    <div className="space-y-8 w-full max-w-full overflow-x-hidden pb-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
            Resource Inventory
          </h2>
          <p className="text-slate-500 font-medium text-sm">
            Monitor stock levels across all distribution centers.
          </p>
        </div>

        {/* Add Inventory Modal */}
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700 font-bold gap-2 rounded-xl h-11 px-6 shadow-lg shadow-blue-100">
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
                    placeholder="e.g. Food, medical"
                    className="rounded-xl bg-slate-50 border-none h-11"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">
                    Quantity
                  </label>
                  <Input
                    type="number"
                    placeholder="0"
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
                    placeholder="e.g. packs"
                    className="rounded-xl bg-slate-50 border-none h-11"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">
                    Location
                  </label>
                  <Input
                    placeholder="e.g. Warehouse A"
                    className="rounded-xl bg-slate-50 border-none h-11"
                  />
                </div>
              </div>
            </div>
            <Button className="w-full h-12 bg-slate-900 rounded-xl font-bold uppercase tracking-widest mt-2">
              Confirm Entry
            </Button>
          </DialogContent>
        </Dialog>
      </div>

      {/* Analytics/Alerts Bar - FIXED ALIGNMENT */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-red-100 bg-red-50/50 shadow-sm rounded-2xl">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="p-3 bg-red-100 text-red-600 rounded-xl">
              <AlertTriangle size={24} />
            </div>
            <div className="flex-1">
              <p className="text-[10px] font-bold text-red-600 uppercase tracking-widest">
                Critical Level
              </p>
              <h4 className="text-lg font-bold text-red-900 leading-tight">
                Medical Kits
              </h4>
              <p className="text-xs text-red-700/70 font-medium">
                12 left in Warehouse A
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-100 shadow-sm rounded-2xl">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
              <Warehouse size={24} />
            </div>
            <div className="flex-1">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Total Value
              </p>
              <h4 className="text-xl font-bold text-slate-900 leading-tight">
                9,420 <span className="text-[10px] text-slate-400">Items</span>
              </h4>
            </div>
          </CardContent>
        </Card>

        <div className="relative h-full flex items-center">
          <Search className="absolute left-3 text-slate-400" size={18} />
          <Input
            placeholder="Search SKU or item name..."
            className="pl-10 h-full min-h-16 bg-white border-slate-200 rounded-2xl shadow-sm focus-visible:ring-blue-500"
          />
        </div>
      </div>

      {/* Stock Management Table */}
      <Card className="border-slate-200 shadow-md rounded-4xl overflow-hidden">
        <div className="p-6 border-b border-slate-100 bg-white flex justify-between items-center">
          <h3 className="font-bold text-slate-800 tracking-tight">
            Stock Levels
          </h3>
          <Button
            variant="ghost"
            size="sm"
            className="text-xs font-bold text-slate-500 gap-2"
          >
            <History size={14} /> Log History
          </Button>
        </div>
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-200">
            <thead className="bg-slate-50/50 text-slate-400 text-[11px] font-bold uppercase tracking-widest">
              <tr>
                <th className="px-8 py-4 border-b">Item Details</th>
                <th className="px-8 py-4 border-b">Category</th>
                <th className="px-8 py-4 border-b text-center">In-Stock</th>
                <th className="px-8 py-4 border-b">Location</th>
                <th className="px-8 py-4 border-b text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm bg-white font-medium">
              {stockItems.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-slate-50/30 transition-colors group"
                >
                  <td className="px-8 py-5 font-bold text-slate-800">
                    <div className="flex flex-col">
                      {item.name}
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter mt-0.5">
                        {item.id}
                      </span>
                    </div>
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
                      className={cn(
                        "text-base font-bold",
                        item.quantity < 20 ? "text-red-600" : "text-slate-900"
                      )}
                    >
                      {item.quantity}
                    </span>
                    <span className="text-[10px] text-slate-400 uppercase ml-1">
                      {item.unit}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-slate-500">
                    <div className="flex items-center gap-1.5">
                      <Warehouse size={14} /> {item.warehouse}
                    </div>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <Badge
                      className={cn(
                        "font-bold text-[10px] px-2.5 py-0.5 rounded-full border-none",
                        item.status === "Critical"
                          ? "bg-red-50 text-red-600"
                          : item.status === "Low"
                          ? "bg-amber-50 text-amber-600"
                          : "bg-emerald-50 text-emerald-600"
                      )}
                    >
                      {item.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

const cn = (...classes) => classes.filter(Boolean).join(" ");
export default AdminInventory;
