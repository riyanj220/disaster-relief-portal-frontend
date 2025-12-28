import { useState, useEffect } from "react";
import api from "@/lib/api";
import {
  Search,
  Filter,
  UserMinus,
  MapPin,
  Star,
  Activity,
  History,
  Clock,
  CheckCircle2,
  AlertTriangle,
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
  DialogFooter,
} from "@/components/ui/dialog";

const AdminVolunteers = () => {
  // --- Data State ---
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // --- Modal States ---
  const [historyModal, setHistoryModal] = useState({
    open: false,
    data: [],
    loading: false,
    name: "",
  });
  const [deleteModal, setDeleteModal] = useState({
    open: false,
    id: null,
    name: "",
  });

  const fetchVolunteers = async () => {
    setLoading(true);
    try {
      const res = await api.get("/admin/volunteers");
      setVolunteers(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVolunteers();
  }, []);

  // --- Actions ---
  const handleViewHistory = async (vol) => {
    setHistoryModal({
      open: true,
      data: [],
      loading: true,
      name: `${vol.firstName} ${vol.lastName}`,
    });
    try {
      const res = await api.get(`/admin/volunteers/${vol.uid}/history`);
      setHistoryModal((prev) => ({ ...prev, data: res.data, loading: false }));
    } catch (err) {
      console.error(err);
      setHistoryModal((prev) => ({ ...prev, loading: false }));
    }
  };

  const handleDeleteVolunteer = async () => {
    // 1. Capture the ID we are about to delete
    const idToDelete = deleteModal.id;
    if (!idToDelete) return;

    try {
      // 2. Call the backend to delete from Firestore
      await api.delete(`/admin/volunteers/${idToDelete}`);

      // 3. Update the state MANUALLY
      // We filter the existing list to remove the person with that UID.
      // Since 'filteredVolunteers' depends on 'volunteers', the UI will re-render.
      setVolunteers((prevVolunteers) =>
        prevVolunteers.filter((vol) => vol.uid !== idToDelete)
      );

      // 4. Close the modal and reset state
      setDeleteModal({ open: false, id: null, name: "" });

      // NOTE: We removed fetchVolunteers() from here to avoid overwriting
      // our manual state update with old data from the server.
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Could not remove volunteer. Please check your connection.");
    }
  };

  const filteredVolunteers = volunteers.filter(
    (v) =>
      `${v.firstName} ${v.lastName}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      v.primarySkill?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-10 w-full max-w-full overflow-x-hidden">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
            Volunteer Network
          </h2>
          <p className="text-slate-500 font-medium mt-1">
            Manage and deploy your verified workforce.
          </p>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-80">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name or skill..."
              className="pl-10 h-12 bg-white border-slate-200 rounded-2xl shadow-sm"
            />
          </div>
          <Button
            variant="outline"
            size="icon"
            className="h-12 w-12 rounded-2xl shrink-0"
          >
            <Filter size={20} />
          </Button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <p className="col-span-full text-center py-10 font-bold text-slate-400 animate-pulse uppercase tracking-widest">
            Fetching Personnel...
          </p>
        ) : (
          filteredVolunteers.map((vol) => (
            <Card
              key={vol.uid}
              className="group border-slate-100 hover:border-blue-200 hover:shadow-xl transition-all duration-300 rounded-[2.5rem] bg-white relative overflow-hidden"
            >
              <CardContent className="p-8 flex flex-col items-center text-center">
                {/* Top Row: Avatar and prominent Delete Button */}
                <div className="w-full flex justify-between items-start mb-6">
                  <div className="invisible w-10"></div>{" "}
                  {/* Spacer for centering */}
                  <div className="relative">
                    <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center text-2xl font-bold text-blue-600 border-2 border-white shadow-inner uppercase">
                      {vol.firstName?.charAt(0)}
                      {vol.lastName?.charAt(0)}
                    </div>
                    <div
                      className={cn(
                        "absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-4 border-white shadow-sm",
                        vol.status === "ON_DUTY"
                          ? "bg-emerald-500"
                          : "bg-slate-300"
                      )}
                    />
                  </div>
                  {/* Prominent Delete Button - Always visible red-tinted */}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() =>
                      setDeleteModal({
                        open: true,
                        id: vol.uid,
                        name: `${vol.firstName} ${vol.lastName}`,
                      })
                    }
                    className="w-10 h-10 rounded-xl bg-red-50 text-red-400 hover:bg-red-500 hover:text-white transition-all shadow-sm cursor-pointer"
                  >
                    <UserMinus size={18} />
                  </Button>
                </div>

                {/* Identity Section - Centralized */}
                <div className="space-y-2 mb-6">
                  <div className="flex flex-col items-center gap-1">
                    <h3 className="text-xl font-bold text-slate-900 leading-tight">
                      {vol.firstName} {vol.lastName}
                    </h3>
                    <Badge className="bg-amber-50 text-amber-600 border-none text-[10px] font-black w-fit">
                      <Star size={10} className="fill-current mr-1" /> 5.0
                    </Badge>
                  </div>

                  <p className="text-[11px] font-bold text-blue-600 uppercase tracking-widest">
                    {vol.primarySkill || "General Responder"}
                  </p>

                  <p
                    className={cn(
                      "text-xs font-semibold flex items-center justify-center gap-1.5",
                      vol.status === "ON_DUTY"
                        ? "text-emerald-600"
                        : "text-slate-400"
                    )}
                  >
                    <MapPin size={12} />{" "}
                    {vol.status === "ON_DUTY"
                      ? "Active in Field"
                      : "Currently Inactive"}
                  </p>
                </div>

                {/* Action Button - Full Width Alignment */}
                <div className="w-full pt-6 border-t border-slate-50">
                  <Button
                    onClick={() => handleViewHistory(vol)}
                    variant="outline"
                    className="w-full rounded-2xl border-slate-100 font-bold text-xs h-12 gap-2 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-100 transition-all shadow-sm cursor-pointer"
                  >
                    <Activity size={16} /> View Mission History
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* History Modal */}
      <Dialog
        open={historyModal.open}
        onOpenChange={(o) => setHistoryModal((prev) => ({ ...prev, open: o }))}
      >
        <DialogContent className="sm:max-w-lg rounded-4xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex items-center gap-2">
              <History className="text-blue-600" /> Task History
            </DialogTitle>
            <DialogDescription className="font-bold text-slate-500 uppercase text-[10px] tracking-widest">
              Performance Log: {historyModal.name}
            </DialogDescription>
          </DialogHeader>

          <div className="max-h-100 overflow-y-auto space-y-4 py-4 pr-2 custom-scrollbar">
            {historyModal.loading ? (
              <div className="py-10 text-center animate-pulse font-bold text-slate-400">
                Loading History...
              </div>
            ) : historyModal.data.length > 0 ? (
              historyModal.data.map((task) => (
                <div
                  key={task.requestId}
                  className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex justify-between items-center"
                >
                  <div>
                    <p className="text-sm font-bold text-slate-900">
                      {task.assistanceType} Assistance
                    </p>
                    <p className="text-[10px] text-slate-400 font-medium flex items-center gap-1 mt-1">
                      <Clock size={10} /> Completed on{" "}
                      {new Date(task.timestamp).toLocaleDateString()}
                    </p>
                  </div>
                  <Badge className="bg-emerald-100 text-emerald-700 border-none font-bold text-[10px]">
                    SUCCESS
                  </Badge>
                </div>
              ))
            ) : (
              <div className="text-center py-10 text-slate-400 font-bold italic">
                No completed missions found.
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog
        open={deleteModal.open}
        onOpenChange={(o) => setDeleteModal((prev) => ({ ...prev, open: o }))}
      >
        <DialogContent className="sm:max-w-md rounded-4xl">
          <DialogHeader>
            <div className="mx-auto w-16 h-16 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mb-4">
              <AlertTriangle size={32} />
            </div>
            <DialogTitle className="text-center text-xl font-bold text-slate-900">
              Remove Volunteer?
            </DialogTitle>
            <DialogDescription className="text-center font-medium text-slate-500">
              This will permanently remove{" "}
              <span className="text-slate-900 font-bold">
                {deleteModal.name}
              </span>{" "}
              from the response network. This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button
              variant="ghost"
              className="flex-1 rounded-xl font-bold text-slate-500 cursor-pointer"
              onClick={() =>
                setDeleteModal({ open: false, id: null, name: "" })
              }
            >
              Cancel
            </Button>
            <Button
              className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl h-12 shadow-lg shadow-red-100 cursor-pointer"
              onClick={handleDeleteVolunteer}
            >
              Confirm Removal
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const cn = (...classes) => classes.filter(Boolean).join(" ");
export default AdminVolunteers;
