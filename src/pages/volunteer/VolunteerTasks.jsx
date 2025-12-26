import React from "react";
import {
  CheckCircle2,
  Clock,
  Search,
  MapPin,
  Calendar,
  ArrowRight,
  Filter,
  MoreVertical,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const VolunteerTasks = () => {
  const taskHistory = [
    {
      id: "T-882",
      type: "Rescue Ops",
      date: "Oct 24, 2025",
      location: "District 4, Sector 7",
      status: "Completed",
      description: "Assisted in evacuation of 3 families from flooded zone.",
    },
    {
      id: "T-890",
      type: "Food Dist.",
      date: "Oct 26, 2025",
      location: "Community Center B",
      status: "Pending",
      description: "Distributing 50+ ration packs to registered citizens.",
    },
  ];

  return (
    <div className="space-y-8 pb-10 w-full max-w-full overflow-x-hidden">
      {/* Header & Search Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
            Task History
          </h2>
          <p className="text-slate-500 font-medium mt-1">
            Review your contributions and upcoming duties.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={16}
            />
            <Input
              placeholder="Search tasks..."
              className="pl-10 h-11 bg-white border-slate-200 rounded-xl"
            />
          </div>
          <Button
            variant="outline"
            size="icon"
            className="h-11 w-11 rounded-xl shrink-0"
          >
            <Filter size={18} className="text-slate-500" />
          </Button>
        </div>
      </div>

      {/* Task List Container */}
      <div className="space-y-4">
        {taskHistory.map((task, i) => (
          <Card
            key={i}
            className="border-slate-100 hover:border-blue-200 hover:shadow-md transition-all duration-300 rounded-4xl overflow-hidden group"
          >
            <CardContent className="p-0">
              <div className="flex flex-col md:flex-row">
                {/* Visual ID Badge - Stays consistent with the Dashboard style */}
                <div
                  className={cn(
                    "w-full md:w-32 flex items-center justify-center p-6 text-xs font-bold uppercase tracking-widest",
                    task.status === "Completed"
                      ? "bg-emerald-50 text-emerald-600"
                      : "bg-blue-50 text-blue-600"
                  )}
                >
                  {task.id}
                </div>

                {/* Content Area */}
                <div className="flex-1 p-6 flex flex-col md:flex-row justify-between gap-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <h3 className="font-bold text-slate-800 text-lg">
                        {task.type}
                      </h3>
                      <Badge
                        className={cn(
                          "text-[10px] font-bold uppercase tracking-tighter rounded-full border-none",
                          task.status === "Completed"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-amber-100 text-amber-700"
                        )}
                      >
                        {task.status}
                      </Badge>
                    </div>

                    <p className="text-sm text-slate-500 font-medium leading-relaxed max-w-lg">
                      {task.description}
                    </p>

                    <div className="flex flex-wrap gap-4 pt-1">
                      <div className="flex items-center gap-1.5 text-slate-400 text-xs font-bold">
                        <Calendar size={14} /> {task.date}
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-400 text-xs font-bold">
                        <MapPin size={14} /> {task.location}
                      </div>
                    </div>
                  </div>

                  {/* Actions Area */}
                  <div className="flex items-center md:items-start justify-between md:justify-end gap-3 border-t md:border-t-0 pt-4 md:pt-0">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="rounded-xl font-bold text-slate-500 text-xs group-hover:text-blue-600 transition-colors"
                    >
                      Details{" "}
                      <ArrowRight
                        size={14}
                        className="ml-1 group-hover:translate-x-1 transition-transform"
                      />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-slate-400"
                    >
                      <MoreVertical size={16} />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default VolunteerTasks;
