import { useState } from "react";
import {
  Heart,
  Stethoscope,
  Home,
  LifeBuoy,
  MapPin,
  Users,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils"; // shadcn helper for merging classes
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const CitizenNewRequest = () => {
  const [assistanceType, setAssistanceType] = useState("");

  const types = [
    {
      name: "Food",
      icon: Heart,
      color: "hover:border-rose-500 hover:text-rose-600",
      active: "border-rose-500 text-rose-600 bg-rose-50",
    },
    {
      name: "Medical",
      icon: Stethoscope,
      color: "hover:border-blue-500 hover:text-blue-600",
      active: "border-blue-500 text-blue-600 bg-blue-50",
    },
    {
      name: "Shelter",
      icon: Home,
      color: "hover:border-emerald-500 hover:text-emerald-600",
      active: "border-emerald-500 text-emerald-600 bg-emerald-50",
    },
    {
      name: "Rescue",
      icon: LifeBuoy,
      color: "hover:border-amber-500 hover:text-amber-600",
      active: "border-amber-500 text-amber-600 bg-amber-50",
    },
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-10 pb-12">
      {/* Header with clear instruction */}
      <div className="text-center md:text-left">
        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
          Submit Relief Request
        </h2>
        <p className="text-slate-500 font-medium mt-2">
          Providing precise details helps our{" "}
          <span className="text-blue-600 font-bold">Priority Engine</span>{" "}
          dispatch aid faster.
        </p>
      </div>

      <form className="bg-white p-6 md:p-10 rounded-[2.5rem] border border-slate-100 shadow-2xl shadow-slate-200/50 space-y-8">
        {/* Visual Type Selector */}
        <div className="space-y-4">
          <label className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">
            <CheckCircle2 size={14} /> Type of Assistance
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {types.map((type) => {
              const Icon = type.icon;
              const isActive = assistanceType === type.name;
              return (
                <button
                  key={type.name}
                  type="button"
                  onClick={() => setAssistanceType(type.name)}
                  className={cn(
                    "flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all duration-300 group",
                    isActive
                      ? type.active
                      : "border-slate-50 bg-slate-50/50 text-slate-400 " +
                          type.color
                  )}
                >
                  <Icon
                    className={cn(
                      "mb-2 h-6 w-6 transition-transform group-hover:scale-110",
                      isActive ? "animate-pulse" : ""
                    )}
                  />
                  <span className="text-xs font-bold">{type.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Urgency and Family Size */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">
              Urgency Level
            </label>
            <div className="relative">
              <select className="w-full h-12 px-4 bg-slate-50 border-none rounded-xl font-bold text-slate-700 focus:ring-2 focus:ring-blue-500 transition-all appearance-none outline-none">
                <option>Low (General Need)</option>
                <option>Medium (Urgent)</option>
                <option>High (Critical)</option>
                <option>Emergency (Life Threat)</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <AlertCircle size={16} className="text-slate-300" />
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">
              Family Size
            </label>
            <div className="relative">
              <Input
                type="number"
                placeholder="1"
                className="h-12 bg-slate-50 border-none rounded-xl font-bold text-slate-700 pl-10"
              />
              <Users className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-300 h-4 w-4" />
            </div>
          </div>
        </div>

        {/* Location Section */}
        <div className="space-y-3">
          <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">
            Current Location / Address
          </label>
          <div className="relative">
            <Textarea
              rows="4"
              placeholder="E.g., Sector 7, Street 12, near the Red Mosque..."
              className="bg-slate-50 border-none rounded-2xl font-semibold text-slate-700 p-4 pl-12 resize-none focus-visible:ring-2 focus-visible:ring-blue-500"
            />
            <MapPin className="absolute left-4 top-4 text-slate-300 h-5 w-5" />
          </div>
        </div>

        {/* Submit Action */}
        <div className="pt-4">
          <Button className="w-full h-14 bg-slate-900 hover:bg-blue-600 text-white rounded-2xl font-bold uppercase tracking-widest shadow-xl transition-all duration-300 group">
            Confirm and Submit
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
          <p className="text-center text-[10px] text-slate-400 mt-4 font-medium uppercase tracking-tighter">
            Your location will be shared with the emergency response team.
          </p>
        </div>
      </form>
    </div>
  );
};

export default CitizenNewRequest;
