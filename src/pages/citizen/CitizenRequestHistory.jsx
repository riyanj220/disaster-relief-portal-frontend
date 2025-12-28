import React, { useState, useEffect } from "react";
import api from "@/lib/api"; // Your Axios instance
import {
  Search,
  CheckCircle2,
  XCircle,
  ChevronRight,
  Calendar,
  MessageSquare,
  Clock,
  AlertCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const CitizenRequestHistory = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // 1. Fetch History from Backend
  const fetchHistory = async () => {
    try {
      const response = await api.get("/requests/history");
      setRequests(response.data);
    } catch (error) {
      console.error("Failed to fetch history", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  // 2. Search Helper Function
  const filteredRequests = requests.filter(
    (req) =>
      req.requestId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.assistanceType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 3. UI Helpers for Status
  const getStatusStyles = (status) => {
    switch (status) {
      case "Completed":
        return {
          color: "text-emerald-600",
          bg: "bg-emerald-50",
          icon: CheckCircle2,
        };
      case "Rejected":
        return { color: "text-rose-600", bg: "bg-rose-50", icon: XCircle };
      case "Pending":
        return { color: "text-amber-600", bg: "bg-amber-50", icon: Clock };
      default:
        return {
          color: "text-slate-500",
          bg: "bg-slate-100",
          icon: MessageSquare,
        };
    }
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

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

        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
          <Input
            placeholder="Search by ID or type..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 h-11 bg-white border-slate-200 rounded-xl font-medium"
          />
        </div>
      </div>

      {/* History List */}
      <div className="space-y-4">
        {loading ? (
          <p className="text-center py-10 text-slate-400 font-bold uppercase tracking-widest animate-pulse">
            Loading your records...
          </p>
        ) : filteredRequests.length > 0 ? (
          filteredRequests.map((req) => {
            const styles = getStatusStyles(req.status);
            const StatusIcon = styles.icon;

            return (
              <Card
                key={req.requestId}
                className="group border-slate-100 hover:border-blue-200 hover:shadow-md transition-all duration-300 rounded-4xl overflow-hidden"
              >
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row items-stretch md:items-center">
                    <div
                      className={cn(
                        "w-full md:w-2 h-2 md:h-auto shrink-0",
                        styles.bg
                      )}
                    />

                    <div className="flex-1 p-6 flex flex-col md:flex-row justify-between gap-6">
                      <div className="flex gap-4">
                        <div
                          className={cn(
                            "hidden sm:flex h-12 w-12 rounded-2xl items-center justify-center shrink-0",
                            styles.bg,
                            styles.color
                          )}
                        >
                          <StatusIcon size={24} />
                        </div>

                        <div className="space-y-1">
                          <div className="flex items-center gap-3">
                            <h3 className="font-bold text-slate-800 text-lg tracking-tight">
                              {req.assistanceType}
                            </h3>
                            <Badge
                              variant="outline"
                              className="text-[10px] font-bold border-slate-200 text-slate-400 rounded-md"
                            >
                              {req.requestId.substring(0, 8)}...
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2 text-slate-500 text-sm font-medium">
                            <AlertCircle size={14} className="text-slate-300" />
                            Urgency: {req.urgency} | Family Size:{" "}
                            {req.familySize}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-row md:flex-col justify-between items-center md:items-end gap-3 border-t md:border-t-0 pt-4 md:pt-0 border-slate-50">
                        <Badge
                          className={cn(
                            "font-bold uppercase text-[10px] tracking-widest px-3 py-1 rounded-full border-none",
                            styles.bg,
                            styles.color
                          )}
                        >
                          {req.status}
                        </Badge>
                        <div className="flex items-center gap-2 text-slate-400 text-xs font-bold">
                          <Calendar size={14} />
                          {formatDate(req.timestamp)}
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
          })
        ) : (
          <div className="text-center py-20 bg-slate-50 rounded-4xl border-2 border-dashed border-slate-200">
            <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">
              No requests found
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CitizenRequestHistory;
