import { useState } from "react";
import { Outlet } from "react-router";
import Navbar from "./Navbar";
import Sidebar from "../Sidebar";

const AppLayout = ({ role }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const hasSidebar = role && role !== "guest";

  return (
    <div className="flex flex-col min-h-screen w-full bg-white">
      {/* Pass the setter to Navbar so the hamburger menu can open the sidebar.
          onMenuClick: A custom prop we defined in the Navbar to handle the button click.
      */}

      <Navbar onMenuClick={() => setIsSidebarOpen(true)} />

      <div className="flex flex-1">
        {/* Pass both role and the state controls to the Sidebar.
            open: The boolean state for the mobile drawer.
            setOpen: The function to update that state (e.g., when clicking outside or on a link).
        */}
        {hasSidebar && (
          <Sidebar
            role={role}
            open={isSidebarOpen}
            setOpen={setIsSidebarOpen}
          />
        )}

        <main
          className={cn(
            "grow min-w-0 flex-1 overflow-x-hidden", // Added min-w-0 and overflow-x-hidden
            hasSidebar ? "bg-gray-50/50 p-4 md:p-8" : ""
          )}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

const cn = (...classes) => classes.filter(Boolean).join(" ");
export default AppLayout;
