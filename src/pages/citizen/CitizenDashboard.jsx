import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "@/lib/api";
import {
  HeartHandshake,
  MapPin,
  PhoneCall,
  FileText,
  AlertCircle,
  CheckCircle2,
  ShieldCheck,
  HelpCircle,
  Settings,
  Activity,
  History as HistoryIcon, // Renamed to avoid browser conflict
  Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const CitizenDashboard = () => {
  const [activeRequest, setActiveRequest] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatest = async () => {
      try {
        const res = await api.get("/requests/history");
        // We find the first request that isn't "Rejected" to track it live
        const latest = res.data.find((req) => req.status !== "Rejected");
        setActiveRequest(latest);
      } catch (err) {
        console.error("Dashboard load failed", err);
      } finally {
        setLoading(false);
      }
    };
    fetchLatest();
  }, []);

  const getStage = (status) => {
    if (status === "Pending") return 2; // Shows Submitted & Pending
    if (status === "Approved") return 3; // Shows up to Verified
    if (status === "Completed") return 4; // Shows all
    return 1;
  };

  const stage = activeRequest ? getStage(activeRequest.status) : 0;

  return (
    <div className="space-y-10 pb-10 w-full max-w-full overflow-x-hidden">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
            How can we help?
          </h2>
          <p className="text-slate-500 font-medium mt-1">
            Submit a new request or track your active aid packages.
          </p>
        </div>
        <Button
          asChild
          size="lg"
          className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-2xl shadow-xl px-8 h-14 transition-all hover:translate-y-0.5"
        >
          <Link to="/citizen/request">
            <HeartHandshake className="mr-2 h-5 w-5" /> Request New Aid
          </Link>
        </Button>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Active Request Tracking Card */}
        <Card className="lg:col-span-2 border-slate-100 shadow-sm overflow-hidden rounded-3xl">
          <div className="bg-slate-50/50 px-6 py-4 border-b border-slate-100 flex justify-between items-center">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
              Live Tracking
            </span>
            {activeRequest && (
              <Badge className="bg-blue-50 text-blue-600 border-blue-100 font-bold uppercase text-[10px]">
                {activeRequest.status}
              </Badge>
            )}
          </div>
          <CardContent className="p-8">
            {loading ? (
              <div className="py-10 text-center animate-pulse font-bold text-slate-300">
                Establishing Uplink...
              </div>
            ) : activeRequest ? (
              <>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-800 tracking-tight">
                      {activeRequest.assistanceType} Assistance
                    </h3>
                    <div className="flex items-center gap-2 text-slate-500 mt-1">
                      <span className="text-sm font-semibold">
                        {activeRequest.requestId.substring(0, 8)}
                      </span>
                      <span className="text-slate-300">•</span>
                      <div className="flex items-center text-xs font-medium">
                        <MapPin size={14} className="mr-1" />{" "}
                        {activeRequest.address}
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                    className="rounded-xl font-bold text-xs h-10 cursor-pointer"
                  >
                    <Link to="/citizen/request-history">Full History</Link>
                  </Button>
                </div>

                <div className="relative pt-2">
                  <div className="absolute top-5 left-0 w-full h-1 bg-slate-100 rounded-full"></div>
                  <div
                    className="absolute top-5 left-0 h-1 bg-blue-500 rounded-full transition-all duration-1000"
                    style={{ width: `${((stage - 1) / 3) * 100}%` }}
                  ></div>
                  <div className="relative flex justify-between">
                    {[
                      { label: "Submitted", icon: FileText },
                      { label: "Pending", icon: Clock },
                      { label: "Verified", icon: ShieldCheck },
                      { label: "Completed", icon: CheckCircle2 },
                    ].map((step, idx) => (
                      <div
                        key={idx}
                        className="flex flex-col items-center text-center"
                      >
                        <div
                          className={cn(
                            "w-10 h-10 rounded-full flex items-center justify-center border-4 border-white shadow-sm z-10 transition-colors",
                            idx + 1 <= stage
                              ? "bg-blue-600 text-white"
                              : "bg-slate-200 text-slate-400"
                          )}
                        >
                          <step.icon size={16} />
                        </div>
                        <span
                          className={cn(
                            "text-[10px] font-bold mt-2 uppercase tracking-tighter",
                            idx + 1 <= stage
                              ? "text-slate-800"
                              : "text-slate-400"
                          )}
                        >
                          {step.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="py-12 text-center">
                <HelpCircle size={48} className="mx-auto text-slate-200 mb-4" />
                <p className="text-slate-400 font-bold uppercase text-xs tracking-widest">
                  No active requests to track
                </p>
                <Link
                  to="/citizen/request"
                  className="text-blue-600 font-bold text-xs hover:underline mt-2 inline-block"
                >
                  Need help? Submit a request now
                </Link>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Sidebar Actions Column */}
        <div className="space-y-6">
          <div className="bg-blue-600 p-8 rounded-4xl text-white shadow-xl relative overflow-hidden group">
            <div className="relative z-10">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
                <PhoneCall size={24} />
              </div>
              <h3 className="font-bold text-xl mb-1">Emergency Hotline</h3>
              <p className="text-blue-100 text-sm mb-6 leading-relaxed">
                Immediate danger? Our dispatchers are available 24/7.
              </p>
              <p className="text-3xl font-black tracking-tighter hover:scale-105 transition-transform cursor-pointer inline-block">
                911-RELIEF
              </p>
            </div>
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all"></div>
          </div>

          <Card className="border-amber-100 bg-amber-50/50 rounded-3xl overflow-hidden border-2 shadow-none">
            <CardContent className="p-6 flex gap-4">
              <div className="p-2 bg-amber-100 text-amber-600 rounded-xl h-fit">
                <AlertCircle size={20} />
              </div>
              <div>
                <h4 className="font-bold text-amber-900 text-sm">
                  Safe Zone Protocol
                </h4>
                <p className="text-amber-700/80 text-xs mt-1 leading-relaxed font-medium">
                  During floods, avoid basements. Move to Sector 4 Community
                  Center.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Resource Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          {
            label: "Request History",
            path: "/citizen/history",
            icon: HistoryIcon, // Used renamed alias
            color: "text-blue-600",
            bg: "bg-blue-50",
          },
          {
            label: "Safe Shelters",
            path: "/citizen/map",
            icon: MapPin,
            color: "text-emerald-600",
            bg: "bg-emerald-50",
          },
          {
            label: "Community News",
            path: "/citizen/news",
            icon: Activity,
            color: "text-purple-600",
            bg: "bg-purple-50",
          },
          {
            label: "Profile Settings",
            path: "/citizen/settings",
            icon: Settings,
            color: "text-slate-600",
            bg: "bg-slate-50",
          },
        ].map((link, i) => (
          <Link key={i} to={link.path}>
            <div className="p-6 bg-white border border-slate-100 rounded-3xl text-center transition-all hover:shadow-lg hover:-translate-y-1 flex flex-col items-center gap-3 group">
              <div className={cn("p-3 rounded-2xl", link.bg, link.color)}>
                <link.icon size={20} />
              </div>
              <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">
                {link.label}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CitizenDashboard;
