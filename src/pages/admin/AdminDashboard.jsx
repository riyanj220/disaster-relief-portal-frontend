import React from "react";
import { motion } from "framer-motion";
import {
  Clock,
  Rocket,
  Users,
  AlertTriangle,
  ChevronRight,
  ArrowUpRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const AdminDashboard = () => {
  const stats = [
    {
      label: "Pending Requests",
      value: "42",
      icon: Clock,
      color: "text-amber-600",
      bg: "bg-amber-50",
      border: "border-amber-100",
      change: "+12% from yesterday",
    },
    {
      label: "Active Missions",
      value: "12",
      icon: Rocket,
      color: "text-blue-600",
      bg: "bg-blue-50",
      border: "border-blue-100",
      change: "2 nearing completion",
    },
    {
      label: "Available Volunteers",
      value: "158",
      icon: Users,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      border: "border-emerald-100",
      change: "8 new today",
    },
    {
      label: "Critical Stock",
      value: "3 Items",
      icon: AlertTriangle,
      color: "text-red-600",
      bg: "bg-red-50",
      border: "border-red-100",
      change: "Restock required",
    },
  ];

  return (
    <div className="space-y-8 w-full max-w-full overflow-x-hidden pb-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
            System Overview
          </h2>
          <p className="text-slate-500 text-sm font-medium mt-1">
            Real-time operational intelligence for ReliefConnect.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="hidden sm:flex">
            Generate Report
          </Button>
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
            New Mission
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card
              className={cn("border shadow-sm overflow-hidden", stat.border)}
            >
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className={cn("p-2.5 rounded-xl", stat.bg, stat.color)}>
                    <stat.icon size={22} strokeWidth={2.5} />
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                    Live
                  </span>
                </div>
                <div className="mt-4">
                  <h3 className="text-3xl font-bold text-slate-900 leading-none">
                    {stat.value}
                  </h3>
                  <p className="text-sm font-semibold text-slate-500 mt-2">
                    {stat.label}
                  </p>
                  <p className={cn("text-[10px] font-bold mt-1", stat.color)}>
                    {stat.change}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Priority Action Table Section */}
      <Card className="border-slate-200 shadow-md overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b bg-slate-50/50">
          <div>
            <CardTitle className="text-lg font-bold text-slate-800">
              High Priority Tasks
            </CardTitle>
            <p className="text-xs text-slate-500 mt-1 font-medium">
              Immediate attention required for these requests.
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-blue-600 font-bold hover:text-blue-700"
          >
            View All <ChevronRight size={16} />
          </Button>
        </CardHeader>

        <div className="w-full overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50/50 text-slate-500 text-[11px] font-bold uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 border-b">Request ID</th>
                <th className="px-6 py-4 border-b">Location</th>
                <th className="px-6 py-4 border-b">Urgency</th>
                <th className="px-6 py-4 border-b">Status</th>
                <th className="px-6 py-4 border-b text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {[1, 2, 3].map((id) => (
                <tr
                  key={id}
                  className="hover:bg-slate-50/30 transition-colors group"
                >
                  <td className="px-6 py-4 font-bold text-slate-700">
                    <span className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                      #REQ-00{id}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-500 font-semibold">
                    District {id * 4}, Sector 7
                  </td>
                  <td className="px-6 py-4">
                    <Badge
                      variant="destructive"
                      className="bg-red-50 text-red-600 border-red-100 text-[10px] font-bold uppercase tracking-tighter px-2"
                    >
                      Critical
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-slate-500 italic font-medium">
                      <Clock size={14} className="text-slate-400" />
                      Pending Verification
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Button
                      size="sm"
                      className="h-8 bg-slate-900 hover:bg-slate-800 font-bold text-[11px] rounded-lg"
                    >
                      Review{" "}
                      <ArrowUpRight
                        size={14}
                        className="ml-1 opacity-50 group-hover:opacity-100 transition-opacity"
                      />
                    </Button>
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
export default AdminDashboard;
