import { Outlet } from "react-router";
import Navbar from "./Navbar";
import Sidebar from "../Sidebar";

const AppLayout = ({ role }) => {
  // role can be 'admin', 'volunteer', 'citizen' or null for public
  const hasSidebar = role && role !== "guest";

  return (
    <div className="flex flex-col min-h-screen w-full bg-white">
      <Navbar />
      <div className="flex flex-1">
        {/* Render Sidebar only for logged-in users */}
        {hasSidebar && <Sidebar role={role} />}

        <main className={`grow ${hasSidebar ? "bg-gray-50/50 p-8" : ""}`}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
