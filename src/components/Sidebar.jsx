import { Link, useLocation } from "react-router";
import {
  LayoutDashboard,
  ClipboardList,
  Package,
  Users,
  CheckCircle2,
  Clock,
  PlusCircle,
  History,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";

const MENUS = {
  admin: [
    {
      section: "Operations",
      items: [
        { name: "Overview", path: "/admin", icon: LayoutDashboard },
        {
          name: "Relief Requests",
          path: "/admin/requests",
          icon: ClipboardList,
        },
      ],
    },
    {
      section: "Resources",
      items: [{ name: "Inventory", path: "/admin/inventory", icon: Package }],
    },
    {
      section: "People",
      items: [{ name: "Volunteers", path: "/admin/volunteers", icon: Users }],
    },
  ],
  volunteer: [
    {
      section: "My Work",
      items: [
        { name: "Overview", path: "/volunteer", icon: LayoutDashboard },
        { name: "My Tasks", path: "/volunteer/tasks", icon: CheckCircle2 },
        { name: "Availability", path: "/volunteer/status", icon: Clock },
      ],
    },
  ],
  citizen: [
    {
      section: "Requests",
      items: [
        { name: "Overview", path: "/citizen", icon: LayoutDashboard },
        { name: "New Request", path: "/citizen/request", icon: PlusCircle },
        { name: "History", path: "/citizen/request-history", icon: History },
      ],
    },
  ],
};
const SidebarContent = ({ role, pathname, onItemClick }) => {
  const sections = MENUS[role] || [];

  return (
    /* 1. h-full: Ensures it takes the full height of the drawer/sidebar.
      2. flex flex-col: Allows us to use mt-auto or justify-between.
      3. min-h-0: Prevents the container from expanding beyond its parent's height.
    */
    <div className="flex flex-col h-full bg-white min-h-0 overflow-hidden">
      <ScrollArea className="flex-1 px-4 py-6">
        <div className="space-y-8">
          {sections.map((section) => (
            <div key={section.section}>
              <p className="px-3 mb-3 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                {section.section}
              </p>
              <nav className="space-y-1">
                {section.items.map((item) => {
                  const isActive = pathname === item.path;
                  const Icon = item.icon;
                  return (
                    <Link key={item.name} to={item.path} onClick={onItemClick}>
                      <Button
                        variant="ghost"
                        className={cn(
                          "group w-full justify-start h-10 cursor-pointer px-3 rounded-xl transition-all",
                          isActive
                            ? "bg-blue-50 text-blue-600 shadow-sm"
                            : "text-slate-500 hover:bg-slate-50"
                        )}
                      >
                        <Icon
                          className={cn(
                            "h-4 w-4 mr-3",
                            isActive ? "text-blue-600" : "text-slate-400"
                          )}
                        />
                        <span
                          className={cn(
                            "text-sm flex-1 text-left",
                            isActive ? "font-bold" : "font-semibold"
                          )}
                        >
                          {item.name}
                        </span>
                        {isActive && <ChevronRight className="h-3 w-3" />}
                      </Button>
                    </Link>
                  );
                })}
              </nav>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* This footer is now pinned. 
        Adding shrink-0 ensures it never collapses if the screen is small.
      */}
      <div className="p-4 border-t border-slate-100 bg-slate-50/50 mt-auto shrink-0 mb-safe">
        <Button
          variant="ghost"
          className="w-full justify-start text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors group"
        >
          <LogOut className="h-4 w-4 mr-3 group-hover:-translate-x-1 transition-transform" />
          <span className="text-xs font-bold uppercase tracking-wider">
            Logout
          </span>
        </Button>
      </div>
    </div>
  );
};
// Updated Sidebar to accept 'open' and 'setOpen' from parent for Navbar control
const Sidebar = ({ role, open, setOpen }) => {
  const location = useLocation();

  return (
    <>
      {/* Mobile Sidebar (Sheet) */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="p-0 w-72 border-none">
          <SheetHeader className="p-6 border-b text-left">
            <SheetTitle className="text-blue-600 font-bold">
              ReliefConnect
            </SheetTitle>
            <SheetDescription className="text-xs text-slate-500">
              Access all {role} portal features and settings.
            </SheetDescription>
          </SheetHeader>
          <SidebarContent
            role={role}
            pathname={location.pathname}
            onItemClick={() => setOpen(false)}
          />
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col border-r bg-white sticky top-18.25 h-[calc(100vh-73px)] w-64 shrink-0 z-40">
        <SidebarContent role={role} pathname={location.pathname} />
      </aside>
    </>
  );
};

export default Sidebar;
