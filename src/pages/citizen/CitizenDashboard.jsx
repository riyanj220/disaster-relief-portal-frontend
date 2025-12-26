import { Link } from "react-router";
import {
  HeartHandshake,
  MapPin,
  PhoneCall,
  FileText,
  ArrowRight,
  AlertCircle,
  Truck,
  CheckCircle2,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const CitizenDashboard = () => {
  const activeRequests = [
    {
      id: "RQ-441",
      type: "Medical Aid",
      status: "Verified",
      date: "Dec 20, 2025",
      location: "Sector 7, District 4",
      stage: 2, // 1: Submitted, 2: Verified, 3: Dispatching, 4: Delivered
    },
  ];

  return (
    <div className="space-y-10 pb-10">
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
          className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-2xl shadow-xl shadow-emerald-100 px-8 h-14 transition-all hover:translate-y-0.5 active:scale-95"
        >
          <Link to="/citizen/new-request">
            <HeartHandshake className="mr-2 h-5 w-5" />
            Request New Aid
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
            <Badge className="bg-blue-50 text-blue-600 border-blue-100 font-bold uppercase text-[10px]">
              {activeRequests[0].status}
            </Badge>
          </div>
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
              <div>
                <h3 className="text-2xl font-bold text-slate-800 tracking-tight">
                  {activeRequests[0].type}
                </h3>
                <div className="flex items-center gap-2 text-slate-500 mt-1">
                  <span className="text-sm font-semibold">
                    {activeRequests[0].id}
                  </span>
                  <span className="text-slate-300">•</span>
                  <div className="flex items-center text-xs font-medium">
                    <MapPin size={14} className="mr-1" />{" "}
                    {activeRequests[0].location}
                  </div>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="rounded-xl font-bold text-xs h-10 border-slate-200"
              >
                Full Details
              </Button>
            </div>

            {/* Simple Visual Timeline */}
            <div className="relative pt-2">
              <div className="absolute top-5 left-0 w-full h-1 bg-slate-100 rounded-full"></div>
              <div
                className="absolute top-5 left-0 h-1 bg-blue-500 rounded-full transition-all duration-1000"
                style={{ width: "40%" }}
              ></div>

              <div className="relative flex justify-between">
                {[
                  { label: "Submitted", icon: FileText },
                  { label: "Verified", icon: CheckCircle2 },
                  { label: "Dispatching", icon: Truck },
                  { label: "Arrived", icon: HeartHandshake },
                ].map((step, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col items-center text-center"
                  >
                    <div
                      className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center border-4 border-white shadow-sm z-10 transition-colors",
                        idx + 1 <= activeRequests[0].stage
                          ? "bg-blue-600 text-white"
                          : "bg-slate-200 text-slate-400"
                      )}
                    >
                      <step.icon size={16} />
                    </div>
                    <span
                      className={cn(
                        "text-[10px] font-bold mt-2 uppercase tracking-tighter",
                        idx + 1 <= activeRequests[0].stage
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
          </CardContent>
        </Card>

        {/* Sidebar Actions Column */}
        <div className="space-y-6">
          {/* Hotline Card */}
          <div className="bg-blue-600 p-8 rounded-4xl text-white shadow-xl shadow-blue-100 relative overflow-hidden group">
            <div className="relative z-10">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
                <PhoneCall size={24} />
              </div>
              <h3 className="font-bold text-xl mb-1">Emergency Hotline</h3>
              <p className="text-blue-100 text-sm mb-6 leading-relaxed">
                If you are in immediate danger, our dispatchers are available
                24/7.
              </p>
              <p className="text-3xl font-black tracking-tighter hover:scale-105 transition-transform cursor-pointer inline-block">
                911-RELIEF
              </p>
            </div>
            {/* Abstract background shapes */}
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all"></div>
          </div>

          {/* Quick Info Alerts */}
          <Card className="border-amber-100 bg-amber-50/50 rounded-3xl overflow-hidden border-2">
            <CardContent className="p-6">
              <div className="flex gap-4">
                <div className="p-2 bg-amber-100 text-amber-600 rounded-xl h-fit">
                  <AlertCircle size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-amber-900 text-sm">
                    Weather Alert
                  </h4>
                  <p className="text-amber-700/80 text-xs mt-1 leading-relaxed font-medium">
                    Heavy rain expected in Sector 7 tonight. Ensure aid packages
                    are secured.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Resource Links */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          {
            label: "Request History",
            path: "/citizen/history",
            color: "hover:text-blue-600",
          },
          {
            label: "Shelter Locations",
            path: "/citizen/map",
            color: "hover:text-emerald-600",
          },
          {
            label: "Volunteer Nearby",
            path: "/citizen/volunteers",
            color: "hover:text-purple-600",
          },
          {
            label: "Account Settings",
            path: "/citizen/settings",
            color: "hover:text-slate-600",
          },
        ].map((link, i) => (
          <Link key={i} to={link.path}>
            <div
              className={cn(
                "p-4 bg-white border border-slate-100 rounded-2xl text-center transition-all hover:shadow-md hover:border-transparent group",
                link.color
              )}
            >
              <span className="text-xs font-bold text-slate-600 group-hover:inherit transition-colors uppercase tracking-widest">
                {link.label}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

const cn = (...classes) => classes.filter(Boolean).join(" ");
export default CitizenDashboard;
