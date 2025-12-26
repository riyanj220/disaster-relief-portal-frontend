import React from "react";
import {
  Search,
  CheckCircle2,
  XCircle,
  ChevronRight,
  Calendar,
  MessageSquare,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const CitizenRequestHistory = () => {
  const history = [
    {
      id: "RQ-441",
      type: "Medical Aid",
      date: "Dec 18, 2025",
      status: "Completed",
      note: "Supplies delivered by Sarah J.",
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      icon: CheckCircle2,
    },
    {
      id: "RQ-430",
      type: "Food Kits",
      date: "Dec 15, 2025",
      status: "Closed",
      note: "Case resolved",
      color: "text-slate-500",
      bg: "bg-slate-100",
      icon: XCircle,
    },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Header & Search Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
            Your History
          </h2>
          <p className="text-slate-500 font-medium mt-1">
            Review past requests and resolution notes.
          </p>
        </div>

        {/* Search Bar - Makes the UI look "Functional" */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
          <Input
            placeholder="Search by ID or type..."
            className="pl-10 h-11 bg-white border-slate-200 rounded-xl font-medium"
          />
        </div>
      </div>

      {/* History List */}
      <div className="space-y-4">
        {history.map((req, i) => {
          const StatusIcon = req.icon;
          return (
            <Card
              key={i}
              className="group border-slate-100 hover:border-blue-200 hover:shadow-md transition-all duration-300 rounded-4xl overflow-hidden"
            >
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row items-stretch md:items-center">
                  {/* Status Side Color Strip */}
                  <div
                    className={cn(
                      "w-full md:w-2 h-2 md:h-auto shrink-0",
                      req.bg
                    )}
                  />

                  <div className="flex-1 p-6 flex flex-col md:flex-row justify-between gap-6">
                    {/* Left Side: Details */}
                    <div className="flex gap-4">
                      <div
                        className={cn(
                          "hidden sm:flex h-12 w-12 rounded-2xl items-center justify-center shrink-0",
                          req.bg,
                          req.color
                        )}
                      >
                        <StatusIcon size={24} />
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-3">
                          <h3 className="font-bold text-slate-800 text-lg tracking-tight">
                            {req.type}
                          </h3>
                          <Badge
                            variant="outline"
                            className="text-[10px] font-bold border-slate-200 text-slate-400 rounded-md"
                          >
                            {req.id}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 text-slate-500 text-sm font-medium">
                          <MessageSquare size={14} className="text-slate-300" />
                          {req.note}
                        </div>
                      </div>
                    </div>

                    {/* Right Side: Metadata & Actions */}
                    <div className="flex flex-row md:flex-col justify-between items-center md:items-end gap-3 border-t md:border-t-0 pt-4 md:pt-0 border-slate-50">
                      <Badge
                        className={cn(
                          "font-bold uppercase text-[10px] tracking-widest px-3 py-1 rounded-full border-none",
                          req.status === "Completed"
                            ? "bg-emerald-50 text-emerald-600"
                            : "bg-slate-100 text-slate-500"
                        )}
                      >
                        {req.status}
                      </Badge>
                      <div className="flex items-center gap-2 text-slate-400 text-xs font-bold">
                        <Calendar size={14} />
                        {req.date}
                        <ChevronRight
                          size={16}
                          className="text-slate-300 group-hover:translate-x-1 transition-transform"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Empty State Mockup */}
      <div className="pt-10 border-t border-slate-100 text-center">
        <Button
          variant="ghost"
          className="text-slate-400 font-bold text-xs uppercase tracking-widest hover:text-blue-600"
        >
          Load More History
        </Button>
      </div>
    </div>
  );
};

export default CitizenRequestHistory;
