import React from "react";
import {
  Search,
  Filter,
  UserMinus,
  ShieldCheck,
  MoreVertical,
  Mail,
  Phone,
  MapPin,
  Star,
  Activity,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const AdminVolunteers = () => {
  const volunteers = [
    {
      id: "VOL-772",
      name: "Sarah Jenkins",
      role: "Medical Professional",
      status: "Available",
      location: "Sector 4",
      rating: 4.9,
      skills: ["First Aid", "Surgery"],
      avatar: "SJ",
    },
    {
      id: "VOL-881",
      name: "Marcus Chen",
      role: "HGV Driver",
      status: "On Mission",
      location: "Warehouse A",
      rating: 4.7,
      skills: ["Logistics", "Heavy Driving"],
      avatar: "MC",
    },
    {
      id: "VOL-902",
      name: "Elena Rodriguez",
      role: "Rescue Specialist",
      status: "Off Duty",
      location: "District 2",
      rating: 5.0,
      skills: ["Climbing", "Swimming"],
      avatar: "ER",
    },
  ];

  return (
    <div className="space-y-8 pb-10 w-full max-w-full overflow-x-hidden">
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
            Volunteer Network
          </h2>
          <p className="text-slate-500 font-medium mt-1">
            Manage and deploy your verified response workforce.
          </p>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-80">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />
            <Input
              placeholder="Search by name, skill, or ID..."
              className="pl-10 h-12 bg-white border-slate-200 rounded-2xl shadow-sm"
            />
          </div>
          <Button
            variant="outline"
            size="icon"
            className="h-12 w-12 rounded-2xl shrink-0"
          >
            <Filter size={20} className="text-slate-600" />
          </Button>
        </div>
      </div>

      {/* Volunteer Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {volunteers.map((vol) => (
          <Card
            key={vol.id}
            className="group border-slate-100 hover:border-blue-200 hover:shadow-xl transition-all duration-300 rounded-[2.5rem] overflow-hidden bg-white"
          >
            <CardContent className="p-8">
              {/* Card Header: Avatar & Actions */}
              <div className="flex justify-between items-start mb-6">
                <div className="relative">
                  <div className="w-16 h-16 bg-slate-100 rounded-3xl flex items-center justify-center text-xl font-bold text-slate-400 border-2 border-white shadow-inner">
                    {vol.avatar}
                  </div>
                  {/* Status Indicator Dot */}
                  <div
                    className={cn(
                      "absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-4 border-white shadow-sm",
                      vol.status === "Available"
                        ? "bg-emerald-500"
                        : vol.status === "On Mission"
                        ? "bg-blue-500"
                        : "bg-slate-300"
                    )}
                  />
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-xl text-slate-400 hover:text-slate-900"
                    >
                      <MoreVertical size={20} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="rounded-2xl p-2 min-w-40"
                  >
                    <DropdownMenuLabel className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                      Management
                    </DropdownMenuLabel>
                    <DropdownMenuItem className="rounded-xl font-bold text-xs py-2.5 gap-2">
                      <ShieldCheck size={14} className="text-blue-600" /> Verify
                      Skills
                    </DropdownMenuItem>
                    <DropdownMenuItem className="rounded-xl font-bold text-xs py-2.5 gap-2">
                      <Activity size={14} className="text-emerald-600" /> View
                      History
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="rounded-xl font-bold text-xs py-2.5 gap-2 text-red-600 hover:bg-red-50 focus:bg-red-50">
                      <UserMinus size={14} /> Remove Volunteer
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Identity Section */}
              <div className="mb-6">
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                    {vol.name}
                  </h3>
                  <div className="flex items-center text-amber-500 bg-amber-50 px-2 py-0.5 rounded-lg text-[10px] font-black">
                    <Star size={10} className="fill-current mr-1" />{" "}
                    {vol.rating}
                  </div>
                </div>
                <p className="text-[11px] font-bold text-blue-600 uppercase tracking-[0.15em] mt-1">
                  {vol.role}
                </p>
                <p className="text-xs font-semibold text-slate-400 mt-2 flex items-center gap-1">
                  <MapPin size={12} /> Current: {vol.location}
                </p>
              </div>

              {/* Skills Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {vol.skills.map((skill) => (
                  <Badge
                    key={skill}
                    variant="secondary"
                    className="bg-slate-50 text-slate-500 hover:bg-slate-100 border-none font-bold text-[10px] rounded-lg"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>

              {/* Contact Actions */}
              <div className="grid grid-cols-2 gap-3 pt-6 border-t border-slate-50">
                <Button
                  variant="outline"
                  className="rounded-xl border-slate-100 font-bold text-xs h-10 gap-2 hover:bg-slate-50"
                >
                  <Mail size={14} /> Email
                </Button>
                <Button
                  variant="outline"
                  className="rounded-xl border-slate-100 font-bold text-xs h-10 gap-2 hover:bg-slate-50"
                >
                  <Phone size={14} /> Call
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

const cn = (...classes) => classes.filter(Boolean).join(" ");
export default AdminVolunteers;
