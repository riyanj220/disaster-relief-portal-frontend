import { Link, useLocation } from "react-router";

const Sidebar = ({ role }) => {
  const location = useLocation();

  // Define menus for each role
  const menus = {
    admin: [
      { name: "Overview", path: "/admin", icon: "📊" },
      { name: "Relief Requests", path: "/admin/requests", icon: "📋" },
      { name: "Inventory", path: "/admin/inventory", icon: "📦" },
      { name: "Volunteers", path: "/admin/volunteers", icon: "🤝" },
    ],
    volunteer: [
      { name: "Overview", path: "/volunteer", icon: "📊" },
      { name: "My Tasks", path: "/volunteer/tasks", icon: "✅" },
      { name: "Availability", path: "/volunteer/status", icon: "🕒" },
    ],
    citizen: [
      { name: "Overview", path: "/citizen", icon: "📊" },
      { name: "My Requests", path: "/citizen/request", icon: "➕" },
      { name: "History", path: "/citizen/request-history", icon: "📂" },
    ],
  };

  const currentMenu = menus[role] || [];

  return (
    <aside className="w-64 bg-white border-r border-gray-100 h-[calc(100vh-72px)] sticky top-18 hidden md:flex flex-col p-4">
      <div className="space-y-2">
        {currentMenu.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-bold text-sm ${
              location.pathname === item.path
                ? "bg-blue-50 text-blue-600"
                : "text-slate-500 hover:bg-gray-50 hover:text-slate-900"
            }`}
          >
            <span className="text-lg">{item.icon}</span>
            {item.name}
          </Link>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
