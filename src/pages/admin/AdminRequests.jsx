import React, { useState, useEffect } from "react";
import api from "@/lib/api";
import {
  Search,
  Filter,
  FileDown,
  Users,
  AlertCircle,
  CheckCircle,
  ArrowUpRight,
  Clock,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// --- Skeleton Loader Component ---
const RequestTableSkeleton = () => (
  <>
    {[1, 2, 3, 4, 5].map((i) => (
      <tr key={i} className="animate-pulse border-b border-slate-100">
        <td className="px-6 py-4">
          <div className="h-4 bg-slate-200 rounded w-20 mb-2"></div>
          <div className="h-3 bg-slate-100 rounded w-24"></div>
        </td>
        <td className="px-6 py-4">
          <div className="h-5 bg-slate-100 rounded w-10"></div>
        </td>
        <td className="px-6 py-4">
          <div className="h-6 bg-slate-100 rounded-full w-24"></div>
        </td>
        <td className="px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-slate-200"></div>
            <div className="h-3 bg-slate-100 rounded w-16"></div>
          </div>
        </td>
        <td className="px-6 py-4 text-right">
          <div className="h-8 bg-slate-200 rounded-lg w-20 ml-auto"></div>
        </td>
      </tr>
    ))}
  </>
);

const AdminRequests = () => {
  // --- Data State ---
  const [requests, setRequests] = useState([]);
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // --- Modal & Action State ---
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [actionStep, setActionStep] = useState("review"); // 'review' or 'assign'
  const [selectedVolunteer, setSelectedVolunteer] = useState("");

  // --- Fetch Logic ---
  const fetchData = async () => {
    setLoading(true);
    try {
      const [reqRes, volRes] = await Promise.all([
        api.get("/admin/requests"),
        api.get("/admin/volunteers"),
      ]);
      setRequests(reqRes.data);
      setVolunteers(volRes.data.filter((v) => v.status === "ON_DUTY"));
    } catch (error) {
      console.error("Error fetching admin data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // --- Update Logic ---
  const updateStatus = async (requestId, status, volunteerId = null) => {
    try {
      const updates = { status };
      if (volunteerId) updates.assignedVolunteerId = volunteerId;

      await api.patch(`/admin/requests/${requestId}`, updates);

      setIsModalOpen(false);
      fetchData();
    } catch (error) {
      console.error("Update failed", error);
    }
  };

  // --- Helpers ---
  const getUrgencyStyles = (level) => {
    const styles = {
      "High (Critical)": "bg-red-100 text-red-700 border-red-200",
      "Emergency (Life Threat)": "bg-red-600 text-white border-red-700",
      "Medium (Urgent)": "bg-orange-100 text-orange-700 border-orange-200",
      "Low (General Need)": "bg-slate-100 text-slate-700 border-slate-200",
    };
    return styles[level] || styles["Low (General Need)"];
  };

  const filteredRequests = requests.filter(
    (req) =>
      req.requestId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.assistanceType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openReviewModal = (req) => {
    setSelectedRequest(req);
    setActionStep("review");
    setSelectedVolunteer("");
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6 pb-10 w-full max-w-full overflow-x-hidden">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
            Relief Requests
          </h2>
          <p className="text-slate-500 font-medium text-sm">
            Verify and prioritize incoming aid submissions.
          </p>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <Button variant="outline" className="font-bold gap-2 cursor-pointer">
            <Filter size={16} /> Filter
          </Button>
          <Button className="bg-blue-600 font-bold gap-2 hover:bg-blue-700 cursor-pointer">
            <FileDown size={16} /> Export
          </Button>
        </div>
      </div>

      {/* Stats & Search */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
        <div className="md:col-span-2 relative h-full flex items-center">
          <Search className="absolute left-3 text-slate-400" size={18} />
          <Input
            placeholder="Search by ID or Type..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 h-full min-h-16 bg-white border-slate-200 rounded-2xl shadow-sm focus-visible:ring-blue-500"
          />
        </div>

        {/* Emergency Stats Card */}
        <Card className="border-slate-100 shadow-sm rounded-2xl">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-2.5 bg-red-50 text-red-600 rounded-xl">
              <AlertCircle size={20} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase">
                Emergency
              </p>
              {loading ? (
                <div className="h-5 bg-slate-100 rounded w-10 animate-pulse mt-1"></div>
              ) : (
                <p className="text-xl font-bold text-slate-900 leading-none">
                  {
                    requests.filter((r) => r.urgency.includes("Emergency"))
                      .length
                  }
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Total Stats Card */}
        <Card className="border-slate-100 shadow-sm rounded-2xl">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl">
              <CheckCircle size={20} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase">
                Total
              </p>
              {loading ? (
                <div className="h-5 bg-slate-100 rounded w-10 animate-pulse mt-1"></div>
              ) : (
                <p className="text-xl font-bold text-slate-900 leading-none">
                  {requests.length}
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Table */}
      <Card className="border-slate-200 shadow-md rounded-2xl overflow-hidden">
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-200">
            <thead className="bg-slate-50/50 text-slate-500 text-[11px] font-bold uppercase tracking-widest border-b">
              <tr>
                <th className="px-6 py-4">Request Info</th>
                <th className="px-6 py-4">Family Size</th>
                <th className="px-6 py-4">Urgency</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm bg-white">
              {loading ? (
                <RequestTableSkeleton />
              ) : filteredRequests.length > 0 ? (
                filteredRequests.map((req) => (
                  <tr
                    key={req.requestId}
                    className="hover:bg-slate-50/30 cursor-pointer transition-colors group"
                    onClick={() => openReviewModal(req)}
                  >
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-900">
                          {req.requestId.substring(0, 8)}
                        </span>
                        <span className="text-xs text-blue-600 font-semibold">
                          {req.assistanceType} Assistance
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-600 font-bold">
                      <div className="flex items-center gap-2">
                        <Users size={16} className="text-slate-300" />{" "}
                        {req.familySize}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge
                        variant="outline"
                        className={cn(
                          "font-bold uppercase text-[9px] px-2",
                          getUrgencyStyles(req.urgency)
                        )}
                      >
                        {req.urgency}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-slate-500 font-semibold uppercase text-[10px]">
                        <div
                          className={cn(
                            "w-2 h-2 rounded-full",
                            req.status === "Pending"
                              ? "bg-amber-400 animate-pulse"
                              : "bg-emerald-500"
                          )}
                        />
                        {req.status}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button
                        size="sm"
                        className="bg-slate-900 h-8 font-bold text-xs rounded-lg cursor-pointer"
                      >
                        Review
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-10 text-center text-slate-400 font-bold uppercase tracking-widest"
                  >
                    No requests found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Workflow Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-125 rounded-3xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex items-center gap-2">
              {actionStep === "review" ? "Review Request" : "Assign Volunteer"}
            </DialogTitle>
            <DialogDescription className="font-semibold text-slate-500">
              ID: {selectedRequest?.requestId}
            </DialogDescription>
          </DialogHeader>

          {actionStep === "review" ? (
            <div className="space-y-6 py-4">
              <div className="bg-slate-50 p-4 rounded-2xl space-y-3">
                <div className="flex justify-between">
                  <span className="text-xs text-slate-400 uppercase font-bold">
                    Location
                  </span>
                  <span className="text-sm font-bold text-slate-700">
                    {selectedRequest?.address}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-slate-400 uppercase font-bold">
                    Assistance
                  </span>
                  <Badge className="bg-blue-100 text-blue-700 border-none">
                    {selectedRequest?.assistanceType}
                  </Badge>
                </div>
              </div>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1 h-12 rounded-xl border-red-200 text-red-600 font-bold cursor-pointer"
                  onClick={() =>
                    updateStatus(selectedRequest.requestId, "Rejected")
                  }
                >
                  Reject
                </Button>
                <Button
                  className="flex-1 h-12 rounded-xl bg-emerald-600 hover:bg-emerald-700 font-bold cursor-pointer"
                  onClick={() => setActionStep("assign")}
                >
                  Approve & Continue
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-6 py-4">
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-slate-400 uppercase">
                  Select Available Volunteer
                </label>
                <Select
                  onValueChange={setSelectedVolunteer}
                  value={selectedVolunteer}
                >
                  <SelectTrigger className="h-12 rounded-xl bg-slate-50 border-none font-bold">
                    <SelectValue placeholder="Choose a responder..." />
                  </SelectTrigger>
                  <SelectContent>
                    {volunteers.map((v) => (
                      <SelectItem
                        key={v.uid}
                        value={v.uid}
                        className="font-bold"
                      >
                        {v.firstName} {v.lastName} ({v.primarySkill})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-3">
                <Button
                  variant="ghost"
                  className="font-bold text-slate-500 cursor-pointer"
                  onClick={() => setActionStep("review")}
                >
                  Back
                </Button>
                <Button
                  disabled={!selectedVolunteer}
                  className="flex-1 h-12 rounded-xl bg-blue-600 hover:bg-blue-700 font-bold cursor-pointer"
                  onClick={() =>
                    updateStatus(
                      selectedRequest.requestId,
                      "Approved",
                      selectedVolunteer
                    )
                  }
                >
                  Confirm & Dispatch Aid
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

const cn = (...classes) => classes.filter(Boolean).join(" ");
export default AdminRequests;
