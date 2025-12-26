import React from "react";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  Timer,
  Trophy,
  MapPin,
  CircleCheckBig,
  ExternalLink,
  Rocket,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const VolunteerDashboard = () => {
  const myStats = [
    {
      label: "Completed Tasks",
      value: "24",
      icon: CheckCircle2,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      label: "Hours Contributed",
      value: "120",
      icon: Timer,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "Current Rank",
      value: "Lead",
      icon: Trophy,
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
  ];

  return (
    <div className="space-y-10 pb-10 w-full max-w-full overflow-x-hidden">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
            Volunteer Portal
          </h2>
          <p className="text-slate-500 font-medium mt-1">
            Ready to make an impact today?
          </p>
        </div>

        {/* Availability Badge */}
        <div className="flex items-center gap-3 px-5 py-2.5 bg-emerald-50/50 text-emerald-600 rounded-2xl border border-emerald-100 shadow-sm shadow-emerald-50/50">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </span>
          <span className="text-[11px] font-bold uppercase tracking-widest">
            Active & Available
          </span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {myStats.map((stat, i) => (
          <Card
            key={i}
            className="border-slate-100 shadow-sm rounded-3xl overflow-hidden group hover:border-blue-200 transition-all"
          >
            <CardContent className="p-6">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.15em] mb-4">
                {stat.label}
              </p>
              <div className="flex items-center gap-4">
                <div
                  className={cn(
                    "p-3 rounded-2xl transition-transform group-hover:scale-110",
                    stat.bg,
                    stat.color
                  )}
                >
                  <stat.icon size={26} strokeWidth={2.5} />
                </div>
                <h3
                  className={cn(
                    "text-3xl font-bold tracking-tight",
                    stat.color
                  )}
                >
                  {stat.value}
                </h3>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Active Assignment Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="group bg-slate-900 rounded-[2.5rem] p-8 md:p-12 text-white relative overflow-hidden shadow-2xl shadow-slate-200"
      >
        <div className="relative z-10 max-w-2xl">
          <Badge className="bg-blue-500 hover:bg-blue-500 text-white border-none px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
            Current Assignment
          </Badge>

          <h3 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight leading-tight">
            Medical Supply Drop-off
          </h3>

          <div className="flex items-center gap-2 text-slate-400 mb-10">
            <div className="p-2 bg-white/5 rounded-xl">
              <MapPin size={20} className="text-blue-400" />
            </div>
            <span className="text-lg font-medium">
              Community Center, Sector 4
            </span>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button className="h-14 px-8 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-2xl transition-all shadow-xl shadow-emerald-900/40 group/btn">
              <CircleCheckBig
                size={20}
                className="mr-2 transition-transform group-hover/btn:scale-110"
              />
              Mark as Completed
            </Button>
            <Button
              variant="outline"
              className="h-14 px-8 bg-white/5 hover:bg-white/10 text-white border-white/10 rounded-2xl font-bold transition-all"
            >
              <ExternalLink size={18} className="mr-2 text-slate-400" />
              View Mission Details
            </Button>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] group-hover:bg-blue-600/30 transition-all duration-700"></div>
        <div className="absolute bottom-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
          <Rocket size={200} />
        </div>
      </motion.div>
    </div>
  );
};

// Helper for classes
const cn = (...classes) => classes.filter(Boolean).join(" ");

export default VolunteerDashboard;
