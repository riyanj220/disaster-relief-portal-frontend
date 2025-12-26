import React from "react";
import {
  Search,
  Filter,
  FileDown,
  MoreHorizontal,
  MapPin,
  Users,
  Clock,
  ArrowUpRight,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const AdminRequests = () => {
  const dummyRequests = [
    {
      id: "REQ-9942",
      citizen: "John Doe",
      type: "Medical",
      urgency: "Emergency",
      familySize: 4,
      location: "Sector 7, North Block",
      status: "Pending",
      time: "10 mins ago",
    },
    {
      id: "REQ-9941",
      citizen: "Sarah Khan",
      type: "Food",
      urgency: "High",
      familySize: 6,
      location: "District 4, Sector 12",
      status: "Verified",
      time: "45 mins ago",
    },
    {
      id: "REQ-9940",
      citizen: "Mike Ross",
      type: "Shelter",
      urgency: "Medium",
      familySize: 2,
      location: "Near Red Mosque",
      status: "Dispatching",
      time: "2 hours ago",
    },
  ];

  const getUrgencyStyles = (level) => {
    const styles = {
      Emergency: "bg-red-100 text-red-700 border-red-200",
      High: "bg-orange-100 text-orange-700 border-orange-200",
      Medium: "bg-blue-100 text-blue-700 border-blue-200",
      Low: "bg-slate-100 text-slate-700 border-slate-200",
    };
    return styles[level] || styles.Low;
  };

  return (
    <div className="space-y-6 pb-10 w-full max-w-full overflow-x-hidden">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
            Relief Requests
          </h2>
          <p className="text-slate-500 font-medium text-sm">
            Verify and prioritize incoming aid submissions from citizens.
          </p>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <Button
            variant="outline"
            className="flex-1 md:flex-none font-bold gap-2"
          >
            <Filter size={16} /> Filter
          </Button>
          <Button className="flex-1 md:flex-none bg-blue-600 font-bold gap-2 hover:bg-blue-700">
            <FileDown size={16} /> Export PDF
          </Button>
        </div>
      </div>

      {/* Search & Stats Bar - Fixed alignment here */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
        <div className="md:col-span-2 relative h-full flex items-center">
          <Search className="absolute left-3 text-slate-400" size={18} />
          <Input
            placeholder="Search by ID, Name, or Location..."
            className="pl-10 h-full min-h-16 bg-white border-slate-200 rounded-2xl shadow-sm focus-visible:ring-blue-500"
          />
        </div>

        {/* Emergency Card - Fixed internal alignment */}
        <Card className="border-slate-100 shadow-sm h-full rounded-2xl">
          <CardContent className="p-4 flex flex-row items-center gap-4 h-full">
            <div className="p-2.5 bg-red-50 text-red-600 rounded-xl">
              <AlertCircle size={20} />
            </div>
            <div className="flex flex-col">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Emergency
              </p>
              <p className="text-xl font-bold text-slate-900 leading-none mt-1">
                08
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Verified Card - Fixed internal alignment */}
        <Card className="border-slate-100 shadow-sm h-full rounded-2xl">
          <CardContent className="p-4 flex flex-row items-center gap-4 h-full">
            <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl">
              <CheckCircle size={20} />
            </div>
            <div className="flex flex-col">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Verified
              </p>
              <p className="text-xl font-bold text-slate-900 leading-none mt-1">
                124
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Table Card */}
      <Card className="border-slate-200 shadow-md rounded-2xl overflow-hidden">
        <div className="w-full overflow-x-auto min-w-0">
          <table className="w-full text-left border-collapse min-w-200">
            <thead className="bg-slate-50/50 text-slate-500 text-[11px] font-bold uppercase tracking-widest border-b">
              <tr>
                <th className="px-6 py-4">Request Info</th>
                <th className="px-6 py-4">Citizen</th>
                <th className="px-6 py-4">Family Size</th>
                <th className="px-6 py-4">Urgency</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm bg-white">
              {dummyRequests.map((req) => (
                <tr
                  key={req.id}
                  className="hover:bg-slate-50/30 transition-colors group"
                >
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-bold text-slate-900">{req.id}</span>
                      <span className="text-xs text-blue-600 font-semibold">
                        {req.type} Assistance
                      </span>
                      <span className="flex items-center text-[10px] text-slate-400 mt-1 uppercase font-bold tracking-tighter">
                        <Clock size={10} className="mr-1" /> {req.time}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-700 font-semibold">
                    {req.citizen}
                    <div className="text-xs text-slate-400 flex items-center gap-1 mt-1 font-normal">
                      <MapPin size={12} /> {req.location}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 font-bold text-slate-600">
                      <Users size={16} className="text-slate-300" />{" "}
                      {req.familySize}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge
                      variant="outline"
                      className={cn(
                        "font-bold uppercase text-[10px] px-2",
                        getUrgencyStyles(req.urgency)
                      )}
                    >
                      {req.urgency}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-slate-500 font-semibold">
                      <div
                        className={cn(
                          "w-2 h-2 rounded-full",
                          req.status === "Pending"
                            ? "bg-amber-400 animate-pulse"
                            : req.status === "Verified"
                            ? "bg-emerald-500"
                            : "bg-blue-500"
                        )}
                      />
                      {req.status}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        size="sm"
                        className="bg-slate-900 h-8 font-bold text-xs rounded-lg hover:bg-slate-800"
                      >
                        Review <ArrowUpRight size={14} className="ml-1" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                          >
                            <MoreHorizontal size={16} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="font-bold text-xs">
                            Verify Request
                          </DropdownMenuItem>
                          <DropdownMenuItem className="font-bold text-xs">
                            Assign Volunteer
                          </DropdownMenuItem>
                          <DropdownMenuItem className="font-bold text-xs text-red-600">
                            Reject
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
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
export default AdminRequests;
