import React, { useState } from "react";
import { ShieldCheck, Power, MapPin, Award, Info, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const VolunteerStatus = () => {
  const [isOnDuty, setIsOnDuty] = useState(true);

  const skills = [
    { name: "First Aid", level: "Expert" },
    { name: "HGV Driving", level: "Advanced" },
    { name: "Search & Rescue", level: "Certified" },
  ];

  return (
    <div className="max-w-4xl space-y-8 pb-10 flex flex-col justify-center">
      {/* Header with status indicator */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
            Availability & Skills
          </h2>
          <p className="text-slate-500 font-medium mt-1">
            Manage your active status and professional certifications.
          </p>
        </div>
        {isOnDuty && (
          <Badge className="bg-emerald-500 hover:bg-emerald-500 text-white border-none px-3 py-1 animate-pulse">
            LIVE
          </Badge>
        )}
      </div>

      <Card className="rounded-[2.5rem] border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden">
        <CardContent className="p-8 md:p-10 space-y-10">
          {/* Shift Status Toggle */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">
                Current Shift Status
              </label>
              <Info size={14} className="text-slate-300" />
            </div>

            <div className="grid grid-cols-2 gap-4 p-1.5 bg-slate-50 rounded-2xl border border-slate-100">
              <button
                onClick={() => setIsOnDuty(true)}
                className={cn(
                  "flex items-center justify-center gap-2 py-4 rounded-xl font-bold transition-all duration-300",
                  isOnDuty
                    ? "bg-white text-blue-600 shadow-md ring-1 ring-slate-200/50 scale-[1.02]"
                    : "text-slate-400 hover:text-slate-600"
                )}
              >
                <Power size={18} strokeWidth={2.5} />
                On Duty
              </button>
              <button
                onClick={() => setIsOnDuty(false)}
                className={cn(
                  "flex items-center justify-center gap-2 py-4 rounded-xl font-bold transition-all duration-300",
                  !isOnDuty
                    ? "bg-white text-slate-800 shadow-md ring-1 ring-slate-200/50 scale-[1.02]"
                    : "text-slate-400 hover:text-slate-600"
                )}
              >
                <Zap size={18} strokeWidth={2.5} className="rotate-12" />
                Off Duty
              </button>
            </div>
          </div>

          {/* Verified Skills Section */}
          <div className="space-y-5">
            <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">
              Verified Skills & Expertise
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {skills.map((skill) => (
                <div
                  key={skill.name}
                  className="flex items-center justify-between p-4 bg-blue-50/50 border border-blue-100 rounded-2xl group hover:bg-blue-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white rounded-lg shadow-sm text-blue-600">
                      <ShieldCheck size={18} strokeWidth={2.5} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-800">
                        {skill.name}
                      </p>
                      <p className="text-[10px] font-bold text-blue-500 uppercase tracking-tighter">
                        {skill.level}
                      </p>
                    </div>
                  </div>
                  <Award
                    size={16}
                    className="text-blue-200 group-hover:text-blue-400 transition-colors"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Dispatch Notice Card */}
          <div
            className={cn(
              "p-6 rounded-3xl border-2 transition-all duration-500",
              isOnDuty
                ? "bg-emerald-50/30 border-emerald-100"
                : "bg-slate-50 border-slate-100 grayscale opacity-60"
            )}
          >
            <div className="flex gap-4">
              <div
                className={cn(
                  "p-3 rounded-2xl h-fit",
                  isOnDuty
                    ? "bg-emerald-500 text-white"
                    : "bg-slate-200 text-slate-400"
                )}
              >
                <MapPin size={24} />
              </div>
              <div>
                <h4
                  className={cn(
                    "font-bold text-lg",
                    isOnDuty ? "text-emerald-900" : "text-slate-500"
                  )}
                >
                  Ready for Dispatch
                </h4>
                <p
                  className={cn(
                    "text-sm font-medium mt-1 leading-relaxed",
                    isOnDuty ? "text-emerald-700/80" : "text-slate-400"
                  )}
                >
                  {isOnDuty
                    ? "You are currently visible to the Admin Panel. New missions in your area will appear on your dashboard instantly."
                    : "Toggle 'On Duty' to start receiving mission assignments in your location."}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VolunteerStatus;
