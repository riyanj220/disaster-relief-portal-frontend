import { useState, useEffect } from "react";
import api from "@/lib/api";
import {
  CheckCircle2,
  Search,
  MapPin,
  Calendar,
  Filter,
  MoreVertical,
  Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

const VolunteerTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // Modal State
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hours, setHours] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchTasks = async () => {
    try {
      const response = await api.get("/volunteer/tasks");
      setTasks(response.data);
    } catch (error) {
      console.error("Failed to fetch volunteer tasks", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleOpenModal = (id) => {
    setSelectedTaskId(id);
    setIsModalOpen(true);
  };

  const handleMarkCompleted = async () => {
    if (!hours || isNaN(hours)) return alert("Please enter valid hours");
    setIsSubmitting(true);
    try {
      // Sending both status and hours as per your updated backend
      await api.patch(`/volunteer/tasks/${selectedTaskId}`, {
        status: "Completed",
        hours: parseFloat(hours),
      });
      setIsModalOpen(false);
      setHours("");
      fetchTasks();
    } catch (error) {
      console.error("Error completing task", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredTasks = tasks.filter(
    (task) =>
      task.assistanceType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.requestId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (ts) =>
    new Date(ts).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  return (
    <div className="space-y-8 pb-10 w-full max-w-full overflow-x-hidden">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
            Assigned Tasks
          </h2>
          <p className="text-slate-500 font-medium mt-1">
            Manage your active duties and field operations.
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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-11 bg-white border-slate-200 rounded-xl"
            />
          </div>
          <Button
            variant="outline"
            size="icon"
            className="h-11 w-11 rounded-xl"
          >
            <Filter size={18} />
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-20 font-bold text-slate-400 animate-pulse">
            Syncing...
          </div>
        ) : filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <Card
              key={task.requestId}
              className="border-slate-100 hover:border-blue-200 hover:shadow-md transition-all duration-300 rounded-4xl overflow-hidden group"
            >
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row">
                  <div
                    className={cn(
                      "w-full md:w-32 flex items-center justify-center p-6 text-[10px] font-bold uppercase tracking-widest",
                      task.status === "Completed"
                        ? "bg-emerald-50 text-emerald-600"
                        : "bg-blue-50 text-blue-600"
                    )}
                  >
                    #{task.requestId.substring(0, 5)}
                  </div>
                  <div className="flex-1 p-6 flex flex-col md:flex-row justify-between gap-6">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <h3 className="font-bold text-slate-800 text-lg">
                          {task.assistanceType} Assistance
                        </h3>
                        <Badge
                          className={cn(
                            "text-[10px] font-bold uppercase tracking-tighter rounded-full border-none px-3",
                            task.status === "Completed"
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-amber-100 text-amber-700"
                          )}
                        >
                          {task.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-500 font-medium max-w-lg">
                        Urgency:{" "}
                        <span className="text-slate-900 font-bold">
                          {task.urgency}
                        </span>{" "}
                        • Family:{" "}
                        <span className="text-slate-900 font-bold">
                          {task.familySize}
                        </span>
                      </p>
                      <div className="flex flex-wrap gap-4 pt-1">
                        <div className="flex items-center gap-1.5 text-slate-400 text-xs font-bold">
                          <Calendar size={14} /> {formatDate(task.timestamp)}
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-400 text-xs font-bold">
                          <MapPin size={14} /> {task.address}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center md:items-start justify-between md:justify-end gap-3 border-t md:border-t-0 pt-4 md:pt-0">
                      {task.status !== "Completed" && (
                        <Button
                          onClick={() => handleOpenModal(task.requestId)}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs h-10 px-4 gap-2 cursor-pointer"
                        >
                          <CheckCircle2 size={16} /> Mark Completed
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-10 w-10 rounded-xl text-slate-400"
                      >
                        <MoreVertical size={16} />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center py-20 bg-slate-50 rounded-[2.5rem] border-2 border-dashed border-slate-200 text-slate-400 font-bold uppercase tracking-widest">
            No tasks assigned
          </div>
        )}
      </div>

      {/* Completion Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-md rounded-3xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              Log Mission Time
            </DialogTitle>
            <DialogDescription>
              How many hours did this mission take? This helps us track your
              impact.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <label className="text-xs font-bold text-slate-400 uppercase ml-1">
              Hours Spent
            </label>
            <div className="relative mt-2">
              <Input
                type="number"
                value={hours}
                onChange={(e) => setHours(e.target.value)}
                placeholder="e.g. 1.5"
                className="h-12 bg-slate-50 border-none rounded-xl pl-10 font-bold"
              />
              <Clock
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300"
                size={18}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              disabled={isSubmitting}
              onClick={handleMarkCompleted}
              className="w-full h-12 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl cursor-pointer"
            >
              {isSubmitting ? "Processing..." : "Confirm & Complete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default VolunteerTasks;
